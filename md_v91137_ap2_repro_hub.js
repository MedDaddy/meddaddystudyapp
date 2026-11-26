/* Med Daddy v9.11.42 — A&P II Reproductive System.
 * Standard A&P launcher. 125 instructor review + 75 lecture/Patton + 40 slide-deep-cuts,
 * with improved distractors and after-answer memory hooks. High-Yield 50 remains curated. Existing quiz UI reused.
 * Accurate distinction: not yet a 3-per-every-Quick-Quiz bank.
 */
(()=>{'use strict';
if(window.MD_AP2_REPRO_91137)return;
const review=window.MD_AP2_REPRO_REVIEW_91137||[];
const originalLecture=window.MD_AP2_REPRO_LECT_91137||[];
const slideExpansion=window.MD_AP2_REPRO_SLIDE_91140||[];
const lecture=[...originalLecture,...slideExpansion];
const all=[...review,...lecture];
const editorial=window.MD_AP2_REPRO_EDITORIAL_91138;
const distractors=window.MD_AP2_REPRO_DISTRACTORS_91140;
const mnemonics=window.MD_AP2_REPRO_MEMORY_91140;
const reviewQA=window.MD_AP2_REPRO_REVIEW_AUDIT_91141;
const lectureQA=window.MD_AP2_REPRO_LECTURE_AUDIT_91141;
const finalQA=window.MD_AP2_REPRO_FINAL_AUDIT_91141;
const causalQA=window.MD_AP2_REPRO_CAUSAL_91142;
const latestDistractorQA=window.MD_AP2_REPRO_DISTRACTOR_91142;

const errors=[];
const registry=window.MD_SAFE_QUESTIONS;
const parent=document.getElementById('ap2UrinaryPage');
const anchor=document.getElementById('ap2UnitThree');
if(!(registry instanceof Map))errors.push('Existing Med Daddy question registry missing');
if(!parent||!anchor)errors.push('A&P navigation missing');
if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')errors.push('Original Med Daddy study engine missing');
if(review.length!==125||originalLecture.length!==75||slideExpansion.length!==40||lecture.length!==115||all.length!==240)errors.push('Expected 125 instructor + 75 lecture + 40 new slide questions');
if(!editorial?.ready||editorial.changed!==24)errors.push('Earlier editorial patch missing or incomplete');
if(!distractors?.ready||distractors.changed!==17)errors.push('Targeted distractor quality patch missing or incomplete');
if(!mnemonics?.ready||mnemonics.count!==240||!mnemonics.afterAnswer)errors.push('After-answer memory hooks missing or incomplete');
if(!reviewQA?.ready||reviewQA.changed!==59)errors.push('Full instructor-review quality audit missing');
if(!lectureQA?.ready||lectureQA.changed!==45)errors.push('Full lecture quality audit missing');
if(!finalQA?.ready||finalQA.changed!==22)errors.push('Stem/option leakage audit missing');
if(!causalQA?.ready||causalQA.changed!==2)errors.push('Causal answer-fit correction not loaded');
if(!latestDistractorQA?.ready||latestDistractorQA.changed!==35)errors.push('Same-category distractor audit not loaded');
if(all.filter(q=>q.qualityAudit==='v9.11.42 causal answer-fit review').length!==2)errors.push('Mechanism question repairs missing');
const ids=new Set(),stems=new Set(),reviewCounts={},lectureCounts={},letters={A:0,B:0,C:0,D:0};
const normalize=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const normalizeWords=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
all.forEach(q=>{
 const fmt=q?.id&&typeof q.prompt==='string'&&Array.isArray(q.choices)&&q.choices.length===4&&/^[ABCD]$/.test(q.answer||'')&&q.whyCorrect&&q.sourceLocator&&q.sourceTitle&&q.whyWrong;
 if(!fmt){errors.push('Question format '+(q?.id||'?'));return;}
 if(ids.has(q.id)||stems.has(normalize(q.prompt)))errors.push('Duplicate question '+q.id);
 ids.add(q.id);stems.add(normalize(q.prompt));
 if(new Set(q.choices).size!==4||Object.keys(q.whyWrong).length!==3)errors.push('Answer/explanation '+q.id);
 if(!q.memoryTrick||!q.whyCorrect.includes('🧠 MEMORY TRICK:')||q.prompt.includes('🧠 MEMORY TRICK:'))errors.push('Memory disclosure/timing '+q.id);
 const visibleStem=normalizeWords(q.prompt);
 q.choices.forEach((choice,idx)=>{
  const v=normalizeWords(choice);
  if(v.length>=6&&visibleStem.includes(v))errors.push('Answer option echoed in question '+q.id+' '+('ABCD'[idx]));
  const parenthetical=[...String(choice).matchAll(/\(([^)]+)\)/g)];
  if(parenthetical.some(m=>normalizeWords(m[1]).length>=2&&visibleStem.includes(normalizeWords(m[1]))))errors.push('Answer code echoed in question '+q.id+' '+('ABCD'[idx]));
 });
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
"<section class=\"md-ap2-repro-training\">\n  <h2>Choose your training match</h2>\n  <p class=\"md-ap2-repro-hint\">Choose a session length, then select a tile to start using the standard Med Daddy question screen.</p>\n  <div class=\"md-srd-tiles md-ap2-repro-tiles\">\n    <button type=\"button\" class=\"md-srd-feature\" data-repro-deck=\"high\">\n      <span class=\"md-srd-tile-icon\">🏆</span><strong>High-Yield 50</strong>\n      <small>10 core exam concepts · 5 questions each · best first session</small>\n    </button>\n    <button type=\"button\" data-repro-deck=\"review\">\n      <span class=\"md-srd-tile-icon\">📝</span><strong>Instructor Review</strong>\n      <small>125 questions · all 25 review objectives × 5</small>\n    </button>\n    <button type=\"button\" data-repro-deck=\"lecture\">\n      <span class=\"md-srd-tile-icon\">📚</span><strong>Lecture &amp; Patton</strong>\n      <small>115 original questions · includes 40 new slide deep cuts and vivid after-answer memory tricks</small>\n    </button>\n    <button type=\"button\" data-repro-deck=\"all\">\n      <span class=\"md-srd-tile-icon\">🎯</span><strong>Full Reproductive Bank</strong>\n      <small>240 unique questions · instructor review and expanded slide material</small>\n    </button>\n  </div>\n  <div class=\"md-srd-length-setting md-ap2-repro-length-setting\">\n    <label for=\"md-ap2-repro-length\">Session length</label>\n    <select id=\"md-ap2-repro-length\">\n      <option value=\"50\">50 questions</option>\n      <option value=\"75\">75 questions</option>\n      <option value=\"100\">100 questions</option>\n      <option value=\"all\">Entire selected deck</option>\n    </select>\n  </div>\n  <p class=\"md-ap2-repro-hint md-ap2-repro-small\">A smaller deck automatically runs all available questions if you choose a longer session.</p>\n</section>"+
'<p id="md-ap2-repro-meta" class="muted" aria-live="polite"></p>'+
'<details class="md-ap2-repro-notes"><summary>Source coverage and exam focus</summary>'+
'<p><strong>Instructor sheets:</strong> all 25 Reproductive System Review questions with five source-linked items each; the second Reproduction Test Review has been used as the checklist for emphasis.</p>'+
'<p><strong>Lectures:</strong> Male Reproductive System (39 slides), Female Reproductive System (52), Growth and Development (54), Genetics and Heredity (40). The 115-item reinforcement includes 75 original items plus 40 extra slide-based questions. This is not represented as three new items for every Quick Quiz prompt.</p>'+
'<p><strong>Patton:</strong> 11th edition Chapters 45 (Male), 46 (Female), 47 (Growth &amp; Development), 48 (Genetics). Slide chapter numbers differ because the lectures use earlier edition numbering.</p>'+
'<p>All answers have option-specific explanations and memory tricks revealed after answering. High-Yield 50 is curated from the instructor review rather than being 50 extra questions. The private practice file remains separate, and no Ontario PCP protocols are part of this A&amp;P physiology bank.</p></details>'+
'</section>';
parent.prepend(page);
const card=document.createElement('div');card.id='md-ap2-repro-card';card.className='md-ap2-repro-card';
card.innerHTML='<div><strong>A&amp;P II — Reproductive System</strong><small>125 instructor review · 115 lecture/slide · High-Yield 50 · 240 total</small></div>'+
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
const length=page.querySelector('#md-ap2-repro-length');
const meta=page.querySelector('#md-ap2-repro-meta');
const pools={high:highYield,review,lecture,all};
const deckNames={high:'High-Yield 50',review:'Instructor Review',lecture:'Lecture & Patton',all:'Full Reproductive Bank'};
const tiles=[...page.querySelectorAll('[data-repro-deck]')];
meta.textContent='Select a tile above to start. All questions use the original Med Daddy quiz and answer explanations.';
function launch(deckName){
 const pool=pools[deckName];
 if(!pool||pool.length<50){meta.textContent='Selected deck is unavailable. No session started.';return;}
 const requested=length.value==='all'?pool.length:Number(length.value);
 const n=Math.min(requested,pool.length);
 if(!Number.isInteger(n)||n<50){meta.textContent='Select a valid session length of at least 50.';return;}
 const selection=shuffle(pool.slice()).slice(0,n);
 if(new Set(selection.map(q=>q.id)).size!==n){meta.textContent='Duplicate question detected; session not started.';return;}
 if(selection.some(q=>registry.get(q.id)?.answer!==q.answer)){meta.textContent='Registry mismatch; session not started.';return;}
 const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
 if(recycle)recycle.checked=false;if(adaptive)adaptive.checked=false;
 parent.classList.remove('md-repro-unit-visible');page.style.display='none';
 start(selection);
 if(typeof quiz!=='undefined'&&quiz.length!==n)console.warn('A&P Reproductive '+deckNames[deckName]+' expected '+n+' but engine loaded '+quiz.length);
}
tiles.forEach(tile=>{tile.onclick=()=>launch(tile.dataset.reproDeck)});
if(typeof MutationObserver==='function'){
 const watcher=new MutationObserver(()=>{
  if(parent.classList.contains('md-endo-unit-visible')||parent.classList.contains('md-lymph-unit-visible')){
    if(parent.classList.contains('md-repro-unit-visible'))parent.classList.remove('md-repro-unit-visible');page.style.display='none';
  }
 });
 watcher.observe(parent,{attributes:true,attributeFilter:['class']});
}
const css=document.createElement('style');css.id='md-ap2-repro-style';
css.textContent="#ap2UrinaryPage.md-repro-unit-visible:not(.md-endo-unit-visible):not(.md-lymph-unit-visible)>:not(#ap2ReproductivePage){display:none!important}\n#md-ap2-repro-card{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:14px 0;padding:17px 18px;border:1px solid #3a6483;background:#10233a;border-radius:13px;color:#eff8ff}\n#md-ap2-repro-card strong{display:block;font-size:1.12rem}#md-ap2-repro-card small{display:block;opacity:.8;margin-top:6px}\n#md-ap2-repro-card button{min-height:43px;padding:10px 17px;font-weight:700;border-radius:8px}\n#ap2ReproductivePage{padding:15px 8px}\n#ap2ReproductivePage .md-ap2-repro-panel{max-width:1080px;margin:0 auto;padding:25px;background:#10233a;border:1px solid #416981;border-radius:16px;color:#ecf5ff}\n#ap2ReproductivePage .md-ap2-repro-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;flex-wrap:wrap}\n#ap2ReproductivePage h1{font-size:1.9rem;margin:8px 0}\n#ap2ReproductivePage h2{font-size:1.25rem;margin:5px 0 10px}\n#ap2ReproductivePage p{line-height:1.5}\n#ap2ReproductivePage .md-ap2-repro-training{margin:24px 0 18px}\n#ap2ReproductivePage .md-ap2-repro-hint{font-size:.96rem;opacity:.88;margin:8px 0 16px}\n#ap2ReproductivePage .md-ap2-repro-small{font-size:.83rem;color:#bbd4dc;margin-top:8px}\n#ap2ReproductivePage .md-srd-tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}\n#ap2ReproductivePage .md-srd-tiles button{display:flex;flex-direction:column;text-align:left;align-items:flex-start;gap:7px;background:#12384b;border:1px solid #4a8b9c;color:#f0f8ff;border-radius:13px;padding:18px;min-height:132px;cursor:pointer;white-space:normal;transition:background .15s,border-color .15s;font:inherit}\n#ap2ReproductivePage .md-srd-tiles button:hover,#ap2ReproductivePage .md-srd-tiles button:focus-visible{background:#1d5361;border-color:#84d9d1;outline-offset:3px}\n#ap2ReproductivePage .md-srd-tiles button.md-srd-feature{border:2px solid #64c9bb;background:#174955}\n#ap2ReproductivePage .md-srd-tiles button strong{font-size:1.03rem;line-height:1.3}\n#ap2ReproductivePage .md-srd-tiles button small{font-size:.82rem;opacity:.9;line-height:1.4}\n#ap2ReproductivePage .md-srd-tile-icon{font-size:1.35rem}\n#ap2ReproductivePage .md-srd-length-setting{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:19px 0 9px;padding:14px 16px;background:#0c2735;border:1px solid #527f8f;border-radius:10px}\n#ap2ReproductivePage .md-srd-length-setting label{font-weight:700}\n#ap2ReproductivePage .md-srd-length-setting select{min-height:44px;border:1px solid #6393a4;border-radius:8px;background:#061923;color:white;padding:9px;min-width:180px;max-width:100%}\n#ap2ReproductivePage .md-ap2-repro-notes{margin-top:20px;font-size:.9rem;opacity:.92}\n#ap2ReproductivePage .md-ap2-repro-notes summary{cursor:pointer;font-weight:700}\n@media(max-width:640px){#ap2ReproductivePage .md-srd-tiles{grid-template-columns:1fr}#ap2ReproductivePage .md-srd-tiles button{min-height:105px}#ap2ReproductivePage .md-ap2-repro-panel{padding:16px}}\n";
document.head.appendChild(css);
document.title='Med Daddy v9.11.42 — A&P II Reproductive System';
window.MD_AP2_REPRO_91137={ready:true,version:'9.11.42',qualityRepairs:163,counts:{review:125,lecture:115,slideExpansion:40,highYield:50,uniquePlayable:240},sourceNote:'25 review objectives × 5; 75 original lecture + 40 deep-cut slides; 3-per-every-Quick-Quiz claim NOT made',highYieldCoverage:concepts,answerCounts:letters,errors:[]};
})();