/* Med Daddy v9.11.24 — all new features are scoped to PCT II Symptom Relief Drugs. */
(()=>{'use strict';
if(window.MD_PCT2_SRD_UI_91124)return;
const base=window.MD_PCT2_SRD_91123,page=document.getElementById('pct2SrdPage'),parent=document.getElementById('pct2InfectiousPage');
const registry=window.MD_SAFE_QUESTIONS,blanks=window.MD_SRD_FIB_91124;
const errors=[];
if(!base?.ready||!page||!parent)errors.push('SRD unit not ready');
if(!(registry instanceof Map))errors.push('Study question registry unavailable');
if(!Array.isArray(blanks)||blanks.length!==47)errors.push('Typed bank not complete');
if(typeof start!=='function'||typeof shuffle!=='function')errors.push('Study engine unavailable');
const all=registry instanceof Map?[...registry.values()].filter(q=>q?.id?.startsWith('PCT2-SRD-91123-')):[];
if(all.length!==200)errors.push('SRD 200-question bank incomplete');
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
if(directory.length!==12)errors.push('Expected 12 named PCP directive pools, found '+directory.length);
if(new Set(blanks.map(q=>q.id)).size!==blanks.length||blanks.some(q=>!q.directive||!q.focus||!q.prompt||!q.unit||!q.answers?.length||!q.explanation||!q.source))errors.push('Typed-question validation failed');
if(errors.length){window.MD_PCT2_SRD_UI_91124={ready:false,errors};console.error('SRD UI failed precheck',errors);return;}
/* Name the directive at the start of each existing MCQ stem. Stable IDs, answer letters
 * and four choices are preserved. In particular, citation page numbers are never
 * substituted for actual medical directive names. */
for(const q of all){
 const original=q._mdSrdPromptBeforeContext||q.prompt;
 q._mdSrdPromptBeforeContext=original;
 q.srdDirectiveName=q.topic==='Integrated PCP Directive Choices'?crossDirective(original):nameFor(q.topic);
 q.srdFocus=focusNames[q.reviewCategory]||'Clinical reasoning';
 q.prompt=q.srdDirectiveName+' — '+q.srdFocus+'. '+original;
}
const css=document.createElement('link');css.id='md-srd-91124-css';css.rel='stylesheet';css.href='./md_v91124_srd_ui.css?md_build=9.11.24';document.head.appendChild(css);
selector.style.display='none';
const tileZone=document.createElement('section');tileZone.id='md-srd-mode-tiles';
tileZone.innerHTML='<h2>Choose your SRD training match</h2><p class="md-srd-intro">Every question names its <strong>PCP medical directive</strong> and what you are testing. Doses, cutoffs and contraindications are based on ALS PCS v5.4.</p>'+
'<div class="md-srd-tiles">'+
'<button type="button" data-srd-mode="directives" class="md-srd-feature"><span class="md-srd-tile-icon">📋</span><strong>PCP Directive Challenge</strong><small>50 questions across named PCP directives · hard treatments, doses and contraindications</small></button>'+
'<button type="button" data-srd-mode="fill" class="md-srd-feature"><span class="md-srd-tile-icon">✍️</span><strong>Fill in the Blank</strong><small>47 typed dose, weight, interval and cutoff questions with immediate feedback</small></button>'+
'<button type="button" data-srd-mode="high"><span class="md-srd-tile-icon">🎯</span><strong>High-Yield 50</strong><small>Ten priority concept groups · five questions per concept</small></button>'+
'<button type="button" data-srd-mode="mock"><span class="md-srd-tile-icon">🏆</span><strong>Instructor-Style Mock 50</strong><small>Balanced answer choices and real-world judgement</small></button>'+
'<button type="button" data-srd-mode="dose"><span class="md-srd-tile-icon">💉</span><strong>Doses &amp; Medication Math</strong><small>72 dosing, routes, weight and calculation questions</small></button>'+
'<button type="button" data-srd-mode="contra"><span class="md-srd-tile-icon">🛑</span><strong>Contraindication Traps</strong><small>60 subtle eligibility and contraindication cases</small></button>'+
'<button type="button" data-srd-mode="treatment"><span class="md-srd-tile-icon">🩺</span><strong>Best Treatment &amp; Reassessment</strong><small>68 clinical decisions and reassessment questions</small></button>'+
'<button type="button" data-srd-mode="all"><span class="md-srd-tile-icon">📚</span><strong>Full SRD Bank</strong><small>Up to 200 source-linked, instructor-hard questions · choose length below</small></button></div>'+
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
'<label for="md-srd-fib-answer">Your answer (number only; question specifies unit)</label><input type="text" id="md-srd-fib-answer" inputmode="decimal" autocomplete="off" placeholder="Enter the number"/>'+
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
 const queues=directory.map(d=>shuffle(d.items.slice()));
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
 const prompt=document.createElement('p');prompt.textContent=q.prompt+' Answer in '+q.unit+'.';
 question.appendChild(namediv);question.appendChild(objective);question.appendChild(prompt);
 answer.value='';answer.disabled=false;check.disabled=false;next.disabled=true;next.textContent=typed.at===typed.deck.length-1?'Show Results':'Next Question';typed.marked=false;answer.focus?.();
}
function numeric(str){
 const v=String(str||'').trim().toLowerCase().replace(',','.');
 if(!/^\d+(\.\d+)?$/.test(v))return null;
 return Number(v);
}
function submit(){
 if(typed.marked)return;
 const q=typed.deck[typed.at];if(!q)return;
 if(!answer.value.trim()){feedback.textContent='Enter a number first. The unit is supplied in the question.';return;}
 const value=numeric(answer.value),correct=value!==null&&q.answers.some(x=>Math.abs(x-value)<0.000001);
 typed.marked=true;if(correct)typed.correct++;else typed.missed.push(q);
 feedback.className=correct?'md-srd-correct':'md-srd-incorrect';
 feedback.textContent=(correct?'✅ Correct. ':'❌ Not quite. ')+'Correct answer: '+q.answers.join(' or ')+' '+q.unit+'. '+q.explanation+' Source: '+q.source+'.';
 answer.disabled=true;check.disabled=true;next.disabled=false;
 try{const k='md_srd_fill_stats_91124',p=JSON.parse(localStorage.getItem(k)||'{"correct":0,"attempts":0}');localStorage.setItem(k,JSON.stringify({correct:(p.correct||0)+(correct?1:0),attempts:(p.attempts||0)+1}));}catch(e){}
}
function complete(){
 status.textContent='Fill-in-the-Blank session complete';question.textContent='';answer.style.display='none';answerLabel.style.display='none';check.style.display='none';next.style.display='none';feedback.textContent='';
 const title=document.createElement('h3');title.textContent='Your score: '+typed.correct+' / '+typed.deck.length;
 const note=document.createElement('p');note.textContent=typed.missed.length?'You missed '+typed.missed.length+' directive '+(typed.missed.length===1?'fact':'facts')+'. Drill them again without repeating mastered questions.':'Perfect recall — all directive values correct!';
 const retry=document.createElement('button');retry.type='button';retry.textContent='Run all 47 questions';retry.onclick=()=>beginTyped();
 const missed=document.createElement('button');missed.type='button';missed.textContent='Study missed only ('+typed.missed.length+')';missed.disabled=!typed.missed.length;missed.onclick=()=>beginTyped(typed.missed.slice());
 finish.appendChild(title);finish.appendChild(note);finish.appendChild(retry);finish.appendChild(missed);
}
check.onclick=submit;
next.onclick=()=>{if(!typed.marked)return;typed.at++;render();};
answer.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();if(typed.marked&&!next.disabled)next.click();else submit();}});
fib.querySelector('#md-srd-back-tiles').onclick=()=>viewFill(false);
window.MD_PCT2_SRD_UI_91124={ready:true,version:'9.11.24',errors:[],questionContexts:all.length,typedQuestions:blanks.length,directivePools:directory.map(d=>({name:d.name,count:d.items.length})),tiles:tileZone.querySelectorAll('[data-srd-mode]').length};
})();