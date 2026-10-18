/* Med Daddy v9.8.7 — Scenario Challenge launch fix.
   Registers source-checked v9.8.6 scenarios with the established question-safety registry.
   Does not change scenario wording, answer keys, adaptive history, other decks or storage. */
(()=>{'use strict';
if(window.MD_PATCH_987)return;
const cases=window.MD_ENDO_SCENARIOS_986;
const registry=window.MD_SAFE_QUESTIONS;
const issues=[];
if(!Array.isArray(cases)||cases.length!==21)issues.push('Scenario set missing or not exactly 21');
if(!(registry instanceof Map))issues.push('Safety registry unavailable');
if(!issues.length){
 const ids=new Set();
 for(const q of cases){
  if(!q||typeof q.id!=='string'||!/^PCT2-ENDO-CASE-\d{3}$/.test(q.id)||ids.has(q.id))issues.push('Invalid or repeated scenario ID');
  else ids.add(q.id);
  if(!Array.isArray(q?.choices)||q.choices.length!==4||!['A','B','C','D'].includes(q.answer)||!q.prompt||!q.explanation)issues.push('Invalid scenario structure');
  if(typeof mdLeakReason==='function'&&mdLeakReason(q))issues.push('Scenario failed answer-leak validation: '+q.id);
  if(registry.has(q.id)&&registry.get(q.id)?.prompt!==q.prompt)issues.push('Existing ID conflicts with scenario: '+q.id);
 }
}
if(issues.length){console.error('Scenario registration blocked',issues);window.MD_PATCH_987={version:'9.8.7',ready:false,issues};return;}
for(const q of cases)registry.set(q.id,q);
window.MD_PATCH_987={version:'9.8.7',ready:true,registered:21,originalFocusedBankUnchanged:true,discordMockUnchanged:true,progressCleared:false};
const badge=document.querySelector('#appVersion,.app-version,[data-app-version]');if(badge)badge.textContent=badge.textContent.replace(/9\.8\.[0-6]/g,'9.8.7');
for(const span of document.querySelectorAll('span'))if(/^v9\.8\.[0-6]$/.test(span.textContent.trim()))span.textContent='v9.8.7';
document.title=document.title.replace(/v9\.8\.[0-6]/,'v9.8.7');
})();