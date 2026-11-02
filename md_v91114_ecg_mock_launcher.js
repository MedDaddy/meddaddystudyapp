/* v9.11.14 Original ECG Mock.pdf (100 Q) launcher.
 * Original order, source-provided answer keys and options are preserved. No auto-updates,
 * progress clearing, shuffle or dilution into generated 4/12-lead question banks.
 */
(()=>{'use strict';
 if(window.MD_ECG_ORIGINAL_MOCK_UI_91114)return;
 const mock=window.MD_ECG_PRESERVED_MOCK_91114||[];
 const root=document.getElementById('md-ecg91112');
 const registry=window.MD_SAFE_QUESTIONS;
 const issues=[];
 const count=mock.length;
 if(count!==100||!root||!(registry instanceof Map)){
  window.MD_ECG_ORIGINAL_MOCK_UI_91114={ready:false,issues:['Missing original 100-question bank, ECG Academy page or question safety registry'],count};return;
 }
 const numbers=new Set();
 for(const q of mock){
  if(!q||!q.id||numbers.has(q.originalOrdinal)||!Number.isInteger(q.originalOrdinal)||
     !q.prompt||!Array.isArray(q.choices)||q.choices.length!==4||
     new Set(q.choices.map(v=>String(v).trim().toLowerCase())).size!==4||
     !/^[ABCD]$/.test(q.answer)){
    issues.push('Invalid or duplicate source question #'+String(q?.originalOrdinal||'?'));continue;
  }
  numbers.add(q.originalOrdinal);
  const leak=typeof mdLeakReason==='function'?mdLeakReason(q):'';
  if(leak){issues.push('Question '+q.originalOrdinal+' failed stem safety: '+leak);continue;}
  const current=registry.get(q.id);
  if(current&&(current.prompt!==q.prompt||current.answer!==q.answer))issues.push('Source ID collision: '+q.id);
  else if(!current)registry.set(q.id,q);
 }
 if(numbers.size!==100)issues.push('Incomplete original source numbering');
 const panel=document.createElement('section');
 panel.id='md-ecg-mock91114';panel.className='md-ecg-preserved';
 panel.innerHTML='<div><strong>Preserved Original ECG Mock — 100 Questions</strong>'+
 '<p>All nine sections from <em>ECG Mock.pdf</em>, in the original order with the supplied answer key. No mixing, rewriting or shuffling.</p>'+
 '<p class="md-ecg-mock-caution">The uploaded key has two flagged inconsistencies (questions 99 and 100). Their original answers are retained, with warnings in the explanations.</p></div>'+
 '<button type="button" id="md-ecg-mock91114-start" class="success">Start Original 100-Question Mock</button>'+
 '<p class="muted" id="md-ecg-mock91114-status" aria-live="polite"></p>';
 const tabs=root.querySelector('.md-ecg-tabs');
 if(tabs)tabs.after(panel);else root.prepend(panel);
 const css=document.createElement('style');css.id='md-ecg-mock91114-css';
 css.textContent='#md-ecg-mock91114{margin:0 0 22px;padding:16px;border:1px solid #41627b;border-radius:12px;background:rgba(40,78,110,.13)}'+
 '#md-ecg-mock91114 strong{font-size:1.05rem}#md-ecg-mock91114 p{margin:6px 0 10px}'+
 '#md-ecg-mock91114 .md-ecg-mock-caution{font-size:.88rem;opacity:.78}'+
 '#md-ecg-mock91114 button{width:100%;min-height:48px;font-weight:700;border-radius:9px}';
 document.head.appendChild(css);
 const status=panel.querySelector('#md-ecg-mock91114-status');
 panel.querySelector('#md-ecg-mock91114-start').onclick=()=>{
  if(issues.length){status.textContent='Cannot start: original mock safety validation failed. No progress was changed.';console.error('ECG original mock issues:',issues);return;}
  const ordered=mock.slice().sort((a,b)=>a.originalOrdinal-b.originalOrdinal);
  if(ordered.length!==100||ordered.some(q=>!registry.has(q.id))){
   status.textContent='Original mock registration incomplete. No progress was changed.';return;
  }
  const recycle=document.getElementById('recycle');if(recycle)recycle.checked=false;
  if(typeof start==='function')start(ordered);
  else status.textContent='Quiz engine unavailable. Refresh the page.';
 };
 if(issues.length)console.error('ECG original mock validation',issues);
 window.MD_ECG_ORIGINAL_MOCK_UI_91114={ready:issues.length===0,issues,count,source:'ECG Mock.pdf',
   preservedOrder:true,sourceAnswerKeysUnaltered:true,flaggedOriginalKeys:[99,100],version:'9.11.14'};
})();