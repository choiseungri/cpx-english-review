import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {adaptCaseBank} from '../en/adapter.mjs';
import {createSession,appendQuestion,validateCase} from '../en/core.mjs';
import {STORAGE_KEY as enKey} from '../en/storage.mjs';
import {STORAGE_KEY as koKey} from '../site/storage.mjs';
const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');
const ko=JSON.parse(read('../site/casebank.ko.json')),en=JSON.parse(read('../en/casebank.en.json'));
test('English edition has separate storage and no Korean UI strings',()=>{
 assert.notEqual(enKey,koKey);
 for(const name of ['app.mjs','identity.mjs','presentation.mjs','index.html','core.mjs','storage.mjs','casebank.en.json'])assert.ok(!/[가-힣]/u.test(read('../en/'+name)),name);
});
test('translation preserves case identities, fact classifications, question mappings and counts',()=>{
 assert.equal(en.cases.length,ko.cases.length);
 for(let n=0;n<ko.cases.length;n++){
  const a=ko.cases[n],b=en.cases[n];assert.equal(a.case_id,b.case_id);assert.equal(a.version,b.version);
  assert.deepEqual(a.fact_units.map(f=>[f.id,f.status]),b.fact_units.map(f=>[f.id,f.status]));
  assert.deepEqual(a.intent_questions.map(q=>[q.id,q.fact_unit_ids,q.response_mode,q.exact_aliases.length]),b.intent_questions.map(q=>[q.id,q.fact_unit_ids,q.response_mode,q.exact_aliases.length]));
  assert.deepEqual(a.formative_checklist.items.map(i=>[i.id,i.evidence_question_ids,i.fact_unit_ids]),b.formative_checklist.items.map(i=>[i.id,i.evidence_question_ids,i.fact_unit_ids]));
 }
});
test('every translated expression produces its authored answer with exact evidence',()=>{
 for(const c of adaptCaseBank(en)){
  assert.deepEqual(validateCase(c),[]);
  for(const i of c.intents)for(const q of i.expressions){const s=appendQuestion(createSession(c),q),t=s.turns[0];assert.equal(t.patientResponse,i.response.text);for(const e of t.evidence)assert.ok(t.patientResponse.includes(e.quote));}
 }
});
test('engine logic is preserved apart from localized display constants',()=>{
 const strip=s=>s.replace(/^export const (NOTICE|REVIEW_NOTICE|VALIDATION_NOTICE|GUIDANCE) = .*;$/gm,'');
 assert.equal(strip(read('../en/core.mjs')),strip(read('../site/core.mjs')));
 for(const name of ['adapter.mjs','routing.mjs','style.css'])assert.equal(read('../en/'+name),read('../site/'+name));
});
