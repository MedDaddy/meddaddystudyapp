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
const positions=mix(Array.from({length:200},(_,i)=>i%4));
const letter='ABCD';
const questions=flat.map(({g,gi,j,t},i)=>{
 const [category,prompt,right,w1,w2,w3,why]=t;
 const answerPosition=positions[i];
 const distractors=mix([w1,w2,w3]);
 const choices=distractors.slice();choices.splice(answerPosition,0,right);
 return {id:'PCT2-SRD-91123-'+String(i+1).padStart(3,'0'),course:'Patient Care & Theory II',unit:'Symptom Relief Drugs',
  bankType:'directive-verified',topic:g.directive,reviewCategory:category,
  difficulty:'Instructor Hard',prompt,choices,answer:letter[answerPosition],
  explanation:why,whyCorrect:why,sourceTitle:g.directive==='Medication Calculations and Pharmacology'?
   'PCT2 Pharmacology Review + ALS PCS v5.4 as cited':'Ontario ALS PCS v5.4 — PCP medical directive',
  sourceLocator:'ALS PCS v5.4, '+(g.directive.startsWith('Seizure')?'PCP Auxiliary':'PCP Core')+', '+g.directive+', pp. '+g.pages,
  source:'ALS PCS v5.4, '+g.directive+' pp. '+g.pages,
  mockInfluence:'PCT2 Pharmacology Review; original 350-question pharmacology mock audited separately',
  directiveCategory:g.directive.startsWith('Seizure')?'Auxiliary':'Core'};
});
for(const q of questions){
 if(seen.has(q.id)||!q.choices||new Set(q.choices).size!==4||q.choices.length!==4)issues.push('Invalid ID or choices: '+q.id);
 seen.add(q.id);
 const existing=registry.get(q.id);
 if(existing&&(existing.prompt!==q.prompt||existing.answer!==q.answer))issues.push('Registry collision: '+q.id);
}
if(issues.length){window.MD_PCT2_SRD_91123={ready:false,errors:issues};console.error('SRD registry audit blocked',issues);return;}
for(const q of questions){if(!registry.has(q.id))registry.set(q.id,q);}
if(typeof BANK!=='undefined'&&Array.isArray(BANK)){
 for(const q of questions)if(!BANK.some(x=>x.id===q.id))BANK.push(q);
}
const byName=name=>questions.filter(q=>q.topic===name);
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
 ['Integrated PCP treatment choices',byName('Integrated PCP Directive Choices')]
];
const highYield=families.flatMap(([name,pool])=>chooseEven(pool,5));
const sourceMock=chooseEven(questions,50);  // original 350-item source mock remains archived, not imported as false keys.
const dose=questions.filter(q=>q.reviewCategory==='D');
const contraindications=questions.filter(q=>q.reviewCategory==='C');
const treatment=questions.filter(q=>q.reviewCategory==='T'||q.reviewCategory==='S');
const pools={high:highYield,mock:sourceMock,dose,contra:contraindications,treatment,all:questions};
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
'<p>200 distinct questions (72 dose/math, 60 contraindications, 46 treatment choices, 22 reassessment/sequence). High-Yield and mock sessions are selected from that same verified pool, not extra duplicate questions. Seizure treat-and-discharge is explicitly PCP auxiliary; IV therapies require separate PCP Autonomous IV authorization.</p></details></section>';
parent.prepend(page);
const card=document.createElement('div');card.id='md-pct2-srd-card';card.className='md-pct2-srd-card';
card.innerHTML='<div><strong>PCT II — Symptom Relief Drugs</strong><small>ALS 5.4 directives · 200 hard questions · High-Yield 50 · 50-question mock</small></div>'+
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
window.MD_PCT2_SRD_91123={ready:true,version:'9.11.23',errors:[],counts:{all:200,high:50,mock:50,dose:dose.length,contra:contraindications.length,treatment:treatment.length},sourceMockPreserved:true,sourceAuthority:'ALS PCS v5.4',highYieldFamilies:families.map(([name])=>name)};
})();
