/* Med Daddy v9.11.15 — A&P II Lymphatic & Immune Systems
 * Instructor-review 70 Q (five for each of 14 points), balanced High-Yield 50,
 * TWO original-preserved 250-item source mocks. Uses existing Med Daddy engine.
 * The private practice test influenced STYLISTIC standards only and is never published.
 */
(()=>{'use strict';
 if(window.MD_AP2_LYMPH_91115)return;
 const a=window.MD_AP2_LYMPH_REVIEW_A_91115||[];
 const b=window.MD_AP2_LYMPH_REVIEW_B_91115||[];
 const mockA=window.MD_AP2_LYMPH_MOCK_A_91115||[];
 const mockB=window.MD_AP2_LYMPH_MOCK_B_91115||[];
 const review=[...a,...b];
 const registry=window.MD_SAFE_QUESTIONS;
 const urinary=document.getElementById('ap2UrinaryPage');
 const homeUnit=document.getElementById('ap2UnitThree');
 const errors=[];
 if(review.length!==70||mockA.length!==250||mockB.length!==250)errors.push('A&P Lymph source banks incomplete');
 if(!(registry instanceof Map))errors.push('Question registry unavailable');
 if(!urinary||!homeUnit)errors.push('Med Daddy A&P study pages not found');
 if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')errors.push('Med Daddy study engine unavailable');
 const IDs=new Set();
 for(const q of [...review,...mockA,...mockB]){
  if(!q||!q.id||IDs.has(q.id)||typeof q.prompt!=='string'||!Array.isArray(q.choices)||q.choices.length!==4||!/^[ABCD]$/.test(q.answer))errors.push('Question format/id: '+(q?.id||'?'));
  IDs.add(q.id);
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
 if(!errors.length)for(const q of [...review,...mockA,...mockB]){
  const old=registry.get(q.id);
  if(old&&(old.prompt!==q.prompt||old.answer!==q.answer)){errors.push('Registry collision: '+q.id);continue;}
  if(!old)registry.set(q.id,q);
 }
 if(!errors.length&&typeof BANK!=='undefined'&&Array.isArray(BANK)){
  for(const q of review)if(!BANK.some(x=>x.id===q.id))BANK.push(q);
 }
 if(errors.length){window.MD_AP2_LYMPH_91115={ready:false,errors};console.error('Lymph unit start prevented',errors);return;}
 // Assemble a balanced High-Yield 50; 14 topics represented with at least 3 Q each.
 const highYield=[];
 for(let p=1;p<=14;p++){
  const pointQuestions=review.filter(q=>q.reviewPoint===p);
  const take=p<=8?4:3;
  highYield.push(...pointQuestions.slice(0,take));
 }
 if(highYield.length!==50||new Set(highYield.map(x=>x.id)).size!==50){
  window.MD_AP2_LYMPH_91115={ready:false,errors:['High Yield 50 coverage mismatch']};return;
 }
 const page=document.createElement('section');
 page.id='ap2LymphPage';page.className=urinary.className;page.style.display='none';
 page.innerHTML=
 '<section class="md-lymph-panel">'+
 '<div class="md-lymph-head"><div><small>ANATOMY &amp; PHYSIOLOGY II · NOV 10</small><h1>Lymphatic &amp; Immune Systems</h1>'+
 '<p>Short, demanding A&amp;P questions based on the 14-point review and Patton 11e Chapters 31–33. Original mocks stay unchanged and separate.</p></div>'+
 '<button type="button" id="md-lymph-home">Study Home</button></div>'+
 '<div class="md-lymph-control"><label for="md-lymph-bank">Question deck</label>'+
 '<select id="md-lymph-bank">'+
 '<option value="high">High-Yield 50 · private-test question style</option>'+
 '<option value="review">Instructor 14-Point Review · 70 questions</option>'+
 '<option value="a">Original Mock A · 250 questions (preserved)</option>'+
 '<option value="b">Original Mock B · 250 questions (preserved)</option>'+
 '</select>'+
 '<label for="md-lymph-length">Session length</label>'+
 '<select id="md-lymph-length"><option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="all">Full selected bank</option></select>'+
 '<button type="button" id="md-lymph-start" class="success">Start A&amp;P Lymph Exam</button></div>'+
 '<p id="md-lymph-meta" class="muted" aria-live="polite"></p>'+
 '<details class="md-lymph-notes"><summary>Sources &amp; original mocks</summary>'+
 '<p><strong>Review:</strong> Lymph immune review.doc (14 topics; five new instructor-style questions per point), Immune System.ppt, Patton Anatomy &amp; Physiology 11e Ch 31 Lymphatic System, Ch 32 Innate Immunity, Ch 33 Adaptive Immunity.</p>'+
 '<p><strong>Original mocks:</strong> A&amp;P II LYMPH mock.pdf (250) and A&amp;P II Lymph Mock (1).pdf (250). Original wording, choices, answer positions and order retained. Original answer keys are supplied, not independently certified; some source items cover PCP management outside this A&amp;P unit.</p>'+
 '<p>High Yield 50 is a balanced selection from the 70 newly authored questions, not 50 additional original questions. The old private test is not included.</p></details>'+
 '</section>';
 urinary.after(page);
 const unitCard=document.createElement('div');
 unitCard.id='md-ap2-lymph-card';unitCard.className='md-lymph-card';
 unitCard.innerHTML='<div><strong>A&amp;P II — Lymphatic &amp; Immune Systems</strong><small>Nov 10 · High-Yield 50 · 14 review points · 2 preserved mocks</small></div>'+
 '<button type="button" id="md-lymph-open">Open Lymphatic Unit</button>';
 homeUnit.after(unitCard);
 function open(){
  show('ap2UrinaryPage');
  urinary.style.display='none';page.style.display='block';
  page.scrollIntoView?.({block:'start'});
 }
 function exit(){
  page.style.display='none';urinary.style.display='';
  show('studyHub');
 }
 page.querySelector('#md-lymph-home').onclick=exit;
 unitCard.querySelector('#md-lymph-open').onclick=open;
 const sel=page.querySelector('#md-lymph-bank'),length=page.querySelector('#md-lymph-length'),meta=page.querySelector('#md-lymph-meta');
 const banks={high:highYield,review,a:mockA,b:mockB};
 function options(){
  const pool=banks[sel.value];
  [...length.options].forEach(o=>o.disabled=o.value!=='all'&&Number(o.value)>pool.length);
  if(length.selectedOptions?.[0]?.disabled)length.value='all';
  const mock=sel.value==='a'||sel.value==='b';
  meta.textContent=pool.length+' questions • '+(mock?'Original source key and original order in full mode':'14 review points • separate detailed rationales')+'.';
 }
 sel.onchange=options;length.onchange=options;options();
 page.querySelector('#md-lymph-start').onclick=()=>{
  const source=banks[sel.value];
  const full=length.value==='all';
  const n=full?source.length:Math.min(Number(length.value),source.length);
  if(n<50){meta.textContent='A complete session needs at least 50 questions.';return;}
  const mock=sel.value==='a'||sel.value==='b';
  // Keep original 250Q mocks in exact supplied order when selecting Full.
  let selection=(mock&&full)?source.slice():shuffle(source.slice()).slice(0,n);
  if(selection.length!==n||selection.some(q=>registry.get(q.id)?.answer!==q.answer)){
   meta.textContent='Question registry mismatch. Nothing was started or reset.';return;
  }
  const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
  if(recycle)recycle.checked=false;
  if(adaptive)adaptive.checked=false;
  page.style.display='none';urinary.style.display='';
  start(selection);
  if(typeof quiz!=='undefined'&&quiz.length!==n)console.warn('Lymph exam expected '+n+', quiz engine loaded '+quiz.length);
 };
 const css=document.createElement('style');css.id='md-ap2-lymph-style';
 css.textContent=
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
 window.MD_AP2_LYMPH_91115={ready:true,version:'9.11.15',counts:{review:review.length,highYield:highYield.length,mockA:mockA.length,mockB:mockB.length,total:review.length+mockA.length+mockB.length},sources:['Patton 11e Ch31','Patton 11e Ch32','Patton 11e Ch33','Lymph immune review.doc','Immune System.ppt','A&P II LYMPH mock.pdf','A&P II Lymph Mock (1).pdf'],privateMockNeverPublished:true,reviewPointCounts:Object.fromEntries([...byPoint]),errors};
})();