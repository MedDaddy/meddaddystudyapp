/* Med Daddy v9.11.15 — A&P II Lymphatic & Immune Systems
 * Instructor-review 70 Q (five for each of 14 points), ten-concept High-Yield 50,
 * TWO original-preserved 250-item source mocks. Uses existing Med Daddy engine.
 * The private practice test influenced STYLISTIC standards only and is never published.
 */
(()=>{'use strict';
 if(window.MD_AP2_LYMPH_91115)return;
 const a=window.MD_AP2_LYMPH_REVIEW_A_91115||[];
 const b=window.MD_AP2_LYMPH_REVIEW_B_91115||[];
 const mockA=window.MD_AP2_LYMPH_MOCK_A_91115||[];
 const mockB=window.MD_AP2_LYMPH_MOCK_B_91115||[];
 const clean=window.MD_AP2_LYMPH_CLEAN_91116||[];
 const cleanAudit=window.MD_AP2_LYMPH_CLEAN_AUDIT_91116||{};
 const quality=[window.MD_AP2_LYMPH_QUALITY_REVIEW_91116,window.MD_AP2_LYMPH_QUALITY_LECTURE_A_91116,window.MD_AP2_LYMPH_QUALITY_LECTURE_B_91116,window.MD_AP2_LYMPH_QUALITY_REVIEW_FINAL_91116,window.MD_AP2_LYMPH_QUALITY_LECTURE_FINAL_91116];
 const review=[...a,...b];
 const lecture=[...(window.MD_AP2_LYMPH_LECTURE_A_91115||[]),...(window.MD_AP2_LYMPH_LECTURE_B_91115||[]),...(window.MD_AP2_LYMPH_LECTURE_C_91115||[])];
 const patton=[...(window.MD_AP2_PATTON_CH31_REVIEW_91119||[]),...(window.MD_AP2_PATTON_CH32_REVIEW_91119||[]),...(window.MD_AP2_PATTON_CH33_REVIEW_91119||[])];
 const registry=window.MD_SAFE_QUESTIONS;
 const urinary=document.getElementById('ap2UrinaryPage');
 const homeUnit=document.getElementById('ap2UnitThree');
 const errors=[];
 if(review.length!==70||lecture.length!==57||patton.length!==56||mockA.length!==250||mockB.length!==250||clean.length!==127||!cleanAudit.ready)errors.push('A&P Lymph source banks or audited practice bank incomplete');
 if(quality.some(q=>!q?.ready)||quality.reduce((n,q)=>n+(q?.changed||q?.fixed||0),0)!==88)errors.push('A&P original question-quality repairs did not load');
 if(!(registry instanceof Map))errors.push('Question registry unavailable');
 if(!urinary||!homeUnit)errors.push('Med Daddy A&P study pages not found');
 if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')errors.push('Med Daddy study engine unavailable');
 const IDs=new Set();
 for(const q of [...review,...lecture,...patton,...clean]){
  if(!q||!q.id||IDs.has(q.id)||typeof q.prompt!=='string'||!Array.isArray(q.choices)||q.choices.length!==4||!/^[ABCD]$/.test(q.answer))errors.push('Question format/id: '+(q?.id||'?'));
  IDs.add(q.id);
 }
 for(const q of clean){
  if(!q.whyCorrect||!q.sourceLocator||q.choices['ABCD'.indexOf(q.answer)]!==q.sourceAnswerText)
   errors.push('Clean source answer mismatch: '+q.id);
 }
 const chq={31:{R:19,C:5},32:{R:8,C:7},33:{R:12,C:5}};
 for(const [ch,counts] of Object.entries(chq)){
  for(const [kind,n] of Object.entries(counts)){
   const items=patton.filter(q=>q.chapter===Number(ch)&&q.sourceSection===(kind==='R'?'Review Questions':'Critical Thinking Questions'));
   if(items.length!==n||new Set(items.map(q=>q.reviewQuestionNumber)).size!==n)
    errors.push('Patton chapter '+ch+' '+kind+' source coverage mismatch');
  }
 }
 for(const q of patton){
  if(!q.sourceLocator||!q.whyCorrect||Object.keys(q.whyWrong||{}).length!==3||new Set(q.choices.map(x=>String(x).toLowerCase().trim())).size!==4)
   errors.push('Patton book review content/rationale failure '+q.id);
 }
  const byPoint=new Map();
 for(const q of review){
  byPoint.set(q.reviewPoint,(byPoint.get(q.reviewPoint)||0)+1);
  if(!q.whyCorrect||Object.keys(q.whyWrong||{}).length!==3||!q.sourceLocator)errors.push('Review explanation/source: '+q.id);
 }
 for(let i=1;i<=14;i++)if(byPoint.get(i)!==5)errors.push('Review point '+i+' does not have five items');
 for(const [name,items] of [['A',mockA],['B',mockB]]){
  items.forEach((q,i)=>{if(q.originalOrdinal!==i+1)errors.push('Mock '+name+' source order at '+(i+1));});
 }
 const byLecturePrompt=new Map();
 for(const q of lecture){
  const key=q.lectureSlide+'.'+q.lecturePromptIndex;
  byLecturePrompt.set(key,(byLecturePrompt.get(key)||0)+1);
  if(!q.whyCorrect||Object.keys(q.whyWrong||{}).length!==3||!q.sourceLocator)
   errors.push('Lecture rationale/source: '+q.id);
 }
 for(const [slide,count] of [[7,3],[25,4],[33,2],[54,4],[61,3],[68,3]]){
  const indices=slide===7?[1,2,3]:slide===25?[4,5,6,7]:slide===33?[8,9]:slide===54?[10,11,12,13]:slide===61?[14,15,16]:[17,18,19];
  for(const idx of indices)if(byLecturePrompt.get(slide+'.'+idx)!==3)errors.push('Lecture Quick Quiz '+slide+' prompt '+idx+' needs 3 questions');
 }
  if(!errors.length)for(const q of [...review,...lecture,...patton,...clean]){
  const old=registry.get(q.id);
  if(old&&(old.prompt!==q.prompt||old.answer!==q.answer)){errors.push('Registry collision: '+q.id);continue;}
  if(!old)registry.set(q.id,q);
 }
 if(!errors.length&&typeof BANK!=='undefined'&&Array.isArray(BANK)){
  for(const q of [...review,...lecture,...patton])if(!BANK.some(x=>x.id===q.id))BANK.push(q);
 }
 if(errors.length){window.MD_AP2_LYMPH_91115={ready:false,errors};console.error('Lymph unit start prevented',errors);return;}
 // High-Yield 50 follows our ten key concepts x five questions standard.
 // The groups below retain coverage of all fourteen instructor-review points.
 const highYieldConcepts=[
  {name:'Fluid compartments',parts:[[1,5]]},
  {name:'Lymphatic vessels and circulation',parts:[[2,3],[4,2]]},
  {name:'Lymph nodes',parts:[[3,5]]},
  {name:'Lymphoid organs',parts:[[5,5]]},
  {name:'Innate and adaptive defence',parts:[[6,3],[7,2]]},
  {name:'Phagocytes',parts:[[8,5]]},
  {name:'Antibodies and humoral immunity',parts:[[9,3],[11,2]]},
  {name:'Acquired immunity and clonal selection',parts:[[10,3],[13,2]]},
  {name:'Complement',parts:[[12,5]]},
  {name:'Interferons',parts:[[14,5]]}
 ];
 const highYield=[],highYieldCoverage=[];
 for(const concept of highYieldConcepts){
  const qs=concept.parts.flatMap(([p,n])=>review.filter(q=>q.reviewPoint===p).slice(0,n));
  if(qs.length!==5){
   window.MD_AP2_LYMPH_91115={ready:false,errors:['High Yield concept incomplete: '+concept.name]};return;
  }
  highYield.push(...qs);
  highYieldCoverage.push({concept:concept.name,questionIds:qs.map(q=>q.id)});
 }
 if(highYield.length!==50||new Set(highYield.map(q=>q.id)).size!==50||
    new Set(highYield.map(q=>q.reviewPoint)).size!==14){
  window.MD_AP2_LYMPH_91115={ready:false,errors:['High Yield 50 concept coverage/duplicate mismatch']};return;
 }
 const page=document.createElement('section');
 page.id='ap2LymphPage';page.className='md-lymph-contained';page.style.display='none';
 page.innerHTML=
 '<section class="md-lymph-panel">'+
 '<div class="md-lymph-head"><div><small>ANATOMY &amp; PHYSIOLOGY II · NOV 10</small><h1>Lymphatic &amp; Immune Systems</h1>'+
 '<p>Direct A&amp;P review questions plus a deduplicated, course-screened mock with randomized A–D answer positions. Original PDF copies remain archived.</p></div>'+ 
 '<button type="button" id="md-lymph-home">Study Home</button></div>'+
 '<div class="md-lymph-control"><label for="md-lymph-bank">Question deck</label>'+
 '<select id="md-lymph-bank">'+
 '<option value="high">High-Yield 50 · 10 key concepts × 5 questions</option>'+
 '<option value="science">Complete A&amp;P Lymphatic/Immune Science · 183 questions</option>'+ 
 '<option value="review">Instructor 14-Point Review · 70 questions</option>'+
 '<option value="lecture">Immune Lecture Quick Quiz Coverage · 57 questions</option>'+ 
 '<option value="patton">Patton Chapters 31–33 · End-of-Chapter Reviews · 56 questions</option>'+  
 '<option value="clean">Cleaned Source Mock · 127 unique questions</option>'+ 

 '</select>'+
 '<label for="md-lymph-length">Session length</label>'+
 '<select id="md-lymph-length"><option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="all">Full selected bank</option></select>'+
 '<button type="button" id="md-lymph-start" class="success">Start A&amp;P Lymph Exam</button></div>'+
 '<p id="md-lymph-meta" class="muted" aria-live="polite"></p>'+
 '<details class="md-lymph-notes"><summary>Sources &amp; original mocks</summary>'+
 '<p><strong>Review:</strong> Lymph immune review.doc (14 points × five questions) plus Immune System.ppt (19 Quick Quiz prompts × three questions). Patton Anatomy &amp; Physiology 11e: Ch 31 Lymphatic System, Ch 32 Innate Immunity, Ch 33 Adaptive Immunity. Additionally, 56 original questions now individually map to all 39 textbook end-of-chapter Review Questions and all 17 Critical Thinking prompts.</p>'+  
 '<p><strong>Mock audit:</strong> The two 250-question source PDFs remain unchanged in the GitHub archive. Their 500 raw items contain 184 repeated stems, extensive non-A&amp;P material, questionable keys and extreme B-answer bias. The live cleaned mock contains 127 distinct course-screened A&amp;P questions drawn from both, with original correct answer text preserved and new A–D option positions balanced 32/32/32/31. Source item numbers and original keys remain in metadata.</p>'+ 
 '<p>High Yield 50 uses ten concepts with five questions each, covering all 14 instructor-review points; these are selections from the authored review, not 50 additional original questions. The old private test is not included.</p></details>'+
 '</section>';
 // Keep the unit inside Med Daddy's EXISTING registered A&P page;
 // sibling pages copied from .page are hidden by the app's show() navigation.
 urinary.prepend(page);
 const unitCard=document.createElement('div');
 unitCard.id='md-ap2-lymph-card';unitCard.className='md-lymph-card';
 unitCard.innerHTML='<div><strong>A&amp;P II — Lymphatic &amp; Immune Systems</strong><small>Nov 10 · 183 authored questions · 127 cleaned mock questions</small></div>'+   
 '<button type="button" id="md-lymph-open">Open Lymphatic Unit</button>';
 homeUnit.after(unitCard);
 function open(){
  // Select the supported A&P page, then show its nested Lymph content.
  // Never hide the parent page or use an unregistered page class.
  show('ap2UrinaryPage');
  urinary.classList.add('md-lymph-unit-visible');
  page.style.display='block';
  page.scrollIntoView?.({block:'start'});
 }
 function exit(){
  urinary.classList.remove('md-lymph-unit-visible');
  page.style.display='none';
  show('studyHub');
 }
 page.querySelector('#md-lymph-home').onclick=exit;
 unitCard.querySelector('#md-lymph-open').onclick=open;
 const sel=page.querySelector('#md-lymph-bank'),length=page.querySelector('#md-lymph-length'),meta=page.querySelector('#md-lymph-meta');
 const banks={high:highYield,science:[...review,...lecture,...patton],review,lecture,patton,clean};
 function options(){
  const pool=banks[sel.value];
  [...length.options].forEach(o=>o.disabled=o.value!=='all'&&Number(o.value)>pool.length);
  if(length.selectedOptions?.[0]?.disabled)length.value='all';
  const mock=sel.value==='clean';
  meta.textContent=pool.length+' questions • '+(mock?'One copy per selected course concept; answer placements rebalanced A–D; no original B-letter pattern':'Course-based A&P, short stems and individual answer explanations')+'.';
 }
 sel.onchange=options;length.onchange=options;options();
 page.querySelector('#md-lymph-start').onclick=()=>{
  const source=banks[sel.value];
  const full=length.value==='all';
  const n=full?source.length:Math.min(Number(length.value),source.length);
  if(n<50){meta.textContent='A complete session needs at least 50 questions.';return;}
  // All playable sessions shuffle question order. The source PDF files stay unchanged.
  let selection=shuffle(source.slice()).slice(0,n);
  if(selection.length!==n||selection.some(q=>registry.get(q.id)?.answer!==q.answer)){
   meta.textContent='Question registry mismatch. Nothing was started or reset.';return;
  }
  const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
  if(recycle)recycle.checked=false;
  if(adaptive)adaptive.checked=false;
  // Restore the A&P parent's ordinary content before the quiz engine
  // changes screens. The app controls its own page visibility.
  urinary.classList.remove('md-lymph-unit-visible');
  page.style.display='none';
  start(selection);
  if(typeof quiz!=='undefined'&&quiz.length!==n)console.warn('Lymph exam expected '+n+', quiz engine loaded '+quiz.length);
 };
 const css=document.createElement('style');css.id='md-ap2-lymph-style';
 css.textContent=
 '#ap2UrinaryPage.md-lymph-unit-visible > :not(#ap2LymphPage){display:none !important}'+
 '#md-ap2-lymph-card{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:14px 0;padding:17px 18px;border:1px solid #3a6483;background:#10233a;border-radius:13px;color:#eff8ff}'+
 '#md-ap2-lymph-card strong{display:block;font-size:1.12rem}#md-ap2-lymph-card small{display:block;opacity:.8;margin-top:6px}'+
 '#md-ap2-lymph-card button{min-height:43px;padding:10px 17px;font-weight:700;border-radius:8px}'+
 '#ap2LymphPage{padding:15px 8px}#ap2LymphPage .md-lymph-panel{max-width:1080px;margin:0 auto;padding:25px;background:#10233a;border:1px solid #416981;border-radius:16px;color:#ecf5ff}'+
 '#ap2LymphPage .md-lymph-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;flex-wrap:wrap}'+
 '#ap2LymphPage h1{font-size:1.9rem;margin:8px 0}#ap2LymphPage p{line-height:1.5}'+
 '#ap2LymphPage .md-lymph-control{display:grid;grid-template-columns:160px 1fr;align-items:center;gap:13px;margin:22px 0}'+
 '#ap2LymphPage label{font-weight:700}#ap2LymphPage select{width:100%;min-height:47px;padding:10px;background:#06192b;color:#fff;border:1px solid #527898;border-radius:9px}'+
 '#ap2LymphPage button{min-height:46px;padding:10px 16px;font-weight:700}'+
 '#ap2LymphPage #md-lymph-start{grid-column:1/-1}#ap2LymphPage .md-lymph-notes{margin-top:20px;font-size:.9rem;opacity:.92}'+
 '#ap2LymphPage .md-lymph-notes summary{cursor:pointer;font-weight:700}'+
 '@media(max-width:650px){#ap2LymphPage .md-lymph-control{grid-template-columns:1fr}}';
 document.head.appendChild(css);
 document.title='Med Daddy v9.11.20 — A&P II Lymphatic & Immune Systems';
 window.MD_AP2_LYMPH_91115={ready:true,version:'9.11.20',highYieldCoverage,counts:{review:review.length,lecture:lecture.length,pattonChapterReviews:patton.length,science:review.length+lecture.length+patton.length,highYield:highYield.length,cleanMock:clean.length,archivedMocks:mockA.length+mockB.length,totalPlayableUnique:review.length+lecture.length+patton.length+clean.length},mockAudit:cleanAudit,sources:['Patton 11e Ch31','Patton 11e Ch32','Patton 11e Ch33','Lymph immune review.doc','Immune System.ppt','A&P II LYMPH mock.pdf','A&P II Lymph Mock (1).pdf'],privateMockNeverPublished:true,reviewPointCounts:Object.fromEntries([...byPoint]),errors};
})();