/* Med Daddy v9.9.5 — Abdominal mock in the STANDARD quiz workflow.
  Source-faithful; 120 supplied items, original key unverified. Independent session
  state so source-key agreement is not mixed into clinical quiz marks/progress. */
(()=>{'use strict';
 if(window.MD_PATCH_995)return;
 const archive=window.MD_PCT2_ABDO_MOCK_ARCHIVE_993;
 const hub=document.getElementById('md990-abdo-page');
 if(!Array.isArray(archive)||archive.length!==120||!hub||window.MD_PATCH_993?.ready!==true){
  window.MD_PATCH_995={ready:false,reason:'Original source mock not ready'};return;
 }
 const unique=new Set(archive.map(q=>q.number));
 if(unique.size!==120||archive.some(q=>!q.prompt||q.choices?.length!==4||!q.suppliedAnswer||!['A','B','C','D'].includes(q.suppliedAnswer))){
  window.MD_PATCH_995={ready:false,reason:'Original source mock integrity check failed'};return;
 }
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const panel=document.createElement('section');
 panel.className='panel hidden';
 panel.id='md995-mock-quiz';
 panel.setAttribute('aria-hidden','true');
 panel.innerHTML=[
 '<div class="topbar"><div><span class="pill" id="md995-counter"></span> <span class="pill">PCT II Abdominal · ORIGINAL MOCK</span></div>',
 '<div><button type="button" class="secondary" data-md995="home">← Unit Hub</button> ',
 '<button type="button" class="secondary" data-md995="restart">New Session</button></div></div>',
 '<div class="progress-wrap"><div class="progress" id="md995-progress"></div></div>',
 '<p class="md995-disclosure">Original uploaded questions and supplied keys. Source keys are <strong>not clinically verified</strong>. Responses are compared to the original answer sheet, not scored as correct medical practice.</p>',
 '<div id="md995-setup"><h2>Original mock — choose session length</h2><div class="md995-modes">',
 '<button type="button" data-md995-size="10">Quick 10</button>',
 '<button type="button" data-md995-size="20">Practice 20</button>',
 '<button type="button" data-md995-size="50">Exam 50</button>',
 '<button type="button" data-md995-size="120">Full 120</button></div></div>',
 '<div id="md995-running" hidden>',
 '<div id="md995-source-ref" class="small muted"></div>',
 '<div class="question" id="md995-prompt"></div>',
 '<div class="choices" id="md995-choices"></div>',
 '<div class="feedback hidden" id="md995-feedback"></div>',
 '<div class="md995-nav"><button type="button" data-md995="submit" id="md995-submit" disabled>Submit Answer</button>',
 '<button type="button" class="secondary" data-md995="next" id="md995-next" hidden>Next →</button>',
 '<button type="button" class="secondary" data-md995="prev" id="md995-prev">← Previous</button></div>',
 '</div>',
 '<div id="md995-results" hidden><h2>Original mock session complete</h2><div id="md995-recap"></div>',
 '<button type="button" class="secondary" data-md995="restart">Practice Another Set</button> ',
 '<button type="button" data-md995="home">Return to Abdominal Hub</button></div>'
 ].join('');
 document.body.appendChild(panel);
 const get=id=>panel.querySelector('#'+id);
 const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
 let items=[],at=0,selected=null,answers=new Map(),checks=new Set();
 const setHidden=(id,hide)=>get(id).hidden=hide;
 function open(){show('md995-mock-quiz');draw();}
 function startSession(n){
  items=n===120?archive.slice():shuffle(archive).slice(0,n);
  at=0;selected=null;answers=new Map();checks=new Set();
  setHidden('md995-setup',true);setHidden('md995-running',false);setHidden('md995-results',true);
  draw();window.scrollTo({top:0,behavior:'instant'});
 }
 function draw(){
  if(!items.length){get('md995-counter').textContent='Select a practice length';setHidden('md995-setup',false);setHidden('md995-running',true);setHidden('md995-results',true);get('md995-progress').style.width='0%';return;}
  const q=items[at],completed=answers.has(q.number),selection=completed?answers.get(q.number):selected;
  get('md995-counter').textContent='Question '+(at+1)+' / '+items.length;
  get('md995-progress').style.width=(100*at/items.length)+'%';
  get('md995-source-ref').textContent='Preserved source mock · Original PDF question '+q.number;
  get('md995-prompt').textContent=q.prompt;
  get('md995-choices').innerHTML=q.choices.map((v,i)=>{
   const a='ABCD'[i];
   return '<button type="button" class="choice '+(selection===a?'selected ':'')+(completed&&checks.has(q.number)&&a===q.suppliedAnswer?'md995-key-choice ':'')+'" data-md995-choice="'+a+'" '+(completed?'disabled':'')+'><strong>'+a+'.</strong> '+esc(v)+'</button>';
  }).join('');
  const feedback=get('md995-feedback');
  feedback.className='feedback '+(completed?'':'hidden')+' '+(completed&&selection===q.suppliedAnswer?'good':'');
  const selectedText=completed?esc(q.choices['ABCD'.indexOf(selection)]):'';
  const originalText=esc(q.choices['ABCD'.indexOf(q.suppliedAnswer)]);
  feedback.innerHTML=completed?[
   '<h2>'+(selection===q.suppliedAnswer?'✅ Matches supplied source key':'Source-key mismatch')+'</h2>',
   '<p><strong>Your answer:</strong> '+esc(selection)+'. '+selectedText+'</p>',
   '<div class="explain-block explain-correct"><h3>Original PDF answer sheet (unverified)</h3>',
   '<p>'+esc(q.suppliedAnswer)+'. '+originalText+'</p>',
   '<p><strong>Take-up:</strong> '+(q.number===1?'The spleen is a vascular solid abdominal organ. The stomach, gallbladder and small intestine are hollow structures.':q.number===2?'The pelvic brim marks the lower boundary of the abdominal cavity in the supplied anatomy question. The xiphoid is superior, the umbilicus is a surface landmark, and the inguinal ligament does not mark this boundary.':'This item has not yet received a verified, individualized rationale. Cross-check the original answer against the course slides before relying on it.')+'</p></div>',
   q.sourceIssue?'<div class="explain-block explain-wrong"><h3>⚠ Source verification concern</h3><p>'+esc(q.sourceIssue)+'</p></div>':'',
   '<p class="md995-caution">This comparison does not establish that the supplied key is clinically correct. No unverified mark is saved in Med Daddy progress.</p>'
  ].join(''):'';
  get('md995-submit').hidden=completed;
  get('md995-submit').disabled=completed||!selection;
  get('md995-next').hidden=!completed;
  get('md995-next').textContent=at===items.length-1?'Finish Session':'Next →';
  get('md995-prev').disabled=at===0;
 }
 function finish(){
  setHidden('md995-running',true);setHidden('md995-results',false);
  const attempted=answers.size,matched=items.filter(q=>answers.has(q.number)&&answers.get(q.number)===q.suppliedAnswer).length;
  const flagged=items.filter(q=>answers.has(q.number)&&q.sourceIssue).length;
  get('md995-counter').textContent='Session finished';
  get('md995-progress').style.width='100%';
  get('md995-recap').innerHTML='<div class="grid"><div class="card"><h2>'+attempted+' / '+items.length+'</h2><p>Answered</p></div><div class="card"><h2>'+matched+'</h2><p>Matched supplied source key (unverified)</p></div><div class="card"><h2>'+flagged+'</h2><p>Flagged source items encountered</p></div></div><p class="md995-caution">These are original-source comparisons, not validated clinical scores.</p>';
 }
 panel.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if('md995Size' in b.dataset){const n=Number(b.dataset.md995Size);if([10,20,50,120].includes(n))startSession(n);return;}
  if('md995Choice' in b.dataset){if(!items.length||answers.has(items[at].number))return;
   const v=b.dataset.md995Choice;if(!'ABCD'.includes(v))return;selected=v;draw();return;}
  const action=b.dataset.md995;
  if(action==='home'){show('md990-abdo-page');return;}
  if(action==='restart'){items=[];at=0;answers.clear();checks.clear();selected=null;open();return;}
  if(!items.length)return;
  if(action==='submit'){if(!selected||answers.has(items[at].number))return;
   answers.set(items[at].number,selected);checks.add(items[at].number);draw();return;}
  if(action==='prev'&&at>0){at--;selected=null;draw();return;}
  if(action==='next'&&answers.has(items[at].number)){
   if(at===items.length-1){finish();return;}
   at++;selected=null;draw();return;}
 });
 // v9.9.3 used a page button for a long source-archive list. Redirect that
 // button to the normal full-screen quiz. Preserve the original archive data.
 const entry=hub.querySelector('[data-md993="archive"]');
 if(entry){
  entry.dataset.md993='nativeMock995';entry.textContent='Original Mock · Normal Quiz (10 / 20 / 50 / 120)';
  entry.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open();});
 }
 const old=hub.querySelector('#md993-archive');
 if(old)old.hidden=true;
 const css=document.createElement('style');css.id='md995-mock-css';
 css.textContent=[
  '#md995-mock-quiz .md995-disclosure{background:#1c3040;border:1px solid #4b7482;border-radius:10px;padding:12px 15px;line-height:1.5;margin:14px 0 20px}',
  '#md995-mock-quiz .md995-modes{display:flex;flex-wrap:wrap;gap:12px;margin:17px 0 24px}',
  '#md995-mock-quiz .md995-modes button{width:auto;min-width:120px;padding:15px;background:#1e608b;color:#fff;border:1px solid #569fc7;border-radius:10px}',
  '#md995-mock-quiz [hidden]{display:none!important}',
  '#md995-mock-quiz .md995-nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}',
  '#md995-mock-quiz .md995-caution{color:#facf95;padding-top:12px;font-size:.9rem}',
  '#md995-mock-quiz .md995-key-choice{border-color:#7aaac0!important}',
  '#md995-mock-quiz .choices{margin:15px 0}',
  '#md993-archive[hidden]{display:none!important}'
 ].join('\n');document.head.appendChild(css);
 window.MD_PATCH_995={version:'9.9.5',ready:true,sessionSizes:[10,20,50,120],mockItems:120,sourceFlagCount:archive.filter(q=>!!q.sourceIssue).length,scoreAgainstUnverifiedKeys:false,otherBanksModified:false};
 document.title=document.title.replace(/v9\.9\.[0-4]/,'v9.9.5');
 const badge=document.querySelector('#appVersion,.app-version,[data-app-version]');
 if(badge)badge.textContent=badge.textContent.replace(/9\.9\.[0-4]/g,'9.9.5');
 for(const span of document.querySelectorAll('span'))if(/^v9\.9\.[0-4]$/.test(span.textContent.trim()))span.textContent='v9.9.5';
})();