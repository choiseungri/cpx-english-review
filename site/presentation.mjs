import {renderIntroduction,renderDemoIntroduction,renderFoundation} from '../project-front/render.mjs';
import {frontCopy} from '../project-front/copy-ko.mjs';
import {renderGuidedDemo} from '../guided-demo/runtime.mjs';
import {demoData} from './demo-data.mjs';
import {identity} from './identity.mjs';
const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
const p=(text,cls='')=>node('p',cls,text);
const quote=text=>p('“'+text+'”','project-quote');
function action(text,fn,cls='project-link'){const b=node('button',cls,text);b.type='button';b.addEventListener('click',fn);return b}
function question(text){const q=quote('');q.replaceChildren();const key='언제부터';if(text.startsWith(key))q.append(node('span',null,'“'),node('span','question-key',key),node('span',null,text.slice(key.length)+'”'));else q.textContent='“'+text+'”';return q}
export function renderProject(main,{example,counts,navigate,openExample,illustration}){
 const c=example,i=c.intents[0];
 const page=node('div','project-page'),legacy=node('div','front-legacy'),more=node('details','front-technical');
 more.append(node('summary',null,'현재 연습 도구 자세히 살펴보기'),legacy);
 page.append(renderIntroduction(frontCopy,{navigate}),renderDemoIntroduction(frontCopy),renderGuidedDemo(demoData,{showIntro:false}),renderFoundation(frontCopy,{navigate}));
 const opening=node('section','project-opening');opening.setAttribute('aria-label','프로젝트 소개');
 const lead=node('div','project-lead');lead.append(p('하나의 증례, 서로 이어지는 세 가지 시선','project-kicker'));
 const title=node('h2','project-context-title');['증례를 설계하고,','문진을 연습하고,','근거로 복습합니다.'].forEach(t=>title.append(node('span',null,t)));lead.append(title,p('CPX Practice Lab은 증례 작성부터 대화 기록,\n질문과 근거의 비교까지 잇는 문진 연습 프로젝트입니다.','project-summary'));
 const img=illustration();img.className='project-illustration';lead.append(img,action('질문과 근거의 연결 살펴보기 ↓',()=>{document.querySelector('#project-detail').scrollIntoView({behavior:'auto',block:'start'});document.querySelector('#project-detail').focus()}));
 const trail=node('div','project-trail');trail.append(node('span','project-tag','자체 작성 가상 증례'),node('h2','project-case-title','증례 A · 잠들기 어려운 성인'));
 function step(num,en,title){const s=node('section','project-step');const index=node('div','project-step-index');index.append(p('증례 A'),node('span',null,num));const content=node('div','project-step-content');content.append(p(en,'project-eyebrow'),node('h3',null,title));s.append(index,content);trail.append(s);return content}
 let part=step('01','DESIGN','증례를 만드는 사람');part.append(p('환자의 첫마디','project-label'),quote(c.description));
 part=step('02','PRACTICE','대화를 연습하는 사람');part.append(p('학생의 질문','project-label'),question(i.expressions[0]),p('환자의 대답','project-label'),quote(i.response.text));
 part=step('03','REVIEW','근거를 검토하는 사람');part.append(node('h4','project-emphasis',i.label),p('질문에 연결된 환자 발화와 증례의 사실을 함께 돌아봅니다.','project-review-line'));
 opening.append(lead,trail);legacy.append(opening,p('설계의 문장이 대화가 되고, 대화의 기록이 다음 연습으로 이어집니다.','project-divider'));
 const detail=node('section','project-detail');detail.id='project-detail';detail.tabIndex=-1;
 const intro=node('div','detail-intro');intro.append(p('02 / 연결을 살펴보기','project-eyebrow'),node('h2',null,'질문 하나를\n따라가 봅니다.'),p('어떤 증례에서 나온 말인지,\n무엇을 물었는지,\n다시 살펴볼 지점은 무엇인지.'),node('span','project-tag','증례 A · 실제 수록 문답'));
 const spread=node('div','project-spread'),record=node('div','project-record'),evidence=node('aside','project-evidence');
 record.append(node('h3','spread-heading','연습 기록'));
 function row(label,content,cls=''){const r=node('div','project-record-row '+cls);r.append(p(label,'project-label'),content);record.append(r)}
 row('증례의 첫마디',quote(c.description));row('학생 · 질문 01',question(i.expressions[0]),'focused');row('환자',quote(i.response.text));row('학생 · 질문 02',quote(c.intents[1].expressions[0]),'next-question');
 evidence.append(node('h3','spread-heading','함께 보는 근거'),node('span','project-tag','근거 01'),node('h4','project-emphasis',i.label),p('응답 속 인용과 작성된 사실을 나란히 확인합니다.'));
 i.response.evidence.forEach(e=>{const f=c.facts.find(f=>f.id===e.factId);const pair=node('div','project-fact');pair.append(p('“'+e.quote+'”','fact-quote'),p(f.value,'fact-description'));evidence.append(pair)});
 evidence.append(action('이 증례로 연습 ↗',()=>openExample(c.id)));
 spread.append(record,evidence);detail.append(intro,spread);legacy.append(detail);
 const ledger=node('section','project-ledger');ledger.setAttribute('aria-label','확인된 제작 범위');ledger.append(node('h2',null,'제작 기록'));
 const entries=[['01','증례와 응답',`창작 ${counts.cases}증례 · ${counts.facts}개 사실\n${counts.intents}개 질문 의도 · ${counts.expressions}개 표현`,'증례 편집 열기 ↗','editor'],['02','대화와 기록','대화 저장 · 편집본 버전 유지\n기록 JSON 가져오기와 내보내기','기록·안내 열기 ↗','about'],['03','질문과 근거','환자 발화의 인용 근거 연결\n목표를 선택한 같은 버전 재연습','복습 화면 열기 ↗','review']];
 entries.forEach(([n,t,d,label,v])=>{const item=node('div','ledger-entry');item.append(p(n,'ledger-number'),node('h3',null,t),p(d),action(label,()=>navigate(v)));ledger.append(item)});legacy.append(ledger);
 const maker=node('section','project-identity');maker.setAttribute('aria-labelledby','project-maker-heading');
 const makerHeading=node('h2',null,'만드는 사람');makerHeading.id='project-maker-heading';
 const makerBody=node('div','identity-body');makerBody.append(node('h3',null,identity.creator),p(identity.creatorContext,'identity-context'),p(identity.started,'identity-context'),p(identity.introduction));maker.append(makerHeading,makerBody);legacy.append(maker);
 const development=node('section','project-identity');development.setAttribute('aria-labelledby','project-plan-heading');
 const planHeading=node('h2',null,'개발 계획');planHeading.id='project-plan-heading';
 const planBody=node('div','identity-body');planBody.append(p('CLAUDE / PLANNED','project-eyebrow'),p(identity.planIntro));
 const plans=node('ol','identity-plan');identity.plans.forEach(([title,text])=>{const item=node('li');item.append(node('h3',null,title),p(text));plans.append(item)});planBody.append(plans);development.append(planHeading,planBody);legacy.append(development);
 const summary=node('section','project-identity project-english');summary.setAttribute('aria-labelledby','project-english-heading');summary.setAttribute('lang','en');
 const summaryHeading=node('h2',null,'Project summary');summaryHeading.id='project-english-heading';summary.append(summaryHeading,p(identity.english,'identity-body'));legacy.append(summary);
 const end=node('div','project-end');end.append(p('대화만 남기는 연습에서, 질문을 돌아볼 수 있는 기록으로.'),action('연습 화면 살펴보기 →',()=>navigate('practice'),'primary'));legacy.append(end);page.append(more);main.append(page)
}
