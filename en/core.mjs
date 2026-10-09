/** Browser-only deterministic CPX practice engine. No network or model calls. */
export const MODE = 'offline-rules';
export const NOTICE = 'Offline dialogue · registered question expressions and intent assistance';
export const REVIEW_NOTICE = 'Review evidence recorded in questions and answers.';
export const VALIDATION_NOTICE = 'Structure and evidence links checked. Medical review status remains separate.';
export const GUIDANCE = 'This question does not exactly match an authored response. Please select a question intent below.';
const clone = value => JSON.parse(JSON.stringify(value));
const str = value => typeof value === 'string' && value.trim().length > 0;
const obj = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const semver = value => typeof value === 'string' && /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.test(value);
export const normalize = value => value.normalize('NFKC').trim().replace(/\s+/gu,' ');
const sentenceCount = value => value.split(/[.!?。！？]+(?:\s*|$)/u).filter(x=>x.trim()).length;
const sourceStatuses = {'known':'known-positive','explicit_negative':'known-negative','patient_unknown':'unknown'};
function uniqueId() {
  const c = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  if (!c?.getRandomValues) throw new Error('Secure unique ID generation is unavailable');
  const bytes = c.getRandomValues(new Uint8Array(16));
  bytes[6] = bytes[6] & 15 | 64; bytes[8] = bytes[8] & 63 | 128;
  return Array.from(bytes, x=>x.toString(16).padStart(2,'0')).join('');
}
function check(ok, message) { if (!ok) throw new Error(message); }
function mustCase(c) { const errors = validateCase(c); check(!errors.length,errors.join('\n')); }
function goalsValid(goals,c,retry=false) { return Array.isArray(goals) && goals.length <= 3 && (!retry || goals.length >= 1) && new Set(goals).size===goals.length && goals.every(id=>c.checklist.some(x=>x.id===id)); }
function validDate(date) { return str(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString()===date; }
function pin(c) { return {caseId:c.id,caseVersion:c.version,sourceVersion:c.sourceVersion,appRevision:c.appRevision,sourceSchemaVersion:c.sourceMetadata?.schema_version ?? null,sourceContentVersion:c.sourceMetadata?.content_version ?? null}; }
export function validateCase(c) {
  const errors=[];
  const require=(ok,path)=>{ if(!ok) errors.push(path); return ok; };
  if(!require(obj(c),'case: object required')) return errors;
  for(const field of ['id','title','description']) require(str(c[field]),`${field}: required`);
  require(Number.isSafeInteger(c.version) && c.version>0,'version: positive integer required');
  require(Number.isSafeInteger(c.appRevision) && c.appRevision===c.version,'appRevision: must equal numeric version');
  require(semver(c.sourceVersion),'sourceVersion: canonical semantic version required');
  require(c.medicalReview==='not-reviewed','medicalReview: must remain not-reviewed');
  if(c.sourceCase!==undefined) {
    require(obj(c.sourceCase) && c.sourceCase.case_id===c.id && c.sourceCase.version===c.sourceVersion,'sourceCase: source identity/version mismatch');
    require(obj(c.sourceMetadata) && semver(c.sourceMetadata.schema_version) && str(c.sourceMetadata.content_version),'sourceMetadata: schema/content version required');
  }
  const arrays=['facts','intents','checklist'];
  for(const key of arrays) require(Array.isArray(c[key]) && c[key].length>0,`${key}: nonempty array required`);
  if(arrays.some(key=>!Array.isArray(c[key]))) return errors;
  const ids={};
  for(const key of arrays) {
    ids[key]=new Set();
    c[key].forEach((row,i)=>{
      if(!require(obj(row),`${key}[${i}]: object required`)) return;
      require(str(row.id),`${key}[${i}].id: required`);
      require(!ids[key].has(row.id),`${key}: duplicate ID ${row.id}`); ids[key].add(row.id);
    });
  }
  for(const f of c.facts.filter(obj)) {
    require(str(f.value),`fact ${f.id}: value required`);
    require(['known-positive','known-negative','unknown'].includes(f.status),`fact ${f.id}: invalid status`);
    if(f.sourceStatus!==undefined) require(Object.hasOwn(sourceStatuses,f.sourceStatus),`fact ${f.id}: invalid source status`);
  }
  const expressions=new Set();
  for(const i of c.intents.filter(obj)) {
    require(str(i.label),`intent ${i.id}: label required`);
    if(require(Array.isArray(i.expressions) && i.expressions.length>0,`intent ${i.id}: expressions required`)) {
      for(const e of i.expressions) {
        if(!require(str(e) && str(normalize(e)),`intent ${i.id}: invalid expression`)) continue;
        const n=normalize(e); require(!expressions.has(n),`intent ${i.id}: duplicate or ambiguous expression ${n}`); expressions.add(n);
      }
    }
    if(!require(obj(i.response) && str(i.response.text),`intent ${i.id}: response text required`)) continue;
    require(sentenceCount(i.response.text)<=2,`intent ${i.id}: response exceeds two sentences`);
    if(!require(Array.isArray(i.response.evidence) && i.response.evidence.length>0,`intent ${i.id}: evidence required`)) continue;
    const seen=new Set();
    for(const e of i.response.evidence) {
      if(!require(obj(e),`intent ${i.id}: invalid evidence`)) continue;
      require(ids.facts.has(e.factId),`intent ${i.id}: missing fact ${e.factId}`);
      require(!seen.has(e.factId),`intent ${i.id}: duplicate fact reference ${e.factId}`); seen.add(e.factId);
      require(str(e.quote) && i.response.text.includes(e.quote),`intent ${i.id}: quote absent from response`);
    }
  }
  for(const item of c.checklist.filter(obj)) {
    require(str(item.label),`checklist ${item.id}: label required`);
    for(const field of ['intentIds','factIds']) {
      require(Array.isArray(item[field]) && item[field].length>0,`checklist ${item.id}: ${field} required`);
      if(Array.isArray(item[field])) require(new Set(item[field]).size===item[field].length,`checklist ${item.id}: duplicate ${field}`);
    }
    if(!Array.isArray(item.intentIds) || !Array.isArray(item.factIds)) continue;
    item.intentIds.forEach(id=>require(ids.intents.has(id),`checklist ${item.id}: missing intent ${id}`));
    for(const id of item.factIds) {
      require(ids.facts.has(id),`checklist ${item.id}: missing fact ${id}`);
      require(c.intents.some(i=>obj(i) && item.intentIds.includes(i.id) && Array.isArray(i.response?.evidence) && i.response.evidence.some(e=>e?.factId===id)),`checklist ${item.id}: unsupported fact ${id}`);
    }
  }
  return errors;
}
export function createSession(c,{mode=MODE,previousSessionId=null,goals=[]}={}) {
  mustCase(c); check(mode===MODE,'Only offline-rules mode is available');
  check(previousSessionId===null || str(previousSessionId),'Invalid previous session ID');
  check(goalsValid(goals,c,previousSessionId!==null),'Choose 1–3 unique valid goals for a retry');
  return {id:uniqueId(),...pin(c),caseSnapshot:clone(c),mode,createdAt:new Date().toISOString(),previousSessionId,goals:[...goals],turns:[]};
}
function responseFor(c,question,intentId) {
  const matches=intentId ? c.intents.filter(i=>i.id===intentId) : c.intents.filter(i=>i.expressions.some(e=>normalize(e)===normalize(question)));
  const intent=matches.length===1 ? matches[0] : null;
  if(intentId) check(!!intent,'Unknown or ambiguous assistance intent');
  return intent ? {intentId:intent.id,patientResponse:intent.response.text,exposedFactIds:intent.response.evidence.map(e=>e.factId),evidence:clone(intent.response.evidence),matchingMethod:intentId?'intent-assistance':'normalized-exact',assisted:!!intentId,guidance:null} : {intentId:null,patientResponse:null,exposedFactIds:[],evidence:[],matchingMethod:'unmatched',assisted:false,guidance:GUIDANCE};
}
function validateSessionRecord(s,c,turnIds=new Set()) {
  check(obj(s) && str(s.id),'Invalid session ID');
  check(s.mode===MODE,'Only offline-rules mode is available');
  check(validDate(s.createdAt),'Invalid session timestamp');
  check(c && same(c,s.caseSnapshot),'Session snapshot/version mismatch');
  for(const [key,value] of Object.entries(pin(c))) check(same(s[key],value),`Session ${key} pin mismatch`);
  check(s.previousSessionId===null || str(s.previousSessionId),'Invalid previous session ID');
  check(goalsValid(s.goals,c,s.previousSessionId!==null),'Invalid goals: retry requires 1–3');
  check(Array.isArray(s.turns),'turns: array required');
  const prior=[];
  for(const t of s.turns) {
    check(obj(t) && str(t.id) && !turnIds.has(t.id),'Invalid or duplicate turn ID'); turnIds.add(t.id);
    check(str(t.question) && t.question.length<=4000 && validDate(t.at),'Invalid turn text/time');
    let expected;
    if(t.assisted===true) {
      const original=prior.find(p=>p.id===t.assistanceForTurnId);
      check(original?.matchingMethod==='unmatched' && original.question===t.question,'Invalid assistance source');
      check(str(t.intentId),'Missing assistance intention'); expected=responseFor(c,t.question,t.intentId);
    } else {
      check(t.assistanceForTurnId===null,'Unexpected assistance source'); expected=responseFor(c,t.question);
    }
    for(const key of Object.keys(expected)) check(same(t[key],expected[key]),`Turn ${t.id}: inconsistent ${key}`);
    prior.push(t);
  }
}
function mustSession(s) { check(obj(s),'Session required'); mustCase(s.caseSnapshot); validateSessionRecord(s,s.caseSnapshot); }
export function appendQuestion(session,question) {
  check(str(question) && question.length<=4000,'Question must contain 1–4000 characters'); mustSession(session);
  return {...session,turns:[...session.turns,{id:uniqueId(),at:new Date().toISOString(),question,assistanceForTurnId:null,...responseFor(session.caseSnapshot,question)}]};
}
export function appendAssistance(session,unmatchedTurnId,intentId) {
  mustSession(session);
  const prior=session.turns.find(t=>t.id===unmatchedTurnId);
  check(prior?.matchingMethod==='unmatched','Assistance requires a saved unmatched question');
  return {...session,turns:[...session.turns,{id:uniqueId(),at:new Date().toISOString(),question:prior.question,assistanceForTurnId:prior.id,...responseFor(session.caseSnapshot,prior.question,intentId)}]};
}
export function review(session) {
  mustSession(session);
  return session.caseSnapshot.checklist.map(item=>{
    const asked=session.turns.filter(t=>item.intentIds.includes(t.intentId)).map(t=>({turnId:t.id,quote:t.question,assisted:t.assisted,matchingMethod:t.matchingMethod}));
    const facts=item.factIds.map(id=>{
      const fact=session.caseSnapshot.facts.find(f=>f.id===id);
      const evidence=session.turns.flatMap(t=>t.evidence.filter(e=>e.factId===id).map(e=>({turnId:t.id,quote:e.quote,patientResponse:t.patientResponse,assisted:t.assisted})));
      return {factId:id,status:fact.status,sourceStatus:fact.sourceStatus ?? null,value:fact.value,informationObtained:evidence.length>0 && fact.status!=='unknown',unknownResponseRecorded:evidence.length>0 && fact.status==='unknown',evidence};
    });
    return {id:item.id,label:item.label,asked,questionRecorded:asked.length>0,facts};
  });
}
export function retrySession(previous,goals=previous.goals) { mustSession(previous); return createSession(previous.caseSnapshot,{previousSessionId:previous.id,goals}); }
export function compareSessions(previous,current,goalId) {
  mustSession(previous); mustSession(current);
  check(current.previousSessionId===previous.id,'Comparison requires the linked previous attempt');
  check(same(previous.caseSnapshot,current.caseSnapshot),'Comparison requires identical case snapshot and version');
  check(current.goals.includes(goalId),'Choose a next practice goal before comparing');
  return {goalId,previous:{sessionId:previous.id,item:review(previous).find(x=>x.id===goalId)},current:{sessionId:current.id,item:review(current).find(x=>x.id===goalId)}};
}
export function cloneDraft(c) { mustCase(c); return {id:uniqueId(),baseCaseId:c.id,baseVersion:c.version,baseSourceVersion:c.sourceVersion,createdAt:new Date().toISOString(),case:clone(c)}; }
export function publishDraft(draft,versions) {
  check(obj(draft) && obj(draft.case) && Array.isArray(versions),'Draft and versions required');
  check(draft.case.id===draft.baseCaseId,'Draft cannot change case identity');
  versions.forEach(mustCase);
  const base=versions.find(c=>c.id===draft.baseCaseId && c.version===draft.baseVersion);
  check(!!base,'Draft base version is missing');
  check(draft.baseSourceVersion===base.sourceVersion && draft.case.sourceVersion===base.sourceVersion,'Draft cannot change canonical source version');
  check(same(draft.case.sourceCase,base.sourceCase) && same(draft.case.sourceMetadata,base.sourceMetadata),'Draft cannot change canonical source metadata');
  const next=clone(draft.case);
  next.version=Math.max(...versions.filter(c=>c.id===next.id).map(c=>c.version))+1;
  next.appRevision=next.version;
  mustCase(next);
  return [...versions.map(clone),next];
}
export function emptyState() { return {schemaVersion:1,cases:[],sessions:[],drafts:[],activeSessionId:null}; }
export function validateState(state) {
  const errors=[];
  try {
    check(obj(state) && state.schemaVersion===1,'Unsupported state format');
    for(const key of ['cases','sessions','drafts']) check(Array.isArray(state[key]),`${key}: array required`);
    const versions=new Map(),sessionIds=new Set(),turnIds=new Set(),draftIds=new Set();
    for(const c of state.cases) {
      mustCase(c); const key=JSON.stringify([c.id,c.version]);
      check(!versions.has(key),'Duplicate case version'); versions.set(key,c);
    }
    for(const s of state.sessions) {
      check(obj(s) && str(s.id) && !sessionIds.has(s.id),'Invalid or duplicate session ID'); sessionIds.add(s.id);
      validateSessionRecord(s,versions.get(JSON.stringify([s.caseId,s.caseVersion])),turnIds);
    }
    const sessionMap=new Map(state.sessions.map(s=>[s.id,s]));
    for(const s of state.sessions) {
      if(s.previousSessionId!==null) {
        const previous=sessionMap.get(s.previousSessionId);
        check(previous && previous.id!==s.id && same(previous.caseSnapshot,s.caseSnapshot),'Invalid prior attempt');
        const chain=new Set([s.id]); let next=previous;
        while(next) { check(!chain.has(next.id),'Cyclic attempt history'); chain.add(next.id); next=sessionMap.get(next.previousSessionId); }
      }
    }
    for(const d of state.drafts) {
      check(obj(d) && str(d.id) && !draftIds.has(d.id),'Invalid or duplicate draft ID'); draftIds.add(d.id);
      check(validDate(d.createdAt),'Invalid draft timestamp');
      const base=versions.get(JSON.stringify([d.baseCaseId,d.baseVersion]));
      check(!!base,'Draft base missing');
      // Content may be incomplete while authoring. Identity and canonical provenance remain pinned.
      check(obj(d.case) && d.case.id===d.baseCaseId,'Invalid draft case identity');
      check(d.baseSourceVersion===base.sourceVersion && d.case.sourceVersion===base.sourceVersion,'Invalid draft source version');
      check(d.case.version===d.baseVersion && d.case.appRevision===d.baseVersion,'Invalid draft revision');
      check(same(d.case.sourceCase,base.sourceCase) && same(d.case.sourceMetadata,base.sourceMetadata),'Invalid draft canonical metadata');
    }
    check(state.activeSessionId===null || sessionIds.has(state.activeSessionId),'Active session missing');
  } catch(error) { errors.push(error.message); }
  return errors;
}
export function exportJSON(state) { const errors=validateState(state); check(!errors.length,errors.join('\n')); return JSON.stringify(state,null,2); }
export function importJSON(text) {
  check(typeof text==='string' && text.length<=10_000_000,'Import exceeds 10 MB text limit');
  const candidate=JSON.parse(text); const errors=validateState(candidate);
  check(!errors.length,errors.join('\n')); return clone(candidate);
}
