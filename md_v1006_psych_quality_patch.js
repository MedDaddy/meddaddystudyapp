/* Med Daddy v9.10.6 Psychology Key Terms distractor QA patch
   Replace 41 structurally flawed comparison questions with individually authored
   four-option single-best-answer items and option-specific rationales.
   Keep existing 109 other Final questions, first/second term prompts, original
   source questions and other units unchanged. Revised IDs are NEW progress items. */
(()=>{'use strict';
 if(window.MD_PSYCH_QUALITY_1006)return;
 const data=window.MD_PSYCH_TERMS_1005;
 const a=window.MD_PSYCH_DISTRACTOR_A_1006,b=window.MD_PSYCH_DISTRACTOR_B_1006;
 const reg=window.MD_SAFE_QUESTIONS;
 const issues=[];
 if(!data?.ready||data.courseQuestions?.length!==123||!(reg instanceof Map)||!a||!b)issues.push('Prerequisite term bank or QA sets missing');
 const fixes={...a,...b};
 if(Object.keys(fixes).length!==41)issues.push('Expected 41 uniquely authored fixes');
 if(issues.length){window.MD_PSYCH_QUALITY_1006={ready:false,issues};return;}
 const replacements=[];
 for(let i=0;i<data.courseQuestions.length;i++){
  const q=data.courseQuestions[i];
  if(!q.id.endsWith('-3'))continue;
  const spec=fixes[q.keyTerm];
  if(!spec){issues.push('No QA entry '+q.keyTerm);continue;}
  const [prompt,options,rationales]=spec;
  if(!prompt||!Array.isArray(options)||options.length!==4||new Set(options.map(x=>x.toLowerCase())).size!==4||!Array.isArray(rationales)||rationales.length!==4)issues.push('Malformed fix '+q.keyTerm);
  const k='ABCD'.indexOf(q.answer);
  if(k<0){issues.push('Missing answer '+q.keyTerm);continue;}
  // Preserve the existing letter distribution while changing the wording;
  // put correct source-backed statement at the old keyed position.
  const shift=(4-k)%4,choices=options.map((_,j)=>options[(j+shift)%4]);
  const whyWrong={};
  choices.forEach((val,j)=>{const original=(j+shift)%4;if(original>0)whyWrong['ABCD'[j]]=rationales[original];});
  const newQ={...q,
   id:q.id+'R',
   prompt,choices,answer:q.answer,
   whyCorrect:rationales[0],explanation:rationales[0],whyWrong,
   difficulty:'Instructor Hard',reviewReference:q.reviewReference,
   audit:'v9.10.6 individually revised comparison question'
  };
  if(reg.has(newQ.id))issues.push('ID collision '+newQ.id);
  if(!([newQ.prompt,...newQ.choices].some(x=>String(x).toLowerCase().includes(newQ.keyTerm.toLowerCase()))||
      ['Wernikis encephalopathy','Korsakoffs','Kubler-Ross theory'].includes(newQ.keyTerm)))issues.push('Keyword not shown '+newQ.id);
  if(typeof mdLeakReason==='function'){const leakage=mdLeakReason(newQ);if(leakage)issues.push('Answer leakage '+newQ.id+': '+leakage);}
  replacements.push({index:i,oldId:q.id,item:newQ});
 }
 if(replacements.length!==41)issues.push('Expected 41 updated items, got '+replacements.length);
 if(issues.length){console.error('Psych QA patch blocked',issues);window.MD_PSYCH_QUALITY_1006={ready:false,issues};return;}
 // Data is now checked; apply changes atomically at the quiz bank level.
 for(const r of replacements){data.courseQuestions[r.index]=r.item;reg.delete(r.oldId);reg.set(r.item.id,r.item);}
 const orig=window.MD_PSYCH_KEY_TERMS_1004;
 if(orig){orig.questions=data.courseQuestions;orig.updatedTo='9.10.6';}
 data.version='9.10.6';
 window.MD_PSYCH_QUALITY_1006={version:'9.10.6',ready:true,
  repairedComparisonQuestions:41,sourceOnlyCourseQuestions:data.courseQuestions.length,
  extraSourcesExcluded:data.supplementalQuestions?.length===9,
  olderMidtermChanged:false,otherCourseUnitsChanged:false};
 const banner=document.querySelector('#appVersion,.app-version,[data-app-version]');
 if(banner)banner.textContent=banner.textContent.replace(/9\.10\.[0-5]/g,'9.10.6');
 document.title=document.title.replace(/v9\.10\.[0-5]/,'v9.10.6');
})();
