/* Med Daddy Psychology Final v9.10.9 — High-Yield 50 QA.
   Replace every High-Yield distractor with an individually authored,
   clinically/source-relevant alternative and corresponding take-up.
   Preserve correct answer, correct explanation, objective and source.
   Revised IDs are new questions for adaptive study history. */
(()=>{'use strict';
if(window.MD_PSYCH_HIGHYIELD_QUALITY_1009)return;
const a=window.MD_PSYCH_HY_QA_A_1009,b=window.MD_PSYCH_HY_QA_B_1009;
const bank=window.MD_PSYCH_HY998?.questions,reg=window.MD_SAFE_QUESTIONS;
const issues=[],prepared=[];
if(!a||!b||bank?.length!==50||!(reg instanceof Map)){window.MD_PSYCH_HIGHYIELD_QUALITY_1009={ready:false,issues:['Missing prerequisites']};return;}
const changes={...a,...b};
if(Object.keys(changes).length!==50)issues.push('Expected 50 authored correction records');
for(const q of bank){
 const n=q.id.match(/(\d{3})$/)?.[1],spec=changes[n];
 if(!spec){issues.push('Missing '+q.id);continue;}
 const [wrong,reasons]=spec;
 if(wrong?.length!==3||reasons?.length!==3||new Set(wrong.map(s=>s.toLowerCase())).size!==3){issues.push('Invalid '+q.id);continue;}
 const index='ABCD'.indexOf(q.answer),correct=q.choices[index],choices=[],whyWrong={};let w=0;
 if(index<0||wrong.some(s=>s.toLowerCase()===correct.toLowerCase()))issues.push('Key collision '+q.id);
 for(let i=0;i<4;i++){if(i===index){choices.push(correct);continue;}choices.push(wrong[w]);whyWrong['ABCD'[i]]=reasons[w];w++;}
 const revised={...q,id:q.id+'R',choices,whyWrong,audit:'v9.10.9 High-Yield item-specific QA'};
 if(reg.has(revised.id))issues.push('ID collision '+revised.id);
 if(typeof mdLeakReason==='function'){const reason=mdLeakReason(revised);if(reason)issues.push('Answer leakage '+revised.id+': '+reason);}
 prepared.push({old:q,newItem:revised});
}
if(issues.length||prepared.length!==50){window.MD_PSYCH_HIGHYIELD_QUALITY_1009={ready:false,issues};console.error(issues);return;}
for(const item of prepared){reg.delete(item.old.id);Object.assign(item.old,item.newItem);reg.set(item.old.id,item.old);}
window.MD_PSYCH_HIGHYIELD_QUALITY_1009={version:'9.10.9',ready:true,revised:50,keysPreserved:true,wrongExplanations:150,priorMidtermChanged:false};
const badge=document.querySelector('#appVersion,.app-version,[data-app-version]');
if(badge)badge.textContent=badge.textContent.replace(/9\.10\.[0-8]/g,'9.10.9');
document.title=document.title.replace(/v9\.10\.[0-8]/,'v9.10.9');
})();