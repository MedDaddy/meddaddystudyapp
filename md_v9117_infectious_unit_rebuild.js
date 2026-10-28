/* Med Daddy v9.11.7 — PCT II Infectious Diseases unified source-deck interface.
 * Preserves original mock and all previous question banks. No small quiz tiles.
 * This script intentionally affects only #pct2InfectiousPage.
 */
(()=>{'use strict';
 if(window.MD_INF_UI_9117)return;
 const page=document.getElementById('pct2InfectiousPage');
 const bank=typeof BANK!=='undefined'&&Array.isArray(BANK)?BANK:[];
 const mock=window.MD_INF_PRESERVED_MOCK_2026;
 const dirA=window.MD_INF_DIRECTIVES_A_91110,dirB=window.MD_INF_DIRECTIVES_B_91110;
 const directives=Array.isArray(dirA)&&dirA.length===25&&Array.isArray(dirB)&&dirB.length===25?[...dirA,...dirB]:[];
 if(directives.length!==50)console.warn('Infectious PCP directive 50 deck is not fully loaded. Original source decks remain available.');
 if(!page||!bank.length||!Array.isArray(mock)||mock.length!==130){
   window.MD_INF_UI_9117={ready:false,error:'Missing source unit page, bank or 130-question preserved mock'};return;
 }
 const normal=bank.filter(q=>q&&q.unit==='Infectious & Communicable Diseases'&&q.bankType==='normal'&&Array.isArray(q.choices)&&q.choices.length===4);
 const high=bank.filter(q=>q&&q.unit==='Infectious & Communicable Diseases'&&q.bankType==='highYield');
 const high50=window.MD_INFECTIOUS_9112?.newHighYield||[];
 const combinations=window.MD_INFECT_COMB_9114||[];
 const coverage=window.MD_INFECTIOUS_COVERAGE?.reviewPoints||[];
 const mapping=new Map(coverage.map(c=>[c.id,c.questionIds||[]]));
 const byId=new Map([...normal,...high,...high50,...combinations].map(q=>[q.id,q]));
 const peerTopics=[
  ['Host resistance',['K11','R11']],['Measles signs',['K12']],['Chickenpox signs',['K30']],
  ['Shingles / VZV',['K25']],['Primary and secondary barriers',['R13','K26']],
  ['Secondary syphilis',['K27']],['Syphilis',['K27']],['Chlamydia',['R10']],
  ['Nosocomial infection',['K17','R14']],['Gonorrhoea',['K07']],['Bacteria versus viruses',['K03','K34','R02']],
  ['Transmission routes',['R01']],['Genital herpes',['K09']],['Meningitis',['R09']],
  ['West Nile virus',['K35']],['HIV assessment / exposure',['K10','R15']],['Mumps',['K15']],
  ['Hepatitis distinctions',['K08','R06']],['Varicella precautions',['K30']],
  ['Tuberculosis',['K28','R17']],['Tetanus',['R16']],['Epstein–Barr / mononucleosis',['R09']],
  ['Antibody formation',['K29']],['Infection prevention',['R14']],
  ['Virulence / organism factors',['K33','R11']],['MRSA transmission',['K14']]
 ];
 const peerMap=peerTopics.map(([topic,tags],i)=>{
  const no=i+1;
  let ids=[...new Set(tags.flatMap(tag=>mapping.get(tag)||[]))];
  const filter=no===8?/chlamydia/i:no===14?/mening/i:no===22?/mononucleosis|epstein|ebv/i:null;
  if(filter){
   const matched=ids.filter(id=>{const q=byId.get(id);return q&&filter.test((q.topic||'')+' '+(q.prompt||''));});
   if(matched.length>=5)ids=matched;
   else ids=normal.filter(q=>filter.test((q.topic||'')+' '+(q.prompt||''))).map(q=>q.id);
  }
  return {reviewItem:no,topic,questionIds:ids};
 });
 const peer=[...new Map(peerMap.flatMap(p=>p.questionIds.map(id=>byId.get(id)).filter(Boolean)).map(q=>[q.id,q])).values()];
 const guide=normal.filter(q=>Array.isArray(q.reviewPointIds)&&q.reviewPointIds.length);
 const slides=normal.filter(q=>Array.isArray(q.slideReferences)&&q.slideReferences.length);
 // Textbook Chapter 39: original case-summary prompts are adapted into MCQs below.
 // Other crosswalk questions retain their original lecture citations (not falsely labelled textbook-verbatim).
 const tq=(n,prompt,choices,answer,why,wrong,pageNumber)=>({
  id:'PCT2-INF-TEXT39-'+String(n).padStart(3,'0'),course:'Patient Care & Theory II',
  unit:'Infectious & Communicable Diseases',bankType:'textbook-questions',
  topic:'Nancy Caroline Chapter 39 case-summary questions',
  prompt,choices,answer,explanation:why,whyCorrect:why,whyWrong:wrong,
  sourceTitle:"Nancy Caroline's Emergency Care in the Streets, Canadian 8th ed., Chapter 39",
  sourceLocator:'PDF page '+pageNumber+' — YOU are the Paramedic / Chapter 39 summary',
  reviewReference:'MCQ adaptation of textbook discussion, not verbatim multiple choice',
  difficulty:'PCT II — Clinical Reasoning'
 });
 const textbookOriginal=[
  tq(1,'During a close-contact transport of an older patient with fever and cough after recent travel, which information most directly changes exposure precautions?',[
   'Recent travel, respiratory symptoms, close contacts and possible institutional exposure',
   'The patient’s preferred language without an exposure history',
   'Whether the patient has eaten breakfast',
   'The distance between the residence and the nearest pharmacy'],'A',
   'Travel, contact history and exposure setting inform suspicion and appropriate precautions while physiologic assessment continues.',
   {B:'Communication is relevant, but does not replace an exposure history.',C:'Food intake may matter for other assessments, not the immediate transmission risk.',D:'Pharmacy distance does not establish infection risk.'},3397),
  tq(2,'A coughing, febrile patient needs assistance in a confined bathroom. Which combination most reduces avoidable exposure? 1. Assess respiratory risk; 2. Use indicated PPE; 3. Perform close face-to-face lifting without precautions; 4. Minimize unnecessary close contact.',[
   '1, 2 and 4 only','1 and 3 only','2 and 3 only','All four'],'A',
   'Assess exposure risk, wear appropriate protection and avoid unnecessary close-contact manoeuvres when alternative safe care is possible.',
   {B:'Close unprotected lifting increases exposure risk.',C:'Omits risk assessment and endorses unprotected contact.',D:'Includes the unsafe third statement.'},3397),
  tq(3,'While transporting a patient with suspected serious communicable respiratory illness, which observation most supports urgent physiologic reassessment instead of anchoring on the infection label?',[
   'New confusion, falling blood pressure and increasing work of breathing',
   'A stable temperature with unchanged breathing and alertness',
   'A family member asking about visiting hours',
   'A travel history without any current symptoms'],'A',
   'Altered mentation, hypotension and increased respiratory effort indicate possible deterioration, regardless of the final organism.',
   {B:'Stable findings alone are less urgent.',C:'Visiting questions do not take priority over deterioration.',D:'Travel history informs precautions but not immediate instability.'},3397),
  tq(4,'Why does Chapter 39 emphasize repeatedly reconsidering the differential diagnosis during an infectious call?',[
   'New information may change the likely cause and require different priorities',
   'One early diagnosis should remain fixed to prevent delays',
   'Only the laboratory can influence field decision making',
   'A fever rules out noninfectious causes of deterioration'],'A',
   'Continual reassessment prevents diagnostic fixation as the patient’s findings and history evolve.',
   {B:'Fixation on an early label can miss deterioration.',C:'Field assessment changes the differential before laboratory results.',D:'Fever does not exclude other serious conditions.'},3398),
  tq(5,'Which collection contains procedures Chapter 39 identifies as potentially higher exposure risk in a respiratory infectious patient? 1. Bag-mask ventilation without appropriate filtration; 2. Airway instrumentation; 3. Nebulized treatment; 4. Close airway suctioning.',[
   '1, 2, 3 and 4','1 and 4 only','2 and 3 only','2, 3 and 4 only'],'A',
   'Airway management and aerosol-generating procedures require heightened exposure assessment and suitable protection.',
   {B:'Omits airway instrumentation and nebulization.',C:'Omits bag-mask ventilation and suctioning.',D:'Omits bag-mask ventilation without filtration.'},3398),
  tq(6,'Following hospital transfer of a suspected highly communicable patient after close exposure, what is the best next action for an exposed paramedic?',[
   'Report the exposure and follow service infection-control and occupational health direction',
   'Continue normal patient contact until symptoms are obvious',
   'Discard the incident record if the diagnosis is still uncertain',
   'Ask the patient’s family to decide whether quarantine is required'],'A',
   'Exposure documentation, occupational follow-up and public health or medical direction guide safe return to duties.',
   {B:'Waiting for symptoms risks avoidable secondary exposure.',C:'An uncertain diagnosis does not eliminate reporting obligations.',D:'Family members cannot authorize occupational exposure management.'},3398),
  tq(7,'A patient with a suspected transmissible respiratory illness has several exposed household contacts. Which approach is best?',[
   'Include contact history in handover and support appropriate public-health follow-up',
   'Tell the family to self-prescribe prophylactic antibiotics',
   'Assure every contact they cannot become infected if asymptomatic now',
   'Delay medical handover until all contacts develop symptoms'],'A',
   'The chapter’s case summary emphasizes protecting and monitoring potentially exposed family members through appropriate channels.',
   {B:'Prophylaxis is not a family-directed blanket intervention.',C:'Incubation and asymptomatic spread make this reassurance unsafe.',D:'Patient transfer must not wait for contacts to develop symptoms.'},3399),
  tq(8,'An ambulance has transported a patient with a suspected infectious illness. Which post-call sequence most closely follows Chapter 39 infection prevention principles?',[
   'Dispose of used supplies safely, remove soiled linen, clean/disinfect equipment and complete hand hygiene',
   'Spray fragrance, leave contaminated supplies in place and immediately take the next call',
   'Clean only areas visibly contaminated with blood and ignore shared equipment',
   'Skip hand hygiene if gloves were worn throughout the transport'],'A',
   'Waste disposal, linen handling, equipment and vehicle cleaning, and hand hygiene reduce healthcare-associated transmission.',
   {B:'Fragrance is not disinfection and supplies must be managed safely.',C:'Shared equipment can transmit infection without visible blood.',D:'Gloves do not replace hand hygiene.'},3396),
  tq(9,'Which patient-protection objective best explains regular ambulance equipment disinfection under Chapter 39?',[
   'Prevent healthcare-associated infection between patient contacts',
   'Eliminate the need for standard precautions during transport',
   'Make a previous infection diagnosis clinically irrelevant',
   'Avoid the need to report occupational exposures'],'A',
   'Cleaning equipment and contact surfaces between patients helps prevent nosocomial transmission.',
   {B:'Cleaning complements rather than replaces precautions.',C:'Diagnosis and exposure history can still matter.',D:'Occupational reporting remains necessary when exposure occurs.'},3396)
 ];
 const textbookCrosswalk=slides.filter(q=>/host|chain|transmission|precaution|ppe|clean|sepsis|fever|hiv|hepatitis|tuberculosis|meningitis|mrsa|influenza|infection/i.test(q.topic+' '+q.conceptGroup)).slice(0,75);
 const textbook=[...textbookOriginal,...textbookCrosswalk];
 const dedupe=arr=>[...new Map(arr.filter(q=>q&&q.id&&Array.isArray(q.choices)&&q.choices.length===4).map(q=>[q.id,q])).values()];
 // The Med Daddy core quiz engine only accepts questions registered in
 // MD_SAFE_QUESTIONS. An unregistered source mock is otherwise silently dropped,
 // producing the misleading "No missed or unseen questions" alert.
 // Register newly imported source questions without resetting stored progress.
 const safeRegistry=window.MD_SAFE_QUESTIONS;
 const registrationErrors=[];
 if(!(safeRegistry instanceof Map))registrationErrors.push('Question safety registry is unavailable.');
 function registerSourceQuestions(items){
  if(!(safeRegistry instanceof Map))return;
  for(const q of items){
   if(!q||!q.id||!q.prompt||!Array.isArray(q.choices)||q.choices.length!==4||!['A','B','C','D'].includes(q.answer)){
    registrationErrors.push('Invalid original source question '+String(q?.id||'unknown'));continue;
   }
   const leak=typeof mdLeakReason==='function'?mdLeakReason(q):'';
   if(leak){registrationErrors.push('Question '+q.id+' requires manual review: '+leak);continue;}
   const current=safeRegistry.get(q.id);
   if(current){
    if(current.prompt!==q.prompt||current.answer!==q.answer)registrationErrors.push('Source question ID collision: '+q.id);
   }else safeRegistry.set(q.id,q);
  }
 }
 registerSourceQuestions([...mock,...textbookOriginal,...directives]);
 const decks={
  all:dedupe([...normal,...high,...high50,...combinations,...directives]),
  instructor:dedupe(guide),
  peer:dedupe(peer),
  slides:dedupe(slides),
  textbook:dedupe(textbook),
  mock:dedupe(mock),
  directives:dedupe(directives),
  high:dedupe([...high,...high50])
 };
 window.MD_INF_SOURCE_DECKS_9117={decks,peerMap,version:'9.11.7',sourceNotes:{
  mock:'Preserved original; key supplied with upload, not independently validated',
  peer:'26 item review explicitly mapped to existing lecture-anchored questions',
  textbook:'9 source-derived Chapter 39 case-summary MCQs plus lecture-anchored chapter-topic crosswalk; remaining questions not separately textbook-verified'
 }};
 // Remove obsolete UI only from Infectious Diseases, not PCP directive content.
 for(const id of ['infectiousConcepts','infectiousCoverage']){
  const el=document.getElementById(id);
  if(el){const details=el.closest('details.md930-fold');if(details)details.remove();}
 }
 const legacyHero=page.querySelector('.ap2-hero');if(legacyHero)legacyHero.remove();
 const oldHub=document.getElementById('md112-infectious-hub');if(oldHub)oldHub.remove();
 const box=document.createElement('section');box.id='md-inf-9117';box.className='card';
 box.innerHTML='<h2>Infectious Diseases · Exam Practice</h2><p class="muted">Choose your source deck. Practice exams start at 50 questions; the uploaded mock retains all 130 original questions.</p>'+
 '<div class="md-inf917-form"><label for="md-inf917-deck">Question deck</label>'+
 '<select id="md-inf917-deck"><option value="all">Full Infectious Diseases Bank</option>'+
 '<option value="mock">Preserved Original Mock · 130</option>'+
 '<option value="instructor">Instructor Study Guide · 55 review points</option>'+
 '<option value="peer">Additional Exam Review · 26 topics</option>'+
 '<option value="slides">Chapter 39 Lecture Slides</option>'+
 '<option value="textbook">Nancy Caroline Chapter 39 · Case &amp; Topic Review</option>'+
 '<option value="high">High-Yield Practice</option>'+
 '<option value="directives">Infectious — PCP Directives &amp; BLS Standards · 50</option></select>'+
 '<label for="md-inf917-size">Questions</label><select id="md-inf917-size"><option value="50">50</option><option value="75">75</option><option value="100">100</option><option value="all">Full deck</option></select>'+
 '<button type="button" id="md-inf917-start" class="success">Start Study Session</button></div>'+
 '<p class="md-inf917-directive"><button type="button" id="md-inf917-pcp" class="secondary">PCP Directives &amp; Medications</button></p>'+
 '<p class="muted" id="md-inf917-count" aria-live="polite"></p>';
 box.querySelector('#md-inf917-pcp').onclick=()=>{if(typeof showPCPDirectiveStudy==='function')showPCPDirectiveStudy();else if(typeof openStandardsLibrary==='function')openStandardsLibrary('ALS');};
 const topbar=page.querySelector('.topbar');if(topbar)topbar.after(box);else page.prepend(box);
 if(registrationErrors.length)console.error('Med Daddy Infectious source deck registration:',registrationErrors);
 const pick=box.querySelector('#md-inf917-deck'),size=box.querySelector('#md-inf917-size'),status=box.querySelector('#md-inf917-count');
 function update(){
  const chosen=decks[pick.value]||[];
  const isMock=pick.value==='mock',isDirective=pick.value==='directives';
  if(isMock||isDirective){size.disabled=true;size.value='all';}else{if(size.disabled)size.value='50';size.disabled=false;}
  status.textContent=chosen.length+' questions in this deck'+(isMock?' · original order and supplied key preserved':isDirective?' · Ontario PCP and BLS directive focus':'');
 }
 pick.onchange=update;size.onchange=update;update();
 box.querySelector('#md-inf917-start').onclick=()=>{
  const chosen=decks[pick.value]||[];
  if(registrationErrors.length){status.textContent='Some source questions failed validation. Study session has not started; no progress was cleared. See console details.';return;}
  if(chosen.length<50){status.textContent='This deck has fewer than 50 valid questions. Select the full bank.';return;}
  if(chosen.some(q=>!safeRegistry.has(q.id))){status.textContent='This source deck is not registered with the quiz engine. No progress was changed.';return;}
  const wanted=pick.value==='mock'||size.value==='all'?chosen.length:Math.min(Number(size.value),chosen.length);
  const pool=pick.value==='mock'?chosen.slice():shuffle(chosen.slice()).slice(0,wanted);
  const recycle=document.getElementById('recycle');if(recycle)recycle.checked=false;
  // An explicitly selected exam must not be silently reduced to prior misses/unseen items.
  const adaptive=document.getElementById('adaptiveNext');if(adaptive)adaptive.checked=false;
  if(typeof start==='function')start(pool);
  else status.textContent='Study engine unavailable. Reload the app.';
 };
 const css=document.createElement('style');css.id='md-inf917-style';
 css.textContent='#md-inf-9117{margin:16px 0;padding:18px;border-radius:12px}#md-inf-9117 h2{margin:0 0 8px;font-size:1.35rem}'+
 '#md-inf-9117 .md-inf917-form{display:grid;grid-template-columns:minmax(120px,1fr) minmax(240px,3fr);gap:10px;align-items:center}'+
 '#md-inf-9117 select{width:100%;min-height:44px;border-radius:8px;padding:8px;background:#101f31;color:#eef7ff;border:1px solid #5c7996}'+
 '#md-inf-9117 button{grid-column:1/-1;min-height:48px;border-radius:8px;font-weight:700}'+
 '@media(max-width:650px){#md-inf-9117 .md-inf917-form{grid-template-columns:1fr}}';
 css.textContent+='#md-inf-9117 .md-inf917-directive{margin:10px 0 0}#md-inf-9117 .md-inf917-directive button{width:100%;min-height:42px}';document.head.appendChild(css);
 document.title='Med Daddy v9.11.10 — PCT II Infectious Exam Prep';
 window.MD_INF_UI_9117={ready:registrationErrors.length===0,version:'9.11.10',decks:Object.fromEntries(Object.entries(decks).map(([k,v])=>[k,v.length])),retainedPCPDirectives:true};
})();