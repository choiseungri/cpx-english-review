import {renderIntroduction,renderDemoIntroduction,renderFoundation} from '../project-front/render.mjs?v=cpx-20261009-1436';
import {frontCopy} from '../project-front/copy-en.mjs?v=cpx-20261009-1436';
import {renderGuidedDemo} from '../guided-demo/runtime.mjs?v=cpx-20261009-1436';
import {demoData} from './demo-data.mjs';
import {identity} from './identity.mjs';
const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
const p=(text,cls='')=>node('p',cls,text);
const quote=text=>p('“'+text+'”','project-quote');
function action(text,fn,cls='project-link'){const b=node('button',cls,text);b.type='button';b.addEventListener('click',fn);return b}
function question(text){const q=quote('');q.replaceChildren();const key='When';if(text.startsWith(key))q.append(node('span',null,'“'),node('span','question-key',key),node('span',null,text.slice(key.length)+'”'));else q.textContent='“'+text+'”';return q}
export function renderProject(main,{example,counts,navigate,openExample,illustration}){
 const c=example,i=c.intents[0];
 const page=node('div','project-page'),legacy=node('div','front-legacy'),more=node('details','front-technical');
 more.append(node('summary',null,'Explore the working prototype in detail'),legacy);
 page.append(renderIntroduction(frontCopy,{navigate}),renderDemoIntroduction(frontCopy),renderGuidedDemo(demoData,{showIntro:false}),renderFoundation(frontCopy,{navigate}));
 const opening=node('section','project-opening');opening.setAttribute('aria-label','Project introduction');
 const lead=node('div','project-lead');lead.append(p('One case, three connected perspectives','project-kicker'));
 const title=node('h2','project-context-title');['Design a case.','Practice an interview.','Review the evidence.'].forEach(t=>title.append(node('span',null,t)));lead.append(title,p('CPX Practice Lab connects case authoring and conversation records\nwith a review of questions and their supporting evidence.','project-summary'));
 const img=illustration();img.className='project-illustration';lead.append(img,action('Explore questions and evidence ↓',()=>{document.querySelector('#project-detail').scrollIntoView({behavior:'auto',block:'start'});document.querySelector('#project-detail').focus()}));
 const trail=node('div','project-trail');trail.append(node('span','project-tag','Authored fictional case'),node('h2','project-case-title','Case A · An adult with difficulty falling asleep'));
 function step(num,en,title){const s=node('section','project-step');const index=node('div','project-step-index');index.append(p('Case A'),node('span',null,num));const content=node('div','project-step-content');content.append(p(en,'project-eyebrow'),node('h3',null,title));s.append(index,content);trail.append(s);return content}
 let part=step('01','DESIGN','The case author');part.append(p('The patient’s opening words','project-label'),quote(c.description));
 part=step('02','PRACTICE','The interview learner');part.append(p('Student question','project-label'),question(i.expressions[0]),p('Patient response','project-label'),quote(i.response.text));
 part=step('03','REVIEW','The evidence reviewer');part.append(node('h4','project-emphasis',i.label),p('Review the patient statements linked to a question alongside the facts in the case.','project-review-line'));
 opening.append(lead,trail);legacy.append(opening,p('Authored words become dialogue, and dialogue records inform the next practice session.','project-divider'));
 const detail=node('section','project-detail');detail.id='project-detail';detail.tabIndex=-1;
 const intro=node('div','detail-intro');intro.append(p('02 / EXPLORE THE CONNECTIONS','project-eyebrow'),node('h2',null,'Follow a single\nquestion.'),p('Which case the words came from.\nWhat the student asked.\nWhat to revisit.'),node('span','project-tag','Case A · Questions and answers included in the prototype'));
 const spread=node('div','project-spread'),record=node('div','project-record'),evidence=node('aside','project-evidence');
 record.append(node('h3','spread-heading','Practice record'));
 function row(label,content,cls=''){const r=node('div','project-record-row '+cls);r.append(p(label,'project-label'),content);record.append(r)}
 row('Case opening',quote(c.description));row('Student · Question 01',question(i.expressions[0]),'focused');row('Patient',quote(i.response.text));row('Student · Question 02',quote(c.intents[1].expressions[0]),'next-question');
 evidence.append(node('h3','spread-heading','Supporting evidence'),node('span','project-tag','Evidence 01'),node('h4','project-emphasis',i.label),p('Compare quotes from the response with the authored facts, side by side.'));
 i.response.evidence.forEach(e=>{const f=c.facts.find(f=>f.id===e.factId);const pair=node('div','project-fact');pair.append(p('“'+e.quote+'”','fact-quote'),p(f.value,'fact-description'));evidence.append(pair)});
 evidence.append(action('Practice this case ↗',()=>openExample(c.id)));
 spread.append(record,evidence);detail.append(intro,spread);legacy.append(detail);
 const ledger=node('section','project-ledger');ledger.setAttribute('aria-label','Verified project scope');ledger.append(node('h2',null,'Project inventory'));
 const entries=[['01','Cases and responses',`${counts.cases} authored fictional cases · ${counts.facts} facts\n${counts.intents} question intents · ${counts.expressions} expressions`,'Open case editor ↗','editor'],['02','Conversations and records','Save conversations · Preserve case versions\nImport and export records as JSON','Open records and guide ↗','about'],['03','Questions and evidence','Link evidence to patient quotes\nChoose a goal and retry the same case version','Open review ↗','review']];
 entries.forEach(([n,t,d,label,v])=>{const item=node('div','ledger-entry');item.append(p(n,'ledger-number'),node('h3',null,t),p(d),action(label,()=>navigate(v)));ledger.append(item)});legacy.append(ledger);
 const maker=node('section','project-identity');maker.setAttribute('aria-labelledby','project-maker-heading');
 const makerHeading=node('h2',null,'Creator');makerHeading.id='project-maker-heading';
 const makerBody=node('div','identity-body');makerBody.append(node('h3',null,identity.creator),p(identity.creatorContext,'identity-context'),p(identity.started,'identity-context'),p(identity.introduction));maker.append(makerHeading,makerBody);legacy.append(maker);
 const development=node('section','project-identity');development.setAttribute('aria-labelledby','project-plan-heading');
 const planHeading=node('h2',null,'Development plans');planHeading.id='project-plan-heading';
 const planBody=node('div','identity-body');planBody.append(p('CLAUDE / PLANNED','project-eyebrow'),p(identity.planIntro));
 const plans=node('ol','identity-plan');identity.plans.forEach(([title,text])=>{const item=node('li');item.append(node('h3',null,title),p(text));plans.append(item)});planBody.append(plans);development.append(planHeading,planBody);legacy.append(development);
 const summary=node('section','project-identity project-english');summary.setAttribute('aria-labelledby','project-english-heading');summary.setAttribute('lang','en');
 const summaryHeading=node('h2',null,'Project summary');summaryHeading.id='project-english-heading';summary.append(summaryHeading,p(identity.english,'identity-body'));legacy.append(summary);
 const end=node('div','project-end');end.append(p('Turn a practice conversation into a record you can use to reflect on your questions.'),action('Explore the practice workspace →',()=>navigate('practice'),'primary'));legacy.append(end);page.append(more);main.append(page)
}
