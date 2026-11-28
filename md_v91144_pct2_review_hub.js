/* Med Daddy v9.11.44 — Instructor Final Review (uploaded 'PCT 2 Final Reveiw.docx').
   Independent tile inside A&P II navigation *as requested*, accurately labelled PCT II.
   Core 50: exactly one newly authored instructor-standard question per study point 1–50.
   Extended practice reuses existing source-linked PCT II question registry; never
   marks random supplemental questions as exact instructor review item matches.
   Three authentic 4-lead rhythm-image questions in every mixed instructor mock,
   matching the instructor's explicit note. No modifications to other units.
*/
(()=>{'use strict';
if(window.MD_PCT2_INSTRUCTOR_REVIEW_91144)return;
const core=window.MD_PCT2_FINAL_REVIEW_1144||[];
const registry=window.MD_SAFE_QUESTIONS;
const parent=document.getElementById('ap2UrinaryPage');
const anchor=document.getElementById('ap2UnitThree');
const errors=[];
if(!(registry instanceof Map))errors.push('Existing question registry missing');
if(!parent||!anchor)errors.push('A&P II navigation unavailable');
if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')errors.push('Original Med Daddy quiz engine missing');
if(core.length!==50)errors.push('Required instructor review source bank is incomplete');
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const covered=new Map(),seen=new Set(),keys={A:0,B:0,C:0,D:0};
for(const q of core){
 if(!q?.id||seen.has(q.id)||!q.prompt||!q.sourceLocator||q.sourceTitle!=='PCT 2 Final Reveiw.docx'||
 !Number.isInteger(q.reviewPoint)||q.reviewPoint<1||q.reviewPoint>50||
 !Array.isArray(q.choices)||q.choices.length!==4||new Set(q.choices).size!==4||
 !'ABCD'.includes(q.answer)||!q.whyCorrect||
 Object.keys(q.whyWrong||{}).length!==3||q.choices.some((v,i)=>'ABCD'[i]!==q.answer&&!q.whyWrong[v]))
 errors.push('Instructor review question malformed: '+(q?.id||'?'));
 if(covered.has(q.reviewPoint))errors.push('Duplicate objective '+q.reviewPoint);
 if(q.choices?.some(v=>norm(v).length>=7&&norm(q.prompt).includes(norm(v))))errors.push('Question reveals a choice: '+q.id);
 seen.add(q.id);covered.set(q.reviewPoint,q);if(keys[q.answer]!==undefined)keys[q.answer]++;
 if(registry?.has(q.id))errors.push('Question ID collision '+q.id);
}
for(let i=1;i<=50;i++)if(!covered.has(i))errors.push('Missing instructor study question '+i);
if(Math.max(...Object.values(keys))-Math.min(...Object.values(keys))>1)errors.push('Instructor bank answer-key imbalance');
if(errors.length){
 window.MD_PCT2_INSTRUCTOR_REVIEW_91144={ready:false,errors};
 console.error('Instructor review setup blocked',errors);return;
}
core.forEach(q=>registry.set(q.id,q));
if(typeof BANK!=='undefined'&&Array.isArray(BANK))
 core.forEach(q=>{if(!BANK.some(v=>v.id===q.id))BANK.push(q)});
const valid=q=>q?.id&&q?.prompt&&Array.isArray(q.choices)&&q.choices.length===4&&
 /^[ABCD]$/.test(q.answer||'')&&new Set(q.choices.map(norm)).size===4&&
 !!(q.whyCorrect||q.explanation)&&
 !q.id.startsWith('PCT2-FINAL-REVIEW-1144-');
const fromPCT=q=>/patient care|pct\s*ii|pct2|pcp/i.test(q.course||'')||
 /^PCT2-|^ECG-/i.test(q.id||'');
const fromRelevantUnit=q=>{
 const unit=String(q.unit||'').toLowerCase();
 return /environment|endocrine|abdominal|infectious|communicable|ecg|rhythm|symptom relief|pharmacolog|trauma|neuro/i.test(unit)||
 /PCT2-(ENV|ENDO|ABD|INF|ECG|SRD)/i.test(q.id||'');
};
const echo=q=>q.choices.some(v=>norm(v).length>=7&&norm(q.prompt).includes(norm(v)));
const supplementary=[];
const seenStems=new Set(core.map(q=>norm(q.prompt)));
for(const q of registry.values()){
 if(!valid(q)||!fromPCT(q)||!fromRelevantUnit(q)||echo(q))continue;
 const n=norm(q.prompt);
 if(seenStems.has(n))continue;
 seenStems.add(n);supplementary.push(q);
}
const rhythm=Array.isArray(window.MD_ECG_REBUILD_91112?.tracks?.four?.images)?
 window.MD_ECG_REBUILD_91112.tracks.four.images.filter(q=>registry.get(q.id)===q&&q.imageId):
 [...registry.values()].filter(q=>valid(q)&&q.imageId&&/ecg|rhythm/i.test(q.unit||''));
const rhythms=[...new Map(rhythm.map(q=>[q.id,q])).values()].filter(q=>registry.has(q.id));
// Select related source questions from categories explicitly covered in review.
const classifiers=[
 {id:'environment',label:'Environmental / Burns',rx:/heat|cold|hypothermi|hyperthermi|frostbite|burn|altitude|decompression|snake|bite/i},
 {id:'endocrine',label:'Endocrine / Blood Glucose',rx:/diabet|glucos|insulin|hypogly|hypergly|adrenal|cortisol|thyroid|cushing|addison/i},
 {id:'abdominal',label:'Abdominal / GI',rx:/abdom|gastro|bowel|intestin|liver|varice|splen|periton|esophag|hemorrhag|pancreat/i},
 {id:'infectious',label:'Infectious Disease',rx:/infect|disease|hepatit|measl|mumps|rubella|varicella|rabies|sti|syphilis|gonorrh|hiv|west nile|pertussis|mrsa/i},
 {id:'neuro',label:'Neurology / Stroke / Trauma',rx:/stroke|cva|intracranial|neuro|spinal|brain|shock|head|pupil|seizure|parkinson|concussion|posturing/i},
 {id:'pharmacology',label:'Medication / Toxicology',rx:/opioid|opiate|overdose|toxic|poison|medicat|drug|atropine|epinephrine|glucagon|directive|organophosph/i}
];
const groups=Object.fromEntries(classifiers.map(g=>[g.id,[]]));
for(const q of supplementary){
 const phrase=[q.unit,q.topic,q.prompt].join(' ');
 const group=classifiers.find(g=>g.rx.test(phrase));
 if(group)groups[group.id].push(q);
}
function reinforce(n,exclude){
 const chosen=[],used=new Set(exclude.map(q=>q.id)),usedStems=new Set(exclude.map(q=>norm(q.prompt)));
 const sourceGroups=classifiers.map(g=>shuffle(groups[g.id].slice()));
 let rounds=0;
 while(chosen.length<n&&rounds<Math.max(...sourceGroups.map(x=>x.length),0)){
  for(const bucket of sourceGroups){
   while(bucket.length){const q=bucket.shift();
    if(used.has(q.id)||usedStems.has(norm(q.prompt)))continue;
    used.add(q.id);usedStems.add(norm(q.prompt));chosen.push(q);break;}
   if(chosen.length===n)break;
  }
  rounds++;
 }
 return chosen;
}
const page=document.createElement('section');page.id='pct2InstructorFinalReviewPage';page.style.display='none';
page.innerHTML=
 '<section class="md-pct2-inst-panel"><header class="md-pct2-inst-head"><div><small>INSTRUCTOR REVIEW · PATIENT CARE &amp; THEORY II</small><h1>Final Review — 50 Study Questions</h1>'+
 '<p>Built around the exact 50 numbered prompts in your uploaded Final Review Sheet. Shown independently under the A&amp;P II menu as requested, while retaining its correct PCT II designation.</p></div>'+
 '<button type="button" id="md-pct2-inst-home">Study Home</button></header>'+
 '<div class="md-pct2-inst-tiles">'+
 '<button type="button" data-inst-mode="core"><span>📝</span><strong>Instructor Review 50</strong><small>All 50 numbered study points, one individually written question per point</small></button>'+
 '<button type="button" data-inst-mode="rhythm"><span>🫀</span><strong>Instructor Mock 50 + 3 Rhythms</strong><small>47 rotating review questions + 3 authentic 4-lead rhythm questions</small></button>'+
 '<button type="button" data-inst-mode="reinforcement"><span>🔥</span><strong>Extended Mixed Practice 100</strong><small>50 instructor-review questions + 3 rhythms + 47 source-bank reinforcements</small></button>'+
 '<button type="button" data-inst-mode="extra"><span>📚</span><strong>Additional PCT II Review 50</strong><small>Original source-linked Med Daddy questions for more practice</small></button>'+
 '</div>'+
 '<div class="md-pct2-inst-coverage"><strong>Instructor guide:</strong> 50/50 numbered review points covered. <strong>Rhythm note:</strong> instructor specifies 3 rhythm interpretation questions. <strong>Key Words:</strong> broader terminology in the sheet is not claimed as individually covered by the 50-point deck.</div>'+
 '<p class="md-pct2-inst-status" role="status" aria-live="polite" id="md-pct2-inst-status"></p>'+
 '<details><summary>Source fidelity and scope</summary><p>Uploaded PCT 2 Final Reveiw.docx contains a list of prompts and key terms, not an answer key. The 50 newly written answers are educationally reasoned and require current PCS or instructor confirmation for treatment details. No numerical PCS dose, discharge or bypass criteria were invented from the review alone.</p>'+
 '<p>Additional practice uses already-registered PCT II source questions and is not falsely labelled as five questions per instructor objective. The three ECG rhythm interpretations are pulled from the existing ECG academy and require source-image availability.</p></details>'+
 '</section>';
parent.prepend(page);
const card=document.createElement('div');card.id='md-pct2-inst-card';card.innerHTML=
 '<div><strong>📝 PCT II — Instructor Final Review</strong><small>50 study points · 3 lead-rhythm interpretations · independent instructor-review unit</small></div>'+
 '<button type="button" id="md-pct2-inst-open">Open Instructor Review</button>';
anchor.after(card);
function hide(){parent.classList.remove('md-pct2-inst-visible');page.style.display='none';show('studyHub');}
function open(){
 parent.classList.remove('md-endo-unit-visible','md-lymph-unit-visible','md-repro-unit-visible');
 for(const id of ['ap2EndocrinePage','ap2LymphPage','ap2ReproductivePage']){const other=document.getElementById(id);if(other)other.style.display='none';}
 show('ap2UrinaryPage');parent.classList.add('md-pct2-inst-visible');page.style.display='block';
 refresh();page.scrollIntoView?.({block:'start'});
}
card.querySelector('#md-pct2-inst-open').onclick=open;
page.querySelector('#md-pct2-inst-home').onclick=hide;
const status=page.querySelector('#md-pct2-inst-status');
let run=0;
function make(mode){
 if(mode==='core')return shuffle(core.slice());
 if(mode==='rhythm'){
  if(rhythms.length<3)return {error:'Three authentic, registered ECG rhythm-image questions are not available. This mock is disabled.'};
  return shuffle([...shuffle(core.slice()).slice(0,47),...shuffle(rhythms.slice()).slice(0,3)]);
 }
 if(mode==='extra'){
  const q=reinforce(50,[]);
  if(q.length!==50)return {error:'Fewer than 50 eligible source-linked reinforcement questions are available.'};
  return shuffle(q);
 }
 if(mode==='reinforcement'){
  if(rhythms.length<3)return {error:'Cannot assemble expanded review: three authentic rhythm-image questions are unavailable.'};
  const first=[...core,...shuffle(rhythms.slice()).slice(0,3)];
  const extra=reinforce(47,first);
  if(extra.length!==47)return {error:'Not enough distinct source-bank reinforcement questions for a 100-question session.'};
  return shuffle([...first,...extra]);
 }
 return {error:'Unrecognized training tile'};
}
function refresh(){
 const extra=reinforce(50,[]);
 for(const btn of page.querySelectorAll('[data-inst-mode]')){
  btn.disabled=(btn.dataset.instMode==='rhythm'||btn.dataset.instMode==='reinforcement')&&rhythms.length<3||
    (btn.dataset.instMode==='extra'&&extra.length<50)||
    (btn.dataset.instMode==='reinforcement'&&reinforce(47,[...core,...rhythms.slice(0,3)]).length<47);
 }
 status.textContent='Instructor study points: 50/50 · ECG image rhythm questions: '+rhythms.length+
  ' · qualifying additional source questions: '+supplementary.length+
  '. Tiles requiring missing sources are disabled rather than silently replacing them.';
}
for(const btn of page.querySelectorAll('[data-inst-mode]'))btn.onclick=()=>{
 const session=make(btn.dataset.instMode);
 if(!Array.isArray(session)){status.textContent=session?.error||'No eligible session';return;}
 const counts=new Set(session.map(q=>q.id)),stems=new Set(session.map(q=>norm(q.prompt)));
 if(counts.size!==session.length||stems.size!==session.length||session.some(q=>registry.get(q.id)!==q)){
  status.textContent='Question identity or duplication audit blocked the session. Your progress remains unchanged.';return;
 }
 const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
 if(recycle)recycle.checked=false;if(adaptive)adaptive.checked=false;
 run++;parent.classList.remove('md-pct2-inst-visible');page.style.display='none';
 start(session);
 if(typeof quiz!=='undefined'&&quiz.length!==session.length)console.warn('Instructor final review started '+session.length+' but core engine shows '+quiz.length);
};
const css=document.createElement('style');css.id='md-pct2-inst-style';
css.textContent=
'#ap2UrinaryPage.md-pct2-inst-visible > :not(#pct2InstructorFinalReviewPage){display:none!important}'+
'#md-pct2-inst-card{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin:15px 0;padding:18px;border:1px solid #3e7898;background:#10263c;color:#eff8ff;border-radius:13px}'+
'#md-pct2-inst-card strong{display:block;font-size:1.1rem}#md-pct2-inst-card small{display:block;opacity:.86;margin-top:7px}#md-pct2-inst-card button{min-height:44px;font-weight:700;padding:10px 16px}'+
'#pct2InstructorFinalReviewPage{padding:14px 8px;color:#ecf7ff}#pct2InstructorFinalReviewPage .md-pct2-inst-panel{max-width:1100px;margin:0 auto;background:#10263c;border:1px solid #477d95;border-radius:16px;padding:24px}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap}'+
'#pct2InstructorFinalReviewPage h1{font-size:1.85rem;margin:9px 0}#pct2InstructorFinalReviewPage p{line-height:1.5}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:22px 0}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button{min-height:130px;border:1px solid #4b8b9f;background:#153a4b;color:#f3fcff;border-radius:13px;display:flex;flex-direction:column;text-align:left;align-items:flex-start;gap:8px;padding:18px;cursor:pointer;font:inherit}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button:hover{background:#205568;border-color:#87d4d0}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button:disabled{opacity:.45;cursor:not-allowed}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button span{font-size:1.4rem}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button small{opacity:.89;line-height:1.4}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button strong{font-size:1.08rem}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-coverage{padding:13px;background:#0c3042;border-radius:9px;line-height:1.65}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-status{padding:12px;color:#c9e6f4;background:#081e2d;border-radius:8px;margin:17px 0}'+
'#pct2InstructorFinalReviewPage details{font-size:.9rem}#pct2InstructorFinalReviewPage details summary{font-weight:700;cursor:pointer}'+
'@media(max-width:700px){#pct2InstructorFinalReviewPage .md-pct2-inst-tiles{grid-template-columns:1fr}#pct2InstructorFinalReviewPage .md-pct2-inst-panel{padding:15px}}';
document.head.appendChild(css);
refresh();
window.MD_PCT2_INSTRUCTOR_REVIEW_91144={ready:true,version:'9.11.44',placement:'A&P II navigation; correctly classified PCT II instructor review',coreCount:core.length,reviewCoverage:covered.size,answerKeys:keys,ecgRhythmImages:rhythms.length,sourceSupplementCount:supplementary.length,open,build:make,errors:[]};
})();