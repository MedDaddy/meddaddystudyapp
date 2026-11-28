/* Med Daddy v9.11.46 — PCT II Instructor Final Review keyword bank.
 * 147 unique terms x 3 questions = 441 distinct questions.
 * Three angles: meaning, clinical presentation, distinguishing mechanism.
 * Correct and distractor explanation for every option; no answer in stem.
 * All terms transcribed from instructor sheet, with merged-column mistakes split
 * and duplicate "Epidural hematoma" counted once.
 */
(()=>{'use strict';
const terms=[...(window.MD_PCT2_REVIEW_TERMS_A_1146||[]),...(window.MD_PCT2_REVIEW_TERMS_B_1146||[]),...(window.MD_PCT2_REVIEW_TERMS_C_1146||[])];
const errors=[],norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
if(terms.length!==147)errors.push('Expected 147 unique glossary terms, got '+terms.length);
const uniqueTerms=new Set(terms.map(x=>norm(x[0])));
if(uniqueTerms.size!==terms.length)errors.push('Duplicate glossary term');
const groups={};
for(const item of terms){if(item.length!==5||item.some(v=>!v))errors.push('Malformed glossary entry '+item[0]);(groups[item[1]]||(groups[item[1]]=[])).push(item);}
let seed=947164;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
function hash(s){let n=2166136261>>>0;for(let i=0;i<s.length;i++)n=Math.imul(n^s.charCodeAt(i),16777619)>>>0;return n;}
const indices=Array.from({length:441},(_,i)=>i%4);
for(let i=indices.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[indices[i],indices[j]]=[indices[j],indices[i]];}
const termsByName=new Map(terms.map(t=>[t[0],t]));
const all=[],seenStems=new Set(),seenIds=new Set();
function synonyms(a,b){const ta=norm(a).split(' '),tb=norm(b).split(' ');return ta.some(t=>t.length>5&&tb.includes(t))}
function distractors(term,field){
 const category=term[1],neighbors={
  RESP:['ENV','CARD','INF'],CARD:['NEU','ENDO','RESP'],TOX:['ENDO','NEU','INF'],
  NEU:['ENDO','GI','ENV'],ENV:['NEU','ENDO','GI'],ENDO:['NEU','ENV','GI'],
  GI:['ENDO','NEU','INF'],INF:['GI','NEU','ENV']
 };
 const pool=[...(groups[category]||[]),...(neighbors[category]||[]).flatMap(c=>groups[c]||[])]
 .filter(t=>t!==term && norm(t[0])!==norm(term[0]));
 const score=t=>{
   const n1=norm(term[0]),n2=norm(t[0]);
   const first=n1.slice(0,3)===n2.slice(0,3)?3:0;
   const words=norm(term[2]+' '+term[3]+' '+term[4]).split(' ');
   const similarly=words.filter(w=>w.length>=6&&norm(t[2]+' '+t[3]+' '+t[4]).includes(w)).length;
   return first+Math.min(similarly,4);
 };
 // prefer adjacent concepts without repeating synonyms or using any candidate
 // that's just another label for the correct term.
 const stem=field===0?'Which course term most accurately matches this definition: '+term[2]+'?':
  field===1?'A patient or clinical context is described as follows: '+term[3]+'. Which term best identifies the phenomenon or disorder?':
  'Which distinguishing association is most accurate for '+term[0]+'?';
 const ranked=pool.map(t=>({t,s:score(t),v:hash(term[0]+'/'+t[0]+'/'+field)}))
  .filter(x=>{
   const label=field===2?x.t[4]:x.t[0];
   const v=norm(label);return !(v.length>=7&&norm(stem).includes(v));
  })
  .sort((a,b)=>b.s-a.s||a.v-b.v);
 let chosen=ranked.slice(0,3).map(x=>x.t);
 if(chosen.length<3)errors.push('Too few relevant alternatives for '+term[0]);
 return chosen;
}
for(let i=0;i<terms.length;i++){
 const term=terms[i],number=String(i+1).padStart(3,'0');
 for(let variation=0;variation<3;variation++){
  const other=distractors(term,variation),key=indices[i*3+variation];
  const prompts=[
   'Which course term most accurately matches this definition: '+term[2]+'?',
   'A patient or clinical context is described as follows: '+term[3]+'. Which term best identifies the phenomenon or disorder?',
   'Which distinguishing association is most accurate for '+term[0]+'?'
  ];
  // Some instructor terms recur literally in the description. A short clinical
  // rewrite avoids giving the answer away before the student selects an option.
  if(variation<2&&norm(term[0]).length>=7&&norm(prompts[variation]).includes(norm(term[0]))){
   const replacement='this clinical finding';
   prompts[variation]=prompts[variation].replace(new RegExp(term[0].replace(/[.*+?^${}()|[\]\\]/g,'\\const prompts=[
   'Which course term most accurately matches this definition: '+term[2]+'?',
   'A patient or clinical context is described as follows: '+term[3]+'. Which term best identifies the phenomenon or disorder?',
   'Which distinguishing association is most accurate for '+term[0]+'?'
  ];'),'ig'),replacement);
  }
  const correct=variation===2?term[4]:term[0];
  const options=other.map(x=>variation===2?x[4]:x[0]);
  options.splice(key,0,correct);
  const whyWrong=Object.fromEntries(other.map(x=>[variation===2?x[4]:x[0],variation===2?
   'That is instead associated with '+x[0]+': '+x[2]+'.':
   'The term '+x[0]+' means '+x[2]+'; it differs from the clinical clues in the stem.']));
  const whyCorrect=variation===0?'The correct term is '+term[0]+'. '+term[2]+'.':
    variation===1?'This presentation is associated with '+term[0]+'. '+term[2]+'.':
    'For '+term[0]+', '+term[4]+'. '+term[2]+'.';
  const q={id:'PCT2-FINAL-KEYWORD-1146-'+number+'-'+(variation+1),
   course:'Patient Care & Theory II',unit:'PCT II Instructor Final Review',bankType:'instructor-keyword',
   keyword:term[0],keywordNumber:i+1,topic:term[1]+' · '+term[0],
   sourceTitle:'PCT 2 Final Reveiw.docx',sourceLocator:'Key Words — '+term[0],
   source:'Uploaded PCT 2 Final Review Sheet, Key Words — '+term[0],
   difficulty:'Instructor High',prompt:prompts[variation],choices:options,
   answer:'ABCD'[key],whyCorrect,whyWrong,explanation:whyCorrect,
   scopeNote:'Terminology review; clinical treatment and directive eligibility require current PCS.'};
  if(new Set(options.map(norm)).size!==4)errors.push('Answer options repeat '+q.id);
  if(options.some(o=>{const v=norm(o);return v.length>=7&&norm(q.prompt).includes(v)}))errors.push('Option echo '+q.id);
  const sn=norm(q.prompt);if(seenStems.has(sn))errors.push('Repeated stem '+q.id);
  if(seenIds.has(q.id))errors.push('Repeated ID '+q.id);
  seenStems.add(sn);seenIds.add(q.id);all.push(q);
 }
}
const counts=Object.fromEntries('ABCD'.split('').map(letter=>[letter,all.filter(q=>q.answer===letter).length]));
if(all.length!==441||Math.max(...Object.values(counts))-Math.min(...Object.values(counts))>1)errors.push('Count or answer key balance invalid');
window.MD_PCT2_REVIEW_KEYWORDS_1146={ready:errors.length===0,terms:terms.map(t=>t[0]),questions:all,keys:counts,errors};
if(errors.length)console.error('PCT II keyword bank audit failed',errors);
})();