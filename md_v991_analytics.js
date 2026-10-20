/* Med Daddy v9.9.1 — optional anonymous page and unit analytics. */
(()=>{'use strict';
if(window.MD_ANALYTICS_991)return;
const conf=window.MD_ANALYTICS_CONFIG||{},id=String(conf.websiteId||'').trim();
const configured=/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id);
const host='meddaddy.github.io',key='md_privacy_analytics_opt_out_v1';
const onsite=location.protocol==='https:'&&location.hostname===host&&location.pathname.startsWith('/meddaddystudyapp/');
const privacySignal=navigator.globalPrivacyControl===true||navigator.doNotTrack==='1'||window.doNotTrack==='1';
const optedOut=()=>{try{return localStorage.getItem(key)==='1';}catch(e){return true;}};
const allowed=()=>configured&&onsite&&!privacySignal&&!optedOut();
const units=Object.freeze({'md990-abdo-page':'PCT II Abdominal','pct2EndocrinePage':'PCT II Endocrine','pct2EnvironmentalPage':'PCT II Environmental','pct2NeuroPage':'PCT II Neuro','pct2InfectiousPage':'PCT II Infectious','ecgAcademyPage':'PCT II ECG','ap2UrinaryPage':'A&P II Urinary','ap2NervousPage':'A&P II Nervous','ap2DigestionPage':'A&P II Digestion','pcpDirectiveStudyPage':'PCP Directives','pcpMasteryPage':'PCP Mastery','studyGuidesPage':'Study Guides','fieldPage':'Field Playbook'});
let status='not_configured',loaded=false,pending=[],last=null;
window.mdUmamiPrivacyGuard=(type,data)=>{
 if(!allowed())return false;
 if(type==='event'&&data?.name!=='unit_open')return false;
 return data;
};
function send(label){
 if(!allowed()||!Object.values(units).includes(label))return;
 if(!loaded||typeof window.umami?.track!=='function'){if(pending.length<8)pending.push(label);return;}
 try{window.umami.track('unit_open',{unit:label});}catch(e){}
}
function load(){
 if(!allowed()||document.getElementById('md-umami-analytics'))return;
 const s=document.createElement('script');s.id='md-umami-analytics';s.defer=true;
 s.src='https://cloud.umami.is/script.js';s.setAttribute('data-website-id',id);
 s.setAttribute('data-domains',host);s.setAttribute('data-do-not-track','true');
 s.setAttribute('data-exclude-hash','true');s.setAttribute('data-exclude-search','true');
 s.setAttribute('data-before-send','mdUmamiPrivacyGuard');
 s.addEventListener('load',()=>{loaded=true;status='loaded';const events=pending;pending=[];if(allowed())events.forEach(send);});
 s.addEventListener('error',()=>{status='unavailable';pending=[];});
 document.head.appendChild(s);status='loading';
}
try{
 if(typeof window.show==='function'){
  const old=window.show;
  const tracked=function(...args){
   const result=old.apply(this,args),name=args[0];
   if(typeof name==='string'&&units[name]&&document.getElementById(name)&&name!==last)send(units[name]);
   last=name;return result;
  };
  window.show=tracked;
 }
 const home=document.getElementById('setup')||document.getElementById('studyHub');
 if(home&&!document.getElementById('md991-privacy-controls')){
  const d=document.createElement('details');d.id='md991-privacy-controls';
  d.style.cssText='max-width:760px;margin:20px auto 10px;padding:10px 14px;border:1px solid #43546a;border-radius:10px;color:#cbd5e1;font:13px/1.5 system-ui,sans-serif';
  const summary=document.createElement('summary');summary.textContent='Privacy · Anonymous usage analytics';summary.style.cursor='pointer';d.appendChild(summary);
  const text=document.createElement('p');
  text.textContent='When enabled, Umami Cloud counts site visits and which study units are opened. The app does not send names, question text, answers, marks, scores or study history. Umami processes anonymous usage metrics, including browser and device information. Tracking honours browser privacy preferences. No analytics are collected until the owner activates a website ID.';
  d.appendChild(text);
  const l=document.createElement('label');l.style.cssText='display:flex;gap:9px;align-items:center;cursor:pointer';
  const cb=document.createElement('input');cb.type='checkbox';cb.checked=optedOut();cb.style.cssText='width:18px;height:18px';
  l.append(cb,document.createTextNode('Do not count my visits or unit openings'));d.appendChild(l);
  const hint=document.createElement('p');hint.style.cssText='font-size:12px;opacity:.85;margin:7px 0 0';
  hint.textContent=!configured?'Analytics are not yet activated.':privacySignal?'Your browser privacy signal already blocks tracking.':'You can change this preference at any time.';
  d.appendChild(hint);
  cb.addEventListener('change',()=>{try{localStorage.setItem(key,cb.checked?'1':'0');}catch(e){cb.checked=true;}if(cb.checked)pending=[];else load();});
  home.appendChild(d);
 }
 if(allowed())load();
 window.MD_ANALYTICS_991=Object.freeze({version:'9.9.1',configured,onsite,get status(){return !configured?'awaiting_website_id':!onsite?'offsite':privacySignal?'privacy_signal_opt_out':optedOut()?'visitor_opt_out':status;}});
}catch(e){window.MD_ANALYTICS_991={version:'9.9.1',configured:false,status:'unavailable'};}
})();
