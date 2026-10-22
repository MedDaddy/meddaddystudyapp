/* Med Daddy v9.9.6 — Instructor's 20-point Abdominal review as independent practice sets.
   Source-based CURATION, no synthetic questions or changed answer keys.
   The expanded 51-point review remains available through v9.9.3.
   This does NOT claim five new questions per prompt. */
(()=>{'use strict';
 if(window.MD_PATCH_996)return;
 const page=document.getElementById('md990-abdo-page'),original=window.MD_PCT2_ABDO_990,extra=window.MD_PCT2_ABDO_REVIEW_993;
 if(!page||!window.MD_PATCH_993?.ready||!Array.isArray(original)||!Array.isArray(extra)||typeof start!=='function'||typeof shuffle!=='function'){
  window.MD_PATCH_996={ready:false,reason:'Abdominal source sets/quiz engine unavailable'};return;
 }
 // One or more specifically relevant existing questions for each original numbered
 // instructor-study-sheet prompt, curated against the wording of that prompt.
 const sourceMap={
  1:[6,1],2:[52,53],3:[42,41],4:[7,68],5:[13,14],6:[40,48],
  7:[35,67],8:[45,46],9:[43],10:[79],11:[51,50],12:[69],
  13:[4,3],14:[1,6],15:[17,16],16:[2],17:[44,79],
  18:[41,42,49],19:[29],20:[47]
 };
 const all=[...original,...extra],byId=new Map(all.map(q=>[q.id,q]));
 const id=n=>'PCT2-ABDO-CORE-'+String(n).padStart(3,'0');
 const promptIds=Object.keys(sourceMap).map(Number);
 const errors=[];
 if(promptIds.length!==20||promptIds.some((x,i)=>x!==i+1))errors.push('20-point sheet map incomplete');
 for(const [ref,nums] of Object.entries(sourceMap))for(const n of nums)if(!byId.has(id(n)))errors.push('Review '+ref+' missing '+id(n));
 if(errors.length){window.MD_PATCH_996={ready:false,errors};console.error(errors);return;}
 const full=[...new Set(Object.values(sourceMap).flat())].map(n=>byId.get(id(n)));
 const short=Object.values(sourceMap).map(nums=>byId.get(id(nums[0])));
 const safe=window.MD_SAFE_QUESTIONS;
 if(!(safe instanceof Map)||full.some(q=>safe.get(q.id)?.prompt!==q.prompt)){
  window.MD_PATCH_996={ready:false,reason:'Source registry mismatch'};return;
 }
 const hub=page.querySelector('.md992-hub'),main=page.querySelector('.md992-main');
 if(!hub||!main){window.MD_PATCH_996={ready:false,reason:'Study hub unavailable'};return;}
 const card=document.createElement('button');
 card.type='button';card.className='md992-card';card.dataset.md996='sheet';
 card.innerHTML='<strong>Instructor 20-Point Review</strong><span>Original instructor study questions · targeted, independently playable sets</span>';
 main.append(card);
 const section=document.createElement('section');
 section.id='md996-instructor-practice';section.className='md992-browser';
 section.hidden=true;
 section.innerHTML='<h2>Instructor review sheet · 20 numbered objectives</h2>'+
 '<p>Questions drawn from the existing source-linked Abdominal bank. All 20 instructor prompts have at least one relevant question, and multipart prompts have additional linked questions where available. This does not establish the five-per-prompt completion standard.</p>'+
 '<div class="md996-actions">'+
 '<button type="button" data-md996="mapped"><strong>Full mapped review · '+full.length+'</strong><small>Includes multipart anatomy and trauma topics</small></button>'+
 '<button type="button" data-md996="points"><strong>20-point sampler</strong><small>One question for each numbered instructor prompt</small></button>'+
 '<button type="button" data-md996="quick"><strong>Quick 10</strong><small>Ten different questions from the mapped instructor set</small></button></div>'+
 '<p class="md996-note">The separate expanded 51-point review challenge remains in this unit. No original mock source answers are mixed into scored practice.</p>';
 const browser=page.querySelector('.md992-browser');
 if(browser)browser.after(section);else hub.append(section);
 const launch=pool=>{
  if(!(window.MD_SAFE_QUESTIONS instanceof Map)||pool.some(q=>window.MD_SAFE_QUESTIONS.get(q.id)?.prompt!==q.prompt))return alert('Review bank registry mismatch. Reload Med Daddy.');
  const adaptive=document.getElementById('adaptiveNext'),recycle=document.getElementById('recycle');
  if(adaptive)adaptive.checked=false;
  if(recycle)recycle.checked=false;
  const items=shuffle(pool.slice());start(items);
  if(typeof quiz==='undefined'||quiz.length!==items.length)return alert('Instructor practice count mismatch; expected '+items.length+'.');
  window.MD_ABDO_996_LAST={source:'Instructor 20-point review sheet',count:quiz.length};return true;
 };
 page.addEventListener('click',event=>{
  const b=event.target.closest('[data-md996]');if(!b||!page.contains(b))return;
  const action=b.dataset.md996;
  if(action==='sheet'){section.hidden=false;section.scrollIntoView({block:'nearest'});return;}
  if(action==='mapped')return launch(full);
  if(action==='points')return launch(short);
  if(action==='quick')return launch(shuffle(full).slice(0,10));
 });
 const style=document.createElement('style');style.id='md996-review-style';
 style.textContent='#md996-instructor-practice[hidden]{display:none!important}'+
 '#md996-instructor-practice{margin:14px 0;border-color:#5184a6}'+
 '.md996-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:16px 0}'+
 '.md996-actions button{display:flex;flex-direction:column;gap:6px;text-align:left;min-height:94px;justify-content:center;border:1px solid #547d98;border-radius:11px;background:#183750;color:#eff7ff;padding:12px 15px}'+
 '.md996-actions button small{color:#b7d5e8;font-size:.79rem}'+
 '.md996-note{margin-top:10px!important;font-size:.86rem!important}'+
 '@media(max-width:720px){.md996-actions{grid-template-columns:1fr}}';
 document.head.append(style);
 window.MD_ABDO_INSTRUCTOR_REVIEW_MAP_996=Object.freeze(sourceMap);
 window.MD_PATCH_996={version:'9.9.6',ready:true,instructorPrompts:20,mappedUniqueQuestions:full.length,onePerPointQuestions:short.length,questionDataModified:false,sourceMockModified:false,unmetStandard:'Five separately vetted questions per review point remain outstanding'};
 const badge=document.querySelector('#appVersion,.app-version,[data-app-version]');
 if(badge)badge.textContent=badge.textContent.replace(/9\.9\.[0-5]/g,'9.9.6');
 for(const span of document.querySelectorAll('span'))if(/^v9\.9\.[0-5]$/.test(span.textContent.trim()))span.textContent='v9.9.6';
 document.title=document.title.replace(/v9\.9\.[0-5]/,'v9.9.6');
})();