/* Med Daddy v9.10.3 — Psychology Final EXCLUSIVELY from post-midterm uploads.
   Existing Psychology Midterm bank, prior units and progress keys untouched.
   IMPORTANT: Interim coverage checkpoint. The 35 review prompts are NOT yet 5-per-point. */
(()=>{'use strict';
 if(window.MD_PSYCH_FINAL_1000)return;
 const review=window.MD_PSYCH_FINAL_997?.reviewQuestions;
 const high=window.MD_PSYCH_HY998?.questions;
 const slides=window.MD_PSYCH_SLIDE999?.questions;
 const errors=[];
 if(!Array.isArray(review)||review.length!==35)errors.push('Final review 35 missing');
 if(!Array.isArray(high)||high.length!==50)errors.push('High-Yield 50 missing');
 if(!Array.isArray(slides)||slides.length!==24)errors.push('Slide extensions 24 missing');
 if(typeof start!=='function'||typeof shuffle!=='function'||typeof show!=='function')errors.push('Med Daddy study engine missing');
 if(errors.length){window.MD_PSYCH_FINAL_1000={ready:false,errors};console.error(errors);return;}
 const current=[...review,...high,...slides],ids=new Set,stemSet=new Set;
 // The independent Key Terms module registers later; the shared pool is dynamic.
 const finalPool=()=>[...current,...(window.MD_PSYCH_KEY_TERMS_1004?.ready?window.MD_PSYCH_KEY_TERMS_1004.questions:[])];
 const registry=window.MD_SAFE_QUESTIONS;
 for(const q of current){
  const norm=String(q.prompt||'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  if(ids.has(q.id)||stemSet.has(norm))errors.push('Duplicate '+q.id);
  ids.add(q.id);stemSet.add(norm);
  if(q.choices?.length!==4||!['A','B','C','D'].includes(q.answer)||
     !q.explanation||!q.whyCorrect||Object.keys(q.whyWrong||{}).length!==3||!q.sourceLocator||!q.reviewReference)errors.push('Malformed '+q.id);
  if(typeof mdLeakReason==='function'){const issue=mdLeakReason(q);if(issue)errors.push('Answer leakage '+q.id+' '+issue);}
  if(registry instanceof Map&&registry.has(q.id))errors.push('ID collision '+q.id);
 }
 if(errors.length){window.MD_PSYCH_FINAL_1000={ready:false,errors};console.error('Psychology final release blocked',errors);return;}
 if(registry instanceof Map)for(const q of current)registry.set(q.id,q);
 const section=document.createElement('section');section.className='panel hidden md1000-psych';section.id='psychFinalPage';section.setAttribute('aria-hidden','true');
 section.innerHTML=[
 '<div class="md1000-head"><div><small>PCP109 · PSYCHOLOGY FINAL</small><h1>Psychology Final Exam</h1>',
 '<p>Death & dying • Suicide and patient communication • Alcohol • Substance abuse · Post-midterm sources only</p></div>',
 '<div class="md1000-tools"><button type="button" data-md1000="home">← Study Home</button></div></div>',
 '<div class="md1000-hero"><button type="button" class="md1000-primary" data-md1000="exam"><small>RECOMMENDED</small><strong>Final Practice Exam · 50</strong><span>Mixed new course questions with detailed take-up after each answer</span></button></div>',
 '<div class="md1000-grid">',
 '<button type="button" data-md1000="daily"><strong>Daily Review · up to 20</strong><span>Previously missed, then never-seen final questions</span></button>',
 '<button type="button" data-md1000="quick"><strong>Quick Review · 10</strong><span>Targeted short final-exam drill</span></button>',
 '<button type="button" data-md1000="hy"><strong>High-Yield 50</strong><span>10 source-based concepts · 5 questions per concept</span></button>',
 '<button type="button" data-md1000="review"><strong>Final Instructor Review · 35</strong><span>One question per numbered final-review point so far</span></button>',
 '<button type="button" data-md1000="slide"><strong>Lecture Slide Questions · 24</strong><span>Three questions for each of eight unique embedded Substance Abuse quiz prompts</span></button>',
  '<button type="button" data-md1000="all"><strong>Full Post-Midterm Bank · 150</strong><span>Review, high-yield, lecture questions and the new key-term set</span></button>',
  '</div>',
 '<section class="md1000-browser"><h2>Choose a specific study source</h2><div class="md1000-controls">',
 '<label>Question bank <select id="md1000-source"><option value="mixed">All new final questions</option><option value="hy">High-Yield 50</option><option value="review">Final review Q1–35</option><option value="slide">Lecture question expansions</option><option value="terms">Key Terms Challenge · 41</option><option value="concept">One high-yield concept</option><option value="point">One numbered review objective</option></select></label>',
 '<label>Session length <select id="md1000-count"><option value="10">10 · quick</option><option value="20">20 · study</option><option value="30">30 · practice</option><option value="50" selected>50 · exam</option><option value="all">All available</option></select></label>',
 '<button type="button" class="md1000-start" data-md1000="selected">Start selected practice →</button>',
 '</div><label id="md1000-focus-wrap" hidden>Focus area <select id="md1000-focus"></select></label>',
 '<p id="md1000-count-info" role="status" aria-live="polite"></p></section>',
 '<details class="md1000-details"><summary>Exam map, source notes and clinical safety limits</summary>',
 '<p>The new final bank draws from uploaded Death.ppt, Suicide Newest.pptx, Substance Abuse.ppt, Alcoholism.ppt, their review handouts and Final review.docx.pdf. All Final question pools exclude pre-midterm material; the original Midterm remains available separately.</p>',
 '<p>Some older slides include historical mortality/suicide statistics, superseded DNRO procedures, and medication suggestions outside PCP scope. Those are not presented as current prehospital orders. The lecture-slide question set covers eight distinct quiz prompts in the Substance Abuse deck; other explicit lecture questions remain to be crosswalked.</p>',
 '<p><strong>Coverage checkpoint, not a completed unit:</strong> all 35 final-review prompts have one independently authored question; 5 questions for EVERY review point and complete coverage of other handout and slide prompts remain outstanding. Do not infer full content readiness from the bank size.</p></details>',
 '<p id="md1000-progress" class="md1000-progress"></p>'
 ].join('');
 document.body.appendChild(section);
 const $=s=>section.querySelector(s);
 const src=$('#md1000-source'),count=$('#md1000-count'),focus=$('#md1000-focus'),focusWrap=$('#md1000-focus-wrap');
 const concepts=window.MD_PSYCH_HY998.concepts;
 function sourcePool(mode=src.value){
  if(mode==='hy')return high;
  if(mode==='review')return review;
  if(mode==='slide')return slides;
  if(mode==='terms')return window.MD_PSYCH_KEY_TERMS_1004?.ready?window.MD_PSYCH_KEY_TERMS_1004.questions:[];
  if(mode==='concept')return high.filter(q=>q.highYieldConcept===Number(focus.value));
  if(mode==='point')return review.filter(q=>q.reviewPoint===Number(focus.value));
  return finalPool();
 }
 function updateFocus(){
  const mode=src.value;focusWrap.hidden=mode!=='concept'&&mode!=='point';
  if(!focusWrap.hidden){
   focus.innerHTML='';
   if(mode==='concept')for(let i=0;i<concepts.length;i++)focus.add(new Option((i+1)+' · '+concepts[i]+' (5)',String(i+1)));
   else for(let i=1;i<=35;i++)focus.add(new Option('Final review question '+i+' (1 available)',String(i)));
  }
  update();
 }
 function hist(key){try{const v=JSON.parse(localStorage.getItem(key)||'[]');return new Set(Array.isArray(v)?v:[]);}catch{return new Set();}}
 function update(){
  const pool=sourcePool(),n=count.value==='all'?pool.length:Math.min(pool.length,Number(count.value));
  $('#md1000-count-info').textContent=pool.length+' questions in this source · '+n+' in the selected session'+'.';
  const seen=hist('msk_seen_v11'),missed=hist('msk_missed_v1'),all=finalPool();
  $('#md1000-progress').textContent='Post-midterm Psychology Final progress on this device: '+all.filter(q=>seen.has(q.id)).length+'/'+all.length+' seen · '+all.filter(q=>missed.has(q.id)).length+' missed · '+all.filter(q=>!seen.has(q.id)).length+' new.';
 }
 src.addEventListener('change',updateFocus);count.addEventListener('change',update);focus.addEventListener('change',update);
 updateFocus();
 function launch(pool,n,label){
  const actual=n==='all'?pool.length:Math.min(Number(n),pool.length);
  if(!actual||!Number.isFinite(actual))return alert('No questions available in this source.');
  const selected=shuffle(pool.slice()).slice(0,actual);
  if(registry instanceof Map&&selected.some(q=>current.includes(q)&&registry.get(q.id)?.prompt!==q.prompt))return alert('Final study question registry mismatch. Reload Med Daddy.');
  const adaptive=document.getElementById('adaptiveNext'),recycle=document.getElementById('recycle');
  if(adaptive)adaptive.checked=false;if(recycle)recycle.checked=false;
  start(selected);
  if(typeof quiz!=='undefined'&&quiz.length!==actual)return alert('Psychology Final count mismatch: expected '+actual+' questions.');
  window.MD_PSYCH_FINAL_LAST={source:label,count:actual,firstId:selected[0]?.id};
  return true;
 }
 section.addEventListener('click',event=>{
  const b=event.target.closest('button[data-md1000]');if(!b)return;
  const action=b.dataset.md1000;
  if(action==='home'){show('studyHub');return;}
  if(action==='exam')return launch(finalPool(),50,'Psychology Final 50 including key terms');
  if(action==='daily'){
   const missed=hist('msk_missed_v1'),seen=hist('msk_seen_v11');
   const all=finalPool();const pool=[...shuffle(all.filter(q=>missed.has(q.id))),...shuffle(all.filter(q=>!seen.has(q.id)&&!missed.has(q.id)))].slice(0,20);
   if(!pool.length)return alert('No missed or unseen Final questions remain. Try Full Bank or another selector.');
   return launch(pool,'all','Missed + never seen');
  }
  if(action==='quick')return launch(finalPool(),10,'Quick Final 10');
  if(action==='hy')return launch(high,'all','Independent High Yield 50');
  if(action==='review')return launch(review,'all','35-point final review');
  if(action==='slide')return launch(slides,'all','Distinct slide quiz expansions 24');
  if(action==='all')return launch(finalPool(),'all','Full post-midterm Final');
  if(action==='selected')return launch(sourcePool(),count.value,src.options[src.selectedIndex].text);
 });
 // Visible navigation from existing Psychology entry, with a safe path back to
 // the old midterm page. No old launchers, source decks or progress are altered.
 const legacy=document.getElementById('psychMidtermPage');
 if(legacy&&!legacy.querySelector('#md1000-final-entry')){
  const button=document.createElement('button');button.id='md1000-final-entry';
  button.className='success';button.textContent='Open Psychology Final Exam →';
  button.addEventListener('click',()=>show('psychFinalPage'));
  legacy.querySelector('.psych-hero .ap2-launch-row')?.prepend(button);
 }
 const tile=[...document.querySelectorAll('.course-tile')].find(el=>/psychology/i.test(el.textContent||''));
 if(tile){
  tile.onclick=()=>show('psychFinalPage');
  const p=tile.querySelector('p');if(p)p.textContent='Post-midterm FINAL ONLY · 150 questions from the eight latest uploads';
  const b=tile.querySelector('b');if(b)b.textContent='Open Psychology Final →';
  // Separate Midterm access is outside the Final's exam selectors and question pools.
  if(legacy&&!document.getElementById('md1003-midterm-separate')){
    const priorBtn=document.createElement('button');priorBtn.type='button';
    priorBtn.id='md1003-midterm-separate';priorBtn.className='md1003-midterm-link';
    priorBtn.textContent='Psychology Midterm (separate preserved unit)';
    priorBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();show('psychMidtermPage');});
    tile.after(priorBtn);
  }
 }
 const style=document.createElement('style');style.id='md1000-final-style';
 style.textContent=[
 '.md1000-psych{max-width:1240px;margin:0 auto;color:#ecf3ff}',
 '.md1000-psych .md1000-head{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;margin-bottom:20px}',
 '.md1000-psych .md1000-head h1{font-size:clamp(1.8rem,3vw,2.4rem);margin:5px 0}',
 '.md1000-psych .md1000-head small,.md1000-primary small{display:block;color:#8ed8ff;font-weight:800;letter-spacing:.07em}',
 '.md1000-psych .md1000-head p{color:#b9cddd;line-height:1.5;max-width:660px}',
 '.md1000-tools{display:flex;gap:8px;flex-wrap:wrap}',
 '.md1000-tools button{background:#183950;border:1px solid #4b7695;color:#eaf5ff;border-radius:10px;padding:11px;font-size:.9rem}',
 '.md1000-psych button{cursor:pointer;white-space:normal}',
 '.md1000-hero{margin-bottom:12px}',
 '.md1000-primary{display:flex;flex-direction:column;gap:9px;text-align:left;padding:20px;width:100%;min-height:120px;background:linear-gradient(110deg,#0c6289,#153c5c);border:2px solid #68c8f3;color:#fff;border-radius:15px}',
 '.md1000-primary strong{font-size:1.5rem}', '.md1000-primary span{color:#d5eaff}',
 '.md1000-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:20px}',
 '.md1000-grid button{display:flex;flex-direction:column;justify-content:center;gap:8px;min-height:112px;text-align:left;padding:17px;border-radius:12px;background:#152b40;border:1px solid #40617f;color:#edf6ff}',
 '.md1000-grid button strong{font-size:1.05rem}', '.md1000-grid button span{font-size:.87rem;color:#b9d3e5;line-height:1.4}',
 '.md1000-psych button:hover{filter:brightness(1.1)}',
 '.md1000-browser{border:1px solid #3d6681;border-radius:14px;background:#102337;padding:18px}',
 '.md1000-browser h2{margin:0 0 14px;font-size:1.15rem}',
 '.md1000-controls{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) auto;gap:12px;align-items:end}',
 '.md1000-controls label,.md1000-browser>label{display:flex;flex-direction:column;gap:8px;color:#d9eaf8;font-weight:700;font-size:.89rem}',
 '.md1000-controls select,#md1000-focus{width:100%;font:inherit;background:#071727;color:#f2faff;border:1px solid #547990;padding:11px;border-radius:9px}',
 '.md1000-start{min-height:45px;padding:9px 15px;background:#38bdf8;color:#062033;border-radius:9px;font-weight:800}',
 '#md1000-focus-wrap{margin-top:12px}#md1000-focus-wrap[hidden]{display:none!important}',
 '#md1000-count-info{margin-top:12px;color:#cae3f3;font-size:.9rem}',
 '.md1000-details{border:1px solid #3b566d;border-radius:12px;margin-top:12px;padding:13px 16px;background:#112437}',
 '.md1000-details summary{font-weight:800;cursor:pointer}',
 '.md1000-details p{color:#cbdae7;line-height:1.6;font-size:.9rem}',
 '.md1000-progress{color:#abd1e8;font-size:.88rem;line-height:1.5}',
 '.md1003-midterm-link{display:block;width:100%;text-align:left;padding:12px 16px;background:#142a3d;border:1px solid #496c87;border-radius:12px;color:#c6def1;cursor:pointer}',
 '@media(max-width:850px){.md1000-grid{grid-template-columns:repeat(2,1fr)}.md1000-controls{grid-template-columns:1fr 1fr}.md1000-start{grid-column:1/-1}}',
 '@media(max-width:570px){.md1000-grid,.md1000-controls{grid-template-columns:1fr}.md1000-start{grid-column:auto}.md1000-head{flex-direction:column}.md1000-tools{width:100%}}'
 ].join('\n');
 document.head.appendChild(style);
 window.showPsychFinal1000=()=>{show('psychFinalPage');update();};
 window.MD_PSYCH_FINAL_1000={version:'9.10.3',ready:true,reviewQuestions:review.length,highYieldQuestions:high.length,slideExtensions:slides.length,newTotal:current.length,postMidtermOnly:true,midtermExcluded:true,finalOnlyCount:current.length,sourceQuestionsChanged:false,existingCoursesChanged:false,coverageComplete:false,remaining:'5 x each final review point; every other handout item; all other explicit lecture questions'};
 const badge=document.querySelector('#appVersion,.app-version,[data-app-version]');
 if(badge)badge.textContent=badge.textContent.replace(/9\.(?:9\.[0-9]+|10\.[0-2])/g,'9.10.3');
 document.title=document.title.replace(/v9\.(?:9\.[0-9]+|10\.[0-2])/,'v9.10.3');
 for(const span of document.querySelectorAll('span'))if(/^v9\.(?:9\.[0-9]+|10\.[0-2])$/.test(span.textContent.trim()))span.textContent='v9.10.3';
})();