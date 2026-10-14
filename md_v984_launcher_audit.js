/* Med Daddy v9.8.4 — launcher routing / deck-size disclosure hotfix.
   No question stem, key, clinical directive, localStorage key or underlying source deck changed. */
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
if(window.MD_PATCH_984)return;
const endo=()=>pct2EndocrinePool();
const ne=()=>pct2NeuroPool();
const cleanRequested=(value,available)=>{
 const n=Number(value);
 return !Number.isFinite(n)||n>=999||n<=0?available:Math.min(Math.floor(n),available);
};
const launchVerified=(items,n,label)=>{
 const ids=new Set();
 const pool=items.filter(q=>q?.id&&!ids.has(q.id)&&ids.add(q.id));
 if(pool.length<1){alert('No questions are available for '+label+'.');return false;}
 const count=cleanRequested(n,pool.length);
 const adaptive=$('#adaptiveNext'),recycle=$('#recycle');
 if(adaptive)adaptive.checked=false;if(recycle)recycle.checked=false;
 start(shuffle([...pool]).slice(0,count));
 if(quiz.length!==count){alert(label+' loaded '+quiz.length+' of '+count+' questions. Please flag this session.');return false;}
 window.MD_LAST_VERIFIED_LAUNCH={label,count:quiz.length,available:pool.length,firstId:quiz[0]?.id};
 window.MD_ENDOCRINE_LAUNCH_STATUS={version:'9.8.4',label,count:quiz.length,firstId:quiz[0]?.id};
 return true;
};
// The previous 9.1.1 override used a stale advanced-ID subset with only 2
// remaining Endocrine questions. Every unit launcher now draws its advertised
// course-topic subset from the active focused 90 instead.
window.launchPCTEndocrineQuiz=function(size=50,...topics){
 const bank=endo();if(bank.length!==90){alert('Endocrine focused bank expected 90 but found '+bank.length+'. No exam started.');return false;}
 const subset=topics.length?bank.filter(q=>topics.includes(q.topic)):bank;
 return launchVerified(subset,size,topics.length?'Endocrine topic practice: '+topics.join(' / '):'Endocrine focused practice');
};
window.launchPCTEndocrineDirectiveDrill=function(size=50){
 const texts=/D10W|D50W|dextrose|glucagon|hydrocortisone|directive|dose|repeat|discharge|pheochromocytoma|hypoglycemi[a-z]*/i;
 return launchVerified(endo().filter(q=>texts.test([q.prompt,q.explanation,q.objective].join(' '))),size,'Endocrine medication/directive review');
};
const previousSpecial=window.launchMD91Unit;
window.launchMD91Unit=function(unit,kind){
 if(unit!=='Endocrine Emergencies')return previousSpecial.apply(this,arguments);
 const p=kind==='plans'?endo().filter(q=>/treat|dose|directive|plan|stabiliz|medication/i.test([q.prompt,q.objective,q.explanation].join(' '))):endo();
 return launchVerified(p,50,kind==='plans'?'Endocrine treatment and directives':'Endocrine instructor practice');
};
// The PCT II landing page is a launcher, not a bespoke mock dataset.
const endoRow=$$('#pct2CoursePanel .md88-unit-list > details').find(d=>/Unit 4\s*[—–-]\s*Endocrine/i.test(d.textContent));
if(endoRow){
 const main=$('button[onclick="launchPCTEndocrineQuiz(50)"]',endoRow);
 if(main){main.textContent='50-question Endocrine practice';main.title='Fifty questions drawn from the focused 90; not the original Discord mock.';}
 const diabetes=$('button[onclick*="launchPCTEndocrineQuiz(50,\'Hypoglycemia\'"]',endoRow);
 if(diabetes){const n=endo().filter(q=>['Hypoglycemia','DKA & HHS'].includes(q.topic)).length;diabetes.textContent='Diabetic emergencies · '+n+' questions';}
 const actions=$('.md88-actions',endoRow);
 if(actions && !$('#md984-discord-50',actions)){
  const b=document.createElement('button');b.id='md984-discord-50';b.type='button';b.textContent='Preserved Discord mock · 50';b.title='Original uploaded Discord PDF questions and supplied answer key (not independently clinically certified).';
  b.addEventListener('click',()=>{
    const part=$('#md973MockPart'),size=$('#md973MockSize'),raw=$('#md973MockShowAll'),shuf=$('#md973MockShuffle');
    if(part)part.value='all';if(size)size.value='50';if(raw)raw.checked=false;if(shuf)shuf.checked=true;
    if(typeof window.launchEndo973Mock==='function'){
      window.launchEndo973Mock();
      if(quiz.length!==50)alert('Discord mock expected 50; opened '+quiz.length+'. Please flag.');
    }else alert('The original Discord mock is unavailable.');
  });actions.append(b);
 }
}
// Source selection and micro-drills still live in the v9.8.3 single Endocrine menu.
// Truthful count labels also fix legacy control surfaces opened by older saved links.
for(const b of $$('#pct2EndocrinePage button[onclick*="launchPCTEndocrineQuiz"]')){
 const call=b.getAttribute('onclick')||'',match=call.match(/launchPCTEndocrineQuiz\((\d+)(.*)\)/);
 if(!match)continue;
 const requested=Number(match[1]);const topics=[...match[2].matchAll(/'([^']+)'/g)].map(x=>x[1]);
 const available=topics.length?endo().filter(q=>topics.includes(q.topic)).length:endo().length;
 if(!available)continue;
 if(/^Focused practice$/i.test(b.textContent.trim()))b.textContent='Practice '+available+' questions';
 else if(/100.question challenge/i.test(b.textContent))b.textContent='Complete focused challenge · '+available;
 else if(requested>=9999&&/mastery bank/i.test(b.textContent))b.textContent='Complete focused bank · '+available;
 else if(/Start 50.question exam mock/i.test(b.textContent))b.textContent='50-question focused practice';
}
const neuro=ne();
for(const b of $$('#pct2NeuroPage button[onclick*="launchPCTNeuroQuiz"]')){
 const call=b.getAttribute('onclick')||'';
 const m=call.match(/launchPCTNeuroQuiz\((\d+)(?:,'([^']+)')?\)/);if(!m)continue;
 const topic=m[2];
 const actual=topic==='Head'?neuro.filter(q=>['Head Injury','Face and Neck Injury'].includes(q.topic)).length:topic==='Spine'?neuro.filter(q=>q.topic==='Spine Injury').length:topic==='Medical'?neuro.filter(q=>!['Head Injury','Face and Neck Injury','Spine Injury'].includes(q.topic)).length:neuro.length;
 const count=Math.min(Number(m[1]),actual);
 if(Number(m[1])===100&&actual<100)b.textContent='Complete Neuro challenge · '+actual+' questions';
 if(topic&&/^50 questions$/i.test(b.textContent.trim()))b.textContent=actual+' '+(actual===1?'question':'questions');
}
const psych=BANK.filter(q=>q.course==='Psychology'&&q.unit==='Psychology Midterm Prep');
for(const b of $$('button[onclick^="launchPsychTopic"]')){
 const m=(b.getAttribute('onclick')||'').match(/launchPsychTopic\('([^']+)',(\d+)\)/);if(!m)continue;
 const available=psych.filter(q=>q.topic===m[1]).length;
 if(!available)continue;
 b.title=available+' questions currently available in this topic';
 // Only replace numerical claims; the user-facing topic name stays unchanged.
 b.innerHTML=b.innerHTML.replace(/•\s*\d+\s*(?=<|$)/, '• '+available);
}
// Legacy Psychology mastery heading claims 232, but the live quiz source has 183.
// Keep the source untouched and advertise the count that actually launches.
for(const b of $$('button[onclick=\"launchPsychMidterm(999)\"]')){
 b.textContent=b.textContent.replace(/232.question/i,psych.length+'-question');
}
// Operations source subset has 21 records; preserve it rather than invent 9 items.
const op=$('button[onclick="launchFundamentalsQuiz(30,\'operations\')"]');
if(op){const small=op.querySelector('small');if(small)small.textContent+=' · 21 available';else op.title='21 source questions available';}
// Label every verified complete set by the underlying source, never as a newly authored mock.
window.MD_PATCH_984={version:'9.8.4',date:'2026-10-14',focusedEndocrine:endo().length,neuroCount:neuro.length,psychologyCount:psych.length,sourceDecksPreserved:true,clinicalDataModified:false,storageKeysModified:false,legacyAdvancedFilterRemoved:true};
const badge=$('#appVersion,.app-version,[data-app-version]');if(badge)badge.textContent=badge.textContent.replace(/9\.8\.[0-3]/g,'9.8.4');
for(const item of $$('span'))if(item.textContent.trim()==='v9.8.3')item.textContent='v9.8.4';
document.title=document.title.replace(/v9\.8\.[0-3]/,'v9.8.4');
})();