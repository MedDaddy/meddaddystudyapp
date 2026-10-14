/* Med Daddy v9.8.3 — one Endocrine study menu; source collections untouched.
   Menu-only release. Original answer keys, directives, progress and question text unchanged. */
(()=>{'use strict';
const page=document.getElementById('pct2EndocrinePage');
if(!page || page.querySelector('#md983-endo-hub'))return;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const make=(tag,cls,html)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(html!=null)el.innerHTML=html;return el};
const names={
 focused:'Focused Endocrine bank',review:'Instructor review sheet',slides:'Lecture slide questions',high:'High-Yield clinical 50',terms:'Key-term practice',mixed:'Review + slides + terms',mock:'Preserved Discord mock'
};
const pools={focused:()=>pct2EndocrinePool()};
const expected={focused:90,review:110,slides:18,terms:51,mixed:179,high:50,mock:199};
const hub=make('section','md983-hub',`
 <header class="md983-head"><div><span class="md983-eyebrow">PCT II · UNIT 4 · ENDOCRINE</span><h2>Choose your study session</h2><p>One menu for exams, daily practice, course-review sets, and the original mock. No hunting between panels.</p></div><button type="button" class="md983-guide" data-act="guide">Open learning guides ↗</button></header>
 <div class="md983-main">
  <button type="button" class="md983-primary" data-act="exam50"><span class="md983-overline">RECOMMENDED</span><strong>Practice Exam · 50 questions</strong><span>A full-length mixed practice session from the focused Endocrine bank</span></button>
  <button type="button" class="md983-tile" data-act="daily"><strong>Daily Review · 20</strong><span>Previously missed, then unseen questions</span></button>
  <button type="button" class="md983-tile" data-act="full"><strong>Full Focused Bank · 90</strong><span>Everything in your streamlined Endocrine set</span></button>
  <button type="button" class="md983-tile" data-act="quick"><strong>Quick Review · 10</strong><span>A short knowledge check</span></button>
 </div>
 <div class="md983-browser"><div class="md983-browserhead"><h3>Choose a specific source</h3><p>All the original source-linked collections are here. Select a source, choose a length, and start.</p></div>
  <div class="md983-controls"><label>Question source<select id="md983-source"><option value="focused">Focused Endocrine bank · 90</option><option value="high">High-Yield clinical set · 50</option><option value="review">Instructor review sheet · 110</option><option value="slides">Lecture slide prompts · 18</option><option value="terms">Key-term practice · 51</option><option value="mixed">Review + slides + terms · 179</option><option value="mock">Preserved Discord mock · 199 scorable</option></select></label>
  <label>Questions per session<select id="md983-size"><option value="10">10 · quick bite</option><option value="20">20 · study</option><option value="30">30 · practice</option><option value="50" selected>50 · standard exam</option><option value="all">All available</option></select></label>
  <button type="button" class="md983-start" data-act="source">Start selected set →</button></div>
  <p id="md983-source-info" role="status" aria-live="polite">Focused Endocrine: 90 questions available. Standard practice uses 50.</p>
  <aside id="md983-discord-note" hidden><strong>Preserved from Discord — original mock questions made more accessible in Med Daddy.</strong> The original wording and supplied answer key are preserved in a playable format. These source keys have not all been independently verified; the one question containing the author's working-out is excluded by default (199 scorable of 200).</aside>
 </div>
 <details class="md983-topic"><summary>Micro-practice by topic <span>5-question concepts, 3-question slide prompts, and original mock parts</span></summary><div id="md983-legacy-slot"></div></details>
 <details class="md983-sources"><summary>Sources, verification limits &amp; study notes</summary><p>Lecture: Chapter 32, 105 slides. Instructor review: 22 objectives. The source-linked collections were authored from lecture/review material, not all independently clinically certified. The textbook chapter is an assigned reading reference, not a separate textbook-verified question deck. Check clinical directives against Ontario ALS PCS 5.4 and local authorization. The preserved Discord mock has a supplied answer key and is not rewritten as new instructor cases.</p></details>
`);
hub.id='md983-endo-hub';
const topbar=$('.topbar',page);if(topbar)topbar.after(hub);else page.prepend(hub);
// Preserve all old controls in the Micro section for advanced users instead of deleting them.
const legacy=$('#md973EndoStudy',page),slot=$('#md983-legacy-slot',hub);
const oldFocus=$(':scope > .md930-fold',page);if(oldFocus&&slot)slot.append(oldFocus);
if(legacy&&slot){legacy.hidden=false;legacy.removeAttribute('hidden');slot.prepend(legacy);
  const header=$('.md973-header',legacy);if(header)header.hidden=true;
  const counts=$('.md982-source-count',legacy);if(counts)counts.hidden=true;
  const textbook=$('.md981-textbook',legacy);if(textbook)textbook.hidden=true;
  const dup=$('.md978-distractor-summary',legacy);if(dup)dup.hidden=true;
  const card=$$('.md973-card',legacy).find(el=>/Original uploaded mock/i.test(el.textContent));
  if(card){const p=$('p',card);if(p)p.textContent='Preserved from Discord — original mock questions made easier to access in Med Daddy. The supplied questions and answer key are retained; source key clinical verification is not complete. Item 199 is excluded by default.';}
}
function questionPool(mode){const p=pools[mode]?.()||[];if(p.length!==expected[mode])throw Error(names[mode]+' currently has '+p.length+' questions; expected '+expected[mode]+'. Session stopped to prevent a misleading count.');return p;}
function launchRegular(mode,length){
 const pool=questionPool(mode),n=length==='all'?pool.length:Math.min(Number(length),pool.length);
 if(!n)return alert('Please select a valid session size.');
 const a=$('#adaptiveNext'),r=$('#recycle');if(a)a.checked=false;if(r)r.checked=false;
 start(shuffle([...pool]).slice(0,n));
 if(typeof quiz!=='undefined'&&quiz.length!==n)alert('Only '+quiz.length+' questions loaded; expected '+n+'. Report this count.');
}
function limitLaunchedSource(mode,launcher,length){
 if(typeof launcher!=='function')throw Error(names[mode]+' launcher unavailable.');
 const ok=launcher();if(ok===false)throw Error(names[mode]+' could not load.');
 if(typeof quiz==='undefined'||quiz.length!==expected[mode])throw Error(names[mode]+' loaded '+(typeof quiz==='undefined'?0:quiz.length)+' questions, expected '+expected[mode]+'.');
 const n=length==='all'?expected[mode]:Math.min(Number(length),expected[mode]);
 if(n<1)throw Error('Invalid question limit.');
 if(n<quiz.length){
   // Original source launch validates and registers its questions before selection.
   const reduced=shuffle([...quiz]).slice(0,n);
   quiz=reduced;index=0;selected=null;answered={};results=[];score=0;
   const a=$('#adaptiveNext'),r=$('#recycle');if(a)a.checked=false;if(r)r.checked=false;
   if(window.MD_ENDOCRINE_LAUNCH_STATUS){window.MD_ENDOCRINE_LAUNCH_STATUS.count=n;window.MD_ENDOCRINE_LAUNCH_STATUS.label=names[mode]+' ('+n+' questions)';}
   show('quiz');render();
 }
 if(quiz.length!==n)throw Error('Session loaded '+quiz.length+'; expected '+n+'.');
}
function launchMock(length){
 const part=$('#md973MockPart'),size=$('#md973MockSize'),raw=$('#md973MockShowAll'),shuf=$('#md973MockShuffle');
 if(part)part.value='all';if(raw)raw.checked=false;if(shuf)shuf.checked=true;
 const n=length==='all'?199:Math.min(Number(length),199);
 if(size){if(![...size.options].some(o=>o.value===String(n)))size.add(new Option(n+' questions',String(n)));size.value=length==='all'?'0':String(n)}
 if(typeof window.launchEndo973Mock!=='function')throw Error('Preserved mock launcher unavailable.');
 const ok=window.launchEndo973Mock();if(ok===false||typeof quiz==='undefined'||quiz.length!==n)throw Error('Preserved mock loaded '+(typeof quiz==='undefined'?0:quiz.length)+' of '+n+' questions.');
}
function launchSource(mode,length){
 if(mode==='focused')return launchRegular(mode,length);
 if(mode==='mock')return launchMock(length);
 const fn={high:window.launchEndo973HighYield,review:window.launchEndo973Review,slides:window.launchEndo973Slide,terms:window.launchEndo973KeyTerms,mixed:window.launchEndo973Combined}[mode];
 if(!fn)throw Error('Unrecognized source option.');
 limitLaunchedSource(mode,fn,length);
}
const src=$('#md983-source',hub),size=$('#md983-size',hub),info=$('#md983-source-info',hub),discord=$('#md983-discord-note',hub);
function update(){const mode=src.value,cap=expected[mode],n=size.value==='all'?cap:Math.min(Number(size.value),cap);if(discord)discord.hidden=mode!=='mock';if(info)info.textContent=(mode==='mock'?'Preserved Discord mock':names[mode])+': '+cap+' available. Your session will contain '+n+' questions'+(size.value!=='all'&&Number(size.value)>cap?' (all available in this source)':'')+'.';}
src.addEventListener('change',update);size.addEventListener('change',update);update();
hub.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const act=b.dataset.act;try{
 if(act==='guide')showGuideById('pct2-endo-01');
 if(act==='exam50')launchRegular('focused','50');
 if(act==='daily'){if(typeof window.launchEndocrineDaily20==='function')window.launchEndocrineDaily20();else alert('Daily 20 is unavailable.');}
 if(act==='full')launchRegular('focused','all');
 if(act==='quick')launchRegular('focused','10');
 if(act==='source')launchSource(src.value,size.value);
 }catch(ex){console.error(ex);alert('The selected source set could not be started: '+ex.message)}
});
// Make the new study hub the single entry point; preserve hidden original panels/data for backwards compatibility.
const css=make('style','',`
 #pct2EndocrinePage>.endo-hero,#pct2EndocrinePage>.endo-metrics,#pct2EndocrinePage>.endo-note,#pct2EndocrinePage>.md-daily-r1,#pct2EndocrinePage>.md979-compact,#pct2EndocrinePage>.md979-footnote,#pct2EndocrinePage>.pct2-neuro-note{display:none!important}
 #pct2EndocrinePage>.md983-hub{background:#0c1929;border:1px solid #335972;border-radius:22px;padding:clamp(15px,2.5vw,28px);margin:18px 0 24px;color:#eaf3ff}
 .md983-hub .md983-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px}.md983-hub h2{font-size:clamp(1.6rem,3vw,2.25rem);margin:4px 0 6px}.md983-hub h3{margin:0 0 5px;font-size:1.1rem}.md983-hub p{margin:0;line-height:1.55;color:#b7c9dc}.md983-eyebrow,.md983-overline{font-size:.75rem!important;letter-spacing:.09em;font-weight:800;color:#7dd3fc!important}
 .md983-hub button{font-family:inherit;text-align:left;cursor:pointer}.md983-hub .md983-guide{background:#173650;border:1px solid #4e7995;color:#dcefff;font-size:.88rem;white-space:normal}
 .md983-main{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:22px}.md983-main button{display:flex;flex-direction:column;justify-content:center;gap:7px;width:100%;min-height:105px;margin:0;padding:17px;border-radius:13px;white-space:normal;background:#17293e;border:1px solid #476481;color:#f1f7ff}.md983-main button strong{font-size:1.08rem}.md983-main button span:not(.md983-overline){color:#bfd3e4;font-size:.85rem;line-height:1.3}.md983-main button.md983-primary{grid-column:1/-1;min-height:114px;border:2px solid #7dd3fc;background:linear-gradient(110deg,#0d608a,#16416b)}.md983-main button.md983-primary strong{font-size:1.48rem}.md983-main button:hover,.md983-start:hover{filter:brightness(1.12)}
 .md983-browser{background:#102237;border:1px solid #386987;border-radius:15px;padding:17px}.md983-browserhead{margin-bottom:14px}.md983-controls{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr) auto;gap:12px;align-items:end}.md983-controls label{display:flex;flex-direction:column;gap:7px;font-size:.85rem;color:#cfe4f4;font-weight:700}.md983-controls select{min-width:0;width:100%;padding:12px;border-radius:10px;background:#071828;border:1px solid #5686a5;color:#f3fbff;font:inherit}.md983-hub .md983-start{margin:0;min-height:46px;background:#38bdf8;border-radius:10px;color:#001a2a;font-weight:800;white-space:nowrap}.md983-hub #md983-source-info{margin-top:11px;font-size:.9rem;color:#bee5fa}.md983-hub #md983-discord-note{padding:12px 14px;margin-top:12px;background:#2c261c;border:1px solid #ab8651;border-radius:10px;color:#ffe9c7;line-height:1.5;font-size:.88rem}.md983-hub #md983-discord-note[hidden]{display:none}
 .md983-hub details.md983-topic,.md983-hub details.md983-sources{margin-top:12px;border:1px solid #36536e;background:#15263a;border-radius:12px;padding:12px 16px}.md983-hub summary{cursor:pointer;font-weight:800;color:#e3f2ff}.md983-hub summary span{display:block;font-size:.82rem;color:#bed2e3;font-weight:400;margin-top:3px}.md983-sources p{padding-top:12px}.md983-topic #md973EndoStudy{margin:14px 0 0;padding:0;border:0;background:transparent}.md983-topic #md973EndoStudy .md973-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.md983-topic #md973EndoStudy .md973-header[hidden],.md983-topic .md982-source-count[hidden],.md983-topic .md981-textbook[hidden],.md983-topic .md978-distractor-summary[hidden]{display:none!important}.md983-topic:not([open]) #md973EndoStudy{display:none!important}
 @media(max-width:800px){.md983-controls{grid-template-columns:1fr 1fr}.md983-start{grid-column:1/-1;text-align:center!important}.md983-main{grid-template-columns:1fr 1fr}.md983-main button.md983-primary{grid-column:1/-1}}
 @media(max-width:540px){.md983-head{flex-direction:column!important}.md983-main,.md983-controls{grid-template-columns:1fr}.md983-start{grid-column:auto}.md983-topic #md973EndoStudy .md973-grid{grid-template-columns:1fr}.md983-main button{min-height:85px}}
`);css.id='md983-style';document.head.append(css);
window.MD_PATCH_983={version:'9.8.3',singleMenu:true,defaultPractice:50,sourceSets:expected,discordMockPreserved:true,medicalDataChanged:false};
const version=$('#appVersion,.app-version,[data-app-version]');if(version)version.textContent=version.textContent.replace(/9\.8\.2|9\.8\.0/g,'9.8.3');
document.title=document.title.replace(/9\.8\.2|9\.8\.0/,'9.8.3');
})();