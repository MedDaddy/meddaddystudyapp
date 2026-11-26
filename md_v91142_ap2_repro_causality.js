/* Med Daddy v9.11.42 — causality/answer-fit repair for testicular temperature questions.
   Build on the reviewed 9.11.41 deck, retain answer positions and source metadata.
   Reset IDs for these materially revised questions to keep old missed-question data
   from being attributed to the rewritten stems. Memory hints follow answer submission.
 */
(()=>{'use strict';
const corrections=[{"oldId":"AP2-REPRO-1126-REV-24-5","expected":"Sperm production depends on temperatures below core body temperature","stem":"A testis has remained undescended in the abdomen for several years. Which temperature-related change most directly explains the risk of reduced fertility?","correct":"Sustained core-body heat disrupts germ-cell development in the seminiferous tubules","wrong":[["Heat mainly suppresses Leydig testosterone secretion while leaving sperm development unaffected","Heat-related infertility is strongly linked to impaired spermatogenesis; Leydig endocrine activity can persist."],["Heat blocks sperm transport through the vas deferens without affecting sperm production","The principal temperature-sensitive problem concerns germ-cell development in the testis, not mechanical blockage of the vas deferens."],["Heat affects only epididymal sperm storage while protecting seminiferous tubules","Spermatogenic cells in seminiferous tubules are vulnerable to elevated testicular temperatures."]],"why":"Spermatogenesis in the seminiferous tubules requires a temperature below body core. Prolonged exposure to abdominal heat impairs germ-cell survival and maturation, reducing sperm production and fertility. Cryptorchidism is the condition; elevated temperature is a major physiological mechanism.","memory":"The sperm factory needs A/C. An undescended testis cooks at body-core temperature, and the assembly line gets screwed—while testosterone production can persist."},{"oldId":"AP2-REPRO-1126-SLIDE-009","expected":"Spermatogenesis requires temperatures cooler than the body's core","stem":"A man with long-standing cryptorchidism has a low sperm count but measurable circulating testosterone. Which distinction best accounts for these findings?","correct":"Developing germ cells are particularly heat-sensitive, even when some Leydig-cell endocrine function remains","wrong":[["Testicular heat can stop only testosterone release; sperm production is temperature-independent","Sperm production is especially vulnerable to increased testicular temperature, even when testosterone release continues."],["Leydig interstitial cells produce the sperm while Sertoli cells produce testosterone","Leydig cells produce testosterone; sperm develop in seminiferous tubules with Sertoli-cell support."],["Abdominal placement causes infertility exclusively by obstructing the ejaculatory ducts","Undescended position does not intrinsically block ejaculatory ducts; prolonged higher temperature impairs spermatogenesis."]],"why":"Spermatogenic germ cells require a cooler environment and can be impaired by abdominal temperatures. Leydig cells may still produce measurable testosterone, so endocrine activity does not prove normal fertility.","memory":"A hot factory can still pay the testosterone bartender while the sperm assembly line is fucked. Leydig makes the hormone; Sertoli helps the sperm."}];
const all=[...(window.MD_AP2_REPRO_REVIEW_91137||[]),...(window.MD_AP2_REPRO_LECT_91137||[]),...(window.MD_AP2_REPRO_SLIDE_91140||[])];
const lookup=new Map(all.map(q=>[q.id,q])),errors=[];
if(all.length!==240)errors.push('Missing 240-question base deck');
for(const ch of corrections){
 const q=lookup.get(ch.oldId);
 if(!q){errors.push('Missing '+ch.oldId);continue;}
 const key='ABCD'.indexOf(q.answer);
 if(q.choices[key]!==ch.expected)errors.push('Prior answer mismatch '+ch.oldId);
 const options=ch.wrong.map(x=>x[0]);
 if(new Set([ch.correct,...options]).size!==4||ch.wrong.some(x=>!x[1]))errors.push('Invalid options '+ch.oldId);
}
if(errors.length){window.MD_AP2_REPRO_CAUSAL_91142={ready:false,errors};console.error(errors);return;}
for(const ch of corrections){
 const q=lookup.get(ch.oldId),key='ABCD'.indexOf(q.answer),choices=ch.wrong.map(x=>x[0]);
 choices.splice(key,0,ch.correct);
 q.originalId=q.id;
 q.id=q.id+'-R42';
 q.prompt=ch.stem;q.choices=choices;q.whyCorrect=ch.why;
 q.whyWrong=Object.fromEntries(ch.wrong);
 q.memoryTrick=ch.memory;
 q.qualityAudit='v9.11.42 causal answer-fit review';
}
window.MD_AP2_REPRO_CAUSAL_91142={ready:true,changed:corrections.length,errors:[],replacedIds:corrections.map(ch=>ch.oldId)};
})();