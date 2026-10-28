/* Med Daddy v9.11.10 — Infectious PCP Directives (50). Loads the existing
   two source-authored halves, retains all other units and local progress,
   and attaches one full-length exam deck to the standard Infectious UI. */
(()=>{'use strict';
if(window.MD_INF_PCP_91110?.ready)return;
const a=window.MD_INF_DIRECTIVES_A_91110,b=window.MD_INF_DIRECTIVES_B_91110;
const registry=window.MD_SAFE_QUESTIONS,unit=window.MD_INF_SOURCE_DECKS_9117;
const select=document.getElementById('md-inf917-deck'),errors=[];
if(!Array.isArray(a)||a.length!==25||!Array.isArray(b)||b.length!==25)errors.push('Question source files absent or incomplete');
if(!(registry instanceof Map))errors.push('Safety question registry unavailable');
if(!unit||!unit.decks||!Array.isArray(unit.decks.all)||!select)errors.push('Infectious source deck selector unavailable');
const items=[...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])];
const seenIds=new Set(),seenStems=new Set();
for(const q of items){
 const id=q?.id||'missing';
 if(!q||!q.prompt||!Array.isArray(q.choices)||q.choices.length!==4||!['A','B','C','D'].includes(q.answer)||!q.explanation||!q.whyCorrect||!q.whyWrong||Object.keys(q.whyWrong).length!==3){errors.push('Malformed: '+id);continue;}
 if(q.choices.some(v=>!String(v).trim())||new Set(q.choices.map(v=>String(v).toLowerCase().trim())).size!==4)errors.push('Duplicated or blank distractor: '+id);
 if('ABCD'.split('').filter(letter=>letter!==q.answer).some(letter=>!q.whyWrong[letter]))errors.push('Missing distractor explanation: '+id);
 const stem=q.prompt.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 if(seenIds.has(id)||seenStems.has(stem))errors.push('Duplicate ID or stem: '+id);
 seenIds.add(id);seenStems.add(stem);
 const existing=registry instanceof Map?registry.get(id):null;
 if(existing&&(existing.prompt!==q.prompt||existing.answer!==q.answer))errors.push('Question ID collision: '+id);
 if(typeof mdLeakReason==='function'){const leak=mdLeakReason(q);if(leak)errors.push('Answer-leak review: '+id+' '+leak);}
}
if(items.length!==50)errors.push('Expected 50 items, found '+items.length);
if(errors.length){window.MD_INF_PCP_91110={ready:false,errors};console.error('Med Daddy PCP Directives deck failed safe validation',errors);return;}
for(const q of items)registry.set(q.id,q);
unit.decks.directives=items;
const opt=document.createElement('option');opt.value='directives';opt.textContent='PCP Directives — Infectious (50)';select.appendChild(opt);
const all=unit.decks.all;const existingIds=new Set(all.map(q=>q.id));
for(const q of items)if(!existingIds.has(q.id)){all.push(q);existingIds.add(q.id);}
window.MD_INF_PCP_91110={ready:true,version:'9.11.10',count:items.length,integrated:true};
})();