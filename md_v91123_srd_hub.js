/* Med Daddy v9.11.23 — PCP Symptom Relief Drugs question bank, launch hub.
 * 200 individually authored directive cases, official ALS PCS v5.4 dose/contraindication authority.
 * Source 350Q instructor mock remains preserved separately and was not blindly imported.
 */
(()=>{'use strict';
if(window.MD_PCT2_SRD_91123)return;
const groups=[
 ...(window.MD_SRD_RAW_A_91123||[]),
 ...(window.MD_SRD_RAW_B_91123||[]),
 ...(window.MD_SRD_RAW_C_91123||[]),
 ...(window.MD_SRD_RAW_D_91123||[])
];
const issues=[];
const registry=window.MD_SAFE_QUESTIONS;
const parent=document.getElementById('pct2InfectiousPage');
const anchor=document.getElementById('pct2UnitSix');
if(groups.length!==16)issues.push('Expected 16 directive/content groups; got '+groups.length);
if(!parent||!anchor)issues.push('Existing PCT II unit navigation missing');
if(!(registry instanceof Map))issues.push('Question registry unavailable');
if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')issues.push('Study engine not ready');
const flat=groups.flatMap((g,gi)=>(g.items||[]).map((t,j)=>({g,gi,j,t})));
if(flat.length!==200)issues.push('SRD question pool incomplete: '+flat.length);
const normalize=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const seen=new Set(),texts=new Set();
for(const {t,gi,j} of flat){
 if(!Array.isArray(t)||t.length!==7||!['D','C','T','S'].includes(t[0])||!t[1]||!t[2]||!t[6]||new Set(t.slice(2,6)).size!==4)issues.push('Question malformed at group '+gi+' #'+j);
 const stem=normalize(t?.[1]);if(texts.has(stem))issues.push('Duplicate question: '+stem);texts.add(stem);
}
if(issues.length){window.MD_PCT2_SRD_91123={ready:false,errors:issues};console.error('SRD initialization prevented',issues);return;}
/* Balanced positions: exactly 50 keys per letter across the full 200.
 * Deterministic permutation keeps IDs/answers stable for review and statistics.
 * Session questions themselves are shuffled by the Med Daddy engine. */
let seed=91123017;
const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
function mix(a){let x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
const positions=(()=>{let output=null;
 for(let attempt=0;attempt<1000&&!output;attempt++){
  const remaining=[50,50,50,50],out=[];let valid=true;
  for(let i=0;i<200;i++){
   const eligible=[0,1,2,3].filter(k=>remaining[k]>0&&!(i>=2&&out[i-1]===k&&out[i-2]===k));
   if(!eligible.length){valid=false;break;}
   let weighted=eligible.reduce((s,k)=>s+remaining[k],0),draw=rand()*weighted,pick=eligible[eligible.length-1];
   for(const k of eligible){draw-=remaining[k];if(draw<0){pick=k;break;}}
   out.push(pick);remaining[pick]--;
  }
  if(valid&&remaining.every(n=>n===0))output=out;
 }
 if(!output)throw new Error('Unable to balance SRD answer letters');return output;
})();
const letter='ABCD';
const continuity=window.MD_SRD_CONTINUITY_91125;
if(!continuity?.stems){window.MD_PCT2_SRD_91123={ready:false,errors:['SRD context correction source missing']};return;}
const questions=flat.map(({g,gi,j,t},i)=>{
 const [category,oldPrompt,right,w1,w2,w3,why]=t;
 const keyedCorrect=continuity.correct?.[String(i+1)]||right;
 const keyedRationale=continuity.rationales?.[String(i+1)]||why;
 const prompt=continuity.stems[String(i+1)]||oldPrompt;
 const answerPosition=positions[i];
 const overrides=continuity.options?.[String(i+1)]||{};
 const distractors=mix([w1,w2,w3].map(x=>overrides[x]||x));
 const choices=distractors.slice();choices.splice(answerPosition,0,keyedCorrect);
 return {id:'PCT2-SRD-91123-'+String(i+1).padStart(3,'0'),course:'Patient Care & Theory II',unit:'Symptom Relief Drugs',
  bankType:'directive-verified',topic:g.directive,reviewCategory:category,
  difficulty:'Instructor Hard',prompt,choices,answer:letter[answerPosition],
  explanation:keyedRationale,whyCorrect:keyedRationale,sourceTitle:g.directive==='Medication Calculations and Pharmacology'?
   'PCT2 Pharmacology Review + ALS PCS v5.4 as cited':'Ontario ALS PCS v5.4 — PCP medical directive',
  sourceLocator:g.directive==='Medication Calculations and Pharmacology'?
   'PCT2 Pharmacology Review, dose-math and medication rights; official ALS v5.4 dosing cited in rationale':
   'ALS PCS v5.4, '+(g.directive.startsWith('Seizure')?'PCP Auxiliary':'PCP Core')+', '+g.directive+', '+(g.pages.match(/^[0-9]/)?'pp. ':'')+g.pages,
  source:'ALS PCS v5.4, '+g.directive+' pp. '+g.pages,
  mockInfluence:'PCT2 Pharmacology Review; original 350-question pharmacology mock audited separately',
  directiveCategory:g.directive.startsWith('Seizure')?'Auxiliary':'Core'};
});
/* Archived raw source remains 200 items for review and rollback. Only medication
 * interventions and their associated eligibility/assessment are playable in SRD.
 * Airway device/Seizure disposition and pure ECG-logistics questions stay out. */
const nonDrugIds=new Set(['PCT2-SRD-91123-018','PCT2-SRD-91123-019']);
const medicationQuestions=questions.filter(q=>q.topic!=='Supraglottic Airway' &&
 q.topic!=='Seizure — PCP Auxiliary (Treat and Discharge)' && !nonDrugIds.has(q.id));
if(medicationQuestions.length!==186)issues.push('Expected 186 medication-relevant questions, got '+medicationQuestions.length);
for(const q of questions){
 if(seen.has(q.id)||!q.choices||new Set(q.choices).size!==4||q.choices.length!==4)issues.push('Invalid ID or choices: '+q.id);
 seen.add(q.id);
 const existing=registry.get(q.id);
 if(existing&&(existing.prompt!==q.prompt||existing.answer!==q.answer))issues.push('Registry collision: '+q.id);
}
if(issues.length){window.MD_PCT2_SRD_91123={ready:false,errors:issues};console.error('SRD registry audit blocked',issues);return;}
for(const q of medicationQuestions){if(!registry.has(q.id))registry.set(q.id,q);}
if(typeof BANK!=='undefined'&&Array.isArray(BANK)){
 for(const q of medicationQuestions)if(!BANK.some(x=>x.id===q.id))BANK.push(q);
}
const byName=name=>medicationQuestions.filter(q=>q.topic===name);
function chooseEven(pool,n){
 if(pool.length<n)throw new Error('Insufficient pool for '+n+' questions');
 return Array.from({length:n},(_,i)=>pool[Math.floor((i+0.5)*pool.length/n)]);
}
const families=[
 ['Cardiac ischemia',byName('Cardiac Ischemia')],
 ['Bronchoconstriction',byName('Bronchoconstriction')],
 ['Anaphylaxis',byName('Moderate to Severe Allergic Reaction')],
 ['Pediatric croup',byName('Croup')],
 ['Hypoglycemia',byName('Hypoglycemia')],
 ['Opioid toxicity',byName('Opioid Toxicity and Withdrawal')],
 ['Nausea and vomiting',byName('Nausea/Vomiting')],
 ['Analgesia',byName('Analgesia')],
 ['Cardiogenic pulmonary edema',byName('Acute Cardiogenic Pulmonary Edema')],
 ['PCP safety across systems',[...byName('Suspected Adrenal Crisis'),...byName('Supraglottic Airway'),...byName('Medication Calculations and Pharmacology'),...byName('Seizure — PCP Auxiliary (Treat and Discharge)'),...byName('Integrated PCP Directive Choices')]]
];
/* Balance each curated 50-question deck independently, while preserving the
 * exact topic count of each family by swapping only within the same topic.
 * The 200-item master bank is independently 50/50/50/50. */
function balanceDeck(selected,target){
 const out=selected.slice();
 const counts=()=>out.reduce((o,q)=>(o[q.answer]=(o[q.answer]||0)+1,o),{A:0,B:0,C:0,D:0});
 const score=o=>Object.keys(target).reduce((s,k)=>s+(o[k]-target[k])**2,0);
 let count=counts();
 for(let tries=0;tries<100;tries++){
  let best=null;
  for(let i=0;i<out.length;i++){
   const old=out[i];
   for(const next of medicationQuestions){
    if(next.topic!==old.topic||next.answer===old.answer||out.some(x=>x.id===next.id))continue;
    const nextCount={...count,[old.answer]:count[old.answer]-1,[next.answer]:count[next.answer]+1};
    const nextScore=score(nextCount);
    if(nextScore<score(count)&&(!best||nextScore<best.score))
     best={i,next,count:nextCount,score:nextScore};
   }
  }
  if(!best)break;out[best.i]=best.next;count=best.count;
 }
 return out;
}
const highYield=balanceDeck(families.flatMap(([name,pool])=>chooseEven(pool,5)),{A:13,B:12,C:12,D:13});
const sourceMock=balanceDeck(chooseEven(medicationQuestions,50),{A:13,B:12,C:13,D:12}); // original 350Q source archive kept separately.
const dose=medicationQuestions.filter(q=>q.reviewCategory==='D');
const contraindications=medicationQuestions.filter(q=>q.reviewCategory==='C');
const treatment=medicationQuestions.filter(q=>q.reviewCategory==='T'||q.reviewCategory==='S');
const pools={high:highYield,mock:sourceMock,dose,contra:contraindications,treatment,all:medicationQuestions};
for(const [name,pool] of Object.entries(pools))
 if(pool.length<50||new Set(pool.map(x=>x.id)).size!==pool.length)issues.push('Invalid session pool '+name+': '+pool.length);
if(issues.length){window.MD_PCT2_SRD_91123={ready:false,errors:issues};return;}
const page=document.createElement('section');
page.id='pct2SrdPage';page.style.display='none';
page.innerHTML=
'<section class="md-srd-panel"><div class="md-srd-top"><div><small>PCT II · PRIMARY CARE PARAMEDIC · ALS PCS 5.4</small>'+
'<h1>Symptom Relief Drugs</h1><p>Directive-first dosing, subtle contraindications and best-treatment decisions. All questions are PCP-level.</p></div>'+
'<button id="md-srd-home" type="button">Study Home</button></div>'+
'<div class="md-srd-select"><label for="md-srd-bank">Question deck</label>'+
'<select id="md-srd-bank"><option value="high">High-Yield 50 · 10 medication concepts × 5</option>'+
'<option value="mock">Instructor-style Pharmacology Mock · 50 questions</option>'+
'<option value="dose">Dose, concentration & medication math · '+dose.length+'</option>'+
'<option value="contra">Contraindication and eligibility traps · '+contraindications.length+'</option>'+
'<option value="treatment">Best treatment & reassessment · '+treatment.length+'</option>'+
'<option value="all">Complete SRD directive challenge · 200 questions</option></select>'+
'<label for="md-srd-length">Session length</label>'+
'<select id="md-srd-length"><option value="50">50 questions</option><option value="75">75 questions</option>'+
'<option value="100">100 questions</option><option value="all">Full selected bank</option></select>'+
'<button class="success" id="md-srd-start" type="button">Start SRD Practice</button></div>'+
'<p id="md-srd-meta" class="muted" aria-live="polite"></p>'+
'<details><summary>Exam scope and source rules</summary><p>Based on the instructor\'s 38-question PCT II Pharmacology Review, 350-question source mock and Symptom Relief companion slides. Official uploaded ALS PCS v5.4 controls PCP doses, eligibility, contraindications, routes and intervals. The 350-question source mock is preserved in the study sources; its original answer sheet was not blindly imported.</p>'+
'<p>'+medicationQuestions.length+' medication-relevant questions ('+dose.length+' dose/math, '+contraindications.length+' contraindication, '+treatment.length+' treatment/reassessment). The non-drug SGA, seizure disposition and pure ECG-logistics questions remain in the archived source only and will not appear in SRD sessions. IV medications require separately authorized PCP Autonomous IV scope.</p></details></section>';
parent.prepend(page);
const card=document.createElement('div');card.id='md-pct2-srd-card';card.className='md-pct2-srd-card';
card.innerHTML='<div><strong>PCT II — Symptom Relief Drugs</strong><small>ALS 5.4 directives · '+medicationQuestions.length+' medication questions · High-Yield 50 · 50-question mock</small></div>'+
'<button id="md-srd-open" type="button">Open SRD Unit</button>';
anchor.after(card);
function exit(){parent.classList.remove('md-srd-visible');page.style.display='none';show('studyHub');}
function open(){show('pct2InfectiousPage');parent.classList.add('md-srd-visible');page.style.display='block';page.scrollIntoView?.({block:'start'});}
page.querySelector('#md-srd-home').onclick=exit;
card.querySelector('#md-srd-open').onclick=open;
const bank=page.querySelector('#md-srd-bank'),length=page.querySelector('#md-srd-length'),meta=page.querySelector('#md-srd-meta');
function options(){
 const pool=pools[bank.value]||highYield;
 [...length.options].forEach(o=>o.disabled=o.value!=='all'&&Number(o.value)>pool.length);
 if(length.selectedOptions?.[0]?.disabled)length.value='all';
 meta.textContent=pool.length+' distinct source-mapped PCP questions. Source and clinical rationale shown after answering.';
}
bank.onchange=options;length.onchange=options;options();
page.querySelector('#md-srd-start').onclick=()=>{
 const pool=pools[bank.value]||highYield;
 const n=length.value==='all'?pool.length:Math.min(Number(length.value),pool.length);
 if(n<50){meta.textContent='Choose at least a 50-question deck.';return;}
 const selection=shuffle(pool.slice()).slice(0,n);
 if(selection.some(q=>registry.get(q.id)?.answer!==q.answer)){meta.textContent='Question registry mismatch; session blocked.';return;}
 const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
 if(recycle)recycle.checked=false;if(adaptive)adaptive.checked=false;
 parent.classList.remove('md-srd-visible');page.style.display='none';
 start(selection);
 if(typeof quiz!=='undefined'&&quiz.length!==n)console.warn('SRD session length discrepancy '+n+' vs '+quiz.length);
};
const css=document.createElement('style');css.id='md-srd-style';
css.textContent='#pct2InfectiousPage.md-srd-visible > :not(#pct2SrdPage){display:none !important}'+
 '#md-pct2-srd-card{display:flex;justify-content:space-between;align-items:center;gap:15px;flex-wrap:wrap;margin:15px 0;padding:18px;border:1px solid #2f8a91;background:#0c2938;border-radius:13px;color:#eefaff}'+
 '#md-pct2-srd-card strong{display:block;font-size:1.1rem}#md-pct2-srd-card small{display:block;opacity:.8;margin-top:5px}'+
 '#md-pct2-srd-card button{font-weight:700;min-height:44px;padding:9px 17px}'+
 '#pct2SrdPage{padding:13px 8px;color:#f4faff}#pct2SrdPage .md-srd-panel{max-width:1100px;margin:0 auto;padding:26px;background:#102b3b;border:1px solid #3d8595;border-radius:16px}'+
 '#pct2SrdPage .md-srd-top{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:flex-start}'+
 '#pct2SrdPage h1{font-size:1.9rem;margin:6px 0}#pct2SrdPage p{line-height:1.55}'+
 '#pct2SrdPage .md-srd-select{display:grid;grid-template-columns:170px 1fr;align-items:center;gap:14px;margin:22px 0}'+
 '#pct2SrdPage label{font-weight:700}#pct2SrdPage select{width:100%;min-height:46px;background:#061823;border:1px solid #458297;color:#fff;padding:10px;border-radius:8px}'+
 '#pct2SrdPage button{min-height:46px;padding:10px 16px;font-weight:700}#pct2SrdPage #md-srd-start{grid-column:1/-1}'+
 '#pct2SrdPage details{opacity:.92;font-size:.91rem;margin-top:18px}#pct2SrdPage details summary{font-weight:700;cursor:pointer}'+
 '@media(max-width:650px){#pct2SrdPage .md-srd-select{grid-template-columns:1fr}}';
document.head.appendChild(css);
window.MD_PCT2_SRD_91123={ready:true,version:'9.11.25',errors:[],counts:{all:medicationQuestions.length,high:50,mock:50,dose:dose.length,contra:contraindications.length,treatment:treatment.length},sourceArchive:questions.length,nonDrugExcluded:questions.length-medicationQuestions.length,sourceMockPreserved:true,sourceAuthority:'ALS PCS v5.4',highYieldFamilies:families.map(([name])=>name)};
})();
