/* Med Daddy v9.11.2 — PCT II Infectious / Communicable Diseases study hub
   Two independent source-specific High-Yield banks of 25 rows each:
   10 concept families x five individually authored exam-style questions.
   No rewrites to legacy 460 source questions, user progress, or other units.
*/
(()=>{'use strict';
if(window.MD_INFECTIOUS_9112)return;
const a=window.MD_INF_9112_A,b=window.MD_INF_9112_B;
const errors=[];
if(!Array.isArray(a)||a.length!==25||!Array.isArray(b)||b.length!==25)errors.push('Source bank files missing');
const registry=window.MD_SAFE_QUESTIONS;
if(!(registry instanceof Map))errors.push('Safe question registry unavailable');
const page=document.getElementById('pct2InfectiousPage');
if(!page)errors.push('Infectious Diseases study page missing');
if(typeof start!=='function'||typeof shuffle!=='function')errors.push('Study quiz engine missing');
if(errors.length){window.MD_INFECTIOUS_9112={ready:false,errors};console.error(errors);return;}
const rows=[...a,...b],seen=new Set(),questions=[];
for(let i=0;i<rows.length;i++){
 const row=rows[i];
 if(row.length!==7||row[3]?.length!==3||row[5]?.length!==3){errors.push('Invalid row '+(i+1));continue;}
 const [topic,prompt,correct,wrong,whyCorrect,whyWrong,source]=row;
 const id='PCT2-INF-HY112-'+String(i+1).padStart(3,'0'),shift=(i*3+1)%4;
 const input=[correct,...wrong],choices=input.map((_,j)=>input[(j+shift)%4]);
 const answer='ABCD'[(4-shift)%4],reasonWrong={};
 choices.forEach((v,j)=>{const original=(j+shift)%4;if(original)reasonWrong['ABCD'[j]]=whyWrong[original-1];});
 const norm=prompt.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 if(seen.has(norm))errors.push('Near duplicate prompt '+id);seen.add(norm);
 if(registry.has(id))errors.push('ID collision '+id);
 const q={id,course:'Patient Care & Theory II',unit:'Infectious & Communicable Diseases',
  bankType:'high-yield',examSet:'Infectious — Instructor Guide High-Yield 50',
  topic,highYieldConcept:Math.floor(i/5)+1,
  objective:'Study Guide section '+(Math.floor(i/5)+1)+' — '+topic,
  prompt,choices,answer,explanation:whyCorrect,whyCorrect,whyWrong:reasonWrong,
  source,sourceTitle:'Infectious Diseases Chapter 39',sourceLocator:source,
  reviewReference:'Infectious Diseases Study Guide pp. 1–6; '+source,
  bloom:'Application / identification',difficulty:'PCT II — Exam-Style',
  sourceStatus:'Course lecture and exam study guide, not independent BLS authorization'
 };
 if(q.choices.length!==4||new Set(q.choices.map(v=>v.toLowerCase())).size!==4||Object.keys(q.whyWrong).length!==3)errors.push('Malformed '+id);
 if(typeof mdLeakReason==='function'){const leak=mdLeakReason(q);if(leak)errors.push('Answer leakage '+id+': '+leak);}
 questions.push(q);
}
const groups=[...new Set(questions.map(q=>q.topic))];
if(groups.length!==10||questions.length!==50||groups.some(g=>questions.filter(q=>q.topic===g).length!==5))
 errors.push('10 concepts x 5 coverage failed');
if(errors.length){window.MD_INFECTIOUS_9112={ready:false,errors};console.error(errors);return;}
for(const q of questions)registry.set(q.id,q);
const legacy=(typeof BANK!=='undefined'&&Array.isArray(BANK)?BANK:[]).filter(q=>
  String(q?.unit||'').toLowerCase().includes('infectious')||String(q?.id||'').startsWith('PCT2-INF-'));
const legacyUnique=[...new Map(legacy.map(q=>[q.id,q])).values()].filter(q=>q&&q.prompt&&Array.isArray(q.choices)&&q.choices.length===4&&['A','B','C','D'].includes(q.answer));
const host=document.createElement('section');host.id='md112-infectious-hub';host.className='md112-hub';
const content=[
 '<div class="md112-header"><h2>Infectious Diseases</h2><p>PCT II · Chapter 39 · Study Mode</p></div>',
 '<div class="md112-cards">',
 '<button data-inf112="exam" class="md112-primary"><strong>High-Yield Review</strong><span>50 questions</span></button>',
 '<button data-inf112="daily"><strong>Missed + New</strong><span>20 questions</span></button>',
 '<button data-inf112="quick"><strong>Quick Practice</strong><span>10 questions</span></button>',
 '<button data-inf112="all"><strong>All High-Yield</strong><span>50 questions</span></button>',
 '</div>',
 '<section class="md112-source"><h3>Custom Practice</h3><div class="md112-controls">',
 '<label for="md112-bank">Question bank</label><select id="md112-bank"><option value="new">High-Yield 50</option><option value="legacy">Full Infectious Diseases bank</option></select>',
 '<label for="md112-topic">Topic</label><select id="md112-topic"><option value="all">All topics</option></select>',
 '<label for="md112-count">Questions</label><select id="md112-count"><option value="10">10</option><option value="20">20</option><option value="50">50</option></select>',
 '<button data-inf112="selected" class="md112-start">Start Study Session</button></div>',
 '<p id="md112-status" aria-live="polite"></p></section>'
].join('');;
host.innerHTML=content;
const old=page.querySelector('.ap2-hero,.pct-hero,.unit-hero,h1');
if(old&&old.after)old.after(host);else page.prepend(host);
const bankSelect=host.querySelector('#md112-bank'),topicSelect=host.querySelector('#md112-topic'),sizeSelect=host.querySelector('#md112-count'),status=host.querySelector('#md112-status');
for(const name of groups){const option=document.createElement('option');option.value=name;option.textContent=name;topicSelect.appendChild(option);}
function getPool(){
 let pool=bankSelect.value==='legacy'?legacyUnique:questions;
 return topicSelect.value==='all'?pool:pool.filter(q=>q.topic===topicSelect.value);
}
function countText(){
 const c=getPool().length;
 status.textContent=(bankSelect.value==='new'?'New vetted High-Yield':'Legacy unit bank, rationale review still pending')+': '+c+' questions in this selection.';
}
bankSelect.addEventListener('change',()=>{
 const names=bankSelect.value==='legacy'?[...new Set(legacyUnique.map(q=>q.topic||'Other'))].sort():groups;
 topicSelect.innerHTML='<option value="all">All topics</option>';
 for(const name of names){const op=document.createElement('option');op.value=name;op.textContent=name;topicSelect.appendChild(op);}
 countText();
});topicSelect.addEventListener('change',countText);sizeSelect.addEventListener('change',countText);
countText();
function hist(key){try{const val=JSON.parse(localStorage.getItem(key)||'[]');return new Set(Array.isArray(val)?val:[])}catch{return new Set()}}
function launch(items,n,mode){
 if(!items.length){status.textContent='No questions available for that selection.';return;}
 let selected=shuffle(items.slice()).slice(0,n==='all'?items.length:Math.min(n,items.length));
 if(selected.some(q=>registry.get(q.id)?.prompt!==q.prompt&&!legacy.includes(q))){
  status.textContent='Question safety registry mismatch. Reopen the unit.';return;
 }
 const adaptive=document.getElementById('adaptiveNext'),recycle=document.getElementById('recycle');
 if(adaptive)adaptive.checked=false;if(recycle)recycle.checked=false;
 start(selected);
 if(typeof quiz!=='undefined'&&quiz.length!==selected.length){status.textContent='Expected '+selected.length+', got '+quiz.length;return;}
 window.MD_INFECTIOUS_LAST_9112={count:selected.length,mode};
}
host.addEventListener('click',e=>{
 const btn=e.target.closest('button[data-inf112]');if(!btn)return;
 const action=btn.dataset.inf112;
 if(action==='exam'||action==='all')return launch(questions,50,'High-Yield 50');
 if(action==='quick')return launch(questions,10,'Quick 10');
 if(action==='daily'){
  const missed=hist('msk_missed_v1'),seen=hist('msk_seen_v11');
  const selected=[...shuffle(questions.filter(q=>missed.has(q.id))),...shuffle(questions.filter(q=>!missed.has(q.id)&&!seen.has(q.id)))].slice(0,20);
  return launch(selected,selected.length,'Missed + New');
 }
 if(action==='selected')return launch(getPool(),Number(sizeSelect.value),'Topic/Source '+bankSelect.value);
});
const style=document.createElement('style');style.id='md112-style';
style.textContent=[
 '#md112-infectious-hub{margin:12px auto 20px;padding:16px;background:#11283b;border:1px solid #3f6981;color:#e7f6ff;border-radius:12px}',
 '#md112-infectious-hub *{box-sizing:border-box}',
 '.md112-header small{font-size:.77rem;letter-spacing:.07em;color:#89c8ea;font-weight:750}',
 '.md112-header h2{font-size:1.55rem;margin:7px 0}.md112-header p{color:#c1d7e6;margin:8px 0}',
 '.md112-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin:19px 0}',
 '#md112-infectious-hub button{border:1px solid #5d96b7;background:#184260;border-radius:11px;color:#f1f9ff;padding:14px;text-align:left;cursor:pointer}',
 '.md112-cards button{display:flex;flex-direction:column;gap:5px;min-height:74px}',
 '.md112-cards strong{font-size:1rem}.md112-cards span{color:#c5dce7;font-size:.82rem}',
 '#md112-infectious-hub .md112-primary{background:#145473;border-color:#88cbec}',
 '.md112-source{padding:12px;background:#0d2235;border:1px solid #2a5674;border-radius:10px}.md112-source h3{margin:0 0 12px;font-size:1rem}',
 '.md112-controls{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:end}',
 '.md112-controls label{font-size:.84rem;font-weight:700}',
 '.md112-controls select{min-height:43px;width:100%;background:#101f31;color:#eef7ff;padding:9px;border:1px solid #5c7996;border-radius:8px}',
 '.md112-controls .md112-start{grid-column:1/-1;text-align:center!important;min-height:48px}',
 '#md112-infectious-hub details{border-top:1px solid #3b607c;padding:13px 0;margin-top:13px}',
 '#md112-infectious-hub details summary{cursor:pointer;font-weight:700}',
 '#md112-infectious-hub details li{margin:7px 0}',
 '@media(max-width:600px){.md112-cards,.md112-controls{grid-template-columns:1fr}}'
].join('\n');document.head.appendChild(style);
window.MD_INFECTIOUS_9112={ready:true,version:'9.11.2',course:'PCT II',newHighYield:questions,
 highYieldConcepts:groups,legacyCount:legacyUnique.length,sourceOnly:true,
 originalUnitQuestionsUntouched:true,readiness:'High-Yield 50 ready; original unit rationales and objective coverage audit pending'};
})();