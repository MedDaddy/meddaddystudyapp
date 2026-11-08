/* v9.11.16: Cleaned A&P II Lymph mock built from TWO preserved source PDFs.
 * Original 500 questions/answer sheets remain in their original files, untouched.
 * Explicit course curation: off-topic PCT medications, repeated, vague, ambiguous
 * and unsupported items EXCLUDED. Correct ANSWER TEXT follows the option after
 * balancing answer positions A-D, not relabeling keys.
 */
(()=>{'use strict';
 const a=window.MD_AP2_LYMPH_MOCK_A_91115||[],b=window.MD_AP2_LYMPH_MOCK_B_91115||[];
 const omit=new Set([16,18,49,66,68,90,93,152,155,160,161,164,186,187,192,194,198,199,202,211,213,224]);
 const tail=new Set([186,187,192,193,198,199,200,202,204,205,208,210,211,212,213,224]);
 const bKeep=new Set([7,13,20,27,28,30,31,32,48,49,65,80,189]);
 // Item-appropriate textbook-grounded explanation, keyed by ORIGINAL question
 // number; course evidence is Patton 11th ed. chapters 31–33.
 const aWhy={
  1:'Lymph drainage returns interstitial fluid to the cardiovascular system.',
  2:'Excess tissue fluid is absorbed by lymphatics and returned to veins.',
  3:'Peripheral lymphatic vessels generally follow venous drainage routes.',
  4:'Plasma and tissue fluid are both extracellular compartments.',
  5:'Lymph is normally lower in protein than plasma.',
  6:'Thoracic-duct lymph contains about twice the protein concentration of many other tissue-fluid samples due to liver and intestinal drainage.',
  7:'More than half of thoracic-duct lymph comes from liver and small intestine.',
  8:'The course cites about 2,800–3,000 mL/day of thoracic-duct lymph.',
  9:'Fat-rich intestinal lymph is called chyle.',
  10:'Lymph losses deplete circulating proteins and impair fluid homeostasis.',
  11:'Initial lymphatics are tiny blind-ended channels in tissue.',
  12:'Initial lymphatic capillaries have a thin endothelial wall.',
  13:'Valves prevent backflow in lymphatic collecting vessels.',
  14:'Large lymphatic vessel walls have three principal layers, like veins.',
  15:'The thoracic duct collects lymph from most of the body and drains into the left venous angle.',
  17:'The right lymphatic duct drains the right upper body quadrant.',
  19:'Lacteals absorb intestinal dietary fat into lymph.',
  20:'Lymphatic collecting vessels have thin walls and numerous valves.',
  21:'Lymph nodes are characteristically oval or bean shaped.',
  22:'The hilum is the indented region where lymph vessels exit a node.',
  23:'Afferent vessels bring lymph toward a node.',
  24:'One or a few efferent channels leave a typical lymph node.',
  25:'Lymph nodes filter lymph and support immune recognition.',
  26:'Mechanical filtration traps particles physically within nodes.',
  27:'Phagocytes digest particles during biological filtration.',
  28:'Axillary nodes lie in the armpit and drain the arm and much of the breast.',
  29:'Cervical lymph node groups are located in the neck.',
  30:'Inguinal nodes are located in the groin.',
  31:'Sentinel nodes are the first draining nodes along a possible tumour-spread route.',
  32:'Breast lymph drainage is a pathway for infection and metastasis.',
  33:'Tonsils are lymphoid aggregates in pharyngeal mucosa.',
  34:'Pharyngeal tonsils, or adenoids, occupy the nasopharynx.',
  35:'Palatine tonsils sit on either side of the throat.',
  36:'Lingual tonsils lie at the tongue base.',
  37:'The thymus lies in the mediastinum and matures T lymphocytes.',
  38:'Thymic tissue is largest and most active in children and younger adolescents.',
  39:'Thymic involution occurs as thymic tissue shrinks and is partly replaced by fat.',
  40:'T lymphocytes undergo maturation and selection in the thymus.',
  41:'Thymic hormones collectively called thymosin support T-cell development.',
  42:'The spleen is the largest single lymphoid organ.',
  43:'The spleen is found in the left upper abdominal quadrant.',
  44:'The spleen has white pulp for immunity and red pulp for blood filtration.',
  45:'Splenic phagocytes remove old or damaged RBCs and platelets.',
  46:'The spleen supports production and activation of immune lymphoid blood cells.',
  47:'Splenic pulp and sinuses can store blood.',
  48:'Splenectomy means surgical removal of the spleen.',
  50:'Lymphangitis is inflammation of lymphatic vessels, sometimes showing red streaks.',
  51:'Microorganisms, including bacteria, protozoa and viruses, are external immune challenges.',
  52:'Abnormal or cancerous host cells are internal immune challenges.',
  53:'An antigen is a molecular structure recognized by immune receptors.',
  54:'Cell-surface self markers identify normal host cells.',
  55:'Self-tolerance protects normal tissues while permitting foreign-target responses.',
  56:'Innate immunity is rapid and nonspecific compared with adaptive immunity.',
  57:'Adaptive immunity is specifically targeted toward recognized antigens.',
  58:'Innate effector cells include phagocytes and natural killer cells.',
  59:'Skin and mucous membranes provide first-line barriers.',
  60:'Gastric hydrochloric acid is an innate chemical barrier.',
  61:'Inflammation and fever are second-line innate responses.',
  62:'Chemotaxis draws leukocytes toward inflammatory signals.',
  63:'The classic signs of inflammation are pain, warmth, redness and swelling.',
  64:'Inflammatory mediators help raise hypothalamic body-temperature set points.',
  65:'Systemic inflammation is a bodywide inflammatory response.',
  67:'Monocytes differentiate into macrophages after entering tissues.',
  69:'Interferons activate antiviral mechanisms in nearby cells.',
  70:'Complement is a cascade of proteins with several defence functions.',
  71:'Opsonization tags target surfaces for phagocyte ingestion.',
  72:'The membrane attack complex forms pores and can cause target-cell lysis.',
  73:'TLRs are pattern-recognition receptors in cell membranes and intracellular membranes.',
  74:'Adaptive B and T lymphocytes form the third line of defence.',
  75:'B cells and plasma cells participate in humoral antibody-mediated defence.',
  76:'T cells mediate cell-based adaptive defence.',
  77:'CD stands for cluster of differentiation, an immune-cell surface marker scheme.',
  78:'CD4 and CD8 T-cell populations are clinically significant in HIV assessment.',
  79:'Bone marrow, thymus, lymph nodes and spleen are sites of lymphocyte development or accumulation.',
  80:'Naïve B cells have not yet been activated by their specific antigen.',
  81:'Activated B cells give rise to antibody-secreting plasma cells.',
  82:'Memory B cells support later responses to the same antigen.',
  83:'The usual antibody structure has two heavy chains and two light chains.',
  84:'Antibodies are immunoglobulin proteins.',
  85:'IgG is the most abundant class of immunoglobulin in serum.',
  86:'IgA protects mucosal secretions and is present in breast milk.',
  87:'IgM is prominent early in primary humoral immunity.',
  88:'IgE is strongly associated with allergic hypersensitivity.',
  89:'Agglutination is antibody-mediated clumping of antigen-bearing particles.',
  91:'A secondary response is faster and generally stronger because of memory cells.',
  92:'Clonal selection preferentially activates lymphocytes whose receptors bind the antigen.',
  94:'Helper T cells coordinate adaptive responses through cytokine signalling.',
  95:'Regulatory T cells suppress inappropriate responses to support self-tolerance.',
  96:'Innate immunity is present without prior antigen-specific exposure.',
  97:'Active immunity is generated by the recipient’s immune response.',
  98:'Passive transferred immunity is typically rapid but temporary.',
  99:'Recovery from natural infection can produce natural active immunity.',
  100:'Vaccination stimulates the recipient’s active response by artificial exposure.',
  101:'Maternal IgG crossing the placenta provides natural passive protection.',
  102:'Injected immune globulin provides artificial passive protection.',
  103:'Cytokines are secreted molecular immune signals.',
  104:'Interferon is a family of antiviral cytokines.',
  151:'Cisterna chyli is an enlarged lymph collection sac near the beginning of the thoracic duct.',
  153:'Interstitial fluid is extracellular fluid between tissue cells.',
  154:'Diapedesis is white-cell migration across blood vessel walls.',
  156:'Fever may inhibit pathogen growth and support immune responses.',
  157:'Helper T lymphocytes commonly express the CD4 marker.',
  158:'T cells can destroy infected cells directly through cell-mediated responses.',
  159:'Humoral refers to body fluids, through which secreted antibodies act.',
  162:'Antibodies can neutralize targets, agglutinate them and activate complement.',
  163:'Cytolysis is rupture or destruction of a cell.',
  165:'Antigen-presenting cells display processed antigens to T lymphocytes.',
  193:'Lymphoid tissue houses lymphocytes and defensive cells.',
  200:'Immunoglobulin variable regions contain antigen-binding sites.',
  204:'The effector phase involves activation of mechanisms that attack the target.',
  205:'Histamine is a mediator that drives local inflammatory changes.',
  208:'Active immunity can last longer than passive because immune memory develops.',
  210:'Homeostasis returns as antigens decrease and many effector lymphocytes contract.',
  212:'Artificial immunity comes from deliberate medical exposure or antibody transfer.'
 };
 const bWhy={
  7:'Lymph derives from interstitial fluid and has approximately matching osmotic concentration.',
  13:'The thoracic duct empties at the left venous angle by the left subclavian vein.',
  20:'Efferent lymphatic vessels carry lymph out of the node.',
  27:'Blocked or removed lymphatics can cause persistent lymph-rich tissue swelling.',
  28:'Filarial parasites can obstruct lymphatics and cause elephantiasis.',
  30:'Lymphoma is a tumour or cancer of lymphoid tissue.',
  31:'Hodgkin lymphoma may initially cause painless enlarged cervical nodes.',
  32:'The tonsils form a protective lymphoid ring around the pharynx.',
  48:'Trabeculae are capsule extensions supporting internal node structure.',
  49:'Suppurative lymphadenitis is infection with pus formation in a node.',
  65:'Phagocytes engulf and digest microorganisms.',
  80:'Prenatal B-cell precursors develop in early fetal hematopoietic sites such as yolk sac and liver.',
  189:'A clone contains lymphocytes descended from the same antigen-specific ancestor.'
 };
 const keepA=a.filter(q=>(q.originalOrdinal<=104||(q.originalOrdinal>=151&&q.originalOrdinal<=165)||tail.has(q.originalOrdinal))&&!omit.has(q.originalOrdinal));
 const keepB=b.filter(q=>bKeep.has(q.originalOrdinal));
 const all=[...keepA.map(q=>({q,source:'A',why:aWhy[q.originalOrdinal]})),...keepB.map(q=>({q,source:'B',why:bWhy[q.originalOrdinal]}))];
 const errors=[];
 if(a.length!==250||b.length!==250||all.length!==127)errors.push('Source or cleaned count mismatch');
 if(all.some(x=>!x.why))errors.push('Missing item-specific source rationale');
 const rngSeed=911162026;
 let rng=rngSeed>>>0;
 function random(){rng=(Math.imul(1664525,rng)+1013904223)>>>0;return rng/4294967296;}
 function permute(items){
  const out=items.slice();
  for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
  return out;
 }
 const balanced=permute(Array.from({length:all.length},(_,i)=>'ABCD'[i%4]));
 const result=[];
 const relativeKey=/\b(?:both\s+[A-D]\s+(?:and|&)\s+[A-D]|all of the above|none of the above)\b/i;
 const normalized=s=>String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
 const seen=new Set();
 for(let i=0;i<all.length;i++){
  const {q,source,why}=all[i];
  if(q.choices.length!==4||q.choices.some(x=>relativeKey.test(x)))errors.push('Unshufflable source options: '+q.id);
  if(!/^[ABCD]$/.test(q.answer))errors.push('Missing source answer: '+q.id);
  const stemKey=normalized(q.prompt);if(seen.has(stemKey))errors.push('Repeated stem: '+q.id);seen.add(stemKey);
  const key=q.choices['ABCD'.indexOf(q.answer)].replace(/\/\s*$/,'').trim();
  const distractors=permute(q.choices.filter((_,i)=>'ABCD'[i]!==q.answer).map(x=>x.trim()));
  const answer=balanced[i],correctIndex='ABCD'.indexOf(answer);
  const choices=new Array(4);choices[correctIndex]=key;let next=0;
  for(let k=0;k<4;k++)if(k!==correctIndex)choices[k]=distractors[next++];
  if(new Set(choices.map(normalized)).size!==4||choices[correctIndex]!==key)errors.push('Choice/answer failed: '+q.id);
  const n=q.originalOrdinal;
  const chapter=(source==='A'&&n<=50||source==='B'&&n<=49||source==='A'&&[151,153,193].includes(n))?31:
   (source==='A'&&n<=73||source==='B'&&n===65||source==='A'&&[154,156,205].includes(n))?32:33;
  result.push({id:'AP2-LYMPH-CLEAN-'+String(i+1).padStart(3,'0'),
   course:'Anatomy & Physiology II',unit:'Lymphatic & Immune Systems',
   bankType:'reviewed-deduplicated-source-mock',topic:q.topic,chapter,originalSet:q.sourceTitle,
   originalOrdinal:q.originalOrdinal,originalPartQuestion:q.originalPartQuestion,
   prompt:q.prompt.trim(),choices,answer,whyCorrect:why,explanation:why,
   sourceTitle:q.sourceTitle+'; Patton A&P 11e Ch '+chapter,
   sourceLocator:q.sourceLocator+'; Patton Ch '+chapter,
   sourceKey:q.answer,sourceAnswerText:key,
   auditStatus:'source-key-screened-core-A&P',
   provenance:'Original source mock archived; this is a reviewed, deduplicated, answer-position-balanced PRACTICE copy.'});
 }
 const counts=Object.fromEntries('ABCD'.split('').map(k=>[k,result.filter(q=>q.answer===k).length]));
 if(Math.max(...Object.values(counts))-Math.min(...Object.values(counts))>1)errors.push('Incorrect answer-letter balance');
 window.MD_AP2_LYMPH_CLEAN_91116=errors.length?[]:result;
 window.MD_AP2_LYMPH_CLEAN_AUDIT_91116={ready:errors.length===0,errors,counts,sourceA:keepA.length,sourceB:keepB.length,originalRecords:a.length+b.length,cleanUnique:result.length,
  originalSourceKeyDistribution:{A:Object.fromEntries('ABCD'.split('').map(k=>[k,a.filter(q=>q.answer===k).length])),B:Object.fromEntries('ABCD'.split('').map(k=>[k,b.filter(q=>q.answer===k).length]))},
  knownDisputedExclusions:['Mock A #16 (cisterna chyli vs thoracic duct)','Mock B #85 (both B and C semantically overlap)'],
  originalSourceDecksPreserved:true};
})();