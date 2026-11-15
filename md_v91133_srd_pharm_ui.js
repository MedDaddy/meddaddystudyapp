/* Med Daddy v9.11.33: SRD Pharmacology Instructor Guide tile. */
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
const key='md_srd_pharm_missed_91133';
function load(){try{let v=JSON.parse(localStorage.getItem(key)||'[]');return new Set(Array.isArray(v)?v:[]);}catch(e){return new Set();}}
const missed=load();
function save(){try{localStorage.setItem(key,JSON.stringify([...missed]));}catch(e){}}
function shuffle(xs){const a=xs.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function put(parent,tag,value,cls){const n=document.createElement(tag);n.textContent=value;if(cls)n.className=cls;parent.appendChild(n);return n;}
const tile=document.createElement('button');tile.type='button';tile.className='md-srd-feature';tile.id='md-srd-pharm-guide-tile';
tile.innerHTML='<span class="md-srd-tile-icon">📘</span><strong>Instructor Pharmacology Guide</strong><small>50 rounds · multiple choice, true/false and matching · source-linked feedback</small>';
tileArea.appendChild(tile);
const space=document.createElement('section');space.id='md-srd-pharm-guide-space';space.style.display='none';
space.innerHTML='<div class="pg-top"><button type="button" id="pg-back">Back to SRD tiles</button><span id="pg-progress"></span></div>'+
'<h2>Instructor Pharmacology Guide</h2><p>Exam-style practice using the four-page instructor guide: approximately 50 questions, including multiple choice, true/false and matching.</p>'+
'<div id="pg-menu"><div class="pg-actions"><button type="button" data-pg="all">Full Guide · 50</button><button type="button" data-pg="mc">4-Choice MCQ · 30</button><button type="button" data-pg="tf">True/False · 12</button><button type="button" data-pg="matching">Matching · 8 rounds</button><button type="button" data-pg="missed" id="pg-missed">Missed Only</button></div>'+
'<p class="pg-note">Each matching round contains four definitions. The guide asks you to review the 7 Rights from its linked classroom video but does not list all seven; check that video for your instructor’s version. The term “parenteral” is used broadly in the guide; the quiz uses unambiguous injection examples.</p></div>'+
'<div id="pg-quiz" style="display:none"><div id="pg-question"></div><div id="pg-feedback" role="status" aria-live="polite"></div><div class="pg-actions"><button type="button" id="pg-check">Check Answer</button><button type="button" id="pg-next" disabled>Next Question</button></div></div>'+
'<div id="pg-finished" style="display:none"></div>';
panel.insertBefore(space,focus);
const menu=space.querySelector('#pg-menu'),quizPane=space.querySelector('#pg-quiz'),question=space.querySelector('#pg-question'),feedback=space.querySelector('#pg-feedback'),check=space.querySelector('#pg-check'),next=space.querySelector('#pg-next'),end=space.querySelector('#pg-finished'),progress=space.querySelector('#pg-progress'),missedBtn=space.querySelector('#pg-missed');
let active=null,matchOrder=[];
function view(on){
 tiles.style.display=on?'none':'';
 focus.style.display=on?'none':'';
 fib.style.display='none';if(targeted)targeted.style.display='none';
 space.style.display=on?'block':'none';if(meta)meta.style.display=on?'none':'';if(details)details.style.display=on?'none':'';
 if(on){menu.style.display='';quizPane.style.display='none';end.style.display='none';progress.textContent='Guide study mode';missedBtn.textContent='Missed Only ('+missed.size+')';missedBtn.disabled=!missed.size;}
}
tile.onclick=()=>view(true);
space.querySelector('#pg-back').onclick=()=>view(false);
function start(mode){
 let qs=data.questions.filter(q=>mode==='all'||(mode==='missed'&&missed.has(q.id))||q.kind===mode);
 if(!qs.length){progress.textContent='Nothing in that practice set';return;}
 active={deck:shuffle(qs),index:0,correct:0,marked:false};
 menu.style.display='none';end.style.display='none';quizPane.style.display='';render();
}
space.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>start(b.dataset.pg));
function render(){
 const q=active.deck[active.index];if(!q){finish();return;}
 active.marked=false;matchOrder=[];feedback.textContent='';feedback.className='';question.textContent='';
 check.disabled=false;next.disabled=true;next.textContent=active.index===active.deck.length-1?'Show Results':'Next Question';
 progress.textContent='Question '+(active.index+1)+' / '+active.deck.length+' · '+active.correct+' correct';
 put(question,'div',q.section+' · '+(q.kind==='mc'?'Multiple choice':q.kind==='tf'?'True / False':'Matching'),'pg-label');
 put(question,'p',q.prompt,'pg-prompt');
 if(q.kind!=='matching'){
   const options=put(question,'div','','pg-options');
   q.choices.forEach((s,i)=>{const row=document.createElement('label');row.className='pg-option';const radio=document.createElement('input');radio.type='radio';radio.name='pg-answer';radio.value=String(i);row.appendChild(radio);put(row,'span',(q.kind==='mc'?String.fromCharCode(65+i)+'. ':'')+s);options.appendChild(row);});
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
   const chosen=question.querySelector('input[name="pg-answer"]:checked');
   if(!chosen){feedback.textContent='Choose an answer first.';return;}
   correct=Number(chosen.value)===q.key;
 }else{
   const vals=[...question.querySelectorAll('select[data-pair]')].map(e=>e.value);
   if(vals.length!==4||vals.some(v=>!v)){feedback.textContent='Complete all four matches first.';return;}
   if(new Set(vals).size!==4){feedback.textContent='Use each definition only once.';return;}
   part=matchOrder.filter((p,i)=>p[1]===vals[i]).length;correct=part===4;
 }
 active.marked=true;check.disabled=true;next.disabled=false;
 question.querySelectorAll('input,select').forEach(i=>i.disabled=true);
 if(correct){active.correct++;missed.delete(q.id);}else missed.add(q.id);save();
 feedback.textContent='';feedback.className=correct?'pg-correct':'pg-wrong';
 put(feedback,'h3',correct?'✅ Correct':'❌ Not quite — learn the rule');
 if(q.kind==='matching'){
   put(feedback,'p',part+' / 4 pairs correct. Correct matches:');
   const ul=document.createElement('ul');q.pairs.forEach(([a,b])=>put(ul,'li',a+' → '+b));feedback.appendChild(ul);
 }else put(feedback,'p','Correct answer: '+q.choices[q.key]);
 put(feedback,'p','Why: '+q.why);
 put(feedback,'p','Memory trick: '+q.memory,'pg-memory');
 put(feedback,'small','Source: Instructor Pharmacology Study Guide, p. '+q.page+'. Referenced course material: Caroline Ch. 7 and lecture slides.','pg-note');
 progress.textContent='Question '+(active.index+1)+' / '+active.deck.length+' · '+active.correct+' correct';
}
check.onclick=grade;
next.onclick=()=>{if(active?.marked){active.index++;render();}};
function finish(){
 quizPane.style.display='none';end.style.display='';end.textContent='';
 put(end,'h3','Final score: '+active.correct+' / '+active.deck.length+' rounds');
 put(end,'p','Matching questions require all four pairs correct. Your ongoing missed bank has '+missed.size+' items.');
 const actions=put(end,'div','','pg-actions');
 const retry=put(actions,'button','Run Full 50 Again');retry.onclick=()=>start('all');
 const wrong=put(actions,'button','Study Missed ('+missed.size+')');wrong.disabled=missed.size===0;wrong.onclick=()=>start('missed');
 const back=put(actions,'button','Guide Menu');back.onclick=()=>view(true);
 progress.textContent='Session complete';
}
const css=document.createElement('style');css.id='md-srd-pharm-guide-css';
css.textContent='#md-srd-pharm-guide-space{margin:22px 0;padding:19px;border:1px solid #3d8196;border-radius:14px;background:#0a2738;color:#eaf5ff}'+
'#md-srd-pharm-guide-space .pg-top,#md-srd-pharm-guide-space .pg-actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:12px 0}'+
'#md-srd-pharm-guide-space .pg-top{justify-content:space-between}'+
'#md-srd-pharm-guide-space button{min-height:44px;padding:10px 14px;border-radius:8px;background:#17656d;border:1px solid #66b8bd;color:#fff;font-weight:700;cursor:pointer}'+
'#md-srd-pharm-guide-space button:disabled{opacity:.5;cursor:not-allowed}'+
'#md-srd-pharm-guide-space .pg-note{font-size:.83rem;color:#c3d9e3;line-height:1.5}'+
'#md-srd-pharm-guide-space .pg-prompt{font-size:1.15rem;font-weight:700;line-height:1.5}'+
'#md-srd-pharm-guide-space .pg-label{color:#86d4e0;font-weight:700;margin-top:14px}'+
'#md-srd-pharm-guide-space .pg-options{display:grid;gap:10px}'+
'#md-srd-pharm-guide-space .pg-option,#md-srd-pharm-guide-space .pg-match{display:flex;align-items:center;gap:12px;background:#14354a;padding:12px;border-radius:9px;border:1px solid #52798b}'+
'#md-srd-pharm-guide-space .pg-option:has(input:checked){background:#20505d;border-color:#61c7be}'+
'#md-srd-pharm-guide-space .pg-option input{width:20px;height:20px;accent-color:#65c9bd}'+
'#md-srd-pharm-guide-space .pg-match{display:grid;grid-template-columns:1fr 2fr}'+
'#md-srd-pharm-guide-space select{width:100%;min-width:0;padding:10px;border:1px solid #79a6be;background:#071b2b;color:#fff;border-radius:8px}'+
'#md-srd-pharm-guide-space #pg-feedback:not(:empty){margin-top:15px;padding:15px;border:1px solid #7399a7;border-radius:10px;background:#153647}'+
'#md-srd-pharm-guide-space #pg-feedback.pg-wrong{border-color:#dda078}'+
'#md-srd-pharm-guide-space #pg-feedback.pg-correct{border-color:#76cca9}'+
'#md-srd-pharm-guide-space .pg-memory{font-weight:700;color:#9ae6d8}'+
'@media(max-width:650px){#md-srd-pharm-guide-space .pg-match{grid-template-columns:1fr}}';
document.head.appendChild(css);
window.MD_SRD_PHARM_UI_91133={ready:true,version:'9.11.33',rounds:data.questions.length,tile:true};
})();