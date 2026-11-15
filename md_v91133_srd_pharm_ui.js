/* Med Daddy v9.11.36: SRD Pharmacology Guide using established Med Daddy quiz presentation. */
(()=>{'use strict';
if(window.MD_SRD_PHARM_UI_91133)return;
const data=window.MD_SRD_PHARM_GUIDE_91133;
const page=document.getElementById('pct2SrdPage');
const tileArea=document.querySelector('#md-srd-mode-tiles .md-srd-tiles');
const tiles=document.getElementById('md-srd-mode-tiles');
const focus=document.getElementById('md-srd-directive-focus');
const panel=page&&page.querySelector('.md-srd-panel');
const fib=document.getElementById('md-srd-fill-workspace');
const targeted=document.getElementById('md-srd-targeted-workspace');
const meta=document.getElementById('md-srd-meta');
const details=panel&&panel.querySelector('details');
if(!data?.ready||data.questions.length!==50||!panel||!tileArea||!tiles||!focus||!fib){console.error('Pharmacology guide prerequisites unavailable');return;}
const key='md_srd_pharm_missed_91135';
function load(){try{let v=JSON.parse(localStorage.getItem(key)||'[]');return new Set(Array.isArray(v)?v:[]);}catch(e){return new Set();}}
const missed=load();
function save(){try{localStorage.setItem(key,JSON.stringify([...missed]));}catch(e){}}
function shuffle(xs){const a=xs.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function put(parent,tag,value,cls){const n=document.createElement(tag);n.textContent=value;if(cls)n.className=cls;parent.appendChild(n);return n;}
const tile=document.createElement('button');tile.type='button';tile.className='md-srd-feature';tile.id='md-srd-pharm-guide-tile';
tile.innerHTML='<span class="md-srd-tile-icon">📘</span><strong>Instructor Pharmacology Guide</strong><small>50 rounds · multiple choice, true/false and matching · source-linked feedback</small>';
tileArea.appendChild(tile);
const space=document.createElement('section');space.id='md-srd-pharm-guide-space';space.style.display='none';
space.innerHTML="<div class=\"md-srd-fib-head pg-top\"><button type=\"button\" id=\"pg-back\">← Back to SRD tiles</button><small id=\"pg-progress\"></small></div>\n<h2>Instructor Pharmacology Guide</h2>\n<p class=\"pg-intro\">Familiar Med Daddy practice, built from your instructor's four-page Pharmacology review. Choose a training match below.</p>\n<div id=\"pg-menu\">\n  <h3 class=\"pg-section-title\">Choose your training match</h3>\n  <div class=\"md-srd-tiles pg-deck-tiles\">\n    <button type=\"button\" class=\"md-srd-feature\" data-pg=\"all\"><span class=\"md-srd-tile-icon\">🏆</span><strong>Instructor Mock 50</strong><small>All 50 rounds · mixed question formats · source-linked explanations</small></button>\n    <button type=\"button\" data-pg=\"mc\"><span class=\"md-srd-tile-icon\">📝</span><strong>Four-Choice Practice</strong><small>30 challenging pharmacology multiple-choice questions</small></button>\n    <button type=\"button\" data-pg=\"tf\"><span class=\"md-srd-tile-icon\">⚖️</span><strong>True / False</strong><small>12 terminology, actions and drug-effect checks</small></button>\n    <button type=\"button\" data-pg=\"matching\"><span class=\"md-srd-tile-icon\">🧩</span><strong>Matching Challenge</strong><small>8 sets · four definitions per set</small></button>\n    <button type=\"button\" data-pg=\"missed\" id=\"pg-missed\"><span class=\"md-srd-tile-icon\">🎯</span><strong>Missed-Only Review</strong><small>Return to questions you missed in previous attempts</small></button>\n  </div>\n  <details class=\"pg-notes\"><summary>About this instructor guide</summary><p>The guide highlights approximately 50 exam questions spanning four-choice MCQ, true/false and matching. Our practice contains 30, 12 and 8 rounds respectively. Each matching round includes four term-definition pairs.</p><p>The instructor assigns a 7 Rights video but does not list the seven. Caroline Chapter 7 teaches six rights; use the instructor video for the exact classroom list. The guide uses “parenteral” broadly; our practice identifies IV, IM and SC as injectable routes. Its simplified statement about acidic-drug absorption is assessed with a pH/ionization caveat: actual absorption also depends on site, formulation and surface area.</p></details>\n</div>\n<div id=\"pg-quiz\" style=\"display:none\">\n <div id=\"pg-question\"></div>\n <div id=\"pg-feedback\" role=\"status\" aria-live=\"polite\"></div>\n <div class=\"md-srd-fib-controls pg-actions\"><button type=\"button\" id=\"pg-check\" class=\"success\">Check Answer</button><button type=\"button\" id=\"pg-next\" disabled>Next Question</button></div>\n</div>\n<div id=\"pg-finished\" style=\"display:none\"></div>";
panel.insertBefore(space,focus);
const menu=space.querySelector('#pg-menu'),quizPane=space.querySelector('#pg-quiz'),question=space.querySelector('#pg-question'),feedback=space.querySelector('#pg-feedback'),check=space.querySelector('#pg-check'),next=space.querySelector('#pg-next'),end=space.querySelector('#pg-finished'),progress=space.querySelector('#pg-progress'),missedBtn=space.querySelector('#pg-missed');
const sessionTools=document.createElement('div');
sessionTools.className='pg-session-tools';
sessionTools.innerHTML='<div class="pg-session-head"><span class="pg-session-pill">Instructor Pharmacology · Practice Test</span><button type="button" class="pg-session-exit" id="pg-session-exit">← Back to training matches</button></div><div class="pg-progress-track" aria-hidden="true"><div id="pg-progress-fill"></div></div><div class="pg-session-counter" id="pg-session-counter" aria-live="polite"></div>';
quizPane.prepend(sessionTools);
const progressFill=sessionTools.querySelector('#pg-progress-fill');
const sessionCounter=sessionTools.querySelector('#pg-session-counter');
sessionTools.querySelector('#pg-session-exit').onclick=()=>view(true);
let active=null,matchOrder=[];
function view(on){
 tiles.style.display=on?'none':'';
 focus.style.display=on?'none':'';
 fib.style.display='none';if(targeted)targeted.style.display='none';
 space.style.display=on?'block':'none';space.classList.remove('pg-in-session');if(meta)meta.style.display=on?'none':'';if(details)details.style.display=on?'none':'';
 if(on){menu.style.display='';quizPane.style.display='none';end.style.display='none';progress.textContent='Guide study mode';missedBtn.textContent='Missed Only ('+missed.size+')';missedBtn.disabled=!missed.size;}
}
tile.onclick=()=>view(true);
space.querySelector('#pg-back').onclick=()=>view(false);
function start(mode){
 let qs=data.questions.filter(q=>mode==='all'||(mode==='missed'&&missed.has(q.id))||q.kind===mode);
 if(!qs.length){progress.textContent='Nothing in that practice set';return;}
 active={deck:shuffle(qs),index:0,correct:0,marked:false};
 space.classList.add('pg-in-session');menu.style.display='none';end.style.display='none';quizPane.style.display='';render();space.scrollIntoView?.({block:'start'});
}
space.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>start(b.dataset.pg));
function render(){
 const q=active.deck[active.index];if(!q){finish();return;}
 active.marked=false;matchOrder=[];feedback.textContent='';feedback.className='';question.textContent='';
 check.disabled=q.kind!=='matching';check.style.display='';next.disabled=true;next.style.display='none';next.textContent=active.index===active.deck.length-1?'Show Results':'Next Question';
 progress.textContent='Question '+(active.index+1)+' / '+active.deck.length+' · '+active.correct+' correct';
 sessionCounter.textContent='Question '+(active.index+1)+' of '+active.deck.length+' · '+active.correct+' correct';
 progressFill.style.width=(active.index/active.deck.length*100)+'%';
 put(question,'div',q.section+' · '+(q.kind==='mc'?'Multiple choice':q.kind==='tf'?'True / False':'Matching'),'pg-label');
 put(question,'p',q.prompt,'pg-prompt');
 if(q.kind!=='matching'){
   const options=put(question,'div','','pg-options');
   q.choices.forEach((answerText,i)=>{
     const row=document.createElement('button');row.type='button';row.className='pg-option';row.dataset.choice=String(i);row.setAttribute('aria-pressed','false');
     put(row,'span',String.fromCharCode(65+i)+'.','pg-letter');put(row,'span',answerText,'pg-answer-text');
     row.onclick=()=>{
       if(active?.marked)return;
       options.querySelectorAll('button[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===row)));
       check.disabled=false;
     };
     options.appendChild(row);
   });
 }else{
   const options=put(question,'div','','pg-options');matchOrder=shuffle(q.pairs);
   const defs=shuffle(q.pairs.map(pair=>pair[1]));
   matchOrder.forEach(([term],i)=>{const row=document.createElement('label');row.className='pg-match';put(row,'strong',term);
     const select=document.createElement('select');select.dataset.pair=String(i);
     const first=document.createElement('option');first.value='';first.textContent='Select definition';select.appendChild(first);
     defs.forEach((d,j)=>{const o=document.createElement('option');o.value=d;o.textContent=String.fromCharCode(65+j)+'. '+d;select.appendChild(o);});
     row.appendChild(select);options.appendChild(row);
   });
 }
}
function grade(){
 if(!active||active.marked)return;const q=active.deck[active.index];
 let correct=false,part=0;
 if(q.kind!=='matching'){
   const chosen=question.querySelector('button[data-choice][aria-pressed="true"]');
   if(!chosen){feedback.textContent='Choose an answer first.';return;}
   correct=Number(chosen.dataset.choice)===q.key;
 }else{
   const vals=[...question.querySelectorAll('select[data-pair]')].map(e=>e.value);
   if(vals.length!==4||vals.some(v=>!v)){feedback.textContent='Complete all four matches first.';return;}
   if(new Set(vals).size!==4){feedback.textContent='Use each definition only once.';return;}
   part=matchOrder.filter((p,i)=>p[1]===vals[i]).length;correct=part===4;
 }
 active.marked=true;check.disabled=true;check.style.display='none';next.disabled=false;next.style.display='';
 question.querySelectorAll('button[data-choice],select').forEach(el=>el.disabled=true);
 if(q.kind!=='matching'){
   question.querySelectorAll('button[data-choice]').forEach(btn=>{
     if(Number(btn.dataset.choice)===q.key)btn.classList.add('pg-option-correct');
     else if(btn.getAttribute('aria-pressed')==='true')btn.classList.add('pg-option-wrong');
   });
 }
 if(correct){active.correct++;missed.delete(q.id);}else missed.add(q.id);save();
 feedback.textContent='';feedback.className=correct?'pg-correct':'pg-wrong';
 put(feedback,'h3',correct?'✅ Correct':'❌ Not quite — learn the rule');
 if(q.kind==='matching'){
   put(feedback,'p',part+' / 4 pairs correct. Correct matches:');
   const ul=document.createElement('ul');q.pairs.forEach(([term,definition])=>put(ul,'li',term+' → '+definition));feedback.appendChild(ul);
   put(feedback,'p','Why: '+q.why);
 }else if(q.kind==='mc'){
   put(feedback,'p','Correct answer: '+String.fromCharCode(65+q.key)+'. '+q.choices[q.key]);
   const head=put(feedback,'p','Option-by-option review:');head.style.fontWeight='700';
   const ol=document.createElement('ol');ol.type='A';ol.className='pg-choice-review';
   q.choices.forEach((option,i)=>{
     const correctOption=i===q.key;
     const li=put(ol,'li',option+' — '+(correctOption?'Correct: '+q.why:'Incorrect: '+(q.whyWrong?.[option]||'Compare the pharmacological mechanisms.')));
     if(correctOption)li.className='pg-choice-correct';
   });
   feedback.appendChild(ol);
 }else{
   put(feedback,'p','Correct answer: '+q.choices[q.key]);
   put(feedback,'p','Why: '+q.why);
 }
 put(feedback,'p','Memory trick: '+q.memory,'pg-memory');
 put(feedback,'small','Source: Instructor Pharmacology Study Guide, p. '+q.page+'. Referenced course material: Caroline Ch. 7 and lecture slides.','pg-note');
 progress.textContent='Question '+(active.index+1)+' / '+active.deck.length+' · '+active.correct+' correct';
 sessionCounter.textContent='Question '+(active.index+1)+' of '+active.deck.length+' · '+active.correct+' correct';
 progressFill.style.width=((active.index+1)/active.deck.length*100)+'%';
}
check.onclick=grade;
next.onclick=()=>{if(active?.marked){active.index++;render();}};
function finish(){
 quizPane.style.display='none';end.style.display='';end.textContent='';space.classList.add('pg-in-session');
 put(end,'h3','Session complete · '+active.correct+' / '+active.deck.length+' correct');
 put(end,'p','Matching questions require all four pairs correct. Your ongoing missed bank has '+missed.size+' items.');
 const actions=put(end,'div','','pg-actions');
 const retry=put(actions,'button','Run Full 50 Again');retry.onclick=()=>start('all');
 const wrong=put(actions,'button','Study Missed ('+missed.size+')');wrong.disabled=missed.size===0;wrong.onclick=()=>start('missed');
 const back=put(actions,'button','Guide Menu');back.onclick=()=>view(true);
 progress.textContent='Session complete';
}
const css=document.createElement('style');css.id='md-srd-pharm-guide-css';
css.textContent="#pct2SrdPage #md-srd-pharm-guide-space{display:none;margin:20px 0;padding:24px 16px;background:#0b2737;border:1px solid #65b3bf;border-radius:14px;color:#eef8ff}\n#pct2SrdPage #md-srd-pharm-guide-space h2{font-size:1.25rem;margin:5px 0 10px}\n#pct2SrdPage #md-srd-pharm-guide-space h3{font-size:1.12rem;margin:14px 0 10px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-intro{font-size:.96rem;opacity:.88;line-height:1.55;margin-bottom:16px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-top{margin-bottom:15px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-top small{color:#bfd6e0}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-deck-tiles{margin:13px 0 18px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-notes{padding:12px 14px;border:1px solid #527f8f;border-radius:10px;background:#0c2735;font-size:.9rem;line-height:1.55}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-notes summary{cursor:pointer;font-weight:700}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-prompt{font-size:1.17rem;line-height:1.6;margin:15px 0;font-weight:650}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-label{font-size:.92rem;font-weight:700;color:#9fe4de;margin:13px 0 7px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-options{display:grid;gap:10px;margin:12px 0}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-option{display:flex;align-items:center;gap:12px;background:#12384b;border:1px solid #4a8b9c;color:#f0f8ff;padding:14px 15px;border-radius:11px;min-height:58px;cursor:pointer;line-height:1.5}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-option:hover{background:#1d5361;border-color:#84d9d1}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-option:has(input:checked){background:#1d5361;border-color:#84d9d1}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-option:has(input:disabled){cursor:default}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-option input{width:19px;height:19px;flex:none;accent-color:#65c9bb}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-match{display:grid;grid-template-columns:minmax(120px,1fr) minmax(0,2fr);align-items:center;gap:13px;padding:13px 15px;background:#12384b;border:1px solid #4a8b9c;border-radius:11px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-match strong{font-size:.98rem;line-height:1.3}\n#pct2SrdPage #md-srd-pharm-guide-space select{width:100%;min-width:0;min-height:45px;padding:10px;background:#071925;border:1px solid #6c9eab;border-radius:9px;color:#fff}\n#pct2SrdPage #md-srd-pharm-guide-space button:disabled{opacity:.5;cursor:not-allowed}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-actions{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-feedback:not(:empty){padding:13px;line-height:1.5;border-radius:9px;margin:14px 0}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-feedback.pg-correct{background:#0d3935;border:1px solid #61ad85}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-feedback.pg-wrong{background:#3a2933;border:1px solid #db8878}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-memory{color:#9fe4de;font-weight:700}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-choice-review{margin:10px 0 15px;padding-left:28px;display:grid;gap:9px;line-height:1.5}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-choice-correct{color:#a4ecd8;font-weight:650}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-note{display:block;color:#c3d9e3;font-size:.86rem;margin-top:10px}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-finished{padding:8px 0;line-height:1.55}\n@media(max-width:640px){#pct2SrdPage #md-srd-pharm-guide-space{padding:15px 12px}#pct2SrdPage #md-srd-pharm-guide-space .pg-match{grid-template-columns:1fr}}";
css.textContent+="\n#pct2SrdPage #md-srd-pharm-guide-space.pg-in-session{max-width:1080px;margin:12px auto;background:transparent;border:0;padding:8px 0 20px}\n#pct2SrdPage #md-srd-pharm-guide-space.pg-in-session>.pg-top,\n#pct2SrdPage #md-srd-pharm-guide-space.pg-in-session>h2,\n#pct2SrdPage #md-srd-pharm-guide-space.pg-in-session>.pg-intro{display:none!important}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-quiz,\n#pct2SrdPage #md-srd-pharm-guide-space #pg-finished{border:1px solid #304c67;border-radius:18px;background:#102137;padding:clamp(18px,3vw,30px);box-shadow:0 13px 30px #0002}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-session-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-session-pill{border:1px solid #426786;border-radius:22px;color:#a8dfff;font-weight:650;font-size:12px;padding:5px 11px}\n#pct2SrdPage #md-srd-pharm-guide-space button.pg-session-exit{background:transparent;border:1px solid #426786;color:#b9daee;border-radius:10px;padding:9px 13px;min-height:40px;font-weight:650}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-progress-track{height:9px;border-radius:20px;background:#142a40;border:1px solid #2e455e;overflow:hidden;margin:18px 0 12px}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-progress-fill{height:100%;width:0;background:linear-gradient(90deg,#258cc1,#5dd9e8);transition:width .2s}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-session-counter{font-size:13px;color:#aac0d7;margin-bottom:16px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-label{font-size:.82rem;letter-spacing:.01em;color:#a8dfff;font-weight:700;margin:0 0 9px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-prompt{font-size:clamp(19px,2.7vw,24px);line-height:1.45;letter-spacing:-.015em;font-weight:650;margin:13px 0 21px}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-options{gap:11px;margin-top:10px}\n#pct2SrdPage #md-srd-pharm-guide-space button.pg-option{display:flex;align-items:flex-start;gap:12px;width:100%;min-height:62px;text-align:left;background:#172b43;border:1px solid #304c67;border-radius:13px;padding:16px 18px;color:#eaf3ff;font:inherit;font-weight:400;cursor:pointer}\n#pct2SrdPage #md-srd-pharm-guide-space button.pg-option:hover:not(:disabled){border-color:#5bb9dd;background:#1a3853}\n#pct2SrdPage #md-srd-pharm-guide-space button.pg-option[aria-pressed=\"true\"]{border-color:#69c8eb;background:#1a4159;box-shadow:0 0 0 1px #69c8eb inset}\n#pct2SrdPage #md-srd-pharm-guide-space button.pg-option.pg-option-correct{border-color:#49b58a;background:#163c37}\n#pct2SrdPage #md-srd-pharm-guide-space button.pg-option.pg-option-wrong{border-color:#cf917e;background:#3c252f}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-letter{font-weight:900;min-width:19px;flex:none}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-answer-text{flex:1;font-weight:450;line-height:1.45}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-check{background:#168f67;border:1px solid #4dcda4;font-weight:750}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-next{background:#196080;border:1px solid #549aba;font-weight:750}\n#pct2SrdPage #md-srd-pharm-guide-space .pg-match{background:#172b43;border:1px solid #304c67}\n#pct2SrdPage #md-srd-pharm-guide-space #pg-feedback:not(:empty){margin-top:20px;border-radius:13px;padding:17px;line-height:1.5}\n@media(max-width:600px){#pct2SrdPage #md-srd-pharm-guide-space.pg-in-session{padding:6px 2px}#pct2SrdPage #md-srd-pharm-guide-space button.pg-option{padding:13px 12px}#pct2SrdPage #md-srd-pharm-guide-space .pg-session-head{align-items:flex-start}}\n";
document.head.appendChild(css);
window.MD_SRD_PHARM_UI_91133={ready:true,version:'9.11.36',rounds:data.questions.length,tile:true};
})();