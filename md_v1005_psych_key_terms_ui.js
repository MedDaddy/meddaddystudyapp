/* Med Daddy v9.10.5: Psychology key-term selector */
(()=>{
'use strict';
const data=window.MD_PSYCH_TERMS_1005,page=document.getElementById('psychFinalPage');
if(!data?.ready||!page)return;
const grid=page.querySelector('.md1000-grid'),bar=page.querySelector('.md1000-browser');
if(!grid||!bar)return;
const old=page.querySelector('.md1004-entry'),oldPanel=page.querySelector('#md1004-term-panel');
if(old)old.hidden=true;if(oldPanel)oldPanel.hidden=true;
const card=document.createElement('button');card.type='button';card.className='md1005-card';
card.innerHTML='<strong>Key Terms Challenge · 123</strong><span>Three questions for each course-supported keyword</span>';grid.appendChild(card);
const panel=document.createElement('section');panel.className='md1000-browser';panel.id='md1005-panel';panel.hidden=true;
panel.innerHTML='<h2>Psychology Final Key Terms</h2><p>Identify the named terms, apply them to scenarios and distinguish similar concepts.</p>'+
'<button data-term-size="123">All 123</button> <button data-term-size="50">50</button> <button data-term-size="20">20</button> <button data-term-size="10">10</button>'+
'<p>Pick a keyword: <select id="md1005-select"></select> <button data-term-size="one">Study this term · 3</button></p>'+
'<details><summary>Three review-only terms · external reference</summary><p>Nine supplemental questions come from external definitions, not the uploaded lectures, and are excluded from course Final exams.</p><button data-term-size="extra">Supplemental 9</button></details>';
bar.after(panel);
const picker=panel.querySelector('#md1005-select');
window.MD_PSYCH_TERM_MANIFEST_1005.forEach((r,i)=>{const o=document.createElement('option');o.value=r[0];o.textContent=r[0]+(i>=41?' (supplement)':'');picker.appendChild(o);});
function launch(list,n){
 const chosen=shuffle([...list]).slice(0,n);
 if(!chosen.length||chosen.some(q=>window.MD_SAFE_QUESTIONS.get(q.id)?.prompt!==q.prompt))return;
 const a=document.getElementById('adaptiveNext'),b=document.getElementById('recycle');
 if(a)a.checked=false;if(b)b.checked=false;
 start(chosen);
 window.MD_PSYCH_TERM_SESSION_1005={count:chosen.length};
}
card.addEventListener('click',()=>{panel.hidden=false;panel.scrollIntoView({block:'nearest'});});
panel.addEventListener('click',e=>{
 const b=e.target.closest('button[data-term-size]');if(!b)return;
 const v=b.dataset.termSize;
 if(v==='extra')return launch(data.supplementalQuestions,9);
 if(v==='one')return launch([...data.courseQuestions,...data.supplementalQuestions].filter(q=>q.keyTerm===picker.value),3);
 return launch(data.courseQuestions,Number(v));
});
const css=document.createElement('style');
css.textContent='.md1004-entry[hidden],#md1004-term-panel[hidden],#md1005-panel[hidden]{display:none!important}'+
'.md1005-card{display:flex;flex-direction:column;gap:9px;text-align:left;background:#153b58;color:#eaf6ff;border:1px solid #5aa6d0;padding:17px;border-radius:12px;min-height:110px}'+
'#md1005-panel button{width:auto!important;padding:10px 14px;margin:5px;border-radius:9px}'+
'#md1005-panel select{padding:8px;background:#122a42;color:#fff}';
document.head.appendChild(css);
const hub=window.MD_PSYCH_FINAL_1000;if(hub){hub.newTotal=232;hub.finalOnlyCount=232;}
const label=page.querySelector('[data-md1000="all"] strong');
if(label)label.textContent='Full Post-Midterm Bank · 232';
const select=page.querySelector('#md1000-source');
if(select){const o=[...select.options].find(x=>x.value==='terms');if(o)o.textContent='Key Terms Challenge · 123';}
window.MD_PSYCH_TERMS_UI_1005={ready:true,sourceQuestions:123,externalQuestions:9};
})();