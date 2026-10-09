import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {identity} from '../../site/identity.mjs';
import {adaptCaseBank} from '../../site/adapter.mjs';
const root=new URL('../../site/',import.meta.url);
const read=name=>fs.readFileSync(new URL(name,root),'utf8');
const html=read('index.html');
const fallback=html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1]||'';
const text=fallback.replace(/<style>[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
test('non-JavaScript article exposes complete real project identity and next-step plan',()=>{
 assert.ok(fallback.includes('<article'));
 for(const key of ['name','creator','creatorContext','started','description','introduction','scope','workflow','planIntro','english','storage'])assert.ok(text.includes(identity[key]),key);
 for(const [heading,body] of identity.plans){assert.ok(text.includes(heading));assert.ok(text.includes(body));}
 assert.ok(fallback.includes('lang="en"'));
 assert.ok(text.includes('JavaScript를 켜 주세요'));
});
test('static baseline counts match bundled actual case bank',()=>{
 const cases=adaptCaseBank(JSON.parse(read('casebank.ko.json')));
 const counts=[cases.length,cases.reduce((s,c)=>s+c.facts.length,0),cases.reduce((s,c)=>s+c.intents.length,0),cases.reduce((s,c)=>s+c.intents.reduce((n,i)=>n+i.expressions.length,0),0)];
 assert.deepEqual(counts,[3,54,36,108]);
});
test('static fallback is inside main and only shown when scripting is disabled',()=>{
 assert.equal((html.match(/<noscript>/g)||[]).length,1);
 assert.ok(html.indexOf('<main ')<html.indexOf('<noscript>'));
 assert.ok(html.indexOf('</noscript>')<html.indexOf('</main>'));
 assert.equal((html.match(/<article/g)||[]).length,1);
 assert.ok(fallback.includes('header nav{display:none}'));
});
test('project metadata describes actual project without fabricated identity fields',()=>{
 const description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
 assert.ok(description.includes(identity.description));assert.ok(description.includes(identity.creator));
 for(const content of [read('identity.mjs'),fallback]){assert.doesNotMatch(content,/mailto:|@gmail|\.com\b|registeredOrganization|application\/ld\+json|사업자등록|임상효과|외부 고객|매출/);}
});
test('identity extension contains no network calls, form controls, storage or unsafe HTML assignment',()=>{
 assert.doesNotMatch(read('identity.mjs'),/fetch\(|XMLHttpRequest|localStorage|innerHTML|<form|<input/);
 assert.doesNotMatch(read('presentation.mjs'),/fetch\(|XMLHttpRequest|localStorage|innerHTML/);
});
