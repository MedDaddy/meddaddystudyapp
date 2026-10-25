/* Med Daddy v9.10.7 — Psychology Final instructor-review item QA.
  Revise 29 defective distractor sets in the 35-question review bank.
  Use correct lecture-backed key unchanged; every wrong option has a
  tailored explanation. Do not alter other course units or prior mocks. */
(()=>{'use strict';
 if(window.MD_PSYCH_REVIEW_QUALITY_1007)return;
 const a=window.MD_PSYCH_REVIEW_QA_A_1007,b=window.MD_PSYCH_REVIEW_QA_B_1007;
 const review=window.MD_PSYCH_FINAL_997?.reviewQuestions;
 const reg=window.MD_SAFE_QUESTIONS,issues=[];
 if(!a||!b||review?.length!==35||!(reg instanceof Map)){window.MD_PSYCH_REVIEW_QUALITY_1007={ready:false,issues:['Dependencies absent']};return;}
 const combined={...a,...b};if(Object.keys(combined).length!==29)issues.push('Expected 29 item QA records');
 const fixes=[];
 for(const q of review){
  const n=q.id.match(/(\d{3})$/)?.[1],record=combined[n];
  if(!record)continue;
  const [wrong,why]=record;
  if(wrong?.length!==3||why?.length!==3||new Set(wrong.map(x=>x.toLowerCase())).size!==3){issues.push('Malformed '+q.id);continue;}
  const correct=q.choices['ABCD'.indexOf(q.answer)];
  if(wrong.some(x=>x.toLowerCase()===correct.toLowerCase()))issues.push('Correct collides '+q.id);
  const newChoices=[],newWrong={},reasons=[];
  let wrongIndex=0;
  for(let j=0;j<4;j++){
   const letter='ABCD'[j];
   if(letter===q.answer){newChoices.push(correct);continue;}
   newChoices.push(wrong[wrongIndex]);newWrong[letter]=why[wrongIndex];wrongIndex++;
  }
  const revised={...q,id:q.id+'R',choices:newChoices,whyWrong:newWrong,audit:'v9.10.7 distractor QA'};
  if(reg.has(revised.id))issues.push('Collision '+revised.id);
  if(typeof mdLeakReason==='function'){const msg=mdLeakReason(revised);if(msg)issues.push('Answer leak '+revised.id+': '+msg);}
  fixes.push({current:q,revised});
 }
 if(fixes.length!==29)issues.push('Wrong count '+fixes.length);
 if(issues.length){window.MD_PSYCH_REVIEW_QUALITY_1007={ready:false,issues};console.error('Review QA blocked',issues);return;}
 // Mutate objects in place because the standard Exam 50 already references
 // these objects through the post-midterm Psychology Final pool.
 for(const {current,revised} of fixes){
  const oldId=current.id;
  reg.delete(oldId);
  Object.assign(current,revised);
  reg.set(current.id,current);
 }
 window.MD_PSYCH_REVIEW_QUALITY_1007={ready:true,version:'9.10.7',revised:29,totalReview:review.length,keysPreserved:true,midtermModified:false};
 const tag=document.querySelector('#appVersion,.app-version,[data-app-version]');
 if(tag)tag.textContent=tag.textContent.replace(/9\.10\.[0-6]/g,'9.10.7');
 document.title=document.title.replace(/v9\.10\.[0-6]/,'v9.10.7');
})();