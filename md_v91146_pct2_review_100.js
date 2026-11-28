/* Med Daddy v9.11.46 — 100 newly authored follow-up questions from instructor
 * review study questions 1–50, 2 additional items each, preserving the existing
 * 50 base questions and independently verifying all 150 objective slots.
 * The uploaded review provides study prompts rather than an answer key. Clinical
 * treatment must be checked against the current applicable Ontario PCS.
 */
(()=>{'use strict';
const parts=[...(window.MD_PCT2_REVIEW_EXTRA_A_1146||[]),...(window.MD_PCT2_REVIEW_EXTRA_B_1146||[]),...(window.MD_PCT2_REVIEW_EXTRA_C_1146||[])];
const errors=[];
if(parts.length!==50)errors.push('Expected 50 instructor review point groups, received '+parts.length);
const base=window.MD_PCT2_FINAL_REVIEW_1144||[];
if(base.length!==50)errors.push('Original 50-point instructor bank missing');
let seed=568194;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const keys=[...Array(100)].map((_,i)=>i%4);for(let i=99;i>0;i--){const j=Math.floor(rand()*(i+1));[keys[i],keys[j]]=[keys[j],keys[i]];}
const questions=[],stems=new Set(base.map(q=>q.prompt.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim())),ids=new Set(base.map(q=>q.id));
const normal=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const detailFor=(text,correctWhy)=>{
 let lead='This alternative does not address the requested finding or mechanism.';
 if(/always|never|only|guarantee|every|exclude|entirely|prove|mandatory|completely/i.test(text))
  lead='This option makes an absolute claim that is not supported by the described assessment or physiology.';
 else if(/without|delay|postpone|ignore|wait|assume|immediately|force|restrict|replace|pull|cut|incise|massage/i.test(text))
  lead='This approach would omit or contradict a relevant safety or reassessment priority.';
 else if(/from|with|after|caused|through|because|due to|drives|raises|lowers/i.test(text))
  lead='This describes a different causal process from the one tested in this scenario.';
 else if(/shock|headache|cva|bleed|injury|stroke|seizure|toxic|infection/i.test(text))
  lead='This names another potential problem, but its defining findings or mechanism are not established by this stem.';
 return lead+' The best-supported concept here is: '+correctWhy;
};
for(let g=0;g<parts.length;g++){
 const [point,list]=parts[g]||[];
 if(point!==g+1||!Array.isArray(list)||list.length!==2)errors.push('Missing two authored follow-ups for point '+(g+1));
 if(!base.some(q=>q.reviewPoint===point))errors.push('Base instructor point missing '+point);
 for(let n=0;n<2;n++){
  const [prompt,correct,wrong,why]=list?.[n]||[];
  if(!prompt||!correct||!Array.isArray(wrong)||wrong.length!==3||!why){errors.push('Malformed question '+point+'-'+n);continue;}
  const key=keys[g*2+n],opts=wrong.slice();opts.splice(key,0,correct);
  const id='PCT2-FINAL-REVIEW-1146-'+String(point).padStart(2,'0')+'-'+(n+2);
  const st=normal(prompt);
  if(stems.has(st)||ids.has(id))errors.push('Duplicate question '+id);
  if(new Set(opts.map(normal)).size!==4)errors.push('Ambiguous options '+id);
  if(opts.some(v=>normal(v).length>=7&&normal(prompt).includes(normal(v))))errors.push('Answer echo '+id);
  const whyWrong=Object.fromEntries(wrong.map(v=>[v,detailFor(v,why)]));
  const q={id,course:'Patient Care & Theory II',unit:'PCT II Instructor Final Review',
   bankType:'instructor-review',difficulty:'Instructor High',reviewPoint:point,
   sourceTitle:'PCT 2 Final Reveiw.docx',sourceLocator:'Study Question '+point,
   source:'Uploaded PCT II Final Review Sheet, Study Question '+point,
   topic:'Final Review Point '+point,prompt,choices:opts,answer:'ABCD'[key],
   whyCorrect:why,whyWrong,explanation:why,
   scopeNote:'Study material; apply current authorized Ontario PCS to treatment, doses, bypass and disposition.'};
  questions.push(q);stems.add(st);ids.add(id);
 }
}
const answerKeys=Object.fromEntries('ABCD'.split('').map(a=>[a,questions.filter(q=>q.answer===a).length]));
if(questions.length!==100||Math.max(...Object.values(answerKeys))-Math.min(...Object.values(answerKeys))>1)
 errors.push('Need 100 questions with balanced keys');
window.MD_PCT2_FINAL_REVIEW_EXPANDED_1146={ready:errors.length===0,questions,coverage:parts.length,answerKeys,errors};
if(errors.length)console.error('PCT II instructor review point audit failed',errors);
})();