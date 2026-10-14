/* Med Daddy v9.8.2 — separate course launchers, restore source study lanes, improve directive navigation.
   Presentation/navigation only: do not alter any original medical directive values, keys or stored progress. */
(function(){'use strict';
  const Q=(sel,root=document)=>root.querySelector(sel);
  const els=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
  // The original daily-launch delegate is preserved; only subject-specific buttons remain.
  for(const pane of els('.md-daily-r1')){
    const endocrine=!!pane.closest('#pct2EndocrinePage');
    const urinary=!!pane.closest('#ap2UrinaryPage');
    if(!endocrine&&!urinary)continue;
    const h=Q('h3',pane),p=Q('p',pane);
    if(endocrine){
      if(h)h.textContent='Daily Endocrine study';
      if(p)p.textContent='20 daily questions prioritizing previous misses, then unseen items in the focused 90. Source-based reviews are available below.';
      els('[data-daily="urinary"],[data-daily="urinary50"]',pane).forEach(x=>x.remove());
      pane.setAttribute('aria-label','Daily Endocrine study');
    } else {
      if(h)h.textContent='Daily Urinary, Fluids & Acid–Base study';
      if(p)p.textContent='Urinary practice is a separate Anatomy & Physiology II unit. Daily 20 prioritizes previous misses, then unseen renal, fluid and acid–base questions.';
      els('[data-daily="endo"],[data-daily="endoFull"]',pane).forEach(x=>x.remove());
      pane.setAttribute('aria-label','Daily Urinary study');
    }
  }
  // Restore the EXISTING lecture, instructor-review, terminology and mock launchers.
  // Keep focused 90 as the active everyday bank; source sets remain isolated and are
  // explicitly labelled by provenance. No claim that textbook answer keys are certified.
  const ep=Q('#pct2EndocrinePage');
  const old=Q('#md973EndoStudy');
  if(ep&&old){
    old.hidden=false;old.removeAttribute('hidden');
    old.setAttribute('aria-label','Endocrine source-linked practice collections');
    const header=Q('.md973-header h2',old);if(header)header.textContent='Source-based Endocrine practice';
    const note=Q('.md973-header p',old);if(note)note.textContent='Independent lecture-slide, instructor-review, terminology and original-mock sets. These are additional to the focused 90—not counted as new or independently medically certified questions.';
    const grid=Q('.md973-grid',old);
    if(grid){
      const read=document.createElement('article');read.className='md981-textbook';
      read.innerHTML='<h3>Textbook & course-reading bridge</h3><p>Chapter 32 — <em>Nancy Caroline, Emergency Care in the Streets</em> (Canadian 8th ed.) is listed in the course materials. Slide/review question mapping does not establish textbook-specific verification. Use the course Learning Guide and assigned chapter together; dedicated textbook-verified question keys are still pending.</p><button type="button" data-md981="guide">Open Endocrine Learning Guide</button>';
      read.addEventListener('click',e=>{if(e.target.closest('[data-md981="guide"]'))showGuideById('pct2-endo-01')});
      grid.insertBefore(read,grid.firstChild);
    }
    // Legacy quiz start actions remain unchanged so review-objective mappings survive.
    const compact=Q('.md979-compact',ep);
    if(compact){
      const description=Q('p',compact);if(description)description.textContent='Daily practice uses 90 selected questions. For the full lecture/review sets, use Source-based Endocrine practice below.';
      const go=document.createElement('button');go.type='button';go.className='md981-jump';go.textContent='Explore slides, review, terminology & mock ↓';
      go.addEventListener('click',()=>old.scrollIntoView({behavior:'smooth',block:'start'}));
      const actions=Q('.md979-actions',compact);if(actions)actions.after(go);
    }
    // One legacy unit header advertised only the trimmed bank.
    const metrics=Q('.endo-metrics',ep);
    if(metrics)metrics.setAttribute('aria-label','90-question focused bank; additional source practice available below');
  }
  // The medication card remains an excerpt. Link it to its EXACT parent directive,
  // and expose the original directive treatment text without recasting mixed tables.
  const previous=window.renderMedicationModal;
  if(typeof previous==='function')window.renderMedicationModal=function(){
    const out=previous.apply(this,arguments);
    const root=Q('#directiveModalBody');
    const d=typeof FIELD_DIRECTIVES!=='undefined'?FIELD_DIRECTIVES.find(x=>x.id===currentDirectiveId):null;
    if(!root||!d||!currentMedicationName||Q('.md981-med-directive-links',root))return out;
    const stage=Q('.med-directive-stage',root);if(!stage)return out;
    const band=document.createElement('section');band.className='md981-med-directive-links';
    const head=document.createElement('strong');head.textContent='Complete directive context';band.append(head);
    const explain=document.createElement('p');explain.textContent='This medication quick view is an excerpt. Check the full directive for all indications, age/weight limits, routes, concentrations, dosing intervals, maximum doses, exceptions, contraindications and authorization. The source transcription may lose table columns.';band.append(explain);
    const row=document.createElement('div');row.className='md981-directive-actions';
    const original=document.createElement('button');original.type='button';original.textContent='Open '+d.name+' directive in Med Daddy';
    original.addEventListener('click',()=>window.openDirective(d.id));row.append(original);
    const a=document.createElement('a');a.href='https://www.ontario.ca/files/2025-04/moh-advanced-life-support-als-patient-care-standards-pcs-5.4-en-2025-04-23.pdf';a.target='_blank';a.rel='noopener noreferrer';a.textContent='Official Ontario ALS PCS 5.4 ↗';row.append(a);band.append(row);
    const ref=document.createElement('small');ref.textContent='Reference: '+d.name+' — printed ALS PCS page'+(d.pageEnd&&d.pageEnd!==d.page?'s ':' ')+(d.page||'?')+(d.pageEnd&&d.pageEnd!==d.page?'–'+d.pageEnd:'')+'. Confirm with current regional companion and base-hospital authorization.';band.append(ref);
    const scan=Q('.med-scan-label',root);if(scan)scan.before(band);else stage.append(band);
    return out;
  };
  // Do not change medication source text or give a false clinical signoff.
  const css=document.createElement('style');css.id='md981-css';css.textContent=`
    #md973EndoStudy[hidden]{display:none}#pct2EndocrinePage .md-daily-r1,#ap2UrinaryPage .md-daily-r1{max-width:100%}
    #pct2EndocrinePage #md973EndoStudy{display:block;margin-top:22px;border:1px solid #4b7b93}
    #md973EndoStudy .md981-textbook{padding:16px;border:1px solid #516783;border-radius:14px;background:#152b3f;min-width:0}
    #md973EndoStudy .md981-textbook h3{margin:0 0 8px;font-size:1.05rem;color:#ebf5ff}
    #md973EndoStudy .md981-textbook p{color:#c4d3e6;line-height:1.55;margin:0 0 12px}
    #md973EndoStudy .md981-textbook button,.md981-jump{border:1px solid #65a8c5;background:#164663;color:#edfaff;padding:10px 15px;border-radius:10px;cursor:pointer;font:inherit}
    #pct2EndocrinePage .md979-compact .md981-jump{margin-top:3px}
    #directiveModalBody .md981-med-directive-links{border:1px solid #b58f53;border-left:4px solid #f0b955;background:#272419;border-radius:12px;margin:14px 0;padding:13px;color:#ffe7b7;line-height:1.45}
    #directiveModalBody .md981-med-directive-links strong{display:block;margin:0 0 6px}
    #directiveModalBody .md981-med-directive-links p{font-size:.84rem;margin:0 0 10px}
    #directiveModalBody .md981-directive-actions{display:flex;flex-wrap:wrap;align-items:center;gap:9px;margin:0 0 7px}
    #directiveModalBody .md981-directive-actions button,#directiveModalBody .md981-directive-actions a{padding:9px 12px;border-radius:8px;background:#155478;color:#fff;border:1px solid #79b7d8;font-size:.83rem;font-weight:bold;text-decoration:none}
    #directiveModalBody .md981-med-directive-links small{color:#ffdda8}
    @media(max-width:670px){#md973EndoStudy .md973-grid{grid-template-columns:1fr}#md973EndoStudy{padding:12px}}
  `;document.head.append(css);

  // Full-deck buttons must not inherit missed/unseen filtering or a mock part selection.
  if(ep){
    const head=Q('#md973EndoStudy .md973-header',ep);
    if(head){
      const counts=document.createElement('p');counts.className='md982-counts';
      counts.textContent='Source sets: Focused 90 · High-Yield 50 · Instructor review 110 · Lecture questions 18 · Terms 51 · Original mock 199 scorable / 200 raw.';
      head.append(counts);
      const full=document.createElement('button');full.type='button';full.className='md982-full';
      full.textContent='Start complete original mock (199)';
      full.addEventListener('click',()=>{
        const a=Q('#md973MockPart');if(a)a.value='all';
        const b=Q('#md973MockSize');if(b)b.value='0';
        const c=Q('#md973MockShowAll');if(c)c.checked=false;
        window.launchEndo973Mock();
        if(typeof quiz!=='undefined'&&quiz.length!==199)alert('Expected 199, loaded '+quiz.length+' questions. This is NOT the full source mock.');
      });
      head.append(full);
    }
    const fullFocused=()=>{
      const pool=pct2EndocrinePool();
      if(pool.length!==90)return alert('Focused bank incomplete: '+pool.length+' of 90 questions.');
      const a=Q('#adaptiveNext');if(a)a.checked=false;
      const r=Q('#recycle');if(r)r.checked=false;
      start(shuffle([...pool]));
      if(typeof quiz!=='undefined'&&quiz.length!==90)alert('Focused full bank loaded '+quiz.length+' rather than 90 questions.');
    };
    for(const b of els('button',ep)){
      if(/^(Full focused 90|All 90|Endocrine • focused 90)$/.test(b.textContent.trim())){
        const copy=b.cloneNode(true);copy.removeAttribute('onclick');
        copy.addEventListener('click',fullFocused);b.replaceWith(copy);
      }
    }
    css.textContent+='\n#pct2EndocrinePage .md982-counts{background:#102d40;border:1px solid #417a95;padding:12px;border-radius:10px;line-height:1.5}#pct2EndocrinePage .md982-full{display:inline-block;margin:8px 0;padding:10px 14px;border:1px solid #7ac0d9;border-radius:10px;background:#165375;color:#fff;font:inherit;cursor:pointer}';
  }
  window.MD_PATCH_981={version:'9.8.2',separatedDaily:true,sourcePracticeUnhidden:!!old,sourceMockPreserved:true,directiveLinks:true,clinicalDataModified:false};
  const v=Q('#appVersion,.app-version,[data-app-version]');if(v&&/9\.8\.0/.test(v.textContent))v.textContent=v.textContent.replace('9.8.0','9.8.2');
  document.title=document.title.replace('9.8.0','9.8.2');
  try{if(typeof APP_VERSION!=='undefined')window.MD_DISPLAY_VERSION='9.8.2'}catch(_e){}
})();