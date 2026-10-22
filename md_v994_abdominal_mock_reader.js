/* Med Daddy v9.9.4 — source-faithful Abdominal mock reading/player repair.
   Scope: archived mock presentation ONLY. No question, answer-key, history or other unit mutations. */
(()=>{'use strict';
 if(window.MD_PATCH_994)return;
 const page=document.getElementById('md990-abdo-page');
 const area=page?.querySelector('#md993-archive');
 const source=window.MD_PCT2_ABDO_MOCK_ARCHIVE_993;
 if(!page||!area||!Array.isArray(source)||source.length!==120||window.MD_PATCH_993?.ready!==true){
  window.MD_PATCH_994={ready:false,error:'Mock archive not ready'};return;
 }
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const sourceNumbers=new Set(source.map(q=>q.number));
 if(sourceNumbers.size!==120||source.some(q=>!q.prompt||q.choices?.length!==4||!q.suppliedAnswer)){
  window.MD_PATCH_994={ready:false,error:'Mock source integrity check failed'};return;
 }
 const hiddenOriginal=area.querySelector('#md993-archive-content');
 if(hiddenOriginal)hiddenOriginal.hidden=true;
 area.querySelector('summary').innerHTML='Preserved source mock · practice reader <span>10 / 20 / 50 / 120 question sessions · supplied key remains unverified</span>';
 const oldIntro=area.querySelector(':scope > p');
 if(oldIntro)oldIntro.textContent='Original wording and options preserved. Choose one response per question, then optionally reveal the original supplied key. The key has NOT been clinically verified; agreement is not an accuracy score.';
 const player=document.createElement('div');
 player.id='md994-mock-player';
 player.innerHTML=[
  '<div class="md994-toolbar" aria-label="Choose mock practice length">',
  '<button type="button" data-md994-start="10">Quick 10</button>',
  '<button type="button" data-md994-start="20">Practice 20</button>',
  '<button type="button" data-md994-start="50">Practice 50</button>',
  '<button type="button" data-md994-start="120">Full 120</button>',
  '</div>',
  '<div id="md994-stage"><p class="md994-note">Choose a session size to start the preserved mock. It does not affect scored Med Daddy quizzes.</p></div>'
 ].join('');
 area.insertBefore(player,hiddenOriginal||null);
 let session=[],index=0,answers=new Map(),revealed=new Set();
 const stage=player.querySelector('#md994-stage');
 const shuffleCopy=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
 function draw(){
  if(!session.length)return;
  const q=session[index];
  const answer=answers.get(q.number)||'';
  const isRevealed=revealed.has(q.number);
  stage.innerHTML=[
   '<div class="md994-progress" role="status">Original mock · Question '+(index+1)+' of '+session.length+' <span>Source #'+q.number+'</span></div>',
   '<article class="md994-question"><h3>'+escape(q.prompt)+'</h3>',
   '<div class="md994-options" role="group" aria-label="Answer choices">',
   ...q.choices.map((choice,i)=>{
    const letter='ABCD'[i];
    return '<button type="button" class="md994-answer'+(answer===letter?' selected':'')+'" aria-pressed="'+(answer===letter)+'" data-md994-choice="'+letter+'"><span class="md994-letter">'+letter+'</span><span class="md994-optiontext">'+escape(choice)+'</span></button>';
   }),
   '</div>',
   '<div class="md994-response"><span>'+(answer?'Your response: '+escape(answer):'Select a response')+'</span>',
   '<button type="button" data-md994-reveal '+(!answer?'disabled':'')+'>'+(isRevealed?'Hide supplied key':'Reveal supplied key')+'</button></div>',
   isRevealed?'<div class="md994-key"><strong>Original PDF supplied key: '+escape(q.suppliedAnswer)+'</strong><span>Unverified source answer — not scored.</span>'+(q.sourceIssue?'<p>Source QA flag: '+escape(q.sourceIssue)+'</p>':'')+'</div>':'',
   '</article>',
   '<div class="md994-nav"><button type="button" data-md994-prev '+(index===0?'disabled':'')+'>← Previous</button>',
   '<span>'+answers.size+' / '+session.length+' answered</span>',
   '<button type="button" data-md994-next '+(index===session.length-1?'disabled':'')+'>Next →</button></div>',
   '<p class="md994-note">This mock is a faithful study reference, not a validated exam. Do not use supplied keys to measure clinical accuracy until independently audited.</p>'
  ].join('');
 }
 player.addEventListener('click',event=>{
  const b=event.target.closest('button');
  if(!b)return;
  const size=Number(b.dataset.md994Start);
  if([10,20,50,120].includes(size)){
   session=size===120?source.slice():shuffleCopy(source).slice(0,size).sort((a,b)=>a.number-b.number);
   index=0;answers=new Map();revealed=new Set();draw();return;
  }
  if(!session.length)return;
  const q=session[index];
  if('md994Choice' in b.dataset){
   if(!'ABCD'.includes(b.dataset.md994Choice))return;
   answers.set(q.number,b.dataset.md994Choice);
   revealed.delete(q.number);draw();
  }else if('md994Reveal' in b.dataset){
   if(!answers.has(q.number))return;
   if(revealed.has(q.number))revealed.delete(q.number);
   else revealed.add(q.number);
   draw();
  }else if('md994Prev' in b.dataset&&index>0){index--;draw();}
  else if('md994Next' in b.dataset&&index<session.length-1){index++;draw();}
 });
 const css=document.createElement('style');
 css.id='md994-mock-style';
 css.textContent=[
  '#md993-archive #md993-archive-content{display:none!important}',
  '#md993-archive #md994-mock-player{margin-top:14px}',
  '#md993-archive .md994-toolbar{display:flex;flex-wrap:wrap;gap:9px;margin:16px 0}',
  '#md993-archive .md994-toolbar button{width:auto!important;min-height:42px!important;padding:10px 14px!important;border-radius:10px!important;font-size:.95rem!important}',
  '#md993-archive .md994-question{max-width:900px;border:1px solid #456681;background:#101e30;border-radius:14px;padding:clamp(14px,3vw,24px);margin:12px 0}',
  '#md993-archive .md994-question h3{font-size:clamp(1.07rem,2vw,1.25rem);line-height:1.5;margin:0 0 17px;font-weight:700}',
  '#md993-archive .md994-options{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:9px!important}',
  '#md993-archive button.md994-answer{display:flex!important;align-items:center!important;justify-content:flex-start!important;flex-direction:row!important;gap:15px!important;white-space:normal!important;line-height:1.45!important;text-align:left!important;box-sizing:border-box!important;height:auto!important;min-height:60px!important;width:100%!important;margin:0!important;padding:13px 15px!important;background:#172c43!important;color:#e8f3ff!important;border:1px solid #47657f!important;border-radius:11px!important;float:none!important;position:static!important}',
  '#md993-archive button.md994-answer:hover{background:#214362!important;border-color:#83c7ee!important}',
  '#md993-archive button.md994-answer.selected{background:#1b4f6e!important;border:2px solid #7dd3fc!important;padding:12px 14px!important}',
  '#md993-archive .md994-letter{width:30px;min-width:30px;text-align:center;font-size:1.15rem;font-weight:800;color:#b8eaff}',
  '#md993-archive .md994-optiontext{min-width:0;flex:1}',
  '#md993-archive .md994-progress,#md993-archive .md994-nav{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;color:#c0dced}',
  '#md993-archive .md994-progress{font-weight:750;padding:7px 2px}',
  '#md993-archive .md994-progress span{font-weight:500;font-size:.88rem}',
  '#md993-archive .md994-response{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:19px}',
  '#md993-archive .md994-response button,#md993-archive .md994-nav button{width:auto!important;min-height:40px!important;padding:9px 14px!important}',
  '#md993-archive .md994-key{padding:14px;margin-top:14px;background:#322b1e;border:1px solid #b18d4e;border-radius:10px;color:#fff0d1}',
  '#md993-archive .md994-key span{display:block;font-size:.85rem;margin-top:5px}',
  '#md993-archive .md994-key p{margin-bottom:0}',
  '#md993-archive .md994-nav{max-width:900px;margin-top:12px}',
  '#md993-archive .md994-note{color:#c2d1df;font-size:.86rem;line-height:1.5}',
  '#md993-archive button[disabled]{opacity:.46!important;cursor:not-allowed!important}'
 ].join('\n');
 document.head.append(css);
 window.MD_PATCH_994={version:'9.9.4',ready:true,originalMock:120,changedSourceItems:0,changedScoredItems:0,quizHistoryChanged:false,readerModes:[10,20,50,120]};
 const badge=document.querySelector('#appVersion,.app-version,[data-app-version]');
 if(badge)badge.textContent=badge.textContent.replace(/9\.9\.[0-3]/g,'9.9.4');
 for(const s of document.querySelectorAll('span'))if(/^v9\.9\.[0-3]$/.test(s.textContent.trim()))s.textContent='v9.9.4';
 document.title=document.title.replace(/v9\.9\.[0-3]/,'v9.9.4');
})();