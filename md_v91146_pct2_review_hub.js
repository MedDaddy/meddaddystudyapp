/* Med Daddy v9.11.46 — PCT II Instructor Final Review, expanded independent unit.
 * Covers all 50 instructor study points x 3 = 150 questions.
 * Covers 147 distinct instructor glossary entries x 3 = 441 questions.
 * Includes independently sourced rhythm-image mock when 3 authentic images exist.
 * This unit is in PCT II only; A&P II untouched. All existing PCT II final
 * and unit launchers untouched. No fabricated PCS dose or bypass thresholds.
 */
(()=>{'use strict';
if(window.MD_PCT2_INSTRUCTOR_REVIEW_91146)return;
const base=window.MD_PCT2_FINAL_REVIEW_1144||[];
const extra=window.MD_PCT2_FINAL_REVIEW_EXPANDED_1146;
const words=window.MD_PCT2_REVIEW_KEYWORDS_1146;
const parent=document.getElementById('pct2InfectiousPage'),anchor=document.getElementById('pct2UnitSix');
const registry=window.MD_SAFE_QUESTIONS,errors=[];
if(!parent||!anchor)errors.push('PCT II menu not found');
if(!(registry instanceof Map))errors.push('Original question registry not found');
if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')errors.push('Original study engine not found');
if(base.length!==50||!extra?.ready||extra.questions.length!==100||!words?.ready||words.questions.length!==441||words.terms.length!==147)
 errors.push('An instructor-reviewed source question bank did not load completely');
const review=[...base,...(extra?.questions||[])],keywords=words?.questions||[],all=[...review,...keywords];
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const ids=new Set(),stems=new Set(),pointCounts={},termCounts={},keyCounts={A:0,B:0,C:0,D:0};
for(const q of all){
 if(!q?.id||!q.prompt||!Array.isArray(q.choices)||q.choices.length!==4||
 new Set(q.choices.map(norm)).size!==4||!['A','B','C','D'].includes(q.answer)||!q.whyCorrect||
 Object.keys(q.whyWrong||{}).length!==3||
 q.choices.some((text,i)=>'ABCD'[i]!==q.answer&&!q.whyWrong[text])||
 !q.sourceTitle||!q.sourceLocator)errors.push('Invalid source MCQ '+(q?.id||'?'));
 if(ids.has(q.id)||stems.has(norm(q.prompt)))errors.push('Duplicate ID/stem '+q.id);
 if(q.choices?.some(v=>norm(v).length>=7&&norm(q.prompt).includes(norm(v))))errors.push('Stem-to-option answer leak '+q.id);
 if(registry?.has(q.id))errors.push('Collision with another Med Daddy question '+q.id);
 ids.add(q.id);stems.add(norm(q.prompt));
 if(q.reviewPoint)pointCounts[q.reviewPoint]=(pointCounts[q.reviewPoint]||0)+1;
 if(q.keyword)termCounts[q.keyword]=(termCounts[q.keyword]||0)+1;
 if(q.answer in keyCounts)keyCounts[q.answer]++;
}
for(let i=1;i<=50;i++)if(pointCounts[i]!==3)errors.push('Instructor review point '+i+' does not have exactly 3 distinct questions');
for(const term of words?.terms||[])if(termCounts[term]!==3)errors.push('Glossary term '+term+' does not have exactly 3 distinct questions');
if(ids.size!==591||stems.size!==591)errors.push('Need exactly 591 distinct questions');
if(Math.max(...Object.values(keyCounts))-Math.min(...Object.values(keyCounts))>3)errors.push('Answer-key balance invalid');
if(errors.length){
 window.MD_PCT2_INSTRUCTOR_REVIEW_91146={ready:false,errors};
 console.error('PCT II instructor final review blocked:',errors);return;
}
all.forEach(q=>registry.set(q.id,q));
if(typeof BANK!=='undefined'&&Array.isArray(BANK))
 all.forEach(q=>{if(!BANK.some(other=>other.id===q.id))BANK.push(q);});
const rhythm=Array.isArray(window.MD_ECG_REBUILD_91112?.tracks?.four?.images)?
 window.MD_ECG_REBUILD_91112.tracks.four.images.filter(q=>registry.get(q.id)===q&&q.imageId):
 [...registry.values()].filter(q=>q?.imageId&&/ecg|rhythm/i.test(q.unit||'')&&registry.get(q.id)===q);
const rhythmPool=[...new Map(rhythm.map(q=>[q.id,q])).values()];
const byPoint=Object.fromEntries([...Array(50)].map((_,i)=>[i+1,review.filter(q=>q.reviewPoint===i+1)]));
const byTerm=Object.fromEntries(words.terms.map(term=>[term,keywords.filter(q=>q.keyword===term)]));
const page=document.createElement('section');page.id='pct2InstructorFinalReviewPage';page.style.display='none';
page.innerHTML='<section class="md-pct2-inst-panel">'+
'<header class="md-pct2-inst-head"><div><small>PATIENT CARE &amp; THEORY II · UPLOADED INSTRUCTOR REVIEW</small>'+
'<h1>PCT II — Instructor Final Review</h1><p>Three unique questions for every study objective and every glossary definition, with the original Med Daddy assessment screen and answer explanations.</p></div>'+
'<button type="button" id="md-pct2-inst-home">Study Home</button></header>'+
'<div class="md-pct2-inst-tiles">'+
'<button type="button" data-inst-mode="point50"><span>🎯</span><strong>Instructor Mock 50</strong><small>One rotating question from each of the 50 review points</small></button>'+
'<button type="button" data-inst-mode="point150"><span>📝</span><strong>Instructor Study Questions — 150</strong><small>Exactly 3 questions for each of 50 numbered review points</small></button>'+
'<button type="button" data-inst-mode="term50"><span>🧠</span><strong>Definition Challenge 50</strong><small>50 distinct instructor keywords per session, no repeats</small></button>'+
'<button type="button" data-inst-mode="term147"><span>📚</span><strong>All 147 Definitions</strong><small>One rotating question per keyword, across the full instructor list</small></button>'+
'<button type="button" data-inst-mode="terms441"><span>🔥</span><strong>Complete Vocabulary 441</strong><small>3 questions for every definition: meaning, patient presentation and distinction</small></button>'+
'<button type="button" data-inst-mode="all591"><span>🏆</span><strong>Complete Instructor Bank 591</strong><small>150 numbered-review questions + 441 definition questions</small></button>'+
'<button type="button" data-inst-mode="rhythm50"><span>🫀</span><strong>Exam Mock 50 + 3 Rhythms</strong><small>47 rotating instructor review points + 3 original ECG strip images</small></button>'+
'</div>'+
'<div class="md-pct2-inst-options"><label for="md-pct2-inst-length">Session length for large-bank tiles</label><select id="md-pct2-inst-length"><option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="150">150 questions</option><option value="300">300 questions</option><option value="all">Entire selected deck</option></select></div>'+
'<div class="md-pct2-inst-coverage"><strong>Instructor review:</strong> 50/50 numbered prompts × 3 = 150 questions. <strong>Definitions:</strong> 147/147 unique keywords × 3 = 441 questions. <strong>Original source:</strong> PCT 2 Final Reveiw.docx.</div>'+
'<p class="md-pct2-inst-status" id="md-pct2-inst-status" role="status" aria-live="polite"></p>'+
'<details><summary>Exam scope, sources and safety</summary><p>The instructor document contains study questions and a keyword list, not a verified answer key. Each question is newly authored from its instructor topic and clinically established teaching. Numerical dosing, current stroke bypass eligibility, discharge/transport or procedural details must be checked against the approved Ontario PCP PCS and instructor material.</p><p>The instructor reports three ECG rhythm questions on the actual exam. ECG-specific mock uses three registered original ECG strip images and is disabled if fewer than three valid images are available. The 147 glossary definitions are unique entries: the duplicate epidural hematoma term is counted once and merged two-column entries are separated.</p><p>Large-bank session lengths permit manageable study without changing the authored source banks. A 50-question run from 150 or 441 cannot cover every objective at once; full-deck mode covers every point three times.</p></details>'+
'</section>';
parent.prepend(page);
const card=document.createElement('div');card.id='md-pct2-inst-card';
card.innerHTML='<div><strong>📝 PCT II — Instructor Final Review</strong><small>591 verified unique MCQs · 50 study points × 3 · 147 definitions × 3</small></div>'+
'<button type="button" id="md-pct2-inst-open">Open Instructor Review</button>';
anchor.after(card);
function exit(){parent.classList.remove('md-pct2-inst-visible');page.style.display='none';show('studyHub');}
function open(){
 parent.classList.remove('md-srd-visible','md-pct-final-visible');
 for(const id of ['pct2FinalExamPage','pct2SrdPage']){const other=document.getElementById(id);if(other)other.style.display='none';}
 show('pct2InfectiousPage');parent.classList.add('md-pct2-inst-visible');page.style.display='block';
 render();page.scrollIntoView?.({block:'start'});
}
card.querySelector('#md-pct2-inst-open').onclick=open;
page.querySelector('#md-pct2-inst-home').onclick=exit;
const meta=page.querySelector('#md-pct2-inst-status'),length=page.querySelector('#md-pct2-inst-length');
let round=0;
function point50(){
 return shuffle([...Array(50)].map((_,i)=>shuffle(byPoint[i+1].slice())[(round+i)%3]));
}
function term147(){
 return shuffle(words.terms.map((term,i)=>shuffle(byTerm[term].slice())[(round+i)%3]));
}
function balancedMix(pool,n){
 if(n>=pool.length)return shuffle(pool.slice());
 let pick=[],used=new Set(),stems=new Set();
 const rank=(q)=>q.reviewPoint?'p'+q.reviewPoint:'t'+q.keyword;
 const buckets=new Map();
 for(const q of shuffle(pool.slice())){const key=rank(q);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(q);}
 const keys=shuffle([...buckets.keys()]);
 // pass one: distribute across as many distinct objectives/terms as possible
 for(let pass=0;pass<3&&pick.length<n;pass++)
  for(const key of keys){
   if(pick.length>=n)break;
   const q=buckets.get(key)[pass];if(!q||used.has(q.id)||stems.has(norm(q.prompt)))continue;
   used.add(q.id);stems.add(norm(q.prompt));pick.push(q);
  }
 return shuffle(pick);
}
function build(mode){
 let pool;
 switch(mode){
  case 'point50':return point50();
  case 'point150':pool=review;break;
  case 'term50':return shuffle(term147()).slice(0,50);
  case 'term147':return term147();
  case 'terms441':pool=keywords;break;
  case 'all591':pool=all;break;
  case 'rhythm50':{
   if(rhythmPool.length<3)return {error:'Three authentic registered rhythm-strip images are unavailable; this mock is disabled.'};
   const pts=point50().slice(0,47),strips=shuffle(rhythmPool.slice()).slice(0,3);
   return shuffle([...pts,...strips]);
  }
  default:return {error:'Unknown exam tile'};
 }
 const requested=length.value==='all'?pool.length:Math.min(Number(length.value),pool.length);
 if(!Number.isInteger(requested)||requested<50)return {error:'Select a valid session length'};
 return balancedMix(pool,requested);
}
function render(){
 for(const button of page.querySelectorAll('[data-inst-mode]'))button.disabled=button.dataset.instMode==='rhythm50'&&rhythmPool.length<3;
 meta.textContent='591 source-indexed questions ready: 150 instructor objectives plus 441 vocabulary items. Original ECG strip images available: '+rhythmPool.length+'.';
}
for(const button of page.querySelectorAll('[data-inst-mode]'))button.onclick=()=>{
 const questions=build(button.dataset.instMode);
 if(!Array.isArray(questions)){meta.textContent=questions?.error||'No exam available';return;}
 if(questions.length<50||new Set(questions.map(q=>q.id)).size!==questions.length||
 new Set(questions.map(q=>norm(q.prompt))).size!==questions.length||
 questions.some(q=>registry.get(q.id)!==q)){
  meta.textContent='Session blocked by count, duplicate or question registry mismatch. Progress unchanged.';return;
 }
 round++;
 const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
 if(recycle)recycle.checked=false;if(adaptive)adaptive.checked=false;
 parent.classList.remove('md-pct2-inst-visible');page.style.display='none';
 start(questions);
 if(typeof quiz!=='undefined'&&quiz.length!==questions.length)console.warn('Instructor review expected '+questions.length+' but engine opened '+quiz.length);
};
const css=document.createElement('style');css.id='md-pct2-inst-style';
css.textContent=
'#pct2InfectiousPage.md-pct2-inst-visible > :not(#pct2InstructorFinalReviewPage){display:none!important}'+
'#md-pct2-inst-card{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin:15px 0;padding:18px;border:1px solid #3e7898;background:#10263c;color:#eff8ff;border-radius:13px}'+
'#md-pct2-inst-card strong{display:block;font-size:1.1rem}#md-pct2-inst-card small{display:block;opacity:.86;margin-top:7px}#md-pct2-inst-card button{min-height:44px;font-weight:700;padding:10px 16px}'+
'#pct2InstructorFinalReviewPage{padding:14px 8px;color:#ecf7ff}#pct2InstructorFinalReviewPage .md-pct2-inst-panel{max-width:1100px;margin:0 auto;background:#10263c;border:1px solid #477d95;border-radius:16px;padding:24px}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap}'+
'#pct2InstructorFinalReviewPage h1{font-size:1.85rem;margin:9px 0}#pct2InstructorFinalReviewPage p{line-height:1.5}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:22px 0}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button{min-height:127px;border:1px solid #4b8b9f;background:#153a4b;color:#f3fcff;border-radius:13px;display:flex;flex-direction:column;text-align:left;align-items:flex-start;gap:8px;padding:18px;cursor:pointer;font:inherit}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button:hover,#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button:focus-visible{background:#205568;border-color:#87d4d0}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button:disabled{opacity:.45;cursor:not-allowed}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button span{font-size:1.4rem}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button small{opacity:.89;line-height:1.4}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-tiles button strong{font-size:1.08rem}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-options{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;background:#0a3044;border-radius:10px;padding:13px;margin:13px 0}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-options select{background:#061e2c;color:#fff;border:1px solid #5690a4;border-radius:8px;padding:10px;min-height:42px}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-coverage{padding:13px;background:#0c3042;border-radius:9px;line-height:1.65}'+
'#pct2InstructorFinalReviewPage .md-pct2-inst-status{padding:12px;color:#c9e6f4;background:#081e2d;border-radius:8px;margin:17px 0}'+
'#pct2InstructorFinalReviewPage details{font-size:.9rem}#pct2InstructorFinalReviewPage details summary{font-weight:700;cursor:pointer}'+
'@media(max-width:700px){#pct2InstructorFinalReviewPage .md-pct2-inst-tiles{grid-template-columns:1fr}#pct2InstructorFinalReviewPage .md-pct2-inst-panel{padding:15px}}';
document.head.appendChild(css);
render();
window.MD_PCT2_INSTRUCTOR_REVIEW_91146={ready:true,version:'9.11.46',placement:'PCT II',counts:{review:150,definitions:441,uniqueTotal:591,reviewObjectives:50,keywords:147},answerCounts:keyCounts,authenticRhythmImages:rhythmPool.length,preview:build,open,errors:[]};
})();