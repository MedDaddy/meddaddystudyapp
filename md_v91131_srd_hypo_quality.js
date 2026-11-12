/* Med Daddy v9.11.31 — clinically direct hypoglycemia question; stable original SRD ID 087. */
(()=>{'use strict';
const patches=window.MD_SRD_MED_OVERRIDES_91129;
if(!patches||!window.MD_SRD_CONTINUITY_91125){console.error('SRD hypoglycemia clarity patch prerequisites missing');return;}
patches['087']={
 prompt:'A three-year-old weighing 22 kg has confirmed hypoglycemia (BGL 2.3 mmol/L) and altered awareness. The child cannot safely swallow. No glucagon contraindications are reported. Both IM glucagon and the single-device intranasal powder are available, and the PCP is authorized to administer them. Which glucagon dose and route follow the PCP Hypoglycemia directive?',
 right:'Glucagon 0.5 mg IM',
 wrong:[
  'Glucagon 3 mg intranasal powder',
  'Glucagon 1 mg IM',
  'Glucagon 0.5 mg intranasal powder'
 ],
 why:'ALS PCS v5.4 PCP Hypoglycemia Medical Directive, p.58: IM glucagon is 0.5 mg when weight is below 25 kg. Intranasal powder is 3 mg but is restricted to age 4 years or older. This child is 3 years old.'
};
window.MD_SRD_HYPO_CLARITY_91131={ready:true,patchedIds:['PCT2-SRD-91123-087']};
})();
