/* Med Daddy automatic update checker v1.
   Detects new deployed index version; no service worker or stored quiz changes.
   Applies updates when returning to site or when not actively taking a quiz.
*/
(()=>{'use strict';
if(window.MD_AUTO_UPDATE?.running)return;
const script=document.currentScript;
const stamped=(()=>{try{return new URL(script.src).searchParams.get('md_build')||'';}catch{return '';}})();
const titleVersion=(document.title.match(/\bMed Daddy v(\d+\.\d+\.\d+)\b/i)||[])[1]||'';
const current=/^\d+\.\d+\.\d+$/.test(stamped)?stamped:titleVersion;
if(!current)return;
const status=window.MD_AUTO_UPDATE={
 running:true,version:current,pendingVersion:null,checks:0,lastCheck:null,
 refreshes:0,offline:false
};
const CHECK_MS=240000; // 4 minutes; also check when app regains focus
const HOLD_KEY='md_auto_update_attempt_v1';
let checking=false;
let lastCheck=0;
function quizActive(){
 // The shared Med Daddy standard quiz page is #quiz. A visible quiz includes
 // unanswered questions AND answer take-up; neither should be interrupted.
 const q=document.getElementById('quiz');
 return !!(q&&q.getClientRects().length>0);
}
function online(){return navigator.onLine!==false;}
function waitToReload(version){
 if(!version||document.visibilityState==='hidden'||quizActive())return;
 let previous=null;
 try{previous=JSON.parse(sessionStorage.getItem(HOLD_KEY)||'null');}catch{}
 const now=Date.now();
 if(previous?.version===version&&now-previous.at<180000&&previous.attempts>=1)return;
 const tries=previous?.version===version&&now-previous.at<180000?previous.attempts+1:1;
 try{sessionStorage.setItem(HOLD_KEY,JSON.stringify({version,at:now,attempts:tries}));}catch{}
 const u=new URL(window.location.href);
 // One replace with a unique URL forces a new HTML request, not browser cache.
 u.searchParams.set('md_build',version);
 u.searchParams.set('md_refresh',String(now));
 status.refreshes++;
 window.location.replace(u.href);
}
function deliverPending(){
 if(!status.pendingVersion||document.visibilityState==='hidden'||quizActive())return;
 waitToReload(status.pendingVersion);
}
async function check(force=false){
 if(checking||!online()||document.visibilityState==='hidden')return;
 const now=Date.now();
 if(!force&&now-lastCheck<30000)return;
 lastCheck=now;checking=true;status.checks++;status.lastCheck=now;
 try{
  const url=new URL('index.html',window.location.href);
  url.searchParams.set('md_update_probe',String(now));
  // No stale browser response and a unique cache key for GitHub Pages.
  const res=await fetch(url.href,{cache:'no-store',credentials:'same-origin'});
  if(!res.ok)return;
  const html=await res.text();
  const version=(html.slice(0,1000).match(/<title>\s*Med Daddy v(\d+\.\d+\.\d+)\b/i)||[])[1];
  if(!version||version===current){
   if(version===current&&status.pendingVersion===version)status.pendingVersion=null;
   return;
  }
  status.pendingVersion=version;
  deliverPending();
 }catch{status.offline=true;}finally{checking=false;}
}
try{
 const previous=JSON.parse(sessionStorage.getItem(HOLD_KEY)||'null');
 if(previous?.version===current)sessionStorage.removeItem(HOLD_KEY);
}catch{}
window.addEventListener('focus',()=>check(true));
window.addEventListener('pageshow',event=>{if(event.persisted)check(true);});
document.addEventListener('visibilitychange',()=>{
 if(document.visibilityState==='visible'){deliverPending();check(true);}
});
document.addEventListener('click',()=>{if(status.pendingVersion)setTimeout(deliverPending,120);},true);
setInterval(()=>check(),CHECK_MS);
setInterval(()=>{if(status.pendingVersion)deliverPending();},2500);
setTimeout(()=>check(true),1600);
})();