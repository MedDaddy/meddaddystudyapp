/* Med Daddy Psychology Final v9.10.8 — instructor-review and slide-scenario QA
   Additively replaces 29 instructor-review and 24 lecture-expansion distractor
   sets with 1 defensible best answer and three tailored incorrect rationales.
   Mutates objects in place to retain live mixed-exam bank references.
*/
(()=>{'use strict';
if(window.MD_PSYCH_QUALITY_1008)return;
const sets=[
 {prefix:'PSY-FINAL-REV-',arr:window.MD_PSYCH_FINAL_997?.reviewQuestions,a:window.MD_PSYCH_REVIEW_QA_A_1007,b:window.MD_PSYCH_REVIEW_QA_B_1007,expected:29},
 {prefix:'PSY-FINAL-SLIDE-',arr:window.MD_PSYCH_SLIDE999?.questions,a:window.MD_PSYCH_SLIDE_QA_A_1008,b:window.MD_PSYCH_SLIDE_QA_B_1008,expected:24}
];
const reg=window.MD_SAFE_QUESTIONS,problems=[],prepared=[];
if(!(reg instanceof Map))problems.push('Question registry missing');
for(const group of sets){
 const changes={...group.a,...group.b};
 if(!Array.isArray(group.arr)||Object.keys(changes).length!==group.expected){problems.push('Missing QA list '+group.prefix);continue;}
 let revised=0;
 for(const q of group.arr){
  const n=q.id.match(/(\d{3})$/)?.[1];
  const record=changes[n];if(!record)continue;
  const [wrong,reasons]=record;
  if(wrong?.length!==3||reasons?.length!==3||new Set(wrong.map(x=>x.toLowerCase())).size!==3){problems.push('Malformed '+q.id);continue;}
  const k='ABCD'.indexOf(q.answer),correct=q.choices[k];
  if(k<0||wrong.some(s=>s.toLowerCase()===correct.toLowerCase()))problems.push('Answer collision '+q.id);
  const opts=[],whyWrong={};let w=0;
  for(let i=0;i<4;i++){
   if(i===k){opts.push(correct);continue;}
   opts.push(wrong[w]);whyWrong['ABCD'[i]]=reasons[w];w++;
  }
  const updated={...q,id:q.id+'R',choices:opts,whyWrong,audit:'v9.10.8 individually edited distractors'};
  if(reg.has(updated.id))problems.push('Revised ID collision '+updated.id);
  if(typeof mdLeakReason==='function'){const leak=mdLeakReason(updated);if(leak)problems.push('Leak '+updated.id+' '+leak);}
  prepared.push({previous:q,next:updated});revised++;
 }
 if(revised!==group.expected)problems.push('Expected '+group.expected+' updated '+group.prefix+'; got '+revised);
}
if(problems.length){window.MD_PSYCH_QUALITY_1008={ready:false,problems};console.error(problems);return;}
for(const part of prepared){
 const oldId=part.previous.id;
 reg.delete(oldId);
 Object.assign(part.previous,part.next);
 reg.set(part.previous.id,part.previous);
}
window.MD_PSYCH_QUALITY_1008={version:'9.10.8',ready:true,totalRevisions:prepared.length,reviewRevisions:29,lectureRevisions:24,correctAnswersPreserved:true,midtermUntouched:true};
const badge=document.querySelector('#appVersion,.app-version,[data-app-version]');
if(badge)badge.textContent=badge.textContent.replace(/9\.10\.[0-7]/g,'9.10.8');
document.title=document.title.replace(/v9\.10\.[0-7]/,'v9.10.8');
})();