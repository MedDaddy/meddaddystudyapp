/* PCP109 original lecture mock, independent unscored source-fidelity reader.
   Eight UNIQUE prompts copied from Substance Abuse.ppt slides 35–50.
   Duplicated odd/even quiz slides preserved as provenance, not duplicated in bank.
   The uploaded slides do NOT supply a verified answer key. */
(()=>{'use strict';
 if(window.MD_PSYCH_ORIGINAL_1001)return;
 const source=[{"slide":35,"repeat":36,"prompt":"Indications of a narcotic overdose are","choices":["Hypertension, tachycardia, flushed skin, tachypnea","Hypotension, bradycardia, pale skin, bradypnea","Seizure, tachycardia, tachypnea, vomiting","Seizure, bradycardia, pale skin, tachypnea"]},{"slide":37,"repeat":38,"prompt":"Indications of a stimulant overdose are","choices":["Hypertension, tachycardia, flushed skin, tachypnea","Hypotension, bradycardia, dry skin, bradypnea","Seizure, tachycardia, tachypnea, constricted pupils","Seizure, bradycardia, pale skin, bradypnea"]},{"slide":39,"repeat":40,"prompt":"You respond for a 25 yr old male found by his roommate. In the room you find the patient laying prone on his bed, he is half dressed and on the floor around him are at least 10 empty bottles (beer, vodka, gin) and three pill bottles. As you roll the patient over you see some over the counter cold and nausea medications. Information you want to obtain / look for specific to a possible drug overdose includes:","choices":["drug name, dose, date prescribed, doctor prescribing","drug name, dose, number of pills, pharmacy","drug name, dose, number of pills in bottle, date prescribed","drug name, dose, doctor prescribing, pharmacy"]},{"slide":41,"repeat":42,"prompt":"You are assessing a 6yr old patient complaining of dizziness and vomiting. The child was playing in the local park during a family picnic when they became sick. Your assessment reveals the following: conscious and anxious, slowed breathing, slowed pulse, cool wet and pale skin, drooling and shaking. The child has vomited 3 times in the past 10mins and is currently complaining of an urgent need to go to the bathroom. A probable working assessment for this child would…","choices":["hypoglycemia","heat exhaustion","chemical poisoning","allergic reaction"]},{"slide":43,"repeat":44,"prompt":"You have called 911 for a friend who has been very depressed and spoke of killing herself. When you arrived at her house, you found her on the floor in the bathroom. Based on the following findings, choose the most probable cause of her present condition; semi conscious, tachycardic, hypotensive, fast and deep breathing rate, warm flushed dry skin.","choices":["Beta Blockers overdose","ASA overdose","alcohol overdose","valium overdose"]},{"slide":45,"repeat":46,"prompt":"You are called to a local woodshop where a man was found seizing, immediately after working with a paint-removal product. The man was not wearing gloves. He is now confused and lethargic. He is tachypneic and complains of abdominal pain. You suspect this patient has been poisoned by:","choices":["Hydrocarbon","A strong acid","Ethylene glycol","Methanol"]},{"slide":47,"repeat":48,"prompt":"A chemical that may be produced when nylon and polyurethane burn and is of particular concern in any fire environment is:","choices":["Cyanide","Ammonia","Hydrocarbons","Carbon monoxide"]},{"slide":49,"repeat":50,"prompt":"The drug of choice for carbamate poisonings is:","choices":["Atropine","Diazepam","Lorazepam","Pralidoxime chloride"]}];
 const main=document.getElementById('psychFinalPage');
 if(!main||!window.MD_PSYCH_FINAL_1000?.ready||source.length!==8){window.MD_PSYCH_ORIGINAL_1001={ready:false};return;}
 const card=document.createElement('button');card.type='button';card.className='md1001-entry';
 card.textContent='Original Lecture Quiz · 8 source questions (unscored)';
 main.querySelector('.md1000-grid')?.append(card);
 const panel=document.createElement('section');panel.className='panel hidden md1001-mock';panel.id='psychFinalOriginalMock';
 panel.setAttribute('aria-hidden','true');
 panel.innerHTML='<div class="md1001-head"><button type="button" data-md1001="home">← Psychology Final</button><div><small>PCP109 PSYCHOLOGY</small><h1>Preserved Lecture Questions</h1><p>Eight distinct original questions from Substance Abuse.ppt. The source slides repeat them in pairs and do not provide verified answer keys. This is a source-fidelity reader, not a scored exam.</p></div></div>'+
 '<div class="md1001-top"><div id="md1001-counter"></div><div class="md1001-progress-track"><div id="md1001-progress"></div></div></div>'+
 '<div class="md1001-card"><h2 id="md1001-question"></h2><div id="md1001-choices"></div><div id="md1001-feedback" hidden></div></div>'+
 '<div class="md1001-nav"><button type="button" data-md1001="prev">← Previous</button><button type="button" data-md1001="submit">Submit</button><button type="button" data-md1001="next">Next →</button></div>';
 document.body.append(panel);
 const get=id=>panel.querySelector('#'+id),escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let index=0,answers=new Map(),submitted=new Set,selected=null;
 const draw=()=>{
  const q=source[index],done=submitted.has(index),choice=done?answers.get(index):selected;
  get('md1001-counter').textContent='Original lecture quiz '+(index+1)+' / '+source.length+' · Substance Abuse.ppt slide '+q.slide;
  get('md1001-progress').style.width=100*(index+1)/source.length+'%';
  get('md1001-question').textContent=q.prompt;
  get('md1001-choices').innerHTML=q.choices.map((c,i)=>{
   const letter='ABCD'[i];return '<button type="button" data-md1001-choice="'+letter+'" '+(done?'disabled':'')+' class="md1001-choice '+(choice===letter?'selected':'')+'"><b>'+letter+'</b><span>'+escape(c)+'</span></button>';
  }).join('');
  get('md1001-feedback').hidden=!done;
  get('md1001-feedback').innerHTML=done?'<strong>Response recorded: '+escape(choice)+'</strong><p>The uploaded source contains no verified answer key. Compare this item with the lecture material and current PCP standards; Med Daddy will not label an unverified response correct or incorrect.</p>':'';
  panel.querySelector('[data-md1001="prev"]').disabled=index===0;
  panel.querySelector('[data-md1001="submit"]').hidden=done;
  panel.querySelector('[data-md1001="submit"]').disabled=!choice||done;
  panel.querySelector('[data-md1001="next"]').disabled=!done;
  panel.querySelector('[data-md1001="next"]').textContent=index===source.length-1?'Restart source quiz':'Next →';
 };
 card.addEventListener('click',()=>{show('psychFinalOriginalMock');draw();});
 panel.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;const action=b.dataset.md1001;
  if(action==='home'){show('psychFinalPage');return;}
  if('md1001Choice' in b.dataset&&!submitted.has(index)){selected=b.dataset.md1001Choice;draw();return;}
  if(action==='submit'&&selected&&!submitted.has(index)){answers.set(index,selected);submitted.add(index);draw();return;}
  if(action==='prev'&&index>0){index--;selected=null;draw();return;}
  if(action==='next'&&submitted.has(index)){
   if(index===source.length-1){index=0;answers=new Map();submitted=new Set();selected=null;}
   else{index++;selected=null;}
   draw();
  }
 });
 const css=document.createElement('style');css.id='md1001-original-style';
 css.textContent=[
 '.md1001-entry{display:flex;align-items:center;justify-content:center;min-height:109px;padding:14px;background:#173851;border:1px solid #679ab9;border-radius:12px;color:#eaf6ff;white-space:normal;font-size:1rem;font-weight:800;text-align:center}',
 '.md1001-head{display:flex;gap:17px;align-items:flex-start;margin-bottom:19px}',
 '.md1001-head h1{margin:5px 0}.md1001-head p{line-height:1.55;color:#c5d7e5}',
 '.md1001-head button,.md1001-nav button{width:auto!important;padding:10px 14px!important}',
 '.md1001-top{margin:12px 0 18px;color:#c5dbee;font-weight:800}',
 '.md1001-progress-track{height:9px;border-radius:10px;background:#233e53;overflow:hidden;margin-top:9px}',
 '#md1001-progress{height:100%;background:#38bdf8}',
 '.md1001-card{max-width:1060px;border:1px solid #46657f;background:#112236;border-radius:14px;padding:clamp(15px,3vw,24px)}',
 '.md1001-card h2{font-size:1.18rem;line-height:1.55;margin:0 0 18px}',
 '#md1001-choices{display:grid;gap:10px}',
 'button.md1001-choice{display:flex;align-items:flex-start;gap:15px;text-align:left;background:#1a314a;border:1px solid #557997;color:#fff;border-radius:10px;padding:16px;white-space:normal;min-height:58px;width:100%}',
 'button.md1001-choice.selected{border:2px solid #7dd3fc;background:#174767}',
 '.md1001-choice b{min-width:29px;font-size:1.1rem} .md1001-choice span{flex:1;line-height:1.5}',
 '.md1001-nav{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}',
 '#md1001-feedback{margin-top:18px;padding:15px;border:1px solid #896f45;background:#2d2a20;border-radius:10px}',
 '#md1001-feedback[hidden]{display:none!important}#md1001-feedback p{line-height:1.5;margin-top:8px}',
 '.md1001-mock [hidden]{display:none!important}'
 ].join('\n');
 document.head.appendChild(css);
 window.MD_PSYCH_ORIGINAL_1001={version:'9.10.1',ready:true,uniqueSourceQuestions:8,duplicatedSourceSlides:8,verifiedKeys:0,autoScored:0,originalQuestionsPreserved:true};
 const badge=document.querySelector('#appVersion,.app-version,[data-app-version]');
 if(badge)badge.textContent=badge.textContent.replace(/9\.10\.0/g,'9.10.1');
 document.title=document.title.replace(/v9\.10\.0/,'v9.10.1');
})();