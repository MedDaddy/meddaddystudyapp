/* Med Daddy v9.9.2 — PCT II Abdominal study hub.
   UI-only; original 80 questions and all previous progress, answers and keys remain intact. */
(()=>{'use strict';
if(window.MD_PATCH_992)return;
const page=document.getElementById('md990-abdo-page'),questions=window.MD_PCT2_ABDO_990;
const row=document.getElementById('pct2UnitSix');
if(!page||!Array.isArray(questions)||questions.length!==80||!window.MD_PATCH_990?.ready){
 window.MD_PATCH_992={version:'9.9.2',ready:false};console.error('Abdominal study hub: bank prerequisite missing');return;
}
const $=(q)=>page.querySelector(q);
const historySet=(key)=>{try{const a=JSON.parse(localStorage.getItem(key)||'[]');return new Set(Array.isArray(a)?a:[])}catch{return new Set()}};
const freshStats=()=>{const seen=historySet('msk_seen_v11'),missed=historySet('msk_missed_v1');return {seen:questions.filter(q=>seen.has(q.id)).length,missed:questions.filter(q=>missed.has(q.id)).length,unseen:questions.filter(q=>!seen.has(q.id)).length}};
const decisions=new Set(['GI bleeding & shock','Trauma red flags','Pelvic injury & shock','Evisceration & impalement','AAA & high-risk assessment','Medication & eligibility','GI red flags & assessment']);
page.classList.add('md992-page');
page.innerHTML=[
'<div class="md992-hub">',
'<header class="md992-head"><div><small>PATIENT CARE & THEORY II · UNIT 6</small><h1>Abdominal Emergencies</h1><p>One study hub for Chapter 27 trauma and Chapter 34 GI emergencies.</p></div><div class="md992-tools"><button data-action="guide">Study map</button><button data-action="back">← PCT II units</button></div></header>',
'<section class="md992-main">',
'<button class="md992-primary" data-action="exam"><small>RECOMMENDED · STANDARD PRACTICE</small><strong>Practice Exam · 50 questions</strong><span>A balanced practice session from your 80-question bank</span></button>',
'<button class="md992-card" data-action="daily"><strong>Daily Review · up to 20</strong><span>Previously missed questions, then entirely new questions</span></button>',
'<button class="md992-card" data-action="full"><strong>Full Bank · 80</strong><span>All original Abdominal questions and full explanations</span></button>',
'<button class="md992-card" data-action="quick"><strong>Quick Review · 10</strong><span>Short instructor-style practice session</span></button>',
'</section>',
'<section class="md992-browser"><h2>Choose a specific source</h2><p>Target a chapter, PCP clinical decisions or a concept you need to review.</p>',
'<div class="md992-controls"><label>Question source<select id="md992-source"><option value="all">Full Abdominal bank</option><option value="trauma">Chapter 27 · Trauma</option><option value="GI">Chapter 34 · GI</option><option value="decisions">PCP management decisions</option><option value="topic">Individual topic</option></select></label>',
'<label>Questions per session<select id="md992-size"><option value="10">10 · quick</option><option value="20">20 · study</option><option value="30">30 · practice</option><option value="50" selected>50 · standard</option><option value="all">All available</option></select></label>',
'<button class="md992-start" data-action="source">Start selected set →</button></div>',
'<label id="md992-topic-wrap" hidden>Topic<select id="md992-topic"></select></label>',
'<p id="md992-info" role="status" aria-live="polite"></p><p id="md992-warning" role="alert" hidden></p></section>',
'<details class="md992-details" id="md992-guide"><summary>Abdominal study & recognition map <span>High-yield themes from your lectures and review sheets</span></summary>',
'<div class="md992-map">',
'<article><h3>GI bleeding & shock</h3><p>Upper versus lower bleeding; variceal risks; Mallory–Weiss presentations; airway, perfusion and reassessment.</p></article>',
'<article><h3>Abdominal pain patterns</h3><p>Visceral, referred and parietal pain; guarding, rigidity and evolving peritoneal irritation.</p></article>',
'<article><h3>Medical differentials</h3><p>Appendicitis, biliary disease, pancreatitis, bowel obstruction, hernia and possible AAA.</p></article>',
'<article><h3>Abdominal & pelvic trauma</h3><p>Solid versus hollow organ injury; concealed hemorrhage; evisceration, impalement and pelvic injury.</p></article>',
'<article><h3>PCP clinical decisions</h3><p>Shock recognition, airway considerations, scene time, transport priority and BLS/ALS medication eligibility.</p></article>',
'</div><p class="md992-fine">Review map only. Use your uploaded slides and Ontario BLS PCS v3.4 / ALS PCS v5.4 for exact requirements.</p></details>',
'<details class="md992-details"><summary>Sources, mock status & verification limits <span>Detailed references and outstanding audit work</span></summary>',
'<p>Chapter 27 Abdominal Injuries (54 slides), Chapter 34 GI Emergencies (117 slides), instructor 20-point review, expanded 51-point review, and seven-page study guide. Individual questions include slide and directive references where applicable.</p>',
'<p>The submitted 120-question mock remains preserved but unscored pending full key verification. The 80-question bank has not completed five-questions-per-review-point coverage.</p></details>',
'<p class="md992-progress" id="md992-progress"></p></div>'
].join('');
const source=$('#md992-source'),size=$('#md992-size'),topic=$('#md992-topic'),topicWrap=$('#md992-topic-wrap');
for(const t of [...new Set(questions.map(q=>q.topic))].sort())topic.add(new Option(t+' · '+questions.filter(q=>q.topic===t).length,t));
function selectPool(){
 if(source.value==='trauma')return questions.filter(q=>q.sourceLocator.includes('Chapter 27')||['Trauma red flags','Pelvic injury & shock'].includes(q.topic));
 if(source.value==='GI')return questions.filter(q=>q.sourceLocator.includes('Chapter 34'));
 if(source.value==='decisions')return questions.filter(q=>decisions.has(q.topic));
 if(source.value==='topic')return questions.filter(q=>q.topic===topic.value);
 return questions;
}
function showWarning(message){const e=$('#md992-warning');e.textContent=message;e.hidden=false;}
function refresh(){
 topicWrap.hidden=source.value!=='topic';
 const available=selectPool().length;
 const count=size.value==='all'?available:Math.min(Number(size.value),available);
 $('#md992-info').textContent=available+' questions available · '+count+' in selected session.';
 const stats=freshStats();
 $('#md992-progress').textContent='Abdominal progress on this device: '+stats.seen+'/80 seen · '+stats.missed+' outstanding missed · '+stats.unseen+' never seen.';
 $('#md992-warning').hidden=true;
}
source.addEventListener('change',refresh);size.addEventListener('change',refresh);topic.addEventListener('change',refresh);refresh();
function startSelected(items,label){
 if(!items.length){showWarning('No missed or unseen Abdominal questions remain. Choose Full Bank or another source.');return false;}
 if(!(window.MD_SAFE_QUESTIONS instanceof Map)||items.some(q=>window.MD_SAFE_QUESTIONS.get(q.id)?.prompt!==q.prompt)){
   showWarning('Question safety registry mismatch. Reload the app before starting.');return false;
 }
 try{
   const adaptive=document.getElementById('adaptiveNext'),recycle=document.getElementById('recycle');
   if(adaptive)adaptive.checked=false;if(recycle)recycle.checked=false;
   start(items);
   if(typeof quiz==='undefined'||quiz.length!==items.length){alert('Abdominal session count mismatch; please report this error.');return false;}
   window.MD_ABDO_992_LAST={label,expected:items.length,actual:quiz.length};return true;
 }catch(e){console.error(e);alert('Abdominal launcher could not start: '+e.message);return false;}
}
function daily(){
 const missed=historySet('msk_missed_v1'),seen=historySet('msk_seen_v11');
 return startSelected(shuffle(questions.filter(q=>missed.has(q.id))).concat(shuffle(questions.filter(q=>!seen.has(q.id)&&!missed.has(q.id)))).slice(0,20),'Daily · missed then unseen');
}
page.addEventListener('click',event=>{
 const b=event.target.closest('[data-action]');if(!b)return;
 const act=b.dataset.action;
 if(act==='guide'){$('#md992-guide').open=true;$('#md992-guide').scrollIntoView({block:'start',behavior:'smooth'});return;}
 if(act==='back'){if(typeof showStudyHub==='function')showStudyHub();if(typeof openCourseTile==='function')openCourseTile('pct2');return;}
 if(act==='daily')return daily();
 if(act==='quick'||act==='exam'||act==='full')return window.launchPCTAbdo990(act==='quick'?10:act==='exam'?50:'all');
 if(act==='source'){
  const pool=shuffle(selectPool().slice());
  return startSelected(pool.slice(0,size.value==='all'?pool.length:Math.min(Number(size.value),pool.length)),source.options[source.selectedIndex].text);
 }
});
if(row){
 const buttons=row.querySelector('.md88-actions');
 if(buttons){buttons.innerHTML='<button type="button" data-abdo-open>Open Abdominal study hub</button><button type="button" data-abdo-50>Practice Exam · 50</button>';
 buttons.querySelector('[data-abdo-open]').addEventListener('click',()=>window.showPCTAbdo990());
 buttons.querySelector('[data-abdo-50]').addEventListener('click',()=>window.launchPCTAbdo990(50));}
 const small=row.querySelector('summary small');if(small)small.textContent='Chapters 27 + 34 · 80 questions · aligned study dashboard';
 const badge=row.querySelector('summary .pill');if(badge)badge.textContent='UPDATED';
}
const oldShow=window.showPCTAbdo990;
window.showPCTAbdo990=()=>{if(typeof oldShow==='function')oldShow();else show('md990-abdo-page');refresh();};
const style=document.createElement('style');style.id='md992-abdo-style';
style.textContent=[
'#md990-abdo-page.md992-page{max-width:1300px;margin:auto;padding:clamp(12px,2vw,24px);color:#eaf3ff}',
'.md992-hub{background:#0c1929;border:1px solid #335972;border-radius:22px;padding:clamp(15px,2.5vw,28px)}',
'.md992-hub button{font-family:inherit;cursor:pointer;text-align:left;white-space:normal}',
'.md992-hub h1{font-size:clamp(1.65rem,3vw,2.3rem);color:white;margin:4px 0 7px}',
'.md992-hub h2{font-size:1.12rem;margin:0 0 7px;color:#eaf3ff}',
'.md992-hub h3{font-size:1rem;margin:0 0 5px}',
'.md992-hub p{margin:0;line-height:1.52;color:#b7c9dc}',
'.md992-head{display:flex;gap:15px;justify-content:space-between;align-items:flex-start;margin-bottom:20px}',
'.md992-head small,.md992-primary small{display:block;color:#7dd3fc;font-size:.75rem;font-weight:800;letter-spacing:.08em}',
'.md992-tools{display:flex;gap:8px;flex-wrap:wrap}',
'.md992-tools button{background:#173650;color:#e4f2ff;border:1px solid #4e7995;border-radius:10px;padding:10px 12px;font-size:.9rem}',
'.md992-main{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:20px}',
'.md992-main button{display:flex;flex-direction:column;gap:7px;justify-content:center;min-height:103px;padding:17px;border-radius:13px;background:#17293e;border:1px solid #476481;color:#f1f7ff}',
'.md992-main button strong{font-size:1.08rem}',
'.md992-main button span{color:#bfd3e4;font-size:.85rem;line-height:1.35}',
'.md992-main button.md992-primary{grid-column:1/-1;min-height:114px;border:2px solid #7dd3fc;background:linear-gradient(110deg,#0d608a,#16416b)}',
'.md992-main button.md992-primary strong{font-size:1.48rem}',
'.md992-main button.md992-primary small{color:#e2f8ff}',
'.md992-browser{background:#102237;border:1px solid #386987;border-radius:15px;padding:17px}',
'.md992-controls{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr) auto;gap:12px;margin-top:14px;align-items:end}',
'.md992-controls label,#md992-topic-wrap{display:flex;flex-direction:column;gap:7px;color:#cfe4f4;font-size:.85rem;font-weight:700}',
'.md992-controls select,#md992-topic-wrap select{min-width:0;width:100%;padding:12px;border-radius:10px;background:#071828;color:#f3fbff;border:1px solid #5686a5;font:inherit}',
'.md992-hub .md992-start{min-height:46px;margin:0;background:#38bdf8;color:#001a2a;font-weight:800;border-radius:10px;text-align:center;padding:10px 15px}',
'#md992-topic-wrap{margin-top:13px}#md992-topic-wrap[hidden],#md992-warning[hidden]{display:none}',
'#md992-info,.md992-progress{font-size:.88rem;color:#bee5fa;margin-top:11px}',
'#md992-warning{margin-top:10px;color:#ffe9c7;border:1px solid #ab8651;border-radius:9px;padding:10px;background:#2c261c}',
'.md992-details{background:#15263a;border:1px solid #36536e;border-radius:12px;margin-top:12px;padding:12px 16px}',
'.md992-details summary{cursor:pointer;color:#e3f2ff;font-weight:800}',
'.md992-details summary span{display:block;color:#bed2e3;font-size:.82rem;font-weight:400;margin-top:3px}',
'.md992-details>p{margin-top:12px;font-size:.88rem}',
'.md992-map{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px}',
'.md992-map article{border:1px solid #31516b;background:#102237;border-radius:10px;padding:12px}',
'.md992-map p,.md992-details .md992-fine{font-size:.86rem}',
'.md992-main button:hover,.md992-start:hover{filter:brightness(1.1)}',
'@media(max-width:800px){.md992-main,.md992-controls{grid-template-columns:1fr 1fr}.md992-main button.md992-primary,.md992-start{grid-column:1/-1}}',
'@media(max-width:540px){.md992-head{flex-direction:column}.md992-main,.md992-controls,.md992-map{grid-template-columns:1fr}.md992-start{grid-column:auto}.md992-main button{min-height:85px}}'
].join('\n');document.head.append(style);
const version=document.querySelector('#appVersion,.app-version,[data-app-version]');
if(version)version.textContent=version.textContent.replace(/9\.9\.[01]/g,'9.9.2');
for(const el of document.querySelectorAll('span'))if(/^v9\.9\.[01]$/.test(el.textContent.trim()))el.textContent='v9.9.2';
document.title=document.title.replace(/v9\.9\.[01]/g,'v9.9.2');
window.MD_PATCH_992={version:'9.9.2',ready:true,bankSize:80,unchangedBank:true,mockScorable:0,dailyMode:'missed-then-unseen'};
})();