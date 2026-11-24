/* Med Daddy v9.11.38 — A&P II Reproductive System.
 * Standard A&P unit launcher. Instructor 25 x 5 review, 75 distinct lecture/Patton
 * supplements, independent curated High-Yield 50 selection. Existing quiz UI reused.
 * Accurate distinction: not yet a 3-per-every-Quick-Quiz bank.
 */
(()=>{'use strict';
if(window.MD_AP2_REPRO_91137)return;
const review=window.MD_AP2_REPRO_REVIEW_91137||[];
const lecture=window.MD_AP2_REPRO_LECT_91137||[];
const all=[...review,...lecture];
const editorial=window.MD_AP2_REPRO_EDITORIAL_91138;

const errors=[];
const registry=window.MD_SAFE_QUESTIONS;
const parent=document.getElementById('ap2UrinaryPage');
const anchor=document.getElementById('ap2UnitThree');
if(!(registry instanceof Map))errors.push('Existing Med Daddy question registry missing');
if(!parent||!anchor)errors.push('A&P navigation missing');
if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')errors.push('Original Med Daddy study engine missing');
if(review.length!==125||lecture.length!==75||all.length!==200)errors.push('Expected 125 instructor plus 75 lecture questions');
if(!editorial?.ready||editorial.changed!==24)errors.push('Reproductive editorial-quality patch missing or incomplete');
const ids=new Set(),stems=new Set(),reviewCounts={},lectureCounts={},letters={A:0,B:0,C:0,D:0};
const normalize=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
all.forEach(q=>{
 const fmt=q?.id&&typeof q.prompt==='string'&&Array.isArray(q.choices)&&q.choices.length===4&&/^[ABCD]$/.test(q.answer||'')&&q.whyCorrect&&q.sourceLocator&&q.sourceTitle&&q.whyWrong;
 if(!fmt){errors.push('Question format '+(q?.id||'?'));return;}
 if(ids.has(q.id)||stems.has(normalize(q.prompt)))errors.push('Duplicate question '+q.id);
 ids.add(q.id);stems.add(normalize(q.prompt));
 if(new Set(q.choices).size!==4||Object.keys(q.whyWrong).length!==3)errors.push('Answer/explanation '+q.id);
 q.choices.forEach((v,i)=>{if('ABCD'[i]!==q.answer&&!q.whyWrong[v])errors.push('Missing choice rationale '+q.id)});
 if(q.reviewPoint)reviewCounts[q.reviewPoint]=(reviewCounts[q.reviewPoint]||0)+1;
 if(q.lectureGroup)lectureCounts[q.lectureGroup]=(lectureCounts[q.lectureGroup]||0)+1;
 letters[q.answer]++;
 if(registry?.has(q.id)){const earlier=registry.get(q.id);if(earlier.prompt!==q.prompt||earlier.answer!==q.answer)errors.push('Existing registry collision '+q.id);}
});
for(let point=1;point<=25;point++)if(reviewCounts[point]!==5)errors.push('Review point '+point+' incomplete');
for(let n=26;n<=40;n++)if(lectureCounts[n]!==5)errors.push('Lecture topic '+n+' incomplete');
if(Math.max(...Object.values(letters))-Math.min(...Object.values(letters))>2)errors.push('Answer key imbalance');
const concepts=[
{name:'Seminal glands and sperm route',parts:[[1,3],[8,2]]},
{name:'Sertoli, Leydig and testicular cells',parts:[[2,3],[14,2]]},
{name:'Male reproductive hormone regulation',parts:[[9,5]]},
{name:'Essential male organs and scrotal function',parts:[[3,2],[24,3]]},
{name:'Female organs and uterine layers',parts:[[13,2],[16,3]]},
{name:'Endometrial cycle and ovulation',parts:[[19,5]]},
{name:'Conception and pregnancy hormones',parts:[[20,2],[22,3]]},
{name:'Lactation and labour',parts:[[4,2],[5,3]]},
{name:'Inheritance and chromosomal syndromes',parts:[[12,2],[18,3]]},
{name:'Fertilization, oogenesis and germ layers',parts:[[6,2],[11,1],[25,2]]}
];
const highYield=[];
concepts.forEach(concept=>{
 const items=concept.parts.flatMap(([point,n])=>review.filter(q=>q.reviewPoint===point).slice(0,n));
 if(items.length!==5)errors.push('High-Yield target '+concept.name+' unavailable');
 highYield.push(...items);
});
if(highYield.length!==50||new Set(highYield.map(q=>q.id)).size!==50)errors.push('High-Yield 50 incorrect');
if(errors.length){window.MD_AP2_REPRO_91137={ready:false,errors};console.error('A&P II Reproductive launch prevented:',errors);return;}
all.forEach(q=>{if(!registry.has(q.id))registry.set(q.id,q)});
if(typeof BANK!=='undefined'&&Array.isArray(BANK))all.forEach(q=>{if(!BANK.some(item=>item.id===q.id))BANK.push(q)});
const page=document.createElement('section');
page.id='ap2ReproductivePage';page.style.display='none';page.className='md-ap2-repro-contained';
page.innerHTML='<section class="md-ap2-repro-panel">'+
'<div class="md-ap2-repro-head"><div><small>ANATOMY &amp; PHYSIOLOGY II · INSTRUCTOR STANDARD</small><h1>Reproductive System</h1>'+
'<p>Male and female anatomy, gametogenesis, reproductive cycles, pregnancy and lactation, embryonic development, genetics and aging—grounded in your uploaded course materials.</p></div><button type="button" id="md-ap2-repro-home">Study Home</button></div>'+
'<div class="md-ap2-repro-control">'+
'<label for="md-ap2-repro-bank">Question deck</label>'+
'<select id="md-ap2-repro-bank">'+
'<option value="high">High-Yield 50 · ten core concepts</option>'+
'<option value="review">Instructor Reproductive Review · 25 objectives × 5 = 125</option>'+
'<option value="lecture">Lecture &amp; Patton Reinforcement · 75 original questions</option>'+
'<option value="all">Complete Reproductive Bank · 200 original questions</option>'+
'</select>'+
'<label for="md-ap2-repro-length">Session length</label><select id="md-ap2-repro-length">'+
'<option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="all">Entire selected deck</option></select>'+
'<button type="button" class="success" id="md-ap2-repro-start">Start A&amp;P Reproductive Exam</button></div>'+
'<p id="md-ap2-repro-meta" class="muted" aria-live="polite"></p>'+
'<details class="md-ap2-repro-notes"><summary>Source coverage and exam focus</summary>'+
'<p><strong>Instructor sheets:</strong> all 25 Reproductive System Review questions with five source-linked items each; the second Reproduction Test Review has been used as the checklist for emphasis.</p>'+
'<p><strong>Lectures:</strong> Male Reproductive System (39 slides), Female Reproductive System (52), Growth and Development (54), Genetics and Heredity (40). The 75-item reinforcement is distinct and lecture-linked, but is not represented as three new items for every Quick Quiz prompt.</p>'+
'<p><strong>Patton:</strong> 11th edition Chapters 45 (Male), 46 (Female), 47 (Growth &amp; Development), 48 (Genetics). Slide chapter numbers differ because the lectures use earlier edition numbering.</p>'+
'<p>All answers have option-specific explanations; High-Yield 50 is curated from the instructor review rather than being 50 extra questions. The private practice file remains separate, and no Ontario PCP protocols are part of this A&amp;P physiology bank.</p></details>'+
'</section>';
parent.prepend(page);
const card=document.createElement('div');card.id='md-ap2-repro-card';card.className='md-ap2-repro-card';
card.innerHTML='<div><strong>A&amp;P II — Reproductive System</strong><small>125 instructor review · 75 lecture/Patton · High-Yield 50 · 200 total</small></div>'+
'<button type="button" id="md-ap2-repro-open">Open Reproductive Unit</button>';
anchor.after(card);
function exit(){parent.classList.remove('md-repro-unit-visible');page.style.display='none';show('studyHub');}
function open(){
 parent.classList.remove('md-endo-unit-visible','md-lymph-unit-visible');
 for(const id of ['ap2EndocrinePage','ap2LymphPage']){const other=document.getElementById(id);if(other)other.style.display='none';}
 show('ap2UrinaryPage');parent.classList.add('md-repro-unit-visible');page.style.display='block';page.scrollIntoView?.({block:'start'});
}
page.querySelector('#md-ap2-repro-home').onclick=exit;
card.querySelector('#md-ap2-repro-open').onclick=open;
const bank=page.querySelector('#md-ap2-repro-bank'),length=page.querySelector('#md-ap2-repro-length'),meta=page.querySelector('#md-ap2-repro-meta');
const pools={high:highYield,review,lecture,all};
function options(){
 const pool=pools[bank.value]||highYield;
 [...length.options].forEach(o=>o.disabled=o.value!=='all'&&Number(o.value)>pool.length);
 if(length.selectedOptions?.[0]?.disabled)length.value='all';
 meta.textContent=pool.length+' unique source-linked questions, with explanations for all four options.';
}
bank.onchange=options;length.onchange=options;options();
page.querySelector('#md-ap2-repro-start').onclick=()=>{
 const pool=pools[bank.value]||highYield;
 const n=length.value==='all'?pool.length:Math.min(Number(length.value),pool.length);
 if(n<50){meta.textContent='Select at least 50 questions for a full exam session.';return;}
 const selection=shuffle(pool.slice()).slice(0,n);
 if(new Set(selection.map(q=>q.id)).size!==n){meta.textContent='Duplicate detected, session not started.';return;}
 if(selection.some(q=>registry.get(q.id)?.answer!==q.answer)){meta.textContent='Registry mismatch: session not started.';return;}
 const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
 if(recycle)recycle.checked=false;if(adaptive)adaptive.checked=false;
 parent.classList.remove('md-repro-unit-visible');page.style.display='none';
 start(selection);
 if(typeof quiz!=='undefined'&&quiz.length!==n)console.warn('A&P Reproductive requested '+n+' questions but engine loaded '+quiz.length);
};
if(typeof MutationObserver==='function'){
 const watcher=new MutationObserver(()=>{
  if(parent.classList.contains('md-endo-unit-visible')||parent.classList.contains('md-lymph-unit-visible')){
    if(parent.classList.contains('md-repro-unit-visible'))parent.classList.remove('md-repro-unit-visible');page.style.display='none';
  }
 });
 watcher.observe(parent,{attributes:true,attributeFilter:['class']});
}
const css=document.createElement('style');css.id='md-ap2-repro-style';
css.textContent=
'#ap2UrinaryPage.md-repro-unit-visible:not(.md-endo-unit-visible):not(.md-lymph-unit-visible)>:not(#ap2ReproductivePage){display:none!important}'+
'#md-ap2-repro-card{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:14px 0;padding:17px 18px;border:1px solid #3a6483;background:#10233a;border-radius:13px;color:#eff8ff}'+
'#md-ap2-repro-card strong{display:block;font-size:1.12rem}#md-ap2-repro-card small{display:block;opacity:.8;margin-top:6px}'+
'#md-ap2-repro-card button{min-height:43px;padding:10px 17px;font-weight:700;border-radius:8px}'+
'#ap2ReproductivePage{padding:15px 8px}#ap2ReproductivePage .md-ap2-repro-panel{max-width:1080px;margin:0 auto;padding:25px;background:#10233a;border:1px solid #416981;border-radius:16px;color:#ecf5ff}'+
'#ap2ReproductivePage .md-ap2-repro-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;flex-wrap:wrap}'+
'#ap2ReproductivePage h1{font-size:1.9rem;margin:8px 0}#ap2ReproductivePage p{line-height:1.5}'+
'#ap2ReproductivePage .md-ap2-repro-control{display:grid;grid-template-columns:160px 1fr;align-items:center;gap:13px;margin:22px 0}'+
'#ap2ReproductivePage label{font-weight:700}#ap2ReproductivePage select{width:100%;min-height:47px;padding:10px;background:#06192b;color:#fff;border:1px solid #527898;border-radius:9px}'+
'#ap2ReproductivePage button{min-height:46px;padding:10px 16px;font-weight:700}#ap2ReproductivePage #md-ap2-repro-start{grid-column:1/-1}'+
'#ap2ReproductivePage .md-ap2-repro-notes{margin-top:20px;font-size:.9rem;opacity:.92}'+
'#ap2ReproductivePage .md-ap2-repro-notes summary{cursor:pointer;font-weight:700}'+
'@media(max-width:650px){#ap2ReproductivePage .md-ap2-repro-control{grid-template-columns:1fr}}';
document.head.appendChild(css);
document.title='Med Daddy v9.11.38 — A&P II Reproductive System';
window.MD_AP2_REPRO_91137={ready:true,version:'9.11.38',counts:{review:125,lecture:75,highYield:50,uniquePlayable:200},sourceNote:'25 review objectives × 5; lecture supplement 75 distinct; 3-per-all-slide-prompt claim NOT made',highYieldCoverage:concepts,answerCounts:letters,errors:[]};
})();