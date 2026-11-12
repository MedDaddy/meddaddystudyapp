/* Med Daddy v9.11.24 — all new features are scoped to PCT II Symptom Relief Drugs. */
(()=>{'use strict';
if(window.MD_PCT2_SRD_UI_91124)return;
const base=window.MD_PCT2_SRD_91123,page=document.getElementById('pct2SrdPage'),parent=document.getElementById('pct2InfectiousPage');
const registry=window.MD_SAFE_QUESTIONS;
const typedSource=window.MD_SRD_FIB_91124;
const newTypedSource=window.MD_SRD_FIB_EXTRA_91129;
const blanks=Array.isArray(typedSource)&&Array.isArray(newTypedSource)?[
 ...typedSource.filter(x=>x.directive!=='Supraglottic Airway'&&x.directive!=='Seizure'),
 ...newTypedSource
]:[];
const errors=[];
if(!base?.ready||!page||!parent)errors.push('SRD unit not ready');
if(!(registry instanceof Map))errors.push('Study question registry unavailable');
if(!Array.isArray(typedSource)||!Array.isArray(newTypedSource)||newTypedSource.length!==55||blanks.length!==100)errors.push('100-item medication typed bank incomplete');
if(typeof start!=='function'||typeof shuffle!=='function')errors.push('Study engine unavailable');
const all=registry instanceof Map?[...registry.values()].filter(q=>q?.id?.startsWith('PCT2-SRD-91123-')||q?.id?.startsWith('PCT2-SRD-91129-')):[];
if(all.length!==216)errors.push('SRD 216 medication-question bank incomplete');
const panel=page?.querySelector('.md-srd-panel'),selector=page?.querySelector('.md-srd-select'),bank=page?.querySelector('#md-srd-bank'),len=page?.querySelector('#md-srd-length'),startButton=page?.querySelector('#md-srd-start');
if(!panel||!selector||!bank||!len||!startButton)errors.push('Existing SRD controls missing');
const names={
 'Cardiac Ischemia':'PCP Cardiac Ischemia Medical Directive',
 'Bronchoconstriction':'PCP Bronchoconstriction Medical Directive',
 'Moderate to Severe Allergic Reaction':'PCP Moderate to Severe Allergic Reaction Medical Directive',
 'Croup':'PCP Croup Medical Directive',
 'Hypoglycemia':'PCP Hypoglycemia Medical Directive',
 'Opioid Toxicity and Withdrawal':'PCP Opioid Toxicity and Withdrawal Medical Directive',
 'Nausea/Vomiting':'PCP Nausea/Vomiting Medical Directive',
 'Analgesia':'PCP Analgesia Medical Directive',
 'Acute Cardiogenic Pulmonary Edema':'PCP Acute Cardiogenic Pulmonary Edema Medical Directive',
 'Suspected Adrenal Crisis':'PCP Suspected Adrenal Crisis Medical Directive',
 'Supraglottic Airway':'PCP Supraglottic Airway Medical Directive',
 'Seizure — PCP Auxiliary (Treat and Discharge)':'PCP Auxiliary Seizure Medical Directive — Treat and Discharge',
 'Seizure':'PCP Auxiliary Seizure Medical Directive — Treat and Discharge',
 'Medication Calculations and Pharmacology':'PCT II Pharmacology Review — Medication Calculation and Safety'
};
const focusNames={D:'Doses, administration and calculations',C:'Contraindications and eligibility',T:'Best treatment choice',S:'Sequence and reassessment'};
function nameFor(topic){return names[topic]||topic;}
function crossDirective(prompt){
 if(/opioid|naloxone/i.test(prompt)&&/glucose|BGL|hypogly/i.test(prompt))return nameFor('Opioid Toxicity and Withdrawal')+' + '+nameFor('Hypoglycemia');
 if(/ischemi|ACS/i.test(prompt)&&/NSAID|renal colic|flank pain/i.test(prompt))return nameFor('Cardiac Ischemia')+' + '+nameFor('Analgesia');
 if(/TBI|head injury/i.test(prompt)&&/nausea/i.test(prompt))return nameFor('Analgesia')+' + '+nameFor('Nausea/Vomiting');
 if(/STEMI|V4R|nitro|ACS|ischemi/i.test(prompt))return nameFor('Cardiac Ischemia');
 if(/ACPE|pulmonary edema/i.test(prompt))return nameFor('Acute Cardiogenic Pulmonary Edema');
 if(/hypogly|glucose|BGL/i.test(prompt))return nameFor('Hypoglycemia');
 if(/croup|stridor/i.test(prompt))return nameFor('Croup');
 if(/anaphyla|allergen|allergic/i.test(prompt))return nameFor('Moderate to Severe Allergic Reaction')+' + '+nameFor('Bronchoconstriction');
 return 'PCP Symptom Relief Medical Directives — Integrated Decision';
}
const dirs=Object.keys(names).filter(topic=>!['Medication Calculations and Pharmacology','Seizure'].includes(topic) && all.some(q=>q.topic===topic));
const directory=dirs.map(topic=>({topic,name:nameFor(topic),items:all.filter(q=>q.topic===topic)}));
if(directory.length!==10)errors.push('Expected 10 medication-specific PCP directives, found '+directory.length);
if(new Set(blanks.map(q=>q.id)).size!==blanks.length||blanks.some(q=>!q.directive||!q.focus||!q.prompt||!q.unit||!q.answers?.length||!q.explanation||!q.source))errors.push('Typed-question validation failed');
if(errors.length){window.MD_PCT2_SRD_UI_91124={ready:false,errors};console.error('SRD UI failed precheck',errors);return;}
/* Name the directive at the start of each existing MCQ stem. Stable IDs, answer letters
 * and four choices are preserved. In particular, citation page numbers are never
 * substituted for actual medical directive names. */
/* SRD-only statement layout; Unicode line separator U+2028 is a forced
 * line break in current browsers even with white-space:normal. Keep source
 * prompts plain text (no injected HTML) and preserve question identities. */
const lineBreak='\n';
function stackStatements(stem){
 let out=stem;
 if(/Consider:\s*1\.\s/.test(out)){
  out=out.replace(/Consider:\s*1\.\s/,'Consider:'+lineBreak+'1. ');
  out=out.replace(/;\s*([2-4]\.\s)/g,lineBreak+'$1');
  out=out.replace(/\.\s*(Which statements are correct\?)/,'.'+lineBreak+lineBreak+'$1');
 }
 if(/findings:\s*A\.\s/.test(out)){
  out=out.replace(/findings:\s*A\.\s/,'findings:'+lineBreak+'A. ');
  out=out.replace(/;\s*([BCD]\.\s)/g,lineBreak+'$1');
  out=out.replace(/\.\s*(Which findings independently contraindicate SL nitroglycerin\?)/,'.'+lineBreak+lineBreak+'$1');
 }
 return out;
}
for(const q of all){
 const original=q._mdSrdPromptBeforeContext||q.prompt;
 q._mdSrdPromptBeforeContext=original;
 q.srdDirectiveName=q.topic==='Integrated PCP Directive Choices'?crossDirective(original):nameFor(q.topic);
 q.prompt=q.srdDirectiveName+lineBreak+stackStatements(original);
}
/* The main quiz renders text with normal CSS whitespace. Preserve the line
 * breaks of SRD combination questions without changing any other unit.
 * A targeted observer handles each new question as the quiz advances. */
const stackedIds=new Set(all.filter(q=>/\n(?:1|A)\.\s/.test(q.prompt)).map(q=>q.id));
function preserveSrdStatementLines(){
 if(!stackedIds.size||typeof quiz==='undefined'||!Array.isArray(quiz)||
    !quiz.some(q=>stackedIds.has(q.id)))return;
 const candidates=document.body?.querySelectorAll('h1,h2,h3,h4,p,div,span,section,article')||[];
 for(const el of candidates){
  const s=el.textContent||'';
  if(s.length>4000||!/\n(?:1|A)\.\s/.test(s))continue;
  if(Array.from(el.children).some(c=>/\n(?:1|A)\.\s/.test(c.textContent||'')))continue;
  if(el.style.whiteSpace!=='pre-line')el.style.whiteSpace='pre-line';
 }
}
if(typeof MutationObserver!=='undefined'&&document.body){
 const observer=new MutationObserver(preserveSrdStatementLines);
 observer.observe(document.body,{subtree:true,childList:true,characterData:true});
 preserveSrdStatementLines();
}
const css=document.createElement('link');css.id='md-srd-91124-css';css.rel='stylesheet';css.href='./md_v91124_srd_ui.css?md_build=9.11.24';document.head.appendChild(css);
selector.style.display='none';
const tileZone=document.createElement('section');tileZone.id='md-srd-mode-tiles';
tileZone.innerHTML='<h2>Choose your SRD training match</h2><p class="md-srd-intro">Every question names its <strong>PCP medical directive</strong> and what you are testing. Doses, cutoffs and contraindications are based on ALS PCS v5.4.</p>'+
'<div class="md-srd-tiles">'+
'<button type="button" data-srd-mode="directives" class="md-srd-feature"><span class="md-srd-tile-icon">📋</span><strong>PCP Directive Challenge</strong><small>50 questions across named PCP directives · hard treatments, doses and contraindications</small></button>'+
'<button type="button" data-srd-mode="fill" class="md-srd-feature"><span class="md-srd-tile-icon">✍️</span><strong>Fill in the Blank</strong><small>'+blanks.length+' typed doses, thresholds, drug names and medication-order questions with immediate feedback</small></button>'+
'<button type="button" data-srd-mode="wrestle" class="md-srd-feature"><span class="md-srd-tile-icon">🤼</span><strong>WrestleMania Medication Mayhem</strong><small>50 hard ringside drug, dose, contraindication and sequence decisions</small></button>'+
'<button type="button" data-srd-mode="high"><span class="md-srd-tile-icon">🎯</span><strong>High-Yield 50</strong><small>Ten priority concept groups · five questions per concept</small></button>'+
'<button type="button" data-srd-mode="mock"><span class="md-srd-tile-icon">🏆</span><strong>Instructor-Style Mock 50</strong><small>Balanced answer choices and real-world judgement</small></button>'+
'<button type="button" data-srd-mode="dose"><span class="md-srd-tile-icon">💉</span><strong>Doses &amp; Medication Math</strong><small>'+base.counts.dose+' dosing, routes, weight and calculation questions</small></button>'+
'<button type="button" data-srd-mode="contra"><span class="md-srd-tile-icon">🛑</span><strong>Contraindication Traps</strong><small>'+base.counts.contra+' subtle eligibility and contraindication cases</small></button>'+
'<button type="button" data-srd-mode="treatment"><span class="md-srd-tile-icon">🩺</span><strong>Best Treatment &amp; Reassessment</strong><small>'+base.counts.treatment+' clinical decisions and reassessment questions</small></button>'+
'<button type="button" data-srd-mode="all"><span class="md-srd-tile-icon">📚</span><strong>Full SRD Bank</strong><small>Up to '+base.counts.all+' source-linked, instructor-hard questions · choose length below</small></button></div>'+
'<div class="md-srd-length-setting"><label for="md-srd-tile-length">Multiple-choice session length</label><select id="md-srd-tile-length"><option value="50">50 questions</option><option value="75">75 questions</option><option value="100">100 questions</option><option value="all">Full selected deck</option></select></div>';
panel.insertBefore(tileZone,selector);
const focusPanel=document.createElement('section');focusPanel.id='md-srd-directive-focus';
focusPanel.innerHTML='<h2>Test a specific medical directive</h2><p>Choose the directive <strong>by its real name</strong>. Focus sessions contain all unique questions for that directive, with no repeated filler.</p>'+
'<label for="md-srd-specific">PCP medical directive</label><select id="md-srd-specific"></select>'+
'<button type="button" id="md-srd-specific-start">Test Selected Directive</button><p id="md-srd-specific-desc" aria-live="polite"></p>';
panel.insertBefore(focusPanel,selector);
const chooser=focusPanel.querySelector('#md-srd-specific');
for(const d of directory){const option=document.createElement('option');option.value=d.topic;option.textContent=d.name+' · '+d.items.length+' questions';chooser.appendChild(option);}
const desc=focusPanel.querySelector('#md-srd-specific-desc');
function describe(){const d=directory.find(x=>x.topic===chooser.value)||directory[0];desc.textContent=d.name+' — '+d.items.length+' distinct directive questions. For a 50-question mixed test, choose PCP Directive Challenge above.';}
chooser.onchange=describe;describe();
const fib=document.createElement('section');fib.id='md-srd-fill-workspace';
fib.innerHTML='<div class="md-srd-fib-head"><button type="button" id="md-srd-back-tiles">Back to SRD tiles</button><small id="md-srd-fib-status"></small></div>'+
'<div id="md-srd-fib-question" class="md-srd-fib-question" aria-live="polite"></div>'+
'<label for="md-srd-fib-answer">Your answer (number or medication name, as requested)</label><input type="text" id="md-srd-fib-answer" inputmode="decimal" autocomplete="off" placeholder="Enter the number"/>'+
'<div class="md-srd-fib-controls"><button type="button" id="md-srd-fib-check">Check Answer</button><button type="button" id="md-srd-fib-next" disabled>Next Question</button></div>'+
'<div id="md-srd-fib-feedback" role="status" aria-live="polite"></div><div id="md-srd-fib-finish"></div>';
panel.insertBefore(fib,selector);
const details=panel.querySelector('details'),meta=page.querySelector('#md-srd-meta');
function viewFill(on){tileZone.style.display=on?'none':'';focusPanel.style.display=on?'none':'';fib.style.display=on?'block':'none';if(details)details.style.display=on?'none':'';if(meta)meta.style.display=on?'none':'';}
viewFill(false);
function beginStandard(items){
 const selected=shuffle(items.slice());
 if(!selected.length||selected.some(q=>registry.get(q.id)?.answer!==q.answer)){desc.textContent='Question bank check failed; test not started.';return;}
 const recycle=document.getElementById('recycle'),adaptive=document.getElementById('adaptiveNext');
 if(recycle)recycle.checked=false;if(adaptive)adaptive.checked=false;
 parent.classList.remove('md-srd-visible');page.style.display='none';start(selected);
}
function directiveChallenge(){
 const queues=directory.map(d=>{
  const historical=shuffle(d.items.filter(q=>q.id.startsWith('PCT2-SRD-91123-')));
  const newDrugCases=shuffle(d.items.filter(q=>q.id.startsWith('PCT2-SRD-91129-')));
  return [...historical,...newDrugCases]; // pick new hard cases first, then established directive items
 });
 const picks=[];
 while(picks.length<50&&queues.some(arr=>arr.length))for(const arr of queues){if(picks.length<50&&arr.length)picks.push(arr.pop());}
 if(picks.length!==50){desc.textContent='50-question directive bank incomplete.';return;}
 beginStandard(picks);
}
function legacy(which){
 bank.value=which;bank.onchange?.();
 const desired=tileZone.querySelector('#md-srd-tile-length').value;
 const count=base.counts[which]||200;
 len.value=desired==='all'||Number(desired)>count?'all':desired;
 startButton.click();
}
tileZone.querySelectorAll('[data-srd-mode]').forEach(b=>b.addEventListener('click',()=>{
 const which=b.dataset.srdMode;
 if(which==='directives')directiveChallenge();
 else if(which==='fill')beginTyped();
 else legacy(which);
}));
focusPanel.querySelector('#md-srd-specific-start').onclick=()=>{const d=directory.find(x=>x.topic===chooser.value)||directory[0];beginStandard(d.items);};
const answer=fib.querySelector('#md-srd-fib-answer'),status=fib.querySelector('#md-srd-fib-status'),question=fib.querySelector('#md-srd-fib-question');
const check=fib.querySelector('#md-srd-fib-check'),next=fib.querySelector('#md-srd-fib-next'),feedback=fib.querySelector('#md-srd-fib-feedback'),finish=fib.querySelector('#md-srd-fib-finish'),answerLabel=fib.querySelector('label[for="md-srd-fib-answer"]');
let typed={deck:[],at:0,correct:0,missed:[],marked:false};
function beginTyped(custom){typed={deck:shuffle((custom||blanks).slice()),at:0,correct:0,missed:[],marked:false};answer.style.display='';answerLabel.style.display='';check.style.display='';next.style.display='';viewFill(true);render();}
function render(){
 const q=typed.deck[typed.at];feedback.textContent='';finish.textContent='';if(!q){complete();return;}
 status.textContent='Question '+(typed.at+1)+' / '+typed.deck.length+' · '+typed.correct+' correct';
 question.textContent='';
 const namediv=document.createElement('div');namediv.className='md-srd-fib-directive';namediv.textContent=nameFor(q.directive);
 const objective=document.createElement('div');objective.className='md-srd-fib-focus';objective.textContent='Testing: '+q.focus;
 const prompt=document.createElement('p');prompt.textContent=q.prompt+(q.kind==='medication'?'':' Answer in '+q.unit+'.');
 question.appendChild(namediv);question.appendChild(objective);question.appendChild(prompt);
 answerLabel.textContent=q.kind==='medication'?'Your answer (medication name)':'Your answer (number only; unit specified)';
 answer.inputMode=q.kind==='medication'?'text':'decimal';
 answer.placeholder=q.kind==='medication'?'Enter medication name':'Enter the number';
 answer.value='';answer.disabled=false;check.disabled=false;next.disabled=true;next.textContent=typed.at===typed.deck.length-1?'Show Results':'Next Question';typed.marked=false;answer.focus?.();
}
function numeric(str){
 const v=String(str||'').trim().toLowerCase().replace(',','.');
 if(!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(v))return null;
 return Number(v);
}

/* v9.11.32 — SRC-specific medication recall: accepted aliases + visually sourced teaching. */
const srMedNames={
 epinephrine:['epi','adrenaline','adrenalin','epipen'],
 dexamethasone:['dex','dexa','decadron'],
 aspirin:['asa','acetylsalicylic acid'],diphenhydramine:['benadryl','diphen'],
 dimenhydrinate:['gravol','dimen'],glucagon:['glucagen'],naloxone:['narcan'],
 'buprenorphine/naloxone':['suboxone','buprenorphine naloxone','bup naloxone','bup/nal'],
 nitroglycerin:['nitro','gtn','glyceryl trinitrate'],
 acetaminophen:['tylenol','paracetamol','apap'],hydrocortisone:['solu-cortef','solu cortef'],
 salbutamol:['ventolin','albuterol'],ondansetron:['zofran'],ibuprofen:['advil','motrin'],ketorolac:['toradol']
};
function normalizeDrug(v){return String(v||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');}
function srDistance(a,b){
 if(Math.abs(a.length-b.length)>2)return 99;
 let p=Array.from({length:b.length+1},(_,i)=>i);
 for(let i=1;i<=a.length;i++){const row=[i];for(let j=1;j<=b.length;j++)row[j]=Math.min(row[j-1]+1,p[j]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=row;}return p[b.length];
}
function srIdentifyDrug(input){
 const t=normalizeDrug(input);if(!t)return null;
 const entries=Object.entries(srMedNames);
 let hits=entries.filter(([drug,alias])=>[drug,...alias].some(v=>normalizeDrug(v)===t)).map(x=>x[0]);
 if(hits.length)return hits.length===1?hits[0]:null;
 hits=entries.filter(([drug])=>t.length>=4&&normalizeDrug(drug).startsWith(t)).map(x=>x[0]);
 if(hits.length)return hits.length===1?hits[0]:null;
 if(t.length<7)return null;
 hits=entries.filter(([drug,alias])=>[drug,...alias].some(v=>{
  const w=normalizeDrug(v);return w.length>=7&&srDistance(t,w)<=(t.length>=12&&w.length>=12?2:1);
 })).map(x=>x[0]);
 return hits.length===1?hits[0]:null;
}
function srDrugAccepted(q,typed){
 const t=normalizeDrug(typed);if(q.answers.some(a=>normalizeDrug(a)===t))return true;
 const recognized=srIdentifyDrug(typed);
 return !!recognized&&q.answers.some(a=>srIdentifyDrug(a)===recognized);
}
function srMnemonic(q){
 const t=[q.focus,q.prompt,q.explanation].join(' ').toLowerCase(),d=String(q.directive||'').toLowerCase();
 if(/\bd50\b/.test(t))return 'D50 stops at 50: 1 mL/kg, capped at 50 mL (25 g).';
 if(/\bd10\b/.test(t))return 'D10: 2 mL/kg, capped at 250 mL (25 g).';
 if(/glucagon/.test(t))return 'Glucagon IM: below 25 kg = 0.5 mg, 25+ = 1 mg. IN: age 4+, 3 mg.';
 if(/hydrocortisone|solu.cortef/.test(t))return 'Hydrocortisone: 2 mg/kg, round to nearest 10 mg; max 100 mg.';
 if(/buprenorphine|suboxone|cows/.test(t))return 'Withdrawal: COWS at least 8; exclude methadone within 72 hours.';
 if(/naloxone|narcan/.test(t))return 'Naloxone: 0.4 mg IM or 2–4 mg IN; 5-minute intervals, max 3 doses.';
 if(/dexamethasone|steroid/.test(t)&&(/croup|bronchoconstriction/.test(d)||/dexamethasone/.test(t)))return 'DEX: 0.5 mg/kg; 8-mg maximum. Check steroid contraindications.';
 if(/salbutamol|mdi|nebuliz/.test(t))return 'Salbutamol 25-kg split: under 25 = 6 puffs / 2.5 mg NEB; 25+ = 8 puffs / 5 mg NEB.';
 if(/epinephrine|adrenaline/.test(t)&&/croup/.test(d))return 'Croup EPI NEB: under 10 kg = 2.5 mg; 10+ = 5 mg; HR below 200.';
 if(/epinephrine|adrenaline/.test(t))return 'EPI IM: 0.01 mg/kg; max 0.5 mg. Anaphylaxis re-dose after at least 5 minutes.';
 if(/diphenhydramine|benadryl/.test(t))return 'Diphenhydramine: 25–under-50 kg = 25 mg; 50+ = 50 mg.';
 if(/nitroglycerin|nitrate|stemi|pde/.test(t)&&/pulmonary edema/.test(d))return 'ACPE nitro: SBP under 140 → up to 0.4 mg; 140+ may allow up to 0.8 mg with conditions.';
 if(/nitroglycerin|nitrate|stemi|pde/.test(t))return 'Ischemia nitro: SBP at least 100; HR 60–159; PDE check 48 h; 5-minute interval.';
 if(/aspirin|asa|chewable/.test(t))return 'ASA: 2 × 81-mg chewable tablets = 162 mg.';
 if(/dimenhydrinate|gravol/.test(t))return 'Gravol: 25 mg at 25–under-50 kg; 50 mg max at 50+; 30-minute interval.';
 if(/ondansetron|zofran/.test(t))return 'Ondansetron: 4 mg once; check QT and other contraindications.';
 if(/ketorolac|toradol/.test(t))return 'Ketorolac 10–15 mg once; max 15. Check recent NSAIDs.';
 if(/ibuprofen|advil/.test(t))return 'Ibuprofen 400 mg PO once; check NSAIDs in previous 6 h.';
 if(/acetaminophen|tylenol/.test(t))return 'Acetaminophen: ages 12–17 max 650 mg; adults max 1,000 mg.';
 if(/one.third|1\/3|third decline|third drop/.test(t))return 'One-third SBP fall means two-thirds of baseline pressure remains.';
 return '';
}
function srCalculation(q){
 const p=q.prompt||'',w=p.match(/\b(\d+(?:\.\d+)?)\s*-?\s*kg\b/i),kg=w?Number(w[1]):null;
 const n=x=>String(Number(x.toFixed(3)));
 if(kg!==null&&/\bd50\b/i.test(p))return kg+' kg × 1 mL/kg = '+n(kg)+' mL; cap 50 mL → '+n(Math.min(kg,50))+' mL.';
 if(kg!==null&&/\bd10\b/i.test(p))return kg+' kg × 2 mL/kg = '+n(kg*2)+' mL; cap 250 mL → '+n(Math.min(kg*2,250))+' mL.';
 if(kg!==null&&/hydrocortisone/i.test(p)){const a=kg*2,r=Math.round(a/10)*10;return kg+' × 2 = '+n(a)+' mg; round to nearest 10 = '+r+' mg; cap 100 → '+n(Math.min(r,100))+' mg.';}
 if(kg!==null&&/dexamethasone/i.test(p))return kg+' × 0.5 = '+n(kg*.5)+' mg; cap 8 → '+n(Math.min(kg*.5,8))+' mg.';
 if(kg!==null&&/epinephrine/i.test(p)&&!/croup/i.test(q.directive||'')){const a=kg*.01,c=Math.min(a,.5),r=/round/i.test(p)?Math.round(c/.05)*.05:c;return kg+' × 0.01 = '+n(a)+' mg; max 0.5 mg'+(/round/i.test(p)?', round to 0.05 mg':'')+' → '+n(r)+' mg.';}
 const sbp=p.match(/(?:SBP|systolic blood pressure)\s+(?:was\s+)?(\d+)\b/i);
 if(sbp&&/third/i.test(p))return sbp[1]+' × 2/3 = '+n(Number(sbp[1])*2/3)+' mmHg remaining.';
 if(/two 81.mg/i.test(p))return '2 tablets × 81 mg/tablet = 162 mg.';
 if(/eight complete 100.mcg/i.test(p))return '8 puffs × 100 mcg/puff = 800 mcg.';
 return '';
}
const srStudyStyle=document.createElement('style');srStudyStyle.textContent='#md-srd-fib-feedback .sr-learn{margin-top:12px;padding:14px;background:#082b35;border:1px solid #62b8b3;border-radius:12px;color:#eaffff}#md-srd-fib-feedback .sr-learn h3{font-size:1.08rem;color:#9cf1db;margin:0 0 12px}#md-srd-fib-feedback .sr-learn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:9px}#md-srd-fib-feedback .sr-learn-part{background:#123b4b;border-radius:8px;padding:10px}#md-srd-fib-feedback .sr-learn-part strong{display:block;color:#a0efdd;margin-bottom:6px}#md-srd-fib-feedback .sr-learn-source{margin-top:11px;font-size:.88rem;color:#c3dce3}';document.head.appendChild(srStudyStyle);
function srStudyCard(q,correctAnswer){
 const section=document.createElement('section');section.className='sr-learn';section.setAttribute('aria-label','Directive learning card');
 const title=document.createElement('h3');title.textContent='📋 Directive study card: '+nameFor(q.directive);section.appendChild(title);
 const grid=document.createElement('div');grid.className='sr-learn-grid';section.appendChild(grid);
 function field(label,value){if(!value)return;const part=document.createElement('div');part.className='sr-learn-part';const heading=document.createElement('strong');heading.textContent=label;const content=document.createElement('span');content.textContent=value;part.append(heading,content);grid.appendChild(part);}
 field('✓ Correct dose / drug',correctAnswer);field('🧮 Calculation',srCalculation(q));field('📖 Directive rule',q.explanation);field('🧠 Memory trick',srMnemonic(q));
 const src=document.createElement('div');src.className='sr-learn-source';src.textContent='Source: '+q.source+'. Consult the full directive for eligibility, contraindications and local authorization.';section.appendChild(src);
 if(/\b(?:IV|intravenous|D10|D50)\b/i.test(q.prompt)){const note=document.createElement('div');note.className='sr-learn-source';note.textContent='Scope: IV dosing requires the appropriate PCP IV authorization; this is for directive knowledge, not non-IV administration.';section.appendChild(note);}
 return section;
}

function submit(){
 if(typed.marked)return;
 const q=typed.deck[typed.at];if(!q)return;
 if(!answer.value.trim()){feedback.textContent=q.kind==='medication'?'Enter a medication name first.':'Enter a number first. The unit is supplied in the question.';return;}
 const value=numeric(answer.value);
 const correct=q.kind==='medication'
  ? srDrugAccepted(q,answer.value)
  : value!==null&&q.answers.some(x=>Math.abs(x-value)<0.000001);
 typed.marked=true;if(correct)typed.correct++;else typed.missed.push(q);
 feedback.className=correct?'md-srd-correct':'md-srd-incorrect';
 const displayAnswer=q.kind==='medication'?q.answers[0]:q.answers.join(' or ')+' '+q.unit;
 feedback.textContent='';if(correct){const ok=document.createElement('span');ok.textContent='✅ Correct. '+(q.kind==='medication'?'Recognized as '+displayAnswer+'. ':'')+q.explanation+' Source: '+q.source+'.';feedback.appendChild(ok);}else{const warn=document.createElement('div');warn.textContent='❌ Not quite. Review the directive-based breakdown:';feedback.append(warn,srStudyCard(q,displayAnswer));}
 answer.disabled=true;check.disabled=true;next.disabled=false;
 try{const k='md_srd_fill_stats_91124',p=JSON.parse(localStorage.getItem(k)||'{"correct":0,"attempts":0}');localStorage.setItem(k,JSON.stringify({correct:(p.correct||0)+(correct?1:0),attempts:(p.attempts||0)+1}));}catch(e){}
}
function complete(){
 status.textContent='Fill-in-the-Blank session complete';question.textContent='';answer.style.display='none';answerLabel.style.display='none';check.style.display='none';next.style.display='none';feedback.textContent='';
 const title=document.createElement('h3');title.textContent='Your score: '+typed.correct+' / '+typed.deck.length;
 const note=document.createElement('p');note.textContent=typed.missed.length?'You missed '+typed.missed.length+' directive '+(typed.missed.length===1?'fact':'facts')+'. Drill them again without repeating mastered questions.':'Perfect recall — all directive values correct!';
 const retry=document.createElement('button');retry.type='button';retry.textContent='Run all '+blanks.length+' questions';retry.onclick=()=>beginTyped();
 const missed=document.createElement('button');missed.type='button';missed.textContent='Study missed only ('+typed.missed.length+')';missed.disabled=!typed.missed.length;missed.onclick=()=>beginTyped(typed.missed.slice());
 finish.appendChild(title);finish.appendChild(note);finish.appendChild(retry);finish.appendChild(missed);
}
check.onclick=submit;
next.onclick=()=>{if(!typed.marked)return;typed.at++;render();};
answer.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();if(typed.marked&&!next.disabled)next.click();else submit();}});
fib.querySelector('#md-srd-back-tiles').onclick=()=>viewFill(false);
window.MD_PCT2_SRD_UI_91124={ready:true,version:'9.11.32',errors:[],questionContexts:all.length,typedQuestions:blanks.length,directivePools:directory.map(d=>({name:d.name,count:d.items.length})),tiles:tileZone.querySelectorAll('[data-srd-mode]').length,medicationMatches:srDrugAccepted,calculate:srCalculation,studyCard:srStudyCard};
})();