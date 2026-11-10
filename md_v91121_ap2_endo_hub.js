/* Med Daddy v9.11.21 — A&P II Endocrine launch hub.
 * 25 instructor-review points x 5 original questions; 10 high-yield topics x 5.
 * Existing A&P/other units remain unchanged. Patton additions can load separately later.
 */
(()=>{'use strict';
 if(window.MD_AP2_ENDO_91121)return;
 const review=[...(window.MD_AP2_ENDO_REV_A_91121||[]),...(window.MD_AP2_ENDO_REV_B_91121||[]),...(window.MD_AP2_ENDO_REV_C_91121||[])];
 const patton=window.MD_AP2_ENDO_PATTON_91121||[];
 const errors=[];
 const registry=window.MD_SAFE_QUESTIONS;
 const parent=document.getElementById('ap2UrinaryPage');
 const anchor=document.getElementById('ap2UnitThree');
 if(review.length!==125)errors.push('Expected 125 Endocrine review questions');
 if(!(registry instanceof Map))errors.push('Med Daddy question registry missing');
 if(!parent||!anchor)errors.push('Existing A&P unit navigation missing');
 if(typeof start!=='function'||typeof show!=='function'||typeof shuffle!=='function')errors.push('Existing study engine unavailable');
 const ids=new Set(),stems=new Set(),counts={};
 const normalize=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 for(const q of [...review,...patton]){
  if(!q?.id||ids.has(q.id)||!q.prompt||!Array.isArray(q.choices)||q.choices.length!==4||
     !/^[ABCD]$/.test(q.answer)||!q.whyCorrect||Object.keys(q.whyWrong||{}).length!==3||
     !q.sourceLocator||new Set(q.choices).size!==4)errors.push('Question format: '+(q?.id||'?'));
  ids.add(q.id);const norm=normalize(q.prompt);if(stems.has(norm))errors.push('Duplicate stem: '+q.id);stems.add(norm);
 }
 for(const q of review)counts[q.reviewPoint]=(counts[q.reviewPoint]||0)+1;
 for(let p=1;p<=25;p++)if(counts[p]!==5)errors.push('Review point '+p+' incomplete');
 if(patton.length&&patton.length!==39)errors.push('Patton must be complete 39 Q or absent');
 if(patton.length){
  const expected={'25/Review Questions':6,'25/Critical Thinking Questions':5,'26/Review Questions':18,'26/Critical Thinking Questions':10};
  for(const [key,num] of Object.entries(expected)){
   const [ch,sec]=key.split('/');
   const n=patton.filter(q=>q.chapter===Number(ch)&&q.sourceSection===sec).length;
   if(n!==num)errors.push('Patton '+key+' incomplete: '+n);
  }
 }
 const highYieldConcepts=[
  {name:'Thyroid feedback regulation',parts:[[2,5]]},
  {name:'Hormone chemical classes',parts:[[4,5]]},
  {name:'Mobile receptor versus second messenger',parts:[[8,5]]},
  {name:'Pituitary production and release',parts:[[11,3],[12,2]]},
  {name:'Thyroid structure and hormone function',parts:[[19,2],[20,3]]},
  {name:'Adrenal cortex and its zones',parts:[[23,5]]},
  {name:'Calcium regulation',parts:[[18,5]]},
  {name:'Pancreatic islet physiology',parts:[[16,5]]},
  {name:'Renin-angiotensin, ADH and ANH',parts:[[24,5]]},
  {name:'Classic endocrine disorders',parts:[[25,5]]}
 ];
 const highYield=[];
 for(const concept of highYieldConcepts){
  const items=concept.parts.flatMap(([point,n])=>review.filter(q=>q.reviewPoint===point).slice(0,n));
  if(items.length!==5)errors.push('High-Yield concept incomplete: '+concept.name);
  highYield.push(...items);
 }
 if(highYield.length!==50||new Set(highYield.map(q=>q.id)).size!==50)errors.push('High-Yield 50 duplicate/size');
 if(errors.length){window.MD_AP2_ENDO_91121={ready:false,errors};console.error('A&P endocrine initialization prevented',errors);return;}
 for(const q of [...review,...patton]){
  const old=registry.get(q.id);
  if(old&&(old.prompt!==q.prompt||old.answer!==q.answer)){errors.push('Registry collision: '+q.id);break;}
 }
 if(errors.length){window.MD_AP2_ENDO_91121={ready:false,errors};return;}
 for(const q of [...review,...patton])if(!registry.has(q.id))registry.set(q.id,q);
 if(typeof BANK!=='undefined'&&Array.isArray(BANK))
  for(const q of [...review,...patton])if(!BANK.some(x=>x.id===q.id))BANK.push(q);
 const page=document.createElement('section');
 page.id='ap2EndocrinePage';page.style.display='none';page.className='md-endo-contained';
 page.innerHTML=
 '<section class="md-endo-panel">'+
 '<div class="md-endo-head"><div><small>ANATOMY &amp; PHYSIOLOGY II · INSTRUCTOR STANDARD</small>'+
 '<h1>Endocrine System</h1><p>Source-linked, instructor-level hormone and gland physiology. No PCP directive questions in this A&amp;P unit.</p></div>'+
 '<button type="button" id="md-endo-home">Study Home</button></div>'+
 '<div class="md-endo-control"><label for="md-endo-bank">Question deck</label>'+
 '<select id="md-endo-bank"><option value="high">High-Yield 50 · 10 key concepts × 5 questions</option>'+
 '<option value="review">Instructor 25-Point Endocrine Review · 125 questions</option>'+
 (patton.length?'<option value="patton">Patton Chapters 25–26 · 39 review questions</option><option value="all">Complete Endocrine Science · '+(review.length+patton.length)+' questions</option>':'')+
 '</select><label for="md-endo-length">Session length</label>'+
 '<select id="md-endo-length"><option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="all">Full selected bank</option></select>'+
 '<button type="button" class="success" id="md-endo-start">Start A&amp;P Endocrine Exam</button></div>'+
 '<p id="md-endo-meta" class="muted" aria-live="polite"></p>'+
 '<details class="md-endo-notes"><summary>Source coverage &amp; study notes</summary>'+
 '<p><strong>Instructor review:</strong> Endocrine review.doc, all 25 numbered points, five nonduplicate questions each. Endocrine Regulation.ppt and Endocrine Glands.ppt cross-check key mechanisms; Hormones Study Tool.ppt provides additional study emphasis.</p>'+
 '<p><strong>Textbook:</strong> Patton Anatomy &amp; Physiology, 11th edition, chapters 25 Endocrine Regulation and 26 Endocrine Glands. The High-Yield 50 is a curated selection from the 125 authored review questions, not an additional 50 original questions.</p>'+
 (patton.length?'<p><strong>Patton deck:</strong> one authored MCQ for every 6+18 chapter Review Questions and 5+10 Critical Thinking prompts, preserved as a separate source-mapped selection.</p>':'<p><strong>Patton end-of-chapter deck:</strong> not yet included in this release; the review bank remains independently usable.</p>')+
 '<p>For detailed male reproductive anatomy, the assigned Patton chapter is 45; that is not represented as a complete instructor-reviewed male unit here.</p></details></section>';
 parent.prepend(page);
 const card=document.createElement('div');card.id='md-ap2-endo-card';card.className='md-endo-card';
 card.innerHTML='<div><strong>A&amp;P II — Endocrine System</strong><small>25-point instructor review · 125 questions · High-Yield 50</small></div>'+
 '<button type="button" id="md-endo-open">Open Endocrine Unit</button>';
 anchor.after(card);
 function exit(){parent.classList.remove('md-endo-unit-visible');page.style.display='none';show('studyHub')}
 function open(){
  parent.classList.remove('md-lymph-unit-visible');
  const lymph=document.getElementById('ap2LymphPage');if(lymph)lymph.style.display='none';
  show('ap2UrinaryPage');
  parent.classList.add('md-endo-unit-visible');page.style.display='block';
  page.scrollIntoView?.({block:'start'});
 }
 page.querySelector('#md-endo-home').onclick=exit;
 card.querySelector('#md-endo-open').onclick=open;
 const bank=page.querySelector('#md-endo-bank'),length=page.querySelector('#md-endo-length'),meta=page.querySelector('#md-endo-meta');
 const pools={high:highYield,review,patton,all:[...review,...patton]};
 function options(){
  const pool=pools[bank.value]||highYield;
  [...length.options].forEach(o=>o.disabled=o.value!=='all'&&Number(o.value)>pool.length);
  if(length.selectedOptions?.[0]?.disabled)length.value='all';
  meta.textContent=pool.length+' distinct, source-linked questions. Each answer has individual option explanations.';
 }
 bank.onchange=options;length.onchange=options;options();
 page.querySelector('#md-endo-start').onclick=()=>{
  const pool=pools[bank.value]||highYield;
  const n=length.value==='all'?pool.length:Math.min(Number(length.value),pool.length);
  if(n<50){meta.textContent='A full-length session needs at least 50 questions. Select a larger deck.';return;}
  const selection=shuffle(pool.slice()).slice(0,n);
  if(selection.some(q=>registry.get(q.id)?.answer!==q.answer)){meta.textContent='Registry mismatch: session was not started.';return;}
  const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
  if(recycle)recycle.checked=false;if(adaptive)adaptive.checked=false;
  parent.classList.remove('md-endo-unit-visible');page.style.display='none';
  start(selection);
  if(typeof quiz!=='undefined'&&quiz.length!==n)console.warn('A&P Endocrine expected '+n+' questions; engine loaded '+quiz.length);
 };
 const css=document.createElement('style');css.id='md-ap2-endo-style';
 css.textContent='#ap2UrinaryPage.md-endo-unit-visible > :not(#ap2EndocrinePage){display:none !important}'+
 '#md-ap2-endo-card{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:14px 0;padding:17px 18px;border:1px solid #3a6483;background:#10233a;border-radius:13px;color:#eff8ff}'+
 '#md-ap2-endo-card strong{display:block;font-size:1.12rem}#md-ap2-endo-card small{display:block;opacity:.8;margin-top:6px}'+
 '#md-ap2-endo-card button{min-height:43px;padding:10px 17px;font-weight:700;border-radius:8px}'+
 '#ap2EndocrinePage{padding:15px 8px}#ap2EndocrinePage .md-endo-panel{max-width:1080px;margin:0 auto;padding:25px;background:#10233a;border:1px solid #416981;border-radius:16px;color:#ecf5ff}'+
 '#ap2EndocrinePage .md-endo-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;flex-wrap:wrap}'+
 '#ap2EndocrinePage h1{font-size:1.9rem;margin:8px 0}#ap2EndocrinePage p{line-height:1.5}'+
 '#ap2EndocrinePage .md-endo-control{display:grid;grid-template-columns:160px 1fr;align-items:center;gap:13px;margin:22px 0}'+
 '#ap2EndocrinePage label{font-weight:700}#ap2EndocrinePage select{width:100%;min-height:47px;padding:10px;background:#06192b;color:#fff;border:1px solid #527898;border-radius:9px}'+
 '#ap2EndocrinePage button{min-height:46px;padding:10px 16px;font-weight:700}#ap2EndocrinePage #md-endo-start{grid-column:1/-1}'+
 '#ap2EndocrinePage .md-endo-notes{margin-top:20px;font-size:.9rem;opacity:.92}'+
 '#ap2EndocrinePage .md-endo-notes summary{cursor:pointer;font-weight:700}'+
 '@media(max-width:650px){#ap2EndocrinePage .md-endo-control{grid-template-columns:1fr}}';
 document.head.appendChild(css);
 document.title='Med Daddy v9.11.21 — A&P II Endocrine System';
 window.MD_AP2_ENDO_91121={ready:true,version:'9.11.21',counts:{review:review.length,patton:patton.length,highYield:highYield.length,uniquePlayable:review.length+patton.length},highYieldCoverage:highYieldConcepts.map(g=>({concept:g.name,parts:g.parts})),errors:[]};
})();