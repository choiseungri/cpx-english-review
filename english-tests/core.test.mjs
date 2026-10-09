import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {MODE,validateCase,createSession,appendQuestion,appendAssistance,review,retrySession,compareSessions,cloneDraft,publishDraft,emptyState,exportJSON,importJSON,validateState} from '../en/core.mjs';
import {createStore,STORAGE_KEY} from '../en/storage.mjs';
if (!globalThis.crypto) globalThis.crypto=webcrypto;
const copy=v=>JSON.parse(JSON.stringify(v));
// Software-only fixture. Not a clinical training case or diagnostic content.
function fixture() { return {
  id:'software-fixture',version:1,appRevision:1,sourceVersion:'1.0.0',title:'TEST ONLY',description:'Nonclinical software fixture',medicalReview:'not-reviewed',
  facts:[{id:'a',value:'alpha',status:'known-positive'},{id:'b',value:'beta absent',status:'known-negative'},{id:'u',value:'unknown',status:'unknown'}],
  intents:[
    {id:'ask-a',label:'Alpha',expressions:['알파 값은?','알파를 알려 주세요?'],response:{text:'알파입니다.',evidence:[{factId:'a',quote:'알파입니다.'}]}},
    {id:'ask-b',label:'Beta',expressions:['베타가 있나요?'],response:{text:'베타는 없습니다.',evidence:[{factId:'b',quote:'베타는 없습니다.'}]}},
    {id:'ask-u',label:'Unknown',expressions:['감마 값은?'],response:{text:'모르겠습니다.',evidence:[{factId:'u',quote:'모르겠습니다.'}]}}
  ],
  checklist:[{id:'goal-a',label:'Record alpha',intentIds:['ask-a'],factIds:['a']},{id:'goal-b',label:'Record beta',intentIds:['ask-b'],factIds:['b']},{id:'goal-u',label:'Record unknown',intentIds:['ask-u'],factIds:['u']}]
}; }
function stateWith(s,c=fixture()) { return {...emptyState(),cases:[c],sessions:[s],activeSessionId:s.id}; }
function memoryStorage() { const data=new Map(); return {data,getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)}; }
test('valid fixture passes structural validation',()=>assert.deepEqual(validateCase(fixture()),[]));
test('missing fields and malformed arrays are diagnosed without crashing',()=>{
  for (const value of [null,{},[],{facts:[null],intents:[null],checklist:[null]}]) assert.ok(validateCase(value).length);
  const c=fixture(); delete c.title; assert.match(validateCase(c).join(' '),/title/);
});
test('duplicate IDs, missing facts and unsupported checklist are rejected',()=>{
  const c=fixture(); c.facts.push(copy(c.facts[0])); c.intents[0].response.evidence[0].factId='missing'; c.checklist[0].factIds=['b'];
  const errors=validateCase(c).join('\n'); assert.match(errors,/duplicate ID/); assert.match(errors,/missing fact/); assert.match(errors,/unsupported fact/);
});
test('three sentences, absent quotes and ambiguous expressions are rejected',()=>{
  const c=fixture(); c.intents[0].response.text='One. Two. Three.'; c.intents[1].expressions.push('알파 값은?');
  const errors=validateCase(c).join('\n'); assert.match(errors,/two sentences/); assert.match(errors,/quote absent/); assert.match(errors,/ambiguous expression/);
});
test('structural validation never marks a case medically reviewed',()=>{
  const c=fixture(); c.medicalReview='approved'; assert.ok(validateCase(c).length);
});
test('repeat questions create distinct actual turns preserving raw input',()=>{
  let s=createSession(fixture()); const raw='  알파   값은？  ';
  s=appendQuestion(s,raw); s=appendQuestion(s,raw);
  assert.equal(s.turns.length,2); assert.notEqual(s.turns[0].id,s.turns[1].id); assert.equal(s.turns[0].question,raw);
  assert.equal(s.turns[1].patientResponse,'알파입니다.'); assert.equal(s.turns[0].matchingMethod,'normalized-exact');
});
test('question order does not alter facts or replace history',()=>{
  let s=createSession(fixture()); s=appendQuestion(s,'베타가 있나요?'); s=appendQuestion(s,'알파 값은?');
  assert.deepEqual(s.turns.map(t=>t.exposedFactIds),[['b'],['a']]);
});
test('ambiguous, substring, combined and unsupported questions expose no facts',()=>{
  for (const q of ['알파','알파 값은? 베타가 있나요?','아프세요?','알파 값은 아닌가요?','<script>alert(1)</script>']) {
    const s=appendQuestion(createSession(fixture()),q); assert.equal(s.turns[0].patientResponse,null); assert.deepEqual(s.turns[0].evidence,[]); assert.ok(s.turns[0].guidance);
    assert.equal(review(s).some(x=>x.questionRecorded),false);
  }
});
test('assistance appends a linked actual turn and preserves the unresolved turn',()=>{
  let s=appendQuestion(createSession(fixture()),'알파'); const original=copy(s.turns[0]);
  s=appendAssistance(s,original.id,'ask-a'); assert.deepEqual(s.turns[0],original); assert.equal(s.turns[1].question,'알파');
  assert.equal(s.turns[1].assistanceForTurnId,original.id); assert.equal(s.turns[1].assisted,true); assert.equal(review(s)[0].asked[0].assisted,true);
  assert.throws(()=>appendAssistance(s,s.turns[1].id,'ask-b')); assert.throws(()=>appendAssistance(s,original.id,'invented'));
});
test('known negative and unknown responses stay distinct with exact citations',()=>{
  let s=createSession(fixture()); s=appendQuestion(s,'베타가 있나요?'); s=appendQuestion(s,'감마 값은?');
  const rows=review(s); assert.equal(rows[1].facts[0].status,'known-negative'); assert.equal(rows[1].facts[0].informationObtained,true);
  assert.equal(rows[2].questionRecorded,true); assert.equal(rows[2].facts[0].informationObtained,false); assert.equal(rows[2].facts[0].unknownResponseRecorded,true);
  for (const row of rows) for (const fact of row.facts) for (const e of fact.evidence) { const t=s.turns.find(t=>t.id===e.turnId); assert.ok(t.patientResponse.includes(e.quote)); assert.equal(t.patientResponse,e.patientResponse); }
});
test('retry retains old history and same snapshot and compares a selected goal',()=>{
  const old=appendQuestion(createSession(fixture()),'알파 값은?'); let next=retrySession(old,['goal-a']); next=appendQuestion(next,'알파 값은?');
  assert.notEqual(old.id,next.id); assert.equal(old.turns.length,1); assert.equal(next.turns.length,1); assert.deepEqual(old.caseSnapshot,next.caseSnapshot);
  const compared=compareSessions(old,next,'goal-a'); assert.equal(compared.previous.item.asked[0].turnId,old.turns[0].id);
  assert.throws(()=>compareSessions(old,next,'goal-b'));
});
test('draft publication allocates new version without changing session snapshots',()=>{
  const c=fixture(),s=appendQuestion(createSession(c),'알파 값은?'),d=cloneDraft(c); d.case.intents[0].response.text='새 알파입니다.'; d.case.intents[0].response.evidence[0].quote='새 알파입니다.';
  const versions=publishDraft(d,[c]); assert.equal(versions[1].version,2); assert.equal(s.caseSnapshot.version,1); assert.equal(retrySession(s,['goal-a']).caseVersion,1);
  assert.equal(appendQuestion(s,'알파 값은?').turns[1].patientResponse,'알파입니다.'); assert.equal(c.intents[0].response.text,'알파입니다.');
  assert.equal(publishDraft(d,versions)[2].version,3);
  d.case.intents[0].response.text='One. Two. Three.'; assert.throws(()=>publishDraft(d,versions));
});
test('refresh/load restores sessions and incomplete drafts',()=>{
  const storage=memoryStorage(),first=createStore(storage),s=appendQuestion(createSession(fixture()),'알파 값은?'),state=stateWith(s);
  const d=cloneDraft(fixture()); delete d.case.title; state.drafts=[d]; assert.equal(first.update(state),true);
  const restored=createStore(storage).load(); assert.deepEqual(restored,state); assert.ok(validateCase(restored.drafts[0].case).length);
});
test('JSON round trip preserves original questions, exact citations and version',()=>{
  let s=appendQuestion(createSession(fixture()),'알파'); s=appendAssistance(s,s.turns[0].id,'ask-a');
  assert.deepEqual(importJSON(exportJSON(stateWith(s))),stateWith(s));
});
test('failed imports cannot overwrite memory or browser data',()=>{
  const storage=memoryStorage(),store=createStore(storage); store.update(stateWith(createSession(fixture())));
  const original=store.export(),stored=storage.getItem(STORAGE_KEY);
  const malformed=JSON.parse(original); malformed.sessions[0].caseVersion=999;
  for (const text of ['{',JSON.stringify(malformed),'null','{"schemaVersion":9000}']) assert.throws(()=>store.import(text));
  assert.equal(store.export(),original); assert.equal(storage.getItem(STORAGE_KEY),stored);
});
test('tampered response, quotes, fact IDs, assistance and match methods are rejected',()=>{
  const s=appendQuestion(createSession(fixture()),'알파 값은?'),base=stateWith(s);
  for (const patch of [{patientResponse:'Invented'},{exposedFactIds:['b']},{matchingMethod:'ai'},{assisted:true},{evidence:[{factId:'a',quote:'Invented'}]}]) {
    const candidate=copy(base); Object.assign(candidate.sessions[0].turns[0],patch); assert.ok(validateState(candidate).length);
  }
});
test('duplicate IDs and cyclic attempt history are rejected',()=>{
  const old=createSession(fixture()),next=retrySession(old,['goal-a']),state=stateWith(old); state.sessions.push(next); state.sessions[0].previousSessionId=next.id;
  assert.ok(validateState(state).length); const dup=stateWith(old); dup.sessions.push(copy(old)); assert.ok(validateState(dup).length);
});
test('storage unavailable or full leaves memory usable and JSON export available',()=>{
  const storage={getItem(){throw new Error('blocked')},setItem(){throw new Error('quota')},removeItem(){throw new Error('blocked')}};
  const store=createStore(storage); store.load(); assert.ok(store.error); const state=stateWith(createSession(fixture())); assert.equal(store.update(state),false);
  assert.match(store.error,/JSON/); assert.deepEqual(importJSON(store.export()),state); assert.equal(store.clear('DELETE ALL LOCAL DATA'),false); assert.deepEqual(store.state,state);
});
test('corrupted stored data remains untouched after a failed load',()=>{
  const storage=memoryStorage(); storage.setItem(STORAGE_KEY,'broken'); const store=createStore(storage); store.load(); assert.ok(store.error); assert.equal(storage.getItem(STORAGE_KEY),'broken');
});
test('reset practice preserves records; explicit data deletion is separate',()=>{
  const storage=memoryStorage(),store=createStore(storage),s=appendQuestion(createSession(fixture()),'알파 값은?'),state=stateWith(s);
  state.sessions.push(retrySession(s,['goal-a'])); state.activeSessionId=state.sessions[1].id; store.update(state); assert.equal(store.state.sessions[0].turns.length,1);
  assert.throws(()=>store.clear('restart')); assert.equal(store.state.sessions.length,2); assert.equal(store.clear('DELETE ALL LOCAL DATA'),true); assert.equal(storage.getItem(STORAGE_KEY),null);
});
test('Claude and any nonoffline mode cannot create or import sessions',()=>{
  assert.throws(()=>createSession(fixture(),{mode:'claude'})); const state=stateWith(createSession(fixture())); state.sessions[0].mode='claude'; assert.throws(()=>importJSON(JSON.stringify(state)));
});
test('out-of-version comparison is rejected',()=>{
  const old=createSession(fixture()),c=fixture(); c.version=2; c.appRevision=2; const newer=createSession(c,{goals:['goal-a']}); assert.throws(()=>compareSessions(old,newer,'goal-a'));
});
