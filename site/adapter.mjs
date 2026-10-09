/** Canonical casebank adapter. Retains source content without executing or fetching it. */
import {validateCase} from './core.mjs';
const clone=value=>JSON.parse(JSON.stringify(value));
const statuses={'known':'known-positive','explicit_negative':'known-negative','patient_unknown':'unknown'};
const ensure=(ok,message)=>{if(!ok)throw new Error(message);};
export function adaptCase(rawCase,sourceMetadata,{appRevision=1}={}) {
  ensure(rawCase && typeof rawCase==='object' && !Array.isArray(rawCase),'Case source must be an object');
  ensure(sourceMetadata && typeof sourceMetadata==='object','Casebank metadata required');
  ensure(Array.isArray(rawCase.fact_units) && Array.isArray(rawCase.intent_questions) && Array.isArray(rawCase.formative_checklist?.items),'Invalid source case arrays');
  const raw=clone(rawCase);
  const adapted={
    ...raw,
    id:raw.case_id,version:appRevision,appRevision,sourceVersion:raw.version,
    sourceMetadata:clone(sourceMetadata),sourceCase:raw,
    description:raw.opening_facts?.patient_line,
    medicalReview:'not-reviewed',
    facts:raw.fact_units.map(f=>({...clone(f),value:f.statement,status:statuses[f.status],sourceStatus:f.status})),
    intents:raw.intent_questions.map(q=>{
      ensure(Array.isArray(q.exact_aliases) && Array.isArray(q.revealed_fact_evidence),'Source aliases and quoted evidence required');
      ensure(q.exact_aliases.includes(q.question),'Original question must be a registered alias');
      ensure(q.response_mode==='authored_fixed_answer','Only authored fixed answers are supported');
      ensure(JSON.stringify(q.fact_unit_ids)===JSON.stringify(q.revealed_fact_evidence.map(e=>e.fact_unit_id)),'Source fact/evidence order mismatch');
      for(const e of q.revealed_fact_evidence) {
        const fact=raw.fact_units.find(f=>f.id===e.fact_unit_id);
        ensure(fact && fact.status===e.classification && e.support==='authored_quote','Source evidence classification mismatch');
      }
      return {...clone(q),label:q.intent,expressions:[...q.exact_aliases],response:{text:q.patient_answer,evidence:q.revealed_fact_evidence.map(e=>({...clone(e),factId:e.fact_unit_id,quote:e.answer_quote,sourceStatus:e.classification}))}};
    }),
    checklist:raw.formative_checklist.items.map(i=>({...clone(i),intentIds:[...i.evidence_question_ids],factIds:[...i.fact_unit_ids]}))
  };
  const errors=validateCase(adapted); ensure(errors.length===0,errors.join('\n'));
  return adapted;
}
export function adaptCaseBank(raw,{appRevision=1}={}) {
  ensure(raw && typeof raw==='object' && Array.isArray(raw.cases),'Casebank cases array required');
  ensure(raw.mode==='bounded_offline_question','Unsupported casebank mode');
  const {cases,...metadata}=raw;
  const result=cases.map(c=>adaptCase(c,metadata,{appRevision}));
  ensure(new Set(result.map(c=>c.id)).size===result.length,'Duplicate source case ID');
  return result;
}
