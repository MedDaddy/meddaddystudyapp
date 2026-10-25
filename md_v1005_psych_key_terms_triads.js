/* Med Daddy Psychology Final v9.10.5: 3 explicit-term questions each.
  Source: eight post-midterm uploads for 41 terms; 3 review-only terms
  additionally use external references and stay out of course-source exams. */
(()=>{
'use strict';
if(window.MD_PSYCH_TERMS_1005)return;
const oldBank=window.MD_PSYCH_KEY_TERMS_1004,manifest=window.MD_PSYCH_TERM_MANIFEST_1005,registry=window.MD_SAFE_QUESTIONS;
if(!oldBank?.ready||oldBank.questions.length!==41||manifest?.length!==44||!(registry instanceof Map)){
 window.MD_PSYCH_TERMS_1005={ready:false,error:'Missing keyword prerequisites'};return;
}
const dictionary=new Map(manifest.map(r=>[r[0],r])),originals=new Map(oldBank.questions.map(q=>[q.keyTerm,q]));
const sourceExt={MAOIs:'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/monoamine-oxidase-inhibitor',TCAs:'https://www.ncbi.nlm.nih.gov/mesh/68000929','Trap House':'https://www.dictionary.com/browse/trap-house'};
const variants={'Korsakoffs':'Korsakoff','Wernikis encephalopathy':'Wernicke','Kubler-Ross theory':'Kübler-Ross'};
const hasTerm=(s,t)=>[t,variants[t]||t].some(v=>String(s).toLowerCase().includes(v.toLowerCase()));
const course=[],external=[],issues=[],ids=new Set(),stems=new Set();
function add(q,bank){
 const text=q.prompt.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
 if(ids.has(q.id)||stems.has(text))issues.push('duplicate '+q.id);
 ids.add(q.id);stems.add(text);
 if(!hasTerm(q.prompt+' '+q.choices.join(' '),q.keyTerm))issues.push('keyword absent '+q.id);
 if(q.choices.length!==4||!['A','B','C','D'].includes(q.answer)||Object.keys(q.whyWrong).length!==3)issues.push('invalid structure '+q.id);
 bank.push(q);
}
function create(row,n,k,prompt,options,explanation,incorrect,isExternal){
 const term=row[0],shift=(n+2*k)%4;
 const choices=options.map((_,j)=>options[(j+shift)%4]),answer='ABCD'[(4-shift)%4],whyWrong={};
 choices.forEach((c,j)=>{const original=(j+shift)%4;if(original)whyWrong['ABCD'[j]]=incorrect[original-1];});
 const source=isExternal?sourceExt[term]:originals.get(term).sourceLocator;
 return {id:'PSY-FINAL-TERM-'+String(n).padStart(3,'0')+'-'+k,
  course:'Psychology',unit:isExternal?'Psychology Final Supplement':'Psychology Final Exam',
  topic:'Review key term '+term,objective:'Identify '+term+' '+k+'/3',difficulty:'Instructor Hard',bloom:'Terminology application',
  prompt,choices,answer,explanation,whyCorrect:explanation,whyWrong,
  source,sourceTitle:isExternal?'External source; not instructor-confirmed':'Uploaded post-midterm lecture',sourceLocator:source,
  reviewReference:'Psych Final Review — Key Words: '+term,keyTerm:term,
  bank:isExternal?'External terms supplement':'Psych Final Key Terms x3'};
}
for(let i=0;i<manifest.length;i++){
 const row=manifest[i],term=row[0],meaning=row[1],detail=row[2],prompt2=row[3],prompt3=row[4],rivals=row[5];
 const n=i+1,supp=i>=41,target=supp?external:course;
 if(!supp){
  const original=originals.get(term);if(!original){issues.push('missing source '+term);continue;}
  const first={...original,choices:[...original.choices],whyWrong:{...original.whyWrong},bank:'Psych Final Key Terms x3'};
  if(!hasTerm(first.prompt+' '+first.choices.join(' '),term))
   first.prompt='Concerning '+term+', '+first.prompt.charAt(0).toLowerCase()+first.prompt.slice(1);
  add(first,target);
 }else{
  const options=[meaning,...rivals.map(r=>dictionary.get(r)[1])];
  const incorrect=rivals.map(r=>'That describes '+r+': '+dictionary.get(r)[1]+'.');
  add(create(row,n,1,'The instructor lists '+term+'. Which externally sourced definition matches it?',
   options,meaning+'. Supplemental reference, not defined in the supplied class slides.',incorrect,true),target);
 }
 const wrongTerms=rivals.map(r=>'The term '+r+' instead refers to '+dictionary.get(r)[1]+'.');
 add(create(row,n,2,prompt2,[term,...rivals],meaning+'. '+(supp?'Externally sourced; instructor detail not established.':'Supported by the uploaded lecture.'),wrongTerms,supp),target);
 const wrongFeatures=rivals.map(r=>'This describes '+r+': '+dictionary.get(r)[2]+'.');
 add(create(row,n,3,prompt3,[detail,...rivals.map(r=>dictionary.get(r)[2])],
  detail+'. '+(supp?'External supplemental reference.':'A source-backed distinction from the lecture.'),wrongFeatures,supp),target);
}
if(issues.length||course.length!==123||external.length!==9){
 window.MD_PSYCH_TERMS_1005={ready:false,issues,courseCount:course.length,supplementalCount:external.length};console.error(issues);return;
}
for(const q of [...course,...external])registry.set(q.id,q);
oldBank.questions=course;oldBank.verifiedQuestions=course.length;oldBank.updatedTo='9.10.5';
window.MD_PSYCH_TERMS_1005={ready:true,version:'9.10.5',courseTerms:41,courseQuestions:course,
 supplementalTerms:3,supplementalQuestions:external,allTerms:44,allQuestions:132,midtermIncluded:false,issues:[]};
})();