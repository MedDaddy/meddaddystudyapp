/* Med Daddy v9.11.43 — PCT II Comprehensive Final Exam.
 * Uses only existing instructor/course-linked PCT II source banks already registered
 * and validated by Med Daddy. Never invents new medical directive advice.
 * Six sections are strictly represented in equal quotas for 60/120/180; the 50
 * rotates two extra slots so no single unit permanently receives more weight.
 * Preserves the original quiz, question IDs, rationales, memory hooks and progress.
 */
(()=>{'use strict';
if(window.MD_PCT2_FINAL_91143)return;
const parent=document.getElementById('pct2InfectiousPage');
const anchor=document.getElementById('pct2UnitSix');
const registry=window.MD_SAFE_QUESTIONS;
const errors=[];
if(!parent||!anchor)errors.push('The existing PCT II study menu is unavailable');
if(!(registry instanceof Map))errors.push('The Med Daddy safe-question registry is unavailable');
if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')
 errors.push('The existing Med Daddy study engine is unavailable');

const units=[
 {id:'environment',name:'Environmental Emergencies',icon:'🌡️',short:'Environmental',test:/environment|hypothermia|hyperthermia/i},
 {id:'endocrine',name:'Endocrine Emergencies',icon:'🩸',short:'Endocrine',test:/endocrine/i},
 {id:'abdominal',name:'Abdominal Emergencies',icon:'🩺',short:'Abdominal',test:/abdominal|gastrointestinal|genitourinary.emergenc/i},
 {id:'infectious',name:'Infectious Diseases',icon:'🦠',short:'Infectious',test:/infectious|communicable/i},
 {id:'ecg',name:'ECG Interpretation',icon:'🫀',short:'ECG',test:/electrocardio|ecg|rhythm.interpretation/i},
 {id:'srd',name:'Symptom Relief Drugs / Pharmacology',icon:'💊',short:'SRDs',test:/symptom.relief|pharmacolog|medication.directives/i}
];
const unitMap=Object.fromEntries(units.map(u=>[u.id,u]));
const normal=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const normalizedStem=q=>normal(q.prompt);
const valid=q=>q&&typeof q.id==='string'&&typeof q.prompt==='string'&&q.prompt.length>25&&Array.isArray(q.choices)&&q.choices.length===4&&
 /^[ABCD]$/.test(q.answer||'')&&new Set(q.choices.map(normal)).size===4&&typeof (q.whyCorrect||q.explanation)==='string'&&
 (q.whyCorrect||q.explanation).length>15;
function pct2(q){
 if(/^AP2-|^AP-|^PSYCH-|^PCT2-AP/i.test(q.id||''))return false;
 const course=String(q.course||'');
 if(/anatomy|physiology|psych/i.test(course))return false;
 if(/patient care|pct\s*ii|pct\s*2|pct2|pcp/i.test(course))return true;
 if(/^(PCT2|PCT-II|PCT-2|PCT_|ECG-)/i.test(q.id||''))return true;
 return /environment|endocrine|abdominal|infectious|communicable|ecg/i.test(String(q.unit||''))&&
    !/anatomy|physiology/i.test(String(q.unit||''));
}
function classify(q){
 const id=q.id||'', unit=String(q.unit||''), short=unit+' '+id;
 if(/PCT2-SRD|PCT2-SR-|^SRD-/i.test(id)||/symptom.relief|pharmacolog|medication.directive/i.test(unit))return 'srd';
 if(/PCT2-INF|infectious|communicable/i.test(short))return 'infectious';
 if(/PCT2-ECG|ECG-|electrocardio|ecg|rhythm.interpretation/i.test(short))return 'ecg';
 if(/PCT2-ENV|environment|hypothermia|hyperthermia/i.test(short))return 'environment';
 if(/PCT2-ENDO|endocrine/i.test(short))return 'endocrine';
 if(/PCT2-ABD|abdominal|gastrointestinal.emergenc|genitourinary.emergenc/i.test(short))return 'abdominal';
 return null;
}
const all=registry instanceof Map?[...registry.values()].filter(q=>valid(q)&&pct2(q)):[];
const byUnit=Object.fromEntries(units.map(u=>[u.id,[]]));
const seen=new Set(),stemOrigin=new Map();
for(const q of all){
 const category=classify(q);
 if(!category||seen.has(q.id))continue;
 seen.add(q.id);
 const stem=normalizedStem(q);
 // Avoid repeated stems and direct options quoted back verbatim in the question.
 if(q.choices.some(choice=>{const v=normal(choice);return v.length>=7&&stem.includes(v)}))continue;
 if(stemOrigin.has(stem)&&stemOrigin.get(stem)!==category)continue;
 stemOrigin.set(stem,category);
 byUnit[category].push(q);
}
function score(q){
 const type=String(q.bankType||'');
 let s=0;
 if(q.sourceLocator||q.source||q.reviewReference)s+=6;
 if(q.whyCorrect&&q.whyCorrect.length>=35)s+=4;
 if(q.whyWrong&&Object.keys(q.whyWrong).length===3)s+=3;
 if(/high|instructor|directive|review|source/i.test(String(q.difficulty||'')+' '+type))s+=3;
 if(q.reviewPointIds?.length||q.slideReferences?.length||q.objective)s+=2;
 if(/mock.original|preserved.mock/i.test(type))s-=2;
 return s;
}
const pools={};
for(const u of units){
 const pool=byUnit[u.id].slice().sort((a,b)=>score(b)-score(a));
 const unique=[],stems=new Set();
 for(const q of pool){const stem=normalizedStem(q);if(stems.has(stem))continue;stems.add(stem);unique.push(q);}
 pools[u.id]=unique;
}
const available=Object.fromEntries(units.map(u=>[u.id,pools[u.id].length]));
const minimum=Math.min(...Object.values(available));
const maxFull=Math.floor(minimum/10)*60;
const modes=[
 {id:'mock50',title:'Instructor Mock 50',icon:'🎯',desc:'50 questions · 8 per unit + 2 rotating extras',count:50,min:9},
 {id:'even60',title:'Perfectly Balanced 60',icon:'⚖️',desc:'60 questions · exactly 10 from each unit',count:60,min:10},
 {id:'extended120',title:'Full Final 120',icon:'🏆',desc:'120 questions · exactly 20 from each unit',count:120,min:20},
 {id:'marathon180',title:'Final Marathon 180',icon:'🔥',desc:'180 questions · exactly 30 from each unit',count:180,min:30}
];
if(errors.length){
 window.MD_PCT2_FINAL_91143={ready:false,errors,available};
 console.error('PCT II Final could not initialize',errors);
 return;
}
const page=document.createElement('section');page.id='pct2FinalExamPage';page.style.display='none';page.className='md-pct-final-contained';
const card=document.createElement('div');card.id='md-pct2-final-card';card.className='md-pct2-final-card';
card.innerHTML='<div><strong>🏆 PCT II — Comprehensive Final Exam</strong><small>Environmental · Endocrine · Abdominal · Infectious · ECG · SRDs · balanced mocks</small></div>'+
 '<button type="button" id="md-pct2-final-open">Open Final Exam Unit</button>';
anchor.after(card);
page.innerHTML=
 '<section class="md-pct-final-panel">'+
 '<div class="md-pct-final-head"><div><small>PATIENT CARE &amp; THEORY II · FINAL EXAM PREPARATION</small><h1>PCT II — Comprehensive Final</h1>'+
 '<p>Six source-linked course units. Every exam draws its prescribed quota from each unit, never from one oversized random bank.</p></div>'+
 '<button type="button" id="md-pct-final-back">Study Home</button></div>'+
 '<div class="md-pct-final-grid" id="md-pct-final-tiles">'+modes.map(mode=>
 '<button type="button" class="md-pct-final-tile" data-pct-final-mode="'+mode.id+'">'+
 '<span class="md-pct-final-icon">'+mode.icon+'</span><strong>'+mode.title+'</strong><small>'+mode.desc+'</small></button>').join('')+'</div>'+
 '<h2>Exam distribution</h2><div class="md-pct-final-breakdown">'+units.map(u=>
 '<div class="md-pct-final-unit"><span>'+u.icon+' '+u.name+'</span><strong data-pct-final-count="'+u.id+'">—</strong></div>').join('')+'</div>'+
 '<p id="md-pct-final-status" class="md-pct-final-status" role="status" aria-live="polite"></p>'+
 '<details><summary>Source selection and quality controls</summary><p>Draws from the original safe, already-loaded Med Daddy PCT II banks and source-linked lecture/review/directive questions. Original question IDs, answer rationales, images (when supported by the core engine) and user progress are preserved. No new clinical dosing instructions or unsourced questions are inserted.</p>'+
 '<p>Selection checks the answer key, distinct choices, repeated stems and answer-option echoes, favours questions with cited slide/review sources and substantive explanations, and enforces unit quotas before starting. The 50-question version cannot mathematically give six units identical whole-number counts; the two additional slots rotate between units across sessions.</p>'+
 '<p>These are mixed finals drawn from existing banks, not a claim that every legacy source question has undergone new manual clinical verification. When a unit lacks enough qualifying questions, the affected mock is blocked instead of silently changing the distribution.</p></details>'+
 '</section>';
parent.prepend(page);
function close(){parent.classList.remove('md-pct-final-visible');page.style.display='none';show('studyHub');}
function open(){parent.classList.remove('md-srd-visible');show('pct2InfectiousPage');parent.classList.add('md-pct-final-visible');page.style.display='block';render();page.scrollIntoView?.({block:'start'});}
card.querySelector('#md-pct2-final-open').onclick=open;
page.querySelector('#md-pct-final-back').onclick=close;
const status=page.querySelector('#md-pct-final-status'),tileButtons=[...page.querySelectorAll('[data-pct-final-mode]')];
let session=0;
function quotas(mode){
 const sizes=Object.fromEntries(units.map(u=>[u.id,mode.count===50?8:mode.count/6]));
 if(mode.count===50){
  // Rotate the extra two subjects every 50-question session.
  const first=(session*2)%units.length;
  sizes[units[first].id]++;
  sizes[units[(first+1)%units.length].id]++;
 }
 return sizes;
}
function choose(pool,number,selected,usedStems,keyCounts,topicCounts,allowedLetters){
 const first=shuffle(pool.slice());
 const candidates=first.slice().sort((a,b)=>score(b)-score(a));
 // Pick one at a time while encouraging source richness, topic diversity and
 // balanced answer letters. Recheck distinct stems regardless of original IDs.
 for(let i=0;i<number;i++){
  const can=candidates.filter(q=>!selected.some(x=>x.id===q.id)&&!usedStems.has(normalizedStem(q)));
  if(!can.length)return false;
  can.sort((a,b)=>{
   function rank(q){
    const letter=q.answer;
    const letterPressure=keyCounts[letter]*10+(allowedLetters&&keyCounts[letter]>=allowedLetters?75:0);
    const topic=(q.topic||q.conceptGroup||q.objective||'misc').toLowerCase();
    return score(q)*3-letterPressure-(topicCounts[topic]||0)*12;
   }
   return rank(b)-rank(a);
  });
  const q=can[0];
  selected.push(q);usedStems.add(normalizedStem(q));keyCounts[q.answer]++;
  const topic=String(q.topic||q.conceptGroup||q.objective||'misc').toLowerCase();
  topicCounts[topic]=(topicCounts[topic]||0)+1;
 }
 return true;
}
function build(mode){
 const q=quotas(mode);
 if(units.some(u=>pools[u.id].length<q[u.id]))return {error:'Not enough audited PCT II questions in: '+units.filter(u=>pools[u.id].length<q[u.id]).map(u=>u.name).join(', ')};
 let selected=[],usedStems=new Set(),keys={A:0,B:0,C:0,D:0},topics={};
 const order=shuffle(units.slice());
 for(const u of order)if(!choose(pools[u.id],q[u.id],selected,usedStems,keys,topics,Math.ceil(mode.count/4)))return {error:'Unable to fill '+u.name+' without repeating questions'};
 if(selected.length!==mode.count||new Set(selected.map(x=>x.id)).size!==selected.length)return {error:'Incorrect final exam count or duplicated IDs'};
 const tally=Object.fromEntries(units.map(u=>[u.id,0]));
 for(const item of selected)tally[classify(item)]++;
 if(units.some(u=>tally[u.id]!==q[u.id]))return {error:'Unit distribution integrity check failed'};
 if(selected.some(item=>registry.get(item.id)!==item))return {error:'Question registry mismatch; reload Med Daddy'};
 return {selected:shuffle(selected),tally,keys};
}
function render(){
 const q=quotas(modes[0]);
 for(const u of units)page.querySelector('[data-pct-final-count="'+u.id+'"]').textContent=available[u.id]+' available';
 tileButtons.forEach(button=>{
  const mode=modes.find(m=>m.id===button.dataset.pctFinalMode);
  const requirements=quotas(mode);
  const missing=units.filter(u=>available[u.id]<requirements[u.id]);
  button.disabled=!!missing.length;
  button.title=missing.length?'Needs more source-qualified questions from: '+missing.map(u=>u.name).join(', '):mode.desc;
 });
 status.textContent='Available source-qualified questions: '+units.map(u=>u.short+' '+available[u.id]).join(' · ')+
 '. The next 50-question mock will use: '+units.map(u=>u.short+' '+q[u.id]).join(' / ')+'.';
}
tileButtons.forEach(button=>button.onclick=()=>{
 const mode=modes.find(m=>m.id===button.dataset.pctFinalMode);
 if(!mode)return;
 const result=build(mode);
 if(result.error){status.textContent=result.error+'. Existing progress is unchanged.';return;}
 session++;
 const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
 if(recycle)recycle.checked=false;if(adaptive)adaptive.checked=false;
 parent.classList.remove('md-pct-final-visible');page.style.display='none';
 start(result.selected);
 if(typeof quiz!=='undefined'&&quiz.length!==mode.count)console.warn('PCT Final requested '+mode.count+' but core engine loaded '+quiz.length);
});
const css=document.createElement('style');css.id='md-pct-final-css';
css.textContent=
'#pct2InfectiousPage.md-pct-final-visible > :not(#pct2FinalExamPage){display:none!important}'+
'#md-pct2-final-card{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;margin:15px 0;padding:18px;background:#103146;border:1px solid #4b8fa3;border-radius:13px;color:#eff9ff}'+
'#md-pct2-final-card strong{display:block;font-size:1.14rem}#md-pct2-final-card small{display:block;margin-top:6px;opacity:.88}'+
'#md-pct2-final-card button{min-height:44px;padding:10px 17px;font-weight:700}'+
'#pct2FinalExamPage{padding:13px 7px;color:#edf7fc}'+
'#pct2FinalExamPage .md-pct-final-panel{max-width:1100px;margin:auto;padding:24px;background:#102b3b;border:1px solid #3d8595;border-radius:16px}'+
'#pct2FinalExamPage .md-pct-final-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;flex-wrap:wrap}'+
'#pct2FinalExamPage h1{font-size:1.9rem;margin:8px 0}#pct2FinalExamPage h2{font-size:1.15rem;margin:22px 0 12px}'+
'#pct2FinalExamPage p{line-height:1.5}'+
'#pct2FinalExamPage .md-pct-final-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:23px 0}'+
'#pct2FinalExamPage .md-pct-final-tile{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:9px;background:#153a4c;border:1px solid #528fa2;border-radius:13px;padding:18px;color:#f4fcff;min-height:130px;cursor:pointer;white-space:normal;font:inherit}'+
'#pct2FinalExamPage .md-pct-final-tile:hover,#pct2FinalExamPage .md-pct-final-tile:focus-visible{background:#225469;border-color:#75d8d0}'+
'#pct2FinalExamPage .md-pct-final-tile strong{font-size:1.07rem}#pct2FinalExamPage .md-pct-final-tile small{opacity:.86;font-size:.85rem;line-height:1.4}'+
'#pct2FinalExamPage .md-pct-final-icon{font-size:1.4rem}#pct2FinalExamPage .md-pct-final-tile:disabled{opacity:.45;cursor:not-allowed}'+
'#pct2FinalExamPage .md-pct-final-breakdown{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}'+
'#pct2FinalExamPage .md-pct-final-unit{display:flex;justify-content:space-between;gap:10px;align-items:center;background:#092534;border:1px solid #395f70;border-radius:10px;padding:11px;font-size:.9rem}'+
'#pct2FinalExamPage .md-pct-final-unit strong{font-size:.8rem;white-space:nowrap;color:#c9f0ec}'+
'#pct2FinalExamPage .md-pct-final-status{padding:13px;margin:18px 0;color:#c7e5f3;background:#08202e;border-radius:8px}'+
'#pct2FinalExamPage details{font-size:.9rem;opacity:.94}#pct2FinalExamPage summary{font-weight:700;cursor:pointer}'+
'@media(max-width:700px){#pct2FinalExamPage .md-pct-final-grid,#pct2FinalExamPage .md-pct-final-breakdown{grid-template-columns:1fr}#pct2FinalExamPage .md-pct-final-panel{padding:15px}}';
document.head.appendChild(css);
render();
document.title='Med Daddy v9.11.43 — PCT II Comprehensive Final';
window.MD_PCT2_FINAL_91143={ready:true,version:'9.11.43',units:units.map(u=>({id:u.id,name:u.name,available:available[u.id]})),modes:modes.map(m=>({id:m.id,count:m.count,minimumPerUnit:m.min})),sourcePolicy:'Source-linked original Med Daddy PCT II question registry only',strictQuotas:true,open,previewQuotas:quotas,build};
})();