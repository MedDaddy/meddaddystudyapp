/* Med Daddy v9.11.11 — PCP Medication Mastery, clinical directive-quality mode.
 * Curates the existing uploaded-source-anchored 120 medications and 298 clinical
 * scenario questions into one home-screen 50+ question workflow. Retains every
 * existing bank, provenance, answer key, saved record, and other unit.
 */
(()=>{'use strict';
 if(window.MD_PCP_MED_GOLD_91111)return;
 const old=typeof MD_PCP_BANKS!=='undefined'&&MD_PCP_BANKS?.medications;
 const clinical=typeof MD_SM_NEW!=='undefined'&&Array.isArray(MD_SM_NEW)?MD_SM_NEW:[];
 const originalShow=typeof showPCPMastery==='function'?showPCPMastery:null;
 if(!Array.isArray(old)||old.length<120||clinical.length<250||!originalShow){
  window.MD_PCP_MED_GOLD_91111={ready:false,error:'Existing Med Daddy medication / scenario bank not available'};return;
 }
 const medTopics=new Set(old.map(q=>q.topic));
 const directiveTopics=new Set([
  'Moderate to Severe Allergic Reaction','Bronchoconstriction','Croup',
  'Analgesia','Nausea/Vomiting','Suspected Adrenal Crisis','Hypoglycemia',
  'Opioid Toxicity and Withdrawal','Cardiac Ischemia',
  'Acute Cardiogenic Pulmonary Edema','Medical Cardiac Arrest','ROSC',
  'Emergency Childbirth','Traumatic Hemorrhage','Cyanide Exposure',
  'Hydrofluoric Acid Exposure','Adult Nerve Agent Exposure',
  'Pediatric Nerve Agent Exposure','Minor Allergic Reaction','Seizure',
  'Headache — Special Event','Musculoskeletal Pain — Special Event',
  'Minor Abrasions','Newborn Resuscitation','Cardiogenic Shock',
  'Intravenous and Fluid Therapy'
 ]);
 const scope=question=>question&&
  (medTopics.has(question.topic)||directiveTopics.has(question.topic)||
   question.topic==='Integrated treatment plans'||question.topic==='MED CHECK / MACC');
 const valid=q=>q&&typeof q.id==='string'&&typeof q.prompt==='string'&&
  Array.isArray(q.choices)&&q.choices.length===4&&
  new Set(q.choices.map(c=>String(c).trim().toLowerCase())).size===4&&
  'ABCD'.includes(q.answer)&&typeof q.whyCorrect==='string'&&q.whyCorrect.length>12&&
  q.whyWrong&&Object.keys(q.whyWrong).length===3&&
  'ABCD'.split('').filter(l=>l!==q.answer).every(l=>typeof q.whyWrong[l]==='string'&&q.whyWrong[l].length>8);
 const unique=arr=>[...new Map(arr.filter(valid).map(q=>[q.id,q])).values()];
 const foundations=unique(old);
 const scenarios=unique(clinical.filter(scope));
 const medSpecific=unique(clinical.filter(q=>medTopics.has(q.topic)));
 const integrated=unique(clinical.filter(q=>q.topic==='Integrated treatment plans'||q.topic==='MED CHECK / MACC'));
 const all=unique([...scenarios,...foundations]);
 const calc=unique([...scenarios,...foundations].filter(q=>/calculation|dose/i.test(q.studySkill||'')||/calculate|how many (ml|mg|mcg|puffs)|what volume|how much .*\\b(?:mg|mcg|ml)\\b/i.test(q.prompt)));
 const pools={clinical:scenarios,integrated,medications:medSpecific,calculations:calc,all,foundations};
 const registration=window.MD_SAFE_QUESTIONS;
 const problems=[];
 if(!(registration instanceof Map))problems.push('Safety registry unavailable');
 else for(const q of all){
  const found=registration.get(q.id);
  if(!found)problems.push('Missing source question registry: '+q.id);
  else if(found.answer!==q.answer||found.prompt!==q.prompt)problems.push('Safety registry mismatch: '+q.id);
 }
 if(foundations.length!==old.length)problems.push('Original medication bank has invalid/incomplete source question records');
 const host=document.getElementById('pcpMasteryContent');
 if(!host)problems.push('Original PCP Medication Mastery page not found');
 const style=document.createElement('style');style.id='md-pcp-med-gold-91111-style';
 style.textContent='#md-pcp-med-gold{margin:18px auto;max-width:1040px}'+
 '#md-pcp-med-gold .med-gold-options{display:grid;grid-template-columns:160px 1fr;gap:12px;align-items:center}'+
 '#md-pcp-med-gold label{font-weight:700}#md-pcp-med-gold select{width:100%;min-height:48px;padding:10px;background:#111f30;color:#e8f2ff;border:1px solid #42617e;border-radius:9px}'+
 '#md-pcp-med-gold button{min-height:48px;width:100%;font-weight:700}'+
 '#md-pcp-med-gold .med-gold-meta{margin-top:14px;opacity:.88}'+
 '@media(max-width:650px){#md-pcp-med-gold .med-gold-options{grid-template-columns:1fr}}';
 document.head.appendChild(style);
 function mark(id){const root=document.getElementById(id);if(!root)return;
  root.querySelectorAll('button.study-primary-card').forEach(btn=>{
   if((btn.getAttribute('onclick')||'').includes("showPCPMastery('medications')")){
    const t=btn.querySelector('small');
    if(t)t.textContent='30 medication entries • clinical scenarios, dose calculations & MED CHECK';
   }
  });
 }
 mark('setup');mark('studyHub');
 function build(){
  if(problems.length){host.innerHTML='<section class="card"><h2>PCP Medications</h2><p>Question validation needs attention before practice can start. No saved progress has been changed.</p></section>';console.error('PCP Medication Gold validation',problems);return;}
  host.innerHTML=
  '<section class="card" id="md-pcp-med-gold">'+
  '<span class="companion-kicker">ONTARIO PCP • ALS PCS 5.4 • AUGUST 2026 COMPANION</span>'+
  '<h1>💊 PCP Medication Mastery</h1>'+
  '<p>Clinical directive application first. Choose an exam bank, assess patient details, then select the best medication decision. Each answer includes why the other three options are wrong.</p>'+
  '<div class="med-gold-options"><label for="md-pcp-gold-bank">Question deck</label>'+
  '<select id="md-pcp-gold-bank">'+
  '<option value="clinical">Clinical Directive Decisions — recommended</option>'+
  '<option value="integrated">MED CHECK &amp; Integrated Treatment Plans</option>'+
  '<option value="medications">Medication-Specific Scenarios</option>'+
  '<option value="calculations">Dose Calculations &amp; Thresholds</option>'+
  '<option value="all">All PCP Medication Questions — Complete Bank</option>'+
  '<option value="foundations">Foundations, Pharmacology &amp; Original Medications</option>'+
  '</select>'+
  '<label for="md-pcp-gold-length">Exam size</label>'+
  '<select id="md-pcp-gold-length"><option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="all">Entire selected bank</option></select>'+
  '<button type="button" class="success" id="md-pcp-gold-start">Start Medication Exam</button></div>'+
  '<p id="md-pcp-gold-meta" class="med-gold-meta muted" aria-live="polite"></p>'+
  '<p class="small">Ontario PCP core and authorized auxiliary/special-event pathways are distinct. Exact indications, contraindications, weights, ages, doses, maximums, and authorization govern each answer. The original medication bank is preserved.</p>'+
  '<button type="button" class="secondary" id="md-pcp-gold-reference">Open PCP Directive Reference Cards</button>'+
  '</section>';
  const select=host.querySelector('#md-pcp-gold-bank'),length=host.querySelector('#md-pcp-gold-length'),meta=host.querySelector('#md-pcp-gold-meta');
  const update=()=>{
   const p=pools[select.value]||[];
   meta.textContent=p.length+' source-anchored questions • '+new Set(p.map(q=>q.topic)).size+' topics • 50-question minimum';
   if(length.value!=='all'&&p.length<Number(length.value)&&p.length>=50)length.value='50';
  };
  select.onchange=update;length.onchange=update;update();
  host.querySelector('#md-pcp-gold-start').onclick=()=>{
   const source=pools[select.value]||[];
   if(source.length<50){meta.textContent='Fewer than 50 verified questions in this selection. Choose a broader bank.';return;}
   if(!(registration instanceof Map)||source.some(q=>!registration.has(q.id))){
    meta.textContent='Safety registry verification failed. Study progress remains untouched.';return;
   }
   const count=length.value==='all'?source.length:Math.min(Number(length.value),source.length);
   const pool=typeof shuffle==='function'?shuffle(source.slice()):source.slice();
   const topicGroups=new Map();
   for(const q of pool){if(!topicGroups.has(q.topic))topicGroups.set(q.topic,[]);topicGroups.get(q.topic).push(q);}
   const buckets=[...topicGroups.values()];
   const chosen=[];let pass=0;
   while(chosen.length<count&&buckets.some(b=>b.length)&&pass++<source.length+1){
    for(const b of buckets){if(chosen.length<count&&b.length)chosen.push(b.pop());}
   }
   if(chosen.length<50){meta.textContent='Cannot form a full practice exam without repeats.';return;}
   const recycle=document.getElementById('recycle');if(recycle)recycle.checked=false;
   if(typeof start==='function')start(chosen);
   else meta.textContent='Study engine unavailable: no progress modified.';
  };
  host.querySelector('#md-pcp-gold-reference').onclick=()=>{if(typeof showPCPDirectiveStudy==='function')showPCPDirectiveStudy();};
 }
 showPCPMastery=function(kind='directives'){
  if(kind!=='medications')return originalShow(kind);
  pcpStudyKind='medications';
  build();
  if(typeof show==='function')show('pcpMasteryPage');
 };
 window.MD_PCP_MED_GOLD_91111={ready:!problems.length,pools:Object.fromEntries(Object.entries(pools).map(([k,v])=>[k,v.length])),medicationTopics:medTopics.size,problems,version:'9.11.11',framework:'scenario-first, 50/75/100/full, existing Med Daddy progress'};
})();