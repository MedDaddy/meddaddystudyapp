/* Med Daddy v9.11.12 — PCT II ECG rebuild.
 * Two study tracks, preserving existing 188 audited course questions, original
 * 95 strip-image gallery, and original 16 full 12-lead tracings. New questions
 * supplement, never replace, user-uploaded originals.
 */
(()=>{'use strict';
 if(window.MD_ECG_REBUILD_91112)return;
 const page=document.getElementById('ecgAcademyPage');
 const old=typeof ECG_QUESTIONS!=='undefined'&&Array.isArray(ECG_QUESTIONS)?ECG_QUESTIONS:[];
 const four=window.MD_ECG_FOUR_NEW_91112;
 const twelve=window.MD_ECG_TWELVE_NEW_91112;
 const review=window.MD_ECG_REVIEW_NEW_91112;
 const strips=typeof ECG_STRIPS!=='undefined'&&Array.isArray(ECG_STRIPS)?ECG_STRIPS:[];
 const full12=typeof ECG_TWELVE_LEADS!=='undefined'&&Array.isArray(ECG_TWELVE_LEADS)?ECG_TWELVE_LEADS:[];
 const registry=window.MD_SAFE_QUESTIONS;
 if(!page||old.length<180||!Array.isArray(four)||four.length!==25||!Array.isArray(twelve)||twelve.length!==37||
   !Array.isArray(review)||review.length!==10||strips.length<90||full12.length<15||!(registry instanceof Map)){
  window.MD_ECG_REBUILD_91112={ready:false,error:'Required existing ECG academy, authentic images or source banks not loaded'};return;
 }
 const valid=q=>q&&q.id&&typeof q.prompt==='string'&&Array.isArray(q.choices)&&q.choices.length===4&&
 /^[ABCD]$/.test(q.answer)&&new Set(q.choices.map(v=>String(v).toLowerCase().trim())).size===4;
 const uniq=items=>[...new Map(items.filter(valid).map(q=>[q.id,q])).values()];
 const errors=[];
 const imported=uniq([...four,...twelve,...review]);
 for(const q of imported){
  const issue=typeof mdLeakReason==='function'?mdLeakReason(q):'';
  if(issue){errors.push(q.id+': '+issue);continue}
  const current=registry.get(q.id);
  if(current&&(current.answer!==q.answer||current.prompt!==q.prompt)){errors.push('Registry ID collision: '+q.id);continue}
  if(!current)registry.set(q.id,q);
  if(typeof BANK!=='undefined'&&Array.isArray(BANK)&&!BANK.some(x=>x.id===q.id))BANK.push(q);
 }
 const lead12Topics=new Set(['Chest Leads','ST Analysis','Territories','Acquisition','Fifteen Lead','Serial ECG']);
 const is12=q=>lead12Topics.has(q.topic)||
  (q.topic==='Fix the Rule'&&/\b12.lead\b|stemi|contiguous|posterior|v4r|precordial|st.segments?|isoelectric|reciprocal|j.point/i.test(q.prompt+' '+(q.objective||'')));
 const originals=uniq(old);
 const original4=originals.filter(q=>!is12(q));
 const original12=originals.filter(is12);
 const pool4=uniq([...original4,...four,...review]);
 const pool12=uniq([...original12,...twelve]);
 const stripQuiz=original4.filter(q=>q.imageId&&window.ECG_STRIP_MAP?.[q.imageId]);
 const sourceReview=uniq([...review,...original4.filter(q=>/AV|Rhythm|Intervals|Waveforms|Rate Calculation|Fix the Rule/.test(q.topic))]);
 const tracks={
  four:{
   challenge:uniq([...four,...review,...stripQuiz]),all:pool4,images:stripQuiz,
   theory:pool4.filter(q=>/Anatomy|Conduction|ECG Theory|Waveforms|Paper|Interval|Rate Calculation|Regularity|Fix the Rule/.test(q.topic)),
   rhythms:pool4.filter(q=>/Rhythm|AV Blocks|Paced|Clinical Decisions|Authentic Strip/.test(q.topic)),
   review:sourceReview
  },
  twelve:{
   challenge:uniq([...twelve,...original12]),all:pool12,
   anatomy:pool12.filter(q=>/Anatomy|Placement|Chest Leads|Territor|Acquisition|Waveform/.test(q.topic)),
   stemi:pool12.filter(q=>/ST Analysis|STEMI Mimics|PCP Bypass|STEMI|Fifteen Lead|Serial ECG/.test(q.topic)),
   clinical:pool12.filter(q=>/PCP Bypass|STEMI|ST Analysis|Waveform Interpretation/.test(q.topic))
  }
 };
 if(pool12.length<50||pool4.length<50||stripQuiz.length<50)errors.push('Required 50-question ECG section coverage missing.');
 if(imported.length!==72)errors.push('72 imported source questions expected.');
 // Existing safe registry is not weakened; do not auto-clear stats on failure.
 const root=document.createElement('section');root.id='md-ecg91112';root.className='card';
 root.innerHTML=
 '<header class="md-ecg-new-head"><div><span class="companion-kicker">PCT II • ECG REBUILD • COURSE-BASED</span>'+
 '<h2>ECG Interpretation</h2><p>Separate 4-lead rhythm mastery and 12-lead interpretation. Measure, identify, assess, then make an authorized PCP decision.</p></div>'+
 '<div class="md-ecg-count"><b>'+originals.length+' original + '+imported.length+' new</b><small>Original source strips retained</small></div></header>'+
 '<div class="md-ecg-tabs" role="group" aria-label="ECG unit sections">'+
 '<button type="button" id="md-ecg-tab4" class="primary">4-Lead Rhythm Interpretation</button>'+
 '<button type="button" id="md-ecg-tab12" class="secondary">12-Lead Interpretation</button></div>'+
 '<div id="md-ecg-four"><h3>4-Lead · Rhythm, Theory &amp; Conduction</h3>'+
 '<p class="muted">Anatomy and conduction, waveforms and intervals, rate calculations, atrial/junctional/ventricular rhythms, AV blocks, pacing faults, and PCP clinical reasoning.</p>'+
 '<div class="md-ecg-launch"><label for="md-ecg-four-bank">Practice focus</label>'+
 '<select id="md-ecg-four-bank"><option value="challenge">Instructor-Level 4-Lead Challenge — recommended</option><option value="all">Complete 4-Lead Unit</option>'+
 '<option value="images">Authentic Rhythm Strip Identification</option>'+
 '<option value="theory">Cardiac Anatomy, Conduction &amp; Theory</option>'+
 '<option value="rhythms">Rhythm Interpretation, Blocks &amp; Pacemakers</option>'+
 '<option value="review">Instructor ECG Review — Focused Practice</option></select>'+
 '<label for="md-ecg-four-size">Session length</label>'+
 '<select id="md-ecg-four-size"><option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="all">Full 4-lead bank</option></select>'+
 '<button type="button" class="success" id="md-ecg-four-start">Start 4-Lead Exam</button></div>'+
 '<p class="muted" id="md-ecg-four-meta" aria-live="polite"></p></div>'+
 '<div id="md-ecg-twelve" hidden><h3>12-Lead · Acquisition, Territories &amp; STEMI</h3>'+
 '<p class="muted">Lead placement, coronary anatomy, J point/ST deviation, contiguous territories, right-sided and posterior leads, STEMI mimics, and BLS bypass reasoning.</p>'+
 '<div class="md-ecg-launch"><label for="md-ecg-twelve-bank">Practice focus</label>'+
 '<select id="md-ecg-twelve-bank"><option value="challenge">Instructor-Level 12-Lead Challenge — recommended</option><option value="all">Complete 12-Lead Unit</option>'+
 '<option value="anatomy">Anatomy, Lead Placement &amp; Acquisition</option>'+
 '<option value="stemi">STEMI Territories, Mimics &amp; Recognition</option>'+
 '<option value="clinical">Clinical Interpretation &amp; Bypass Decisions</option></select>'+
 '<label for="md-ecg-twelve-size">Session length</label>'+
 '<select id="md-ecg-twelve-size"><option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="all">Full 12-lead bank</option></select>'+
 '<button type="button" class="success" id="md-ecg-twelve-start">Start 12-Lead Exam</button></div>'+
 '<p class="muted" id="md-ecg-twelve-meta" aria-live="polite"></p></div>'+
 '<p class="md-ecg-source-note small">Focused exams prioritize the selected topic and fill the remaining questions from the same lead section to maintain 50+ questions. ECG strip images retain their course source; older mock answer keys are not silently rewritten.</p>';
 const top=page.querySelector('.topbar');
 if(top)top.after(root);else page.prepend(root);
 // Move original, unaltered image labs to their respective tracks.
 const originalStrip=page.querySelector('#ecgStripLab');
 const originalTwelve=page.querySelector('#ecg12Image')?.closest('.ecg-section');
 const guide=page.querySelector('.ecg-guide-grid')?.closest('.ecg-section');
 const fourPanel=root.querySelector('#md-ecg-four'),twelvePanel=root.querySelector('#md-ecg-twelve');
 if(originalStrip)fourPanel.appendChild(originalStrip);
 if(originalTwelve)twelvePanel.appendChild(originalTwelve);
 // Guides remain available but are no longer an oversized home-screen grid.
 if(guide){
  const details=document.createElement('details');
  const summary=document.createElement('summary');summary.textContent='Six ECG learning guides (optional reference)';
  details.className='md-ecg-ref-guides';details.appendChild(summary);details.appendChild(guide);
  fourPanel.appendChild(details);
 }
 // Hide redundant older shortcut menus, but leave their data and code intact.
 for(const section of page.querySelectorAll(':scope > .ecg-section'))section.hidden=true;
 const oldHero=page.querySelector('.ecg-hero');if(oldHero)oldHero.hidden=true;
 const css=document.createElement('style');css.id='md-ecg91112-style';
 css.textContent='#md-ecg91112{max-width:1180px;margin:14px auto 20px;padding:20px;border-radius:16px}'+
 '#md-ecg91112 .md-ecg-new-head{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}'+
 '#md-ecg91112 h2{margin:5px 0;font-size:1.8rem}#md-ecg91112 h3{font-size:1.35rem;margin:20px 0 8px}'+
 '#md-ecg91112 .md-ecg-count{text-align:right}#md-ecg91112 .md-ecg-count small{display:block;opacity:.7}'+
 '#md-ecg91112 .md-ecg-tabs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}'+
 '#md-ecg91112 .md-ecg-tabs button{min-height:56px;font-weight:750;border-radius:10px}'+
 '#md-ecg91112 .md-ecg-launch{display:grid;grid-template-columns:minmax(150px,1fr) minmax(250px,3fr);gap:12px;align-items:center}'+
 '#md-ecg91112 .md-ecg-launch label{font-weight:700}#md-ecg91112 select{width:100%;min-height:44px;padding:9px;border-radius:8px;border:1px solid #45637d;background:#101d2f;color:#e6f4ff}'+
 '#md-ecg91112 .md-ecg-launch button{grid-column:1/-1;min-height:48px;font-weight:750}'+
 '#md-ecg91112 .ecg-section{margin-top:26px}#md-ecg91112 .md-ecg-ref-guides{margin-top:20px;padding:14px;border:1px solid #45637d;border-radius:12px}'+
 '#md-ecg91112 [hidden],#ecgAcademyPage>.ecg-section[hidden],#ecgAcademyPage>.ecg-hero[hidden]{display:none!important}'+
 '#md-ecg91112 .md-ecg-source-note{margin-top:18px;opacity:.75}'+
 '@media(max-width:680px){#md-ecg91112 .md-ecg-launch{grid-template-columns:1fr}#md-ecg91112 .md-ecg-tabs{grid-template-columns:1fr}#md-ecg91112 .md-ecg-count{text-align:left}}';
 document.head.appendChild(css);
 let active='four';
 function selectTrack(which){
  active=which;
  fourPanel.hidden=which!=='four';twelvePanel.hidden=which!=='twelve';
  root.querySelector('#md-ecg-tab4').className=which==='four'?'primary':'secondary';
  root.querySelector('#md-ecg-tab12').className=which==='twelve'?'primary':'secondary';
 }
 root.querySelector('#md-ecg-tab4').onclick=()=>selectTrack('four');
 root.querySelector('#md-ecg-tab12').onclick=()=>selectTrack('twelve');
 function setup(which){
  const sel=root.querySelector('#md-ecg-'+which+'-bank');
  const length=root.querySelector('#md-ecg-'+which+'-size');
  const meta=root.querySelector('#md-ecg-'+which+'-meta');
  const bank=tracks[which];
  const update=()=>{
   const focus=bank[sel.value]||[],full=bank.all||[];
   meta.textContent=(sel.value==='all'||sel.value==='challenge'||sel.value==='images')?
    focus.length+' questions in this selected deck (new instructor-level questions prioritized in Challenge mode)':
    focus.length+' focused questions; remaining questions drawn from the same '+(which==='four'?'4-lead':'12-lead')+' pool to reach the selected exam size.';
  };
  sel.onchange=update;length.onchange=update;update();
  root.querySelector('#md-ecg-'+which+'-start').onclick=()=>{
   if(errors.length){meta.textContent='Question validation needs attention. No progress was changed.';console.error('ECG rebuild',errors);return;}
   const full=bank.all||[],focus=bank[sel.value]||[];
   const exclusive=sel.value==='images'||sel.value==='challenge';
   const effective=exclusive?focus:full;
   const n=length.value==='all'?effective.length:Math.min(Number(length.value),effective.length);
   if(n<50){meta.textContent='This lead section needs at least 50 questions.';return;}
   const shuffled=x=>typeof shuffle==='function'?shuffle(x.slice()):x.slice();
   let selected=[];
   if(sel.value==='challenge'){
    const newPriority=which==='four'?[...four,...review]:twelve;
    // Always start with 35 authored instructor-hard cases (or all available),
    // then include authenticated course strips / remaining lead-specific items.
    const leadPriority=shuffled(newPriority).slice(0,Math.min(n,35,newPriority.length));
    const used=new Set(leadPriority.map(q=>q.id));
    selected=shuffled([...leadPriority,...shuffled(focus.filter(q=>!used.has(q.id))).slice(0,n-leadPriority.length)]);
   }else if(sel.value==='images'||sel.value==='all'){
    selected=shuffled(focus).slice(0,n);
   }else{
    // Focus up to 65% of a session, using questions from the same lead track
    // for the remainder; maintain full-length sessions without duplicates.
    const focusN=Math.min(focus.length,Math.max(15,Math.ceil(n*.65)));
    const first=shuffled(focus).slice(0,focusN),used=new Set(first.map(q=>q.id));
    selected=shuffled([...first,...shuffled(full.filter(q=>!used.has(q.id))).slice(0,n-first.length)]);
   }
   if(selected.length<50||selected.some(q=>!registry.has(q.id))){meta.textContent='Cannot start: safe 50-question ECG pool not available. Saved progress remains intact.';return;}
   const recycle=document.getElementById('recycle');if(recycle)recycle.checked=false;
   if(typeof start==='function')start(selected);
   else meta.textContent='Quiz engine unavailable. Please reload the application.';
  };
 }
 // Preserve existing unit menu entry and remove extra quick-test shortcuts; the new
 // two-track academy is the sole ECG entry point, as in the other clean PCT units.
 const pctMenu=document.getElementById('pct2CoursePanel');
 if(pctMenu){
  pctMenu.querySelectorAll('button[onclick]').forEach(button=>{
   const on=button.getAttribute('onclick')||'';
   if(/launchECGStripMastery\(|launchECGQuiz\(/.test(on))button.remove();
  });
 }
  setup('four');setup('twelve');selectTrack('four');
 window.MD_ECG_REBUILD_91112={ready:errors.length===0,errors,version:'9.11.12',counts:{
  original:originals.length,new:imported.length,total:originals.length+imported.length,
  four:pool4.length,twelve:pool12.length,authenticImageQuestions:stripQuiz.length,
  authenticStripGallery:strips.length,originalTwelveLeadTracings:full12.length
 },tracks,imported,sourceNotice:'Original uploaded ECG Practice mock (60 questions) and its PDF strip images are not included as a separate preserved mock deck yet.'};
})();