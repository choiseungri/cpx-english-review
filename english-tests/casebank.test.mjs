import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {adaptCase,adaptCaseBank} from '../en/adapter.mjs';
import {normalize,validateCase,createSession,appendQuestion,appendAssistance,review,retrySession,compareSessions,cloneDraft,publishDraft,emptyState,validateState,exportJSON,importJSON} from '../en/core.mjs';
import {createStore,STORAGE_KEY} from '../en/storage.mjs';
const raw=JSON.parse(readFileSync(new URL('../en/casebank.en.json',import.meta.url),'utf8'));
const cases=adaptCaseBank(raw),c=cases[0];
const copy=structuredClone;
const stateFor=(session)=>({...emptyState(),cases:copy(cases),sessions:session?[session]:[],activeSessionId:session?.id??null});
function memoryStorage(initial=null){const data=new Map(initial===null?[]:[[STORAGE_KEY,initial]]);return {data,writes:0,getItem:k=>data.get(k)??null,setItem(k,v){this.writes++;data.set(k,v);},removeItem:k=>data.delete(k)};}

test('all original core public exports remain available',async()=>{
  const old=JSON.parse(readFileSync(new URL('./fixtures/original-core-exports.json',import.meta.url),'utf8'));
  const current=await import('../en/core.mjs');
  assert.ok(old.every(k=>Object.hasOwn(current,k)));
});
test('real casebank adapts 3 cases / 54 facts / 36 intents / 108 aliases, retaining complete source metadata',()=>{
  assert.equal(cases.length,3);
  assert.equal(cases.flatMap(c=>c.facts).length,54);
  assert.equal(cases.flatMap(c=>c.intents).length,36);
  assert.equal(cases.flatMap(c=>c.intents.flatMap(i=>i.expressions)).length,108);
  for(const [index,c] of cases.entries()){
    assert.deepEqual(validateCase(c),[]);
    assert.equal(c.sourceVersion,'1.1.0');assert.equal(c.appRevision,1);assert.equal(c.version,1);
    assert.deepEqual(c.sourceCase,raw.cases[index]);
    assert.deepEqual(c.sourceMetadata,Object.fromEntries(Object.entries(raw).filter(([k])=>k!=='cases')));
    assert.deepEqual(c.profile,raw.cases[index].profile);
    assert.equal(c.description,raw.cases[index].opening_facts.patient_line);
    for(const i of c.intents){
      const source=raw.cases[index].intent_questions.find(q=>q.id===i.id);
      assert.equal(i.response.text,source.patient_answer);
      assert.deepEqual(i.response.evidence.map(e=>e.factId),source.fact_unit_ids);
      for(const e of i.response.evidence){assert.ok(i.response.text.includes(e.quote));assert.equal(e.factId,e.fact_unit_id);assert.equal(e.quote,e.answer_quote);assert.equal(e.sourceStatus,e.classification);}
    }
  }
});
test('adapter rejects missing aliases, ambiguous aliases, classification drift and duplicate case IDs',()=>{
  for(const mutate of [x=>{delete x.cases[0].intent_questions[0].exact_aliases;},x=>x.cases[0].intent_questions[1].exact_aliases.push(x.cases[0].intent_questions[0].question),x=>x.cases[0].intent_questions[0].revealed_fact_evidence[0].classification='patient_unknown',x=>x.cases.push(copy(x.cases[0]))]){
    const candidate=copy(raw);mutate(candidate);assert.throws(()=>adaptCaseBank(candidate));
  }
});
test('canonical source semver and positive numeric app revision are distinct, validated fields',()=>{
  for(const version of ['1','v1.1.0','01.1.0',1.1,'1.1.0-01']){const candidate=copy(c);candidate.sourceVersion=version;assert.ok(validateCase(candidate).length);}
  for(const revision of [0,-1,1.2,'1',NaN]){const candidate=copy(c);candidate.appRevision=revision;assert.ok(validateCase(candidate).length);}
  const candidate=copy(c);candidate.appRevision=2;assert.ok(validateCase(candidate).length);
  const session=createSession(c);assert.equal(session.sourceVersion,c.sourceVersion);assert.equal(session.appRevision,1);assert.equal(session.sourceSchemaVersion,raw.schema_version);assert.equal(session.sourceContentVersion,raw.content_version);
});
test('normalization is NFKC plus whitespace only, preserving punctuation',()=>{
  assert.equal(normalize(' \n ＡＢＣ？\t  가나다  '),'ABC? 가나다');
  assert.equal(normalize('질문？'),'질문?');assert.notEqual(normalize('질문?'),normalize('질문'));
  assert.notEqual(normalize('질문, 답?'),normalize('질문 답?'));
});
test('all 108 aliases, all whitespace variants and all NFKC variants route to exact authored answers',()=>{
  let count=0;
  for(const c of cases)for(const intent of c.intents)for(const alias of intent.expressions){
    const fullwidth=[...alias].map(ch=>ch.charCodeAt(0)>=0x21&&ch.charCodeAt(0)<=0x7e?String.fromCharCode(ch.charCodeAt(0)+0xfee0):ch).join('');
    for(const input of [alias,'\n  '+alias.replaceAll(' ','\t \n')+'  ',fullwidth]){
      const s=appendQuestion(createSession(c),input),t=s.turns[0];
      assert.equal(t.intentId,intent.id);assert.equal(t.patientResponse,intent.response.text);assert.equal(t.question,input);assert.deepEqual(t.evidence,intent.response.evidence);assert.deepEqual(t.exposedFactIds,intent.fact_unit_ids);assert.equal(t.matchingMethod,'normalized-exact');count++;
    }
  }
  assert.equal(count,324);
});
test('all 30 challenge fixtures and 324 prefix/suffix/punctuation mutations reveal no answer or fact',()=>{
  let rejected=0;
  for(const c of cases){
    const inputs=[...c.input_challenge_fixtures.map(f=>f.input),...c.intents.flatMap(i=>i.expressions.flatMap(alias=>['추가 질문 '+alias,alias+' 그리고 다른 병력은요?',alias.slice(0,-1)]))];
    for(const input of inputs){const s=appendQuestion(createSession(c),input),t=s.turns[0];assert.equal(t.matchingMethod,'unmatched',input);assert.equal(t.patientResponse,null);assert.deepEqual(t.exposedFactIds,[]);assert.deepEqual(t.evidence,[]);assert.equal(review(s).some(r=>r.questionRecorded),false);rejected++;}
  }
  assert.equal(rejected,354);
});
test('opening line never marks checklist, repeated questions preserve separate exact evidence',()=>{
  for(const c of cases){let s=createSession(c);assert.equal(review(s).some(r=>r.questionRecorded),false);assert.equal(s.turns.length,0);const q=c.intents[0].expressions[0];s=appendQuestion(appendQuestion(s,q),q);assert.notEqual(s.turns[0].id,s.turns[1].id);assert.deepEqual(s.turns[0].evidence,s.turns[1].evidence);assert.equal(review(s)[0].asked.length,2);}
});
test('patient unknown, known negative and unasked are independent evidence states',()=>{
  for(const c of cases){
    const fact=c.facts.find(f=>f.status==='unknown'),intent=c.intents.find(i=>i.response.evidence.some(e=>e.factId===fact.id));
    let s=createSession(c);let row=review(s).flatMap(r=>r.facts).find(f=>f.factId===fact.id);assert.equal(row.informationObtained,false);assert.equal(row.unknownResponseRecorded,false);
    s=appendQuestion(s,intent.expressions[0]);row=review(s).flatMap(r=>r.facts).find(f=>f.factId===fact.id);assert.equal(row.informationObtained,false);assert.equal(row.unknownResponseRecorded,true);assert.equal(row.sourceStatus,'patient_unknown');assert.ok(row.evidence.length);
    const negative=c.facts.find(f=>f.status==='known-negative'),negativeIntent=c.intents.find(i=>i.response.evidence.some(e=>e.factId===negative.id));s=appendQuestion(s,negativeIntent.expressions[0]);row=review(s).flatMap(r=>r.facts).find(f=>f.factId===negative.id);assert.equal(row.informationObtained,true);assert.equal(row.unknownResponseRecorded,false);
  }
});
test('unmatched question assistance is an explicit separate linked turn',()=>{
  let s=appendQuestion(createSession(c),'언제부터예요?');const original=copy(s.turns[0]);
  s=appendAssistance(s,original.id,c.intents[0].id);assert.deepEqual(s.turns[0],original);assert.equal(s.turns[1].assisted,true);assert.equal(s.turns[1].assistanceForTurnId,original.id);assert.equal(s.turns[1].patientResponse,c.intents[0].response.text);assert.deepEqual(validateState(stateFor(s)),[]);
});
test('retry requires 1–3 valid unique goals and resets turns while linking immutable prior version',()=>{
  const old=appendQuestion(createSession(c),c.intents[0].expressions[0]);
  for(const goals of [[],[c.checklist[0].id,c.checklist[0].id],c.checklist.slice(0,4).map(x=>x.id),['missing']])assert.throws(()=>retrySession(old,goals));
  for(const count of [1,2,3]){const goals=c.checklist.slice(0,count).map(x=>x.id),next=retrySession(old,goals);assert.equal(next.turns.length,0);assert.equal(next.previousSessionId,old.id);assert.deepEqual(next.caseSnapshot,old.caseSnapshot);assert.equal(compareSessions(old,next,goals[0]).previous.item.questionRecorded,true);const state=stateFor(old);state.sessions.push(next);assert.deepEqual(validateState(state),[]);}
});
test('publication creates a new numeric revision while canonical source and previous session stay pinned',()=>{
  const s=createSession(c),draft=cloneDraft(c);draft.case.title+=' · 편집';
  const versions=publishDraft(draft,cases),published=versions.at(-1);
  assert.equal(published.version,2);assert.equal(published.appRevision,2);assert.equal(published.sourceVersion,'1.1.0');assert.equal(s.caseVersion,1);assert.equal(s.caseSnapshot.title,c.title);assert.deepEqual(published.sourceCase,c.sourceCase);
  draft.case.sourceVersion='1.2.0';assert.throws(()=>publishDraft(draft,cases));
});
test('partial draft content survives export/reload but cannot publish; source identity cannot drift',()=>{
  const state=stateFor();state.drafts=[cloneDraft(c)];delete state.drafts[0].case.title;state.drafts[0].case.intents=[];
  assert.deepEqual(importJSON(exportJSON(state)),state);assert.throws(()=>publishDraft(state.drafts[0],cases));
  for(const mutate of [d=>d.case.id='other',d=>d.case.sourceVersion='1.2.0',d=>d.case.appRevision=2,d=>d.case.sourceCase.version='1.2.0',d=>d.case.sourceMetadata.content_version='changed']){const candidate=copy(state);mutate(candidate.drafts[0]);assert.ok(validateState(candidate).length);}
});
test('replay validation rejects tampered turns and all source/session pins, leaving valid round-trip identical',()=>{
  const s=appendQuestion(createSession(c),c.intents[0].expressions[0]),base=stateFor(s);
  const patches=[s=>s.sourceVersion='1.2.0',s=>s.appRevision=2,s=>s.sourceSchemaVersion='9.0.0',s=>s.sourceContentVersion='changed',s=>s.caseVersion=99,s=>s.caseSnapshot.title='changed',s=>s.turns[0].question='different',s=>s.turns[0].patientResponse='changed',s=>s.turns[0].evidence[0].quote='changed',s=>s.turns[0].evidence[0].factId='missing',s=>s.turns[0].exposedFactIds=[],s=>s.turns[0].matchingMethod='semantic',s=>s.turns[0].assisted=true,s=>s.turns[0].at='not a timestamp',s=>s.turns[0].assistanceForTurnId='fake',s=>s.goals=[c.checklist[0].id,c.checklist[0].id],s=>s.mode='live'];
  for(const patch of patches){const candidate=copy(base);patch(candidate.sessions[0]);assert.throws(()=>importJSON(JSON.stringify(candidate)));}
  assert.deepEqual(importJSON(exportJSON(base)),base);
});
test('malformed, duplicate, dangling and cyclic imports are rejected',()=>{
  for(const data of [null,[],{}, {...emptyState(),cases:[null]}, {...emptyState(),sessions:[null]}, {...emptyState(),activeSessionId:'missing'}]) assert.ok(validateState(data).length);
  const first=createSession(c),second=retrySession(first,[c.checklist[0].id]),state=stateFor(first);state.sessions.push(second);state.sessions[0].goals=[c.checklist[0].id];state.sessions[0].previousSessionId=second.id;assert.ok(validateState(state).length);
  const duplicate=stateFor(first);duplicate.sessions.push(copy(first));assert.ok(validateState(duplicate).length);
  assert.throws(()=>importJSON('x'.repeat(10_000_001)));assert.throws(()=>importJSON('{broken'));
});
test('corrupt storage remains byte-for-byte untouched during load, automatic seed and normal updates',()=>{
  const storage=memoryStorage('{corrupt saved bytes'),store=createStore(storage);store.load();assert.equal(store.status,'corrupt');assert.equal(store.canPersist,false);assert.equal(store.recoveryText,'{corrupt saved bytes');
  store.seed(cases);assert.equal(store.state.cases.length,3);assert.equal(storage.writes,0);assert.equal(storage.getItem(STORAGE_KEY),'{corrupt saved bytes');
  const next=store.state;next.sessions.push(createSession(c));next.activeSessionId=next.sessions[0].id;assert.equal(store.update(next),false);assert.equal(store.state.sessions.length,1);assert.equal(storage.writes,0);assert.equal(storage.getItem(STORAGE_KEY),'{corrupt saved bytes');assert.ok(store.export());
});
test('unreadable storage is never overwritten by automatic seeding',()=>{
  let writes=0;const storage={getItem(){throw Error('denied');},setItem(){writes++;},removeItem(){throw Error('denied');}},store=createStore(storage);store.seed(cases);assert.equal(store.status,'unavailable');assert.equal(store.state.cases.length,3);assert.equal(writes,0);assert.equal(store.clear('DELETE ALL LOCAL DATA'),false);
});
test('failed import persistence rolls back memory and keeps previous browser bytes',()=>{
  const storage=memoryStorage(),store=createStore(storage),old=stateFor(createSession(c));assert.equal(store.update(old),true);
  const oldBytes=storage.getItem(STORAGE_KEY),oldState=store.state,newState=stateFor(appendQuestion(createSession(c),c.intents[0].expressions[0]));
  storage.setItem=()=>{throw Error('quota');};assert.equal(store.import(exportJSON(newState)),false);assert.deepEqual(store.state,oldState);assert.equal(storage.getItem(STORAGE_KEY),oldBytes);assert.match(store.error,/existing records/);
});
test('regular storage failure keeps current work exportable; invalid import cannot mutate it',()=>{
  const storage=memoryStorage(),store=createStore(storage);store.seed(cases);storage.setItem=()=>{throw Error('quota');};const state=stateFor(createSession(c));assert.equal(store.update(state),false);assert.equal(store.status,'memory-only');assert.deepEqual(importJSON(store.export()),state);assert.throws(()=>store.import('{broken'));assert.deepEqual(store.state,state);
});
test('explicit valid import can recover corrupt storage; repeated seed preserves saved work',()=>{
  const storage=memoryStorage('broken'),store=createStore(storage);store.seed(cases);const state=stateFor(createSession(c));assert.equal(store.import(exportJSON(state)),true);assert.equal(store.status,'ready');assert.equal(store.canPersist,true);assert.equal(store.recoveryText,null);store.seed(cases);assert.deepEqual(store.state,state);assert.deepEqual(createStore(storage).load(),state);
});
test('state getter is detached and explicit deletion remains separate from practice retry',()=>{
  const storage=memoryStorage(),store=createStore(storage);store.seed(cases);const candidate=store.state;candidate.cases[0].title='changed';assert.equal(store.state.cases[0].title,c.title);assert.throws(()=>store.clear('restart'));assert.equal(store.state.cases.length,3);assert.equal(store.clear('DELETE ALL LOCAL DATA'),true);assert.equal(storage.getItem(STORAGE_KEY),null);
});
