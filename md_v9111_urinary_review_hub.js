/* Med Daddy v9.11.1 — A&P II Urinary review-sheet-only questions.
  Exactly 25 instructor study-review points x 2 distinct questions.
  SOURCES: uploaded A&P Urinary system reveiw.docx + uploaded Urinary
  System, Fluid and Electrolyte Balance and Acid-Base Balance lectures.
  No photographed private mock wording or choices are published here.
  Existing A&P Urinary 260/100 and 150 preserved source mock untouched.
*/
(()=>{'use strict';
if(window.MD_URINARY_REVIEW_111)return;
const a=window.MD_URINARY_REVIEW_111_A,b=window.MD_URINARY_REVIEW_111_B;
const errors=[];
if(a?.length!==25||b?.length!==25)errors.push('Review rows 25+25 missing');
if(typeof start!=='function'||typeof shuffle!=='function')errors.push('Med Daddy quiz engine unavailable');
const reg=window.MD_SAFE_QUESTIONS;
if(!(reg instanceof Map))errors.push('Safe question registry unavailable');
const page=document.getElementById('ap2UrinaryPage'),unit=document.getElementById('ap2UnitThree');
if(!page||!unit)errors.push('Urinary unit/Study Mode home unavailable');
if(errors.length){window.MD_URINARY_REVIEW_111={ready:false,errors};console.error(errors);return;}
const pts=new Map();
for(const rows of [a,b])for(const raw of rows){
 if(raw.length!==7||raw[2]==null||raw[4]?.length!==3||raw[5]?.length!==3)errors.push('Bad review row '+raw?.[0]);
 pts.set(raw[0],(pts.get(raw[0])||0)+1);
}
for(let n=1;n<=25;n++)if(pts.get(n)!==2)errors.push('Instructor review point '+n+' has '+pts.get(n)+' questions');
const names=[
'Nephron: filtration, reabsorption, secretion','Urine composition and abnormal findings','Dietary acid- and base-forming substances',
'Chloride-responsive alkalosis','pH and hydrogen concentration','Sodium lactate / metabolic acidosis teaching',
'Bicarbonate-to-carbonic-acid ratio','Starling capillary forces','Renin–angiotensin–aldosterone',
'Hormonal urine volume control','Water entry and exits','Body water and compartments',
'Glomerular effective filtration pressures','Calculate effective filtration pressure','Acid-base systems and three mechanisms',
'Renal response to acidosis/alkalosis','Blood and filtrate routes','Micturition and urge volume',
'Fixed (nonvolatile) acids and buffering','Renal blood flow and cardiac output',
'Male/female urinary differences','Oedema and fluid movement',
'Urinary system functions','Haemoglobin and chloride shift','Thirst and osmoreceptors'];
const questions=[];
for(const [kind,rows] of [['direct',a],['application',b]])for(const row of rows){
 const [n,prompt,correct,right,wrong,whyWrong,source]=row;
 const id='AP2-URINARY-REVIEW111-'+String(n).padStart(2,'0')+'-'+(kind==='direct'?'A':'B');
 const index=n+(kind==='direct'?1:3),shift=index%4,inputs=[correct,...wrong];
 const choices=inputs.map((_,i)=>inputs[(i+shift)%4]);
 const answer='ABCD'[(4-shift)%4],wrongReasons={};
 choices.forEach((option,i)=>{const original=(i+shift)%4;if(original)wrongReasons['ABCD'[i]]=whyWrong[original-1];});
 questions.push({id,course:'Anatomy & Physiology II',unit:'A&P II Urinary',examSet:'Instructor Review Sheet — 25 Points',
  topic:names[n-1],reviewPoint:n,objective:'Urinary System Review study question '+n,reviewReference:'A&P Urinary system reveiw.docx — Study Q'+n,
  difficulty:kind==='direct'?'Review Identification':'Review Application',
  bloom:kind==='direct'?'Understanding':'Application',
  prompt,choices,answer,explanation:right,whyCorrect:right,whyWrong:wrongReasons,
  source:source+'; A&P Urinary system reveiw.docx — Q'+n,sourceTitle:source.split(' — ')[0],sourceLocator:source,
  questionSource:'Uploaded instructor review only',scorable:true,reviewOnly:true});
}
const ids=new Set(),stems=new Set();
for(const q of questions){
 const normalized=q.prompt.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 if(ids.has(q.id)||stems.has(normalized))errors.push('Duplicated ID/stem '+q.id);
 ids.add(q.id);stems.add(normalized);
 if(!q.prompt||q.choices.length!==4||!['A','B','C','D'].includes(q.answer)||new Set(q.choices.map(v=>v.toLowerCase())).size!==4||!q.whyCorrect||Object.keys(q.whyWrong).length!==3||!q.sourceLocator)errors.push('Malformed question '+q.id);
 if(reg.has(q.id))errors.push('ID collision '+q.id);
 if(typeof mdLeakReason==='function'){const concern=mdLeakReason(q);if(concern)errors.push('Answer leakage '+q.id+': '+concern);}
}
if(questions.length!==50||errors.length){window.MD_URINARY_REVIEW_111={ready:false,errors};console.error('Urinary review source bank blocked',errors);return;}
for(const q of questions)reg.set(q.id,q);
const host=document.createElement('section');host.id='md111-urinary-review';
host.innerHTML=[
'<div class="md111-heading"><div><small>ANATOMY &amp; PHYSIOLOGY II · URINARY</small><h2>Instructor Review · 50 Questions</h2><p><b>Only your uploaded 25-point Urinary System Review</b> and its lecture references. Two questions per study point; no unrelated bank fillers.</p></div><button type="button" data-md111="home">← Study Home</button></div>',
'<div class="md111-buttons">',
'<button class="md111-main" type="button" data-md111="50"><strong>Complete Review · 50</strong><span>All 25 instructor study points, twice each</span></button>',
'<button type="button" data-md111="20"><strong>Last Review · 20</strong><span>Short session</span></button>',
'<button type="button" data-md111="10"><strong>Quick Review · 10</strong><span>Ten mixed review questions</span></button>',
'<button type="button" data-md111="daily"><strong>Missed + New · 20</strong><span>Prioritize missed, then unseen</span></button></div>',
'<div class="md111-pick"><label for="md111-point">Practise a specific instructor review point</label><select id="md111-point"><option value="all">All 25 points</option></select><button type="button" data-md111="point">Start selected · 2</button><button type="button" data-md111="ordered">Original review order · 50</button></div>',
'<details><summary>Source and coverage details</summary><p>This is a focused, standalone subset based on the 25 instructor review-study prompts. It has two different questions per objective, not the five-per-point full Med Daddy expansion yet. The photographed 50-question mock stays private; the original preserved 150-question urinary mock and general urinary banks remain separate.</p><p>Older lecture treatment examples such as sodium lactate and chloride replacement explain A&amp;P, not independently authorized PCP treatment.</p></details>',
'<p id="md111-status" aria-live="polite"></p>'
].join('');
const hero=page.querySelector('.ap2-hero');
if(hero)hero.after(host);else page.prepend(host);
const selector=host.querySelector('#md111-point');
for(let i=1;i<=25;i++){const opt=document.createElement('option');opt.value=String(i);opt.textContent=String(i).padStart(2,'0')+' · '+names[i-1];selector.appendChild(opt);}
const status=host.querySelector('#md111-status');
function history(key){try{const raw=JSON.parse(localStorage.getItem(key)||'[]');return new Set(Array.isArray(raw)?raw:[])}catch{return new Set()}}
function launch(list,length,label,ordered=false){
 if(!list.length){status.textContent='No matching questions in this source.';return;}
 const selected=(ordered?list.slice():shuffle(list.slice())).slice(0,Math.min(length,list.length));
 if(selected.some(q=>reg.get(q.id)?.prompt!==q.prompt)){status.textContent='Review question registry mismatch. Please reopen Med Daddy.';return;}
 const adaptive=document.getElementById('adaptiveNext'),recycle=document.getElementById('recycle');
 if(adaptive)adaptive.checked=false;if(recycle)recycle.checked=false;
 start(selected);
 if(typeof quiz!=='undefined'&&quiz.length!==selected.length){status.textContent='Expected '+selected.length+' questions, got '+quiz.length+'.';return;}
 window.MD_URINARY_REVIEW111_LAST={mode:label,count:selected.length,source:'Instructor Review Sheet'};
}
host.addEventListener('click',e=>{
 const button=e.target.closest('button[data-md111]');if(!button)return;
 const action=button.dataset.md111;
 if(action==='home')return show('studyHub');
 if(action==='ordered')return launch(questions,50,'Original order',true);
 if(action==='point'){const n=Number(selector.value);return launch(n?questions.filter(q=>q.reviewPoint===n):questions,n?2:50,'Review point '+(n||'all'));}
 if(action==='daily'){
  const seen=history('msk_seen_v11'),missed=history('msk_missed_v1');
  const pool=[...shuffle(questions.filter(q=>missed.has(q.id))),...shuffle(questions.filter(q=>!seen.has(q.id)&&!missed.has(q.id)))].slice(0,20);
  return launch(pool,pool.length,'Missed plus new');
 }
 const count=Number(action);if([10,20,50].includes(count))launch(questions,count,'Instructor Review '+count);
});
const actions=unit.querySelector('.md88-actions');
if(actions&&!document.getElementById('md111-open')){
 const button=document.createElement('button');button.id='md111-open';button.type='button';
 button.textContent='Instructor Review Only · 50';
 button.addEventListener('click',()=>{show('ap2UrinaryPage');host.scrollIntoView({block:'start',behavior:'smooth'});});
 actions.appendChild(button);
}
const details=unit.querySelector('summary small');
if(details&&details.textContent&&!details.textContent.includes('review 50'))details.textContent=details.textContent+' · review 50';
const style=document.createElement('style');style.id='md111-style';style.textContent=[
'#md111-urinary-review{margin:18px 0;padding:18px;background:#112338;border:1px solid #376482;border-radius:15px;color:#e9f5ff}',
'#md111-urinary-review *{box-sizing:border-box}',
'.md111-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.md111-heading h2{margin:4px 0 6px}.md111-heading p{margin:6px 0 12px;color:#bdd4e4}',
'.md111-heading small{color:#87c9eb;font-weight:800;letter-spacing:.06em}',
'.md111-buttons{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:14px 0}',
'#md111-urinary-review button{cursor:pointer;border-radius:11px;border:1px solid #588cab;color:#eefbff;background:#1c3d58;padding:14px;text-align:left}',
'#md111-urinary-review button:hover{border-color:#89d9fa;background:#245577}',
'.md111-buttons button{min-height:85px;display:flex;flex-direction:column;gap:7px}',
'.md111-buttons button strong{font-size:1.06rem}.md111-buttons button span{font-size:.86rem;color:#bad7e7}',
'.md111-buttons .md111-main{background:#195472!important;border-color:#74caec!important}',
'.md111-pick{display:flex;flex-wrap:wrap;gap:10px;align-items:center}',
'.md111-pick label{flex-basis:100%}.md111-pick select{max-width:100%;min-height:42px;padding:9px;border-radius:9px;background:#0d1b2b;color:#e9f6ff;border:1px solid #517b99}',
'#md111-urinary-review details{margin-top:16px;padding:10px;border:1px solid #335b77;border-radius:9px}',
'#md111-urinary-review summary{cursor:pointer;font-weight:700}',
'@media(max-width:650px){.md111-buttons{grid-template-columns:1fr}.md111-heading{flex-wrap:wrap}.md111-pick select{width:100%}}'
].join('\n');document.head.appendChild(style);
window.MD_URINARY_REVIEW_111={ready:true,version:'9.11.1',source:'A&P Urinary system reveiw.docx',
 questions,reviewPoints:25,questionsPerPoint:2,sourceOnly:true,preservedMocks:true,
 privatePhotoMockPublished:false,total:questions.length,passed:true};
})();