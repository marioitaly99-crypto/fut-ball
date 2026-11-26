/* =====================================================================
 CareerMode.js · Modo Carrera — Argentina · Primera División
 ---------------------------------------------------------------------
 Se carga DESPUÉS de LigaData.js y del script principal de index.html.
 No modifica el juego online, PeerJS, editores, lesiones, tiros libres ni
 BotAIController: solo "envuelve" (en memoria) unas pocas funciones del motor
 y únicamente mientras hay un partido de Carrera en juego (CM.live).
 Guardado: localStorage 'futball_career_save_v2'.
 ===================================================================== */
(function(){
 const D=window.LIGA_ARGENTINA_DATA;
 if(!D){console.warn('[CareerMode] Falta LigaData.js');return}
 const $=id=>document.getElementById(id);
 const K2='futball_career_save_v2';
 const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
 const T=id=>D.getTeam(id);
 const STAGES=['octavos','cuartos','semis','final'];
 const STAGE_LBL={octavos:'Octavos de Final',cuartos:'Cuartos de Final',semis:'Semifinales',final:'Final'};
 const POSL={GK:'ARQ',DEF:'DEF',MID:'MED',FWD:'DEL'};
 let S=null,TAB='next',uid=0,SEL=null,LIVE=null;
 const CM={live:false};

 /* ------------------------------------------------------------------
  1) TEMPORADA: fixture (16 fechas), simulación, tabla y playoffs
  ------------------------------------------------------------------ */
 const mm=(h,a,kind)=>({h,a,hg:null,ag:null,done:false,kind,pen:null});
 const ko=(h,a,neutral)=>({h,a,hg:null,ag:null,done:false,kind:'P',pen:null,w:null,neutral:!!neutral});

 /* Todos contra todos de 15 equipos: 15 rondas con 1 libre por ronda (método del círculo) */
 function rounds15(){
  let arr=[];for(let i=0;i<15;i++)arr.push(i);arr.push(-1);
  const out=[];
  for(let r=0;r<15;r++){
   const ms=[];let bye=-1;
   for(let i=0;i<8;i++){const a=arr[i],b=arr[15-i];if(a===-1)bye=b;else if(b===-1)bye=a;else ms.push([a,b])}
   out.push({ms,bye});
   arr=[arr[0],arr[15]].concat(arr.slice(1,15));
  }
  return out;
 }

 /* Zona B se ordena como los clásicos rivales de la Zona A: en cada ronda el equipo libre de A y el
    libre de B son clásicos → cada fecha (1–15) tiene 14 partidos de zona + 1 Clásico = 15 partidos.
    La fecha 16 es interzonal adicional (A[i] vs B[i+7]). Resultado: cada equipo juega exactamente 16. */
 function buildFixture(A,B){
  const R=rounds15(),fx=[];
  for(let r=0;r<15;r++){
   const f=[];
   R[r].ms.forEach(([x,y])=>{f.push(((r+x+y)%2)?mm(A[y],A[x],'Z'):mm(A[x],A[y],'Z'))});
   R[r].ms.forEach(([x,y])=>{f.push(((r+x+y)%2)?mm(B[y],B[x],'Z'):mm(B[x],B[y],'Z'))});
   const b=R[r].bye;f.push(r%2?mm(B[b],A[b],'C'):mm(A[b],B[b],'C'));
   fx.push(f);
  }
  const f=[];
  for(let i=0;i<15;i++){const j=(i+7)%15;f.push(i%2?mm(B[j],A[i],'I'):mm(A[i],B[j],'I'))}
  fx.push(f);
  return fx;
 }

 const BIG=['boca','river','racing','independiente','sanlorenzo','estudiantes','velez','talleres','rosario','lanus'];
 /* Tácticas por club (ADN): el resto es 'balanced' */
 const CLUB_STYLE={river:'offensive',racing:'offensive',boca:'offensive',velez:'offensive',argentinos:'offensive',talleres:'offensive',defensa:'offensive',estudiantes:'defensive',sanlorenzo:'defensive',belgrano:'defensive',platense:'defensive',riestra:'defensive',sarmiento:'defensive',barracas:'defensive',central_cordoba:'defensive'};
 const styleOf=id=>CLUB_STYLE[id]||'balanced';
 function calcBias(id,isHome){
  let b=({offensive:.08,balanced:0,defensive:-.08})[styleOf(id)];
  if(S.phase==='regular'){
   const pos=rankOf(id).pos;
   if(pos>=1&&pos<=4)b+=.05;
   else if(pos>=8&&pos<=11&&S.fecha>=12)b+=.08;
   else if(pos>=12&&pos<=15){b-=.06;if(!isHome)b-=.03}
  }else if(S.phase==='playoffs')b+=.04;
  return b;
 }
 function newSquad(teamId,num){
  const r=D.resolverPlantelCancha(teamId,num),info={};
  const st=r.starters.slice(0,5),bn=r.subs.slice(0,6); /* el 6.º titular del club es el lugar de tu jugador */
  const starters=[],bench=[];
  st.forEach((p,i)=>{const id='s'+i;info[id]={id,name:p.name,number:p.number,pos:p.pos,stam:100,ycTotal:0,susp:0};starters.push(id)});
  bn.forEach((p,i)=>{const id='b'+i;info[id]={id,name:p.name,number:p.number,pos:p.pos,stam:100,ycTotal:0,susp:0};bench.push(id)});
  return{info,starters,bench};
 }

 function newSeason(st){
  const A=st.zones.A.slice();
  let B=A.map(id=>T(id).classicRivalId);
  const okB=B.length===st.zones.B.length&&B.every(id=>st.zones.B.indexOf(id)>=0);
  if(!okB)B=st.zones.B.slice();
  const str={};D.teams.forEach(t=>{str[t.id]=+(0.82+Math.random()*0.42+(BIG.indexOf(t.id)>=0?0.1:0)).toFixed(3)});
  return{v:2,teamId:st.teamId,player:{name:st.player.name,num:st.player.num,ycTotal:0,susp:0},minutes:st.matchMinutes||5,
   zones:{A,B},zonaDe:st.zonaDe,myZone:st.zonaDe[st.teamId],str,fixture:buildFixture(A,B),fecha:1,phase:'regular',
   po:null,squad:newSquad(st.teamId,st.player.num),champShown:false,createdAt:Date.now()};
 }

 function save(){try{localStorage.setItem(K2,JSON.stringify(S))}catch(e){}}
 function loadSave(){try{const s=JSON.parse(localStorage.getItem(K2)||'null');if(s&&s.v===2&&s.fixture&&s.squad&&s.zones&&T(s.teamId))return s}catch(e){}return null}

 /* ---- simulación de los otros partidos ---- */
 const st=id=>S.str[id]||1;
 function pois(l){const L=Math.exp(-l);let k=0,p=1;do{k++;p*=Math.random()}while(p>L&&k<9);return k-1}
 function simGoals(h,a){const sh=st(h),sa=st(a);return[Math.min(6,pois(1.3*Math.pow(sh/sa,.9)*1.08)),Math.min(6,pois(1.05*Math.pow(sa/sh,.9)))]}
 function simRegular(m){const g=simGoals(m.h,m.a);m.hg=g[0];m.ag=g[1];m.done=true}
 function simKO(m){
  const g=simGoals(m.h,m.a);m.hg=g[0];m.ag=g[1];
  if(m.hg===m.ag){const r=Math.random();if(r<.22){m.hg++}else if(r<.44){m.ag++}}
  if(m.hg===m.ag){const ph=Math.max(.3,Math.min(.7,.5+(st(m.h)-st(m.a))*.25)),hw=Math.random()<ph,w=rnd(3,5),l=Math.max(0,w-rnd(1,2));m.pen=hw?{h:w,a:l}:{h:l,a:w};m.w=hw?m.h:m.a}
  else m.w=m.hg>m.ag?m.h:m.a;
  m.done=true;
 }

 /* ---- tabla ---- */
 function stats(ids){
  const t={};ids.forEach(id=>t[id]={id,pj:0,g:0,e:0,p:0,gf:0,gc:0,pts:0});
  S.fixture.forEach(f=>f.forEach(m=>{if(!m.done)return;
   [[m.h,m.hg,m.ag],[m.a,m.ag,m.hg]].forEach(x=>{const r=t[x[0]];if(!r)return;r.pj++;r.gf+=x[1];r.gc+=x[2];
    if(x[1]>x[2]){r.g++;r.pts+=3}else if(x[1]===x[2]){r.e++;r.pts++}else r.p++})}));
  return ids.map(id=>t[id]).sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc)||b.gf-a.gf||T(a.id).name.localeCompare(T(b.id).name));
 }

 /* ---- playoffs ---- */
 function endRegular(){
  const A=stats(S.zones.A),B=stats(S.zones.B),qA=A.slice(0,8).map(r=>r.id),qB=B.slice(0,8).map(r=>r.id);
  const oct=[];
  for(let i=0;i<4;i++)oct.push(ko(qA[i],qB[7-i]));
  for(let i=0;i<4;i++)oct.push(ko(qB[i],qA[7-i]));
  const mine=qA.indexOf(S.teamId)>=0||qB.indexOf(S.teamId)>=0;
  S.q={A:qA,B:qB};
  S.po={stage:'octavos',rounds:{octavos:oct,cuartos:[],semis:[],final:[]},out:mine?null:'nq',champ:null};
  S.phase='playoffs';
 }
 function advanceStage(){
  const i=STAGES.indexOf(S.po.stage),rd=S.po.rounds[S.po.stage];
  if(!rd.every(m=>m.done))return;
  if(i===3){S.po.champ=rd[0].w;S.phase='done';return}
  const w=rd.map(m=>m.w),pr=i===0?[[0,3],[1,2],[4,7],[5,6]]:i===1?[[0,1],[2,3]]:[[0,1]],nx=STAGES[i+1];
  S.po.rounds[nx]=pr.map(p=>ko(w[p[0]],w[p[1]],nx==='final'));
  S.po.stage=nx;
 }
 function simRest(){
  let n=0;
  while(S.phase==='playoffs'&&n++<8){S.po.rounds[S.po.stage].forEach(m=>{if(!m.done)simKO(m)});advanceStage()}
  save();
 }

 function userMatch(){
  if(!S)return null;
  if(S.phase==='regular'){const f=S.fixture[S.fecha-1];return f&&f.find(m=>m.h===S.teamId||m.a===S.teamId)||null}
  if(S.phase==='playoffs'&&!S.po.out){return S.po.rounds[S.po.stage].find(m=>!m.done&&(m.h===S.teamId||m.a===S.teamId))||null}
  return null;
 }

 /* Registra el resultado de tu partido y simula el resto de la fecha / ronda */
 function recordUser(m,res){
  m.hg=res.hg;m.ag=res.ag;m.done=true;
  /* lesiones: leve 'l' → recuperado · grave 's' → baja a leve para el partido siguiente */
  Object.keys(S.squad.info).forEach(id=>{const p=S.squad.info[id];if(p.inj==='l')p.inj=null;else if(p.inj==='s')p.inj='l'});
  if(S.phase==='regular'){
   S.fixture[S.fecha-1].forEach(x=>{if(!x.done)simRegular(x)});
   if(S.fecha<16)S.fecha++;else endRegular();
  }else{
   if(m.hg===m.ag){
    if(res.ph!=null&&res.pa!=null&&res.ph!==res.pa){m.pen={h:res.ph,a:res.pa};m.w=res.ph>res.pa?m.h:m.a}
    else{const hw=Math.random()<.5;m.pen={h:hw?5:4,a:hw?4:5};m.w=hw?m.h:m.a}
   }else m.w=m.hg>m.ag?m.h:m.a;
   if(m.w!==S.teamId)S.po.out=S.po.stage;
   S.po.rounds[S.po.stage].forEach(x=>{if(!x.done)simKO(x)});
   advanceStage();
  }
 }

 /* ------------------------------------------------------------------
  2) STAMINA y plantel
  ------------------------------------------------------------------ */
 const stamF=s=>s>=70?1:s>=40?.88:.76;
 function applyStamina(played,inj,total){
  const info=S.squad.info;
  Object.keys(info).forEach(id=>{
   const p=info[id],pl=(played[id]||0)/total;
   if(pl>.001){
    const gk=p.pos==='GK';
    let loss=inj[id]?(gk?25:35):Math.round((gk?rnd(8,12):rnd(20,26))*Math.min(1,pl));
    loss=Math.max(1,loss);p.stam=Math.max(0,p.stam-loss);
   }else p.stam=Math.min(100,p.stam+30);
  });
 }
 const stamCol=s=>s>=70?'#22c55e':s>=40?'#f59e0b':'#ef4444';

 /* ------------------------------------------------------------------
  3) COLORES, camisetas y escudos (UI)
  ------------------------------------------------------------------ */
 function hexRgb(h){h=String(h||'#000').replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16)||0;return[(n>>16)&255,(n>>8)&255,n&255]}
 function dist(a,b){const x=hexRgb(a),y=hexRgb(b);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])}
 function clash(k1,k2){const d=dist(k1.c1,k2.c1);if(d<120)return true;return k1.n>=2&&k2.n>=2&&d<170&&dist(k1.c2,k2.c2)<120}
 const badge=t=>{const s='-h'+(++uid);return t.badgeSvg.split('b-'+t.id).join('b-'+t.id+s)};
 function kitSvg(k,num){
  const id='kt'+(++uid);let o='<svg viewBox="0 0 64 64" class="cmKit"><defs><clipPath id="'+id+'"><circle cx="32" cy="32" r="29"/></clipPath></defs><g clip-path="url(#'+id+')"><rect width="64" height="64" fill="'+k.c1+'"/>';
  const c2=k.c2,c3=k.c3||'#fff',s=k.st;
  if(k.n===2){
   if(s==='v1')o+='<rect x="22" width="20" height="64" fill="'+c2+'"/>';
   else if(s==='h1')o+='<rect y="22" width="64" height="20" fill="'+c2+'"/>';
   else if(s==='vs'){for(let i=1;i<5;i+=2)o+='<rect x="'+(i*12.8)+'" width="12.8" height="64" fill="'+c2+'"/>'}
   else if(s==='hs'){for(let i=1;i<5;i+=2)o+='<rect y="'+(i*12.8)+'" width="64" height="12.8" fill="'+c2+'"/>'}
   else if(s==='mv')o+='<rect x="32" width="32" height="64" fill="'+c2+'"/>';
   else if(s==='mh')o+='<rect y="32" width="64" height="32" fill="'+c2+'"/>';
   else if(s==='vv')o+='<path d="M2 18L32 46L62 18" fill="none" stroke="'+c2+'" stroke-width="14"/>';
   else o+='<path d="M-4 -4L68 68" stroke="'+c2+'" stroke-width="17"/>';
  }else if(k.n===3){
   if(s==='bv'){for(let i=1;i<5;i+=2)o+='<rect x="'+(i*12.8)+'" width="12.8" height="64" fill="'+c2+'"/>';for(let i=1;i<5;i++)o+='<rect x="'+(i*12.8-1)+'" width="2" height="64" fill="'+c3+'"/>'}
   else if(s==='bh'){for(let i=1;i<5;i+=2)o+='<rect y="'+(i*12.8)+'" width="64" height="12.8" fill="'+c2+'"/>';for(let i=1;i<5;i++)o+='<rect y="'+(i*12.8-1)+'" width="64" height="2" fill="'+c3+'"/>'}
   else if(s==='cb')o+='<rect y="20" width="64" height="10" fill="'+c2+'"/><rect y="34" width="64" height="10" fill="'+c3+'"/>';
   else o+='<rect x="21.3" width="21.4" height="64" fill="'+c2+'"/><rect x="42.7" width="21.3" height="64" fill="'+c3+'"/>';
  }
  o+='</g><circle cx="32" cy="32" r="29" fill="none" stroke="#0b1220" stroke-width="3"/>';
  if(num)o+='<text x="32" y="38" text-anchor="middle" font-size="20" font-weight="900" fill="#fff" stroke="#000" stroke-width="3" paint-order="stroke" font-family="Segoe UI,system-ui,sans-serif">'+E(num)+'</text>';
  return o+'</svg>';
 }

 /* ------------------------------------------------------------------
  4) CSS + DOM del Hub
  ------------------------------------------------------------------ */
 function injectCSS(){
  if($('cmCSS'))return;
  const s=document.createElement('style');s.id='cmCSS';
  s.textContent=`
#career-screen{background: #0d1b2a url('career-bg.png') center center / cover no-repeat;}
#career-hub-screen{position:fixed;inset:0;z-index:1;width:100vw;height:100vh;height:100dvh;flex-direction:column;align-items:center;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;color:#fff;
 background:linear-gradient(rgba(3,12,32,.8),rgba(3,12,32,.8)),url('menu_bg.png') center center / cover no-repeat,#06240f;padding:calc(env(safe-area-inset-top,0px) + 10px) 10px calc(env(safe-area-inset-bottom,0px) + 22px)}
#career-hub-screen *{box-sizing:border-box}
#career-hub-screen .cmWrap{width:min(1100px,100%);display:flex;flex-direction:column;gap:10px}
.cmHead{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:8px 12px;background:rgba(7,25,56,.92);border:2px solid #38bdf8;border-radius:14px}
.cmHead .cmTitle{display:flex;align-items:center;gap:10px;flex:1;min-width:180px}
.cmHead .bd,.cmBd{width:46px;height:46px;flex:none;display:block}.cmBd svg,.cmHead .bd svg{width:100%;height:100%;display:block}
.cmHead b{font-size:1.1rem;line-height:1.15;display:block}.cmHead small{color:#9fc0ee;font-size:.78rem;font-weight:700}
.cmGhost{background:rgba(4,18,48,.9);color:#fff;border:1.5px solid #38bdf8;border-radius:999px;padding:6px 14px;font-size:.8rem;font-weight:800}
.cmTabs{display:flex;gap:6px;overflow-x:auto}
.cmTabs button{flex:1;min-width:max-content;background:rgba(4,18,48,.9);color:#cfe3ff;border:1.5px solid #1e3a8a;border-radius:12px;padding:10px 12px;font-size:.92rem;font-weight:800}
.cmTabs button.on{background:rgba(2,132,199,.65);color:#fff;border-color:#e0f7ff;box-shadow:0 0 12px rgba(56,189,248,.6)}
.cmCard{min-width:0;max-width:100%;display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:rgba(7,25,56,.92);border:2px solid #38bdf8;border-radius:16px;box-shadow:0 0 22px rgba(56,189,248,.25)}
.cmCard h2{font-size:1rem;font-weight:900;font-style:italic;color:#9fd5ff;text-transform:uppercase;letter-spacing:.3px}
.cmCard h3{font-size:.85rem;font-weight:900;color:#bcd3f5;text-transform:uppercase}
.cmVs{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;text-align:center}
.cmVs .tm{display:flex;flex-direction:column;align-items:center;gap:4px;font-weight:900;font-size:1.02rem}
.cmVs .tm .cmBd{width:84px;height:84px}.cmVs .tm .cmKit{width:46px;height:46px}.cmVs .tm small{font-size:.72rem;color:#9fc0ee;font-weight:800}
.cmVs .tm.me{filter:drop-shadow(0 0 8px rgba(56,189,248,.9))}
.cmVs .mid{font-size:1.5rem;font-weight:900;font-style:italic;color:#9fd5ff}
.cmKits{display:flex;flex-direction:column;gap:6px}.cmKits h3{margin:0}.cmKcols{display:grid;grid-template-columns:1fr 1fr;gap:10px}.cmKcols small{display:block;font-size:.72rem;font-weight:800;color:#9fc0ee;margin-bottom:4px;text-align:center}
.cmKp{display:flex;gap:6px;justify-content:center}.cmKb{display:flex;flex-direction:column;align-items:center;gap:3px;background:rgba(4,18,48,.9);color:#cfe3ff;border:1.5px solid #1e3a8a;border-radius:12px;padding:6px 10px;font-size:.74rem;font-weight:800;cursor:pointer}.cmKb .cmKit{width:34px;height:34px}.cmKb.on{border-color:#e0f7ff;background:rgba(2,132,199,.55);box-shadow:0 0 10px rgba(56,189,248,.8)}
.cmTag{display:inline-block;padding:3px 10px;border-radius:999px;font-size:.78rem;font-weight:900;background:#0c4a6e;color:#e0f7ff;border:1px solid #38bdf8}
.cmWarn{padding:9px 12px;border-radius:12px;font-weight:800;font-size:.88rem;background:rgba(245,158,11,.18);border:1.5px solid #f59e0b;color:#fde68a}
.cmFire{background:rgba(239,68,68,.2);border-color:#ef4444;color:#fecaca}
.cmBig{padding:14px 18px;font-size:1.15rem;font-weight:900;font-style:italic;border-radius:12px;color:#04210f;border:2px solid #052e16;background:linear-gradient(135deg,#4ade80,#16a34a)}
.cmBtn{padding:11px 16px;font-size:.95rem;font-weight:900;border-radius:12px;color:#fff;border:1.5px solid #38bdf8;background:rgba(2,132,199,.55)}
.cmBtn.red{background:linear-gradient(135deg,#ef4444,#b91c1c);border-color:#fecaca}
.cmRow{display:flex;gap:8px;flex-wrap:wrap}
.cmT{width:100%;border-collapse:collapse;font-size:.78rem}
.cmT th,.cmT td{padding:4px 5px;text-align:center;white-space:nowrap}
.cmT th{color:#9fd5ff;font-weight:900;border-bottom:1px solid #1e3a8a}
.cmT td.cl{text-align:left;display:flex;align-items:center;gap:6px;font-weight:800}
.cmT td.cl .cmBd{width:22px;height:22px}
.cmT tr.q td{background:rgba(34,197,94,.22)}.cmT tr.q td:first-child{box-shadow:inset 3px 0 #22c55e}
.cmT tr.cut td{border-bottom:2px dashed #22c55e}
.cmT tr.me td{background:rgba(2,132,199,.55);outline:0}.cmT tr.q.me td{background:rgba(16,185,129,.5)}
.cmT td.pt{font-weight:900;color:#fde68a}
.cmZ{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cmZ > div{min-width:0;max-width:100%}
.cmScroll{min-width:0;max-width:100%;overflow-x:auto}
.cmFx details{background:rgba(2,10,30,.5);border:1px solid #1e3a8a;border-radius:12px;padding:6px 10px;margin-bottom:6px}
.cmFx summary{cursor:pointer;font-weight:900;font-size:.9rem;color:#cfe3ff}
.cmFx .gm{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;padding:3px 6px;font-size:.8rem;font-weight:700;border-radius:8px}
.cmFx .gm.me{background:rgba(2,132,199,.55)}
.cmFx .gm .h{display:flex;align-items:center;gap:6px;justify-content:flex-end}.cmFx .gm .a{display:flex;align-items:center;gap:6px}
.cmFx .gm .cmBd{width:20px;height:20px}.cmFx .gm b{min-width:46px;text-align:center;color:#fde68a}
.cmBr{display:grid;grid-template-columns:repeat(4,minmax(150px,1fr));gap:10px;overflow-x:auto;align-items:center}
.cmBr .col{display:flex;flex-direction:column;justify-content:space-around;gap:8px;min-height:100%}
.cmBr .col>h4{text-align:center;font-size:.78rem;color:#9fd5ff;text-transform:uppercase}
.cmBr .bm{background:rgba(2,10,30,.6);border:1.5px solid #1e3a8a;border-radius:10px;padding:5px 8px;font-size:.78rem;font-weight:800}
.cmBr .bm.me{border-color:#e0f7ff;box-shadow:0 0 8px rgba(56,189,248,.7)}
.cmBr .bm .l{display:flex;align-items:center;gap:6px;justify-content:space-between;opacity:.8}.cmBr .bm .l.w{opacity:1;color:#86efac}
.cmBr .bm .l span{display:flex;align-items:center;gap:5px}.cmBr .bm .cmBd{width:18px;height:18px}
.cmPr{display:grid;grid-template-columns:34px 38px 1fr auto 90px 42px;gap:8px;align-items:center;width:100%;text-align:left;padding:7px 10px;border-radius:10px;
 background:rgba(2,10,30,.6);color:#fff;border:1.5px solid #1e3a8a;font-size:.84rem;font-weight:800}
.cmPr .n{color:#fde68a;font-weight:900}.cmPr .ps{color:#9fc0ee;font-size:.72rem}.cmPr .nm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cmPr .bar{height:9px;border-radius:6px;background:#0b1530;overflow:hidden;border:1px solid #1e3a8a}.cmPr .bar i{display:block;height:100%}
.cmPr b{text-align:right;font-size:.78rem}
.cmPr.sel{border-color:#e0f7ff;background:rgba(2,132,199,.55);box-shadow:0 0 10px rgba(56,189,248,.8)}
.cmPr.me{border-color:#facc15;cursor:default}.cmPr.me em{grid-column:1/-1;font-style:normal;color:#fde68a;font-size:.72rem}
.cmPr:hover{filter:none;border-color:#7dd3fc}.cmPr.me:hover{border-color:#facc15}
.cmPr .cd{font-size:.72rem;font-weight:900;white-space:nowrap;color:#fde68a}
.cmPr em.wn{grid-column:1/-1;font-style:normal;color:#fbbf24;font-size:.72rem;font-weight:900}
.cmPr.exp{filter:grayscale(100%);opacity:.45;cursor:not-allowed;border-color:#ef4444}
.cmPr.exp:hover{filter:grayscale(100%);border-color:#ef4444}
.cmNote{font-size:.78rem;color:#8fb2e6}
.cmCols{display:grid;grid-template-columns:1fr 1fr;gap:14px}.cmCols>div{display:flex;flex-direction:column;gap:6px}
#cmSub,#cmEnd,#cmChamp{position:fixed;inset:0;z-index:400;display:none;align-items:center;justify-content:center;padding:12px;background:rgba(3,8,20,.82);overflow-y:auto}
#cmSub.on,#cmEnd.on,#cmChamp.on{display:flex}
#cmSub .cmCard,#cmEnd .cmCard,#cmChamp .cmCard{width:min(900px,100%);max-height:96vh;overflow-y:auto}
#cmEnd .cmCard,#cmChamp .cmCard{width:min(520px,100%);text-align:center;align-items:center}
#cmEnd .sc{font-size:1.9rem;font-weight:900;letter-spacing:1px}#cmEnd .rs{font-weight:900;font-size:1.05rem}
#cmChamp .cmCard{border-color:#facc15;box-shadow:0 0 40px rgba(250,204,21,.6)}
#cmChamp h1{font-size:clamp(1.3rem,5vw,2.1rem);color:#fde68a;text-shadow:0 2px 10px rgba(250,204,21,.7);font-style:italic}
#cmChamp .cmBd{width:110px;height:110px}
#cmSubBtn,#cmMenuSub{display:none}
body.careerOn #cmMenuSub{display:block}
body.careerOn.cmInGame #cmSubBtn{display:block;position:fixed;z-index:130;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 10px);padding:8px 14px;font-size:.85rem;border-radius:12px;background:rgba(11,15,26,.85);color:#fff;border:1.5px solid #38bdf8}
html.is-touch body.careerOn.cmInGame #cmSubBtn{right:auto;left:50%;transform:translateX(-50%);bottom:auto;top:calc(env(safe-area-inset-top,0px) + 52px);padding:5px 12px;font-size:.74rem}
#cmSimRestBtn,#cmMenuSim{display:none}
body.careerOn.cmRed #cmMenuSim{display:block}
body.careerOn.cmInGame.cmRed #cmSimRestBtn{display:block;position:fixed;z-index:130;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 54px);padding:8px 14px;font-size:.85rem;border-radius:12px;background:rgba(127,29,29,.92);color:#fff;border:1.5px solid #f87171}
html.is-touch body.careerOn.cmInGame.cmRed #cmSimRestBtn{right:auto;left:50%;transform:translateX(-50%);bottom:auto;top:calc(env(safe-area-inset-top,0px) + 86px);padding:5px 12px;font-size:.74rem}
body.careerOn #teams,body.careerOn #extBox,body.careerOn #adm,body.careerOn #mCopy,body.careerOn #mCode{display:none!important}
body.careerOn #chatIn,body.careerOn #chatTog{display:none!important}
body.careerOn #chat{background:transparent!important;border:none!important;pointer-events:none!important}
#cmCont{display:flex;flex-direction:column;gap:8px;margin-bottom:10px;padding:12px 16px;background:rgba(7,25,56,.92);border:2px solid #4ade80;border-radius:16px;box-shadow:0 0 22px rgba(74,222,128,.3)}
#cmCont b{font-size:1.05rem}
@media(max-width:780px){.cmZ,.cmCols{grid-template-columns:1fr}.cmVs .tm .cmBd{width:62px;height:62px}.cmBr{grid-template-columns:repeat(4,200px)}.cmPr{grid-template-columns:30px 34px 1fr auto 64px 38px;gap:6px;padding:6px 8px}}
@media (hover: none) and (pointer: coarse) and (orientation: landscape){
.cmZ,.cmCols{grid-template-columns:1fr}
.cmHead{padding:6px 10px}
.cmTabs button{padding:6px 10px;font-size:.82rem}
.cmT{font-size:.74rem}
.cmT th,.cmT td{padding:3px 4px}
#career-hub-screen,#cmSub{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 32px)}
}
`;
  document.head.appendChild(s);
 }
 function ensureDom(){
  let h=$('career-hub-screen');
  if(!h){h=document.createElement('div');h.id='career-hub-screen';h.className='screen';document.body.appendChild(h)}
  if(!$('cmSub')){
   const d=document.createElement('div');d.id='cmSub';document.body.appendChild(d);
   const e=document.createElement('div');e.id='cmEnd';document.body.appendChild(e);
   const c=document.createElement('div');c.id='cmChamp';document.body.appendChild(c);
   const b=document.createElement('button');b.id='cmSubBtn';b.type='button';b.textContent='🔄 Cambios (P)';document.body.appendChild(b);
   const m=document.createElement('button');m.id='cmMenuSub';m.type='button';m.className='ghost';m.textContent='🔄 Realizar Cambio';
   const mr=$('mResume');if(mr&&mr.parentNode)mr.parentNode.insertBefore(m,mr);
   const sr=document.createElement('button');sr.id='cmSimRestBtn';sr.type='button';sr.textContent='⏩ Reemplazar y simular resto';document.body.appendChild(sr);
   const ms=document.createElement('button');ms.id='cmMenuSim';ms.type='button';ms.className='ghost';ms.textContent='⏩ Reemplazar y simular resto';
   if(mr&&mr.parentNode)mr.parentNode.insertBefore(ms,mr);
  }
 }

 /* ------------------------------------------------------------------
  5) HUB (pestañas)
  ------------------------------------------------------------------ */
 const rankOf=id=>{const z=S.zonaDe[id],r=stats(S.zones[z]),i=r.findIndex(x=>x.id===id);return{z,pos:i+1,row:r[i]}};
 const nameOf=id=>T(id).name;
 function statusText(){
  if(S.phase==='regular')return 'Zona '+S.myZone+' · Fecha '+S.fecha+'/16';
  if(S.phase==='playoffs')return S.po.out==='nq'?'Playoffs (sin clasificar)':S.po.out?'Eliminado en '+STAGE_LBL[S.po.out]:'Playoffs · '+STAGE_LBL[S.po.stage];
  return 'Temporada finalizada';
 }
 function renderHub(){
  const hub=$('career-hub-screen');if(!hub||!S)return;
  const t=T(S.teamId);
  hub.innerHTML='<div class="cmWrap"><div class="cmHead"><button id="cmBack" class="cmGhost" type="button">← Menú</button>'+
   '<div class="cmTitle"><span class="bd">'+badge(t)+'</span><div><b>'+E(t.name)+'</b><small>'+E(S.player.name)+' (#'+S.player.num+') · '+statusText()+'</small></div></div>'+
   '<button id="cmNew" class="cmGhost" type="button">🆕 Nueva temporada</button></div>'+
   '<nav class="cmTabs">'+[['next','⚽ Próximo Partido'],['table','📊 Tabla de Posiciones'],['fix','📅 Fixture / Playoffs'],['squad','👕 Mi Plantel']]
    .map(x=>'<button type="button" data-tab="'+x[0]+'" class="'+(TAB===x[0]?'on':'')+'">'+x[1]+'</button>').join('')+'</nav>'+
   '<div id="cmBody"></div></div>';
  const body=$('cmBody');
  body.innerHTML=TAB==='table'?tabTable():TAB==='fix'?tabFixture():TAB==='squad'?tabSquad():tabNext();
  wireHub();
 }
 function wireHub(){
  const hub=$('career-hub-screen');
  hub.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{TAB=b.dataset.tab;SEL=null;renderHub()});
  $('cmBack').onclick=()=>show('screen-home');
  $('cmNew').onclick=newSeasonFlow;
  const p=$('cmPlay');if(p)p.onclick=playMatch;
  const sa=$('cmSimAll');if(sa)sa.onclick=()=>{simRest();renderHub();if(S.phase==='done'&&S.po.champ===S.teamId)showChamp()};
  const ns=$('cmNewSeason');if(ns)ns.onclick=newSeasonFlow;
  hub.querySelectorAll('.cmPr[data-k]').forEach(b=>b.onclick=()=>squadClick(b.dataset.k,+b.dataset.i));
  hub.querySelectorAll('.cmKb[data-kt]').forEach(b=>b.onclick=()=>{KIT[b.dataset.kt]=b.dataset.kk;renderHub()});
 }
 function newSeasonFlow(){
  if(!confirm('¿Empezar una nueva temporada? Se borra el progreso guardado de la campaña actual.'))return;
  try{localStorage.removeItem(K2)}catch(e){}
  S=null;const c=$('cmCont');if(c)c.remove();
  show('career-screen');
 }

 /* ---- Camisetas del Próximo Partido (Titular / Suplente) para Local y Visitante ---- */
 let KIT={key:'',h:null,a:null};
 function kitsFor(m){
  const key=m.h+'|'+m.a+'|'+S.phase+'|'+S.fecha+'|'+(S.po&&S.po.stage||'');
  if(KIT.key!==key)KIT={key,h:null,a:null};
  const hT=T(m.h),aT=T(m.a);
  const sH=KIT.h||'home',kH=sH==='away'?hT.kitAway:hT.kitHome;
  let sA=KIT.a;if(!sA)sA=clash(kH,aT.kitHome)?'away':'home';
  const kA=sA==='away'?aT.kitAway:aT.kitHome;
  return{kH,kA,sH,sA,autoA:!KIT.a&&sA==='away',clash:clash(kH,kA)};
 }
 function kitPick(side,t,cur){
  const b=(k,lbl,kit)=>'<button type="button" class="cmKb'+(cur===k?' on':'')+'" data-kt="'+side+'" data-kk="'+k+'" aria-pressed="'+(cur===k)+'">'+kitSvg(kit,'')+'<span>'+lbl+'</span></button>';
  return '<div class="cmKp">'+b('home','Titular',t.kitHome)+b('away','Suplente',t.kitAway)+'</div>';
 }

 function tabNext(){
  if(S.phase==='done')return doneHtml();
  const m=userMatch();
  if(!m)return outHtml();
  const myHome=m.h===S.teamId,h=T(m.h),a=T(m.a),ks=kitsFor(m),kH=ks.kH,kA=ks.kA;
  const me=myHome?h:a,rv=myHome?a:h,myKit=myHome?kH:kA,rvKit=myHome?kA:kH;
  const mySide=myHome?ks.sH:ks.sA,rvSide=myHome?ks.sA:ks.sH;
  const mySwapped=mySide==='away',rvSwapped=rvSide==='away'&&(myHome?ks.autoA:false);
  let warn='';
  if(S.phase==='playoffs')warn+='<div class="cmWarn">🏆 <b>'+STAGE_LBL[S.po.stage].toUpperCase()+'</b> · Partido único. Si hay empate al final: tiempo extra de 1 minuto y, si persiste, tanda de penales.'+(m.neutral?' · Cancha neutral.':'')+'</div>';
  if(m.kind==='C')warn+='<div class="cmWarn cmFire">🔥 <b>¡FECHA DE CLÁSICO!</b> Hoy enfrentás a tu clásico rival.</div>';
  if(m.kind==='I')warn+='<div class="cmWarn">🌐 Fecha interzonal: rival de la otra zona.</div>';
  if((S.player.susp||0)>0)warn+='<div class="cmWarn cmFire">🟥 <b>Estás suspendido (1 fecha)</b>: no jugás este partido. Lo mirás desde afuera y tu equipo juega 6v6 con un suplente.</div>';
  const r=rankOf(S.teamId);
  const stand=S.phase==='regular'?'<div class="cmNote">Posición actual: <b>'+r.pos+'º</b> en Zona '+r.z+' · '+r.row.pts+' pts ('+r.row.pj+' PJ) · clasifican los 8 primeros.</div>':'';
  return '<div class="cmCard"><h2>'+(S.phase==='regular'?'Fecha '+S.fecha+' de 16':STAGE_LBL[S.po.stage])+'</h2>'+warn+
   '<div class="cmVs"><div class="tm'+(myHome?' me':'')+'"><span class="cmBd">'+badge(h)+'</span>'+E(h.name)+'<small>LOCAL'+(myHome?' · TU CLUB':'')+'</small>'+kitSvg(myHome?myKit:kH,myHome?S.player.num:'')+'</div>'+
   '<div class="mid">VS</div>'+
   '<div class="tm'+(!myHome?' me':'')+'"><span class="cmBd">'+badge(a)+'</span>'+E(a.name)+'<small>VISITANTE'+(!myHome?' · TU CLUB':'')+'</small>'+kitSvg(!myHome?myKit:kA,!myHome?S.player.num:'')+'</div></div>'+
   '<div class="cmRow"><span class="cmTag">'+(myHome?'🏟️ Jugás de LOCAL en el estadio de '+E(me.name):'✈️ Jugás de VISITANTE en el estadio de '+E(rv.name))+'</span>'+
   '<span class="cmTag">⏱ '+S.minutes+' min · Realista 6v6</span></div>'+
   (rvSwapped?'<div class="cmNote">'+E(rv.name)+' usa su camiseta suplente para evitar el choque de colores.</div>':'')+
   '<div class="cmKits"><h3>👕 Camisetas del partido</h3><div class="cmKcols"><div><small>LOCAL · '+E(h.shortName)+'</small>'+kitPick('h',h,ks.sH)+'</div><div><small>VISITANTE · '+E(a.shortName)+'</small>'+kitPick('a',a,ks.sA)+'</div></div>'+(ks.clash?'<div class="cmNote">⚠️ Los colores de ambas camisetas son muy parecidos.</div>':'')+'</div>'+
   stand+
   '<button id="cmPlay" class="cmBig" type="button">▶ JUGAR PARTIDO</button></div>';
 }
 function outHtml(){
  const msg=S.po.out==='nq'?'No clasificaste a los Playoffs':'Quedaste eliminado en '+STAGE_LBL[S.po.out];
  return '<div class="cmCard"><h2>'+E(msg)+'</h2><div class="cmNote">'+(S.po.out==='nq'?'Terminaste la fase regular fuera de los 8 primeros de tu zona.':'Tu camino en el torneo terminó acá.')+' Podés simular lo que resta de los Playoffs o empezar otra temporada.</div>'+
   '<div class="cmRow"><button id="cmSimAll" class="cmBtn" type="button">⏩ Simular Playoffs restantes</button><button id="cmNewSeason" class="cmBtn red" type="button">🆕 Nueva temporada</button></div></div>';
 }
 function doneHtml(){
  const c=T(S.po.champ),mine=S.po.champ===S.teamId;
  return '<div class="cmCard"><h2>Temporada finalizada</h2><div class="cmVs"><div class="tm"><span class="cmBd">'+badge(c)+'</span>🏆 Campeón: '+E(c.name)+'</div></div>'+
   '<div class="cmNote">'+(mine?'¡Ganaste el título de Primera División!':'Tu equipo no pudo coronarse esta vez.')+'</div>'+
   '<button id="cmNewSeason" class="cmBig" type="button">🆕 Nueva temporada</button></div>';
 }

 function tableHtml(z){
  const rows=stats(S.zones[z]);
  return '<div class="cmCard"><h2>Zona '+z+'</h2><div class="cmScroll"><table class="cmT"><thead><tr><th>Pos</th><th style="text-align:left">Club</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th></tr></thead><tbody>'+
   rows.map((r,i)=>'<tr class="'+(i<8?'q':'')+(i===7?' cut':'')+(r.id===S.teamId?' me':'')+'"><td>'+(i+1)+'</td><td class="cl"><span class="cmBd">'+badge(T(r.id))+'</span>'+E(T(r.id).name)+'</td><td>'+r.pj+'</td><td>'+r.g+'</td><td>'+r.e+'</td><td>'+r.p+'</td><td>'+r.gf+'</td><td>'+r.gc+'</td><td>'+(r.gf-r.gc>0?'+':'')+(r.gf-r.gc)+'</td><td class="pt">'+r.pts+'</td></tr>').join('')+
   '</tbody></table></div></div>';
 }
 function tabTable(){return '<div class="cmZ">'+tableHtml('A')+tableHtml('B')+'</div><div class="cmNote">🟩 Los 8 primeros de cada zona clasifican a los Playoffs · Desempate: Puntos → Diferencia de Gol → Goles a Favor.</div>'}

 function gmHtml(m){
  const mine=m.h===S.teamId||m.a===S.teamId,h=T(m.h),a=T(m.a);
  let sc=m.done?m.hg+' - '+m.ag+(m.pen?' ('+m.pen.h+'-'+m.pen.a+' p)':''):'vs';
  const ic=m.kind==='C'?'🔥 ':m.kind==='I'?'🌐 ':'';
  return '<div class="gm'+(mine?' me':'')+'"><span class="h">'+E(h.shortName)+'<span class="cmBd">'+badge(h)+'</span></span><b>'+ic+sc+'</b><span class="a"><span class="cmBd">'+badge(a)+'</span>'+E(a.shortName)+'</span></div>';
 }
 function bracketHtml(){
  let cols='';
  STAGES.forEach(sg=>{
   const rd=S.po&&S.po.rounds[sg]||[];
   const cnt={octavos:8,cuartos:4,semis:2,final:1}[sg];
   let ms='';
   if(rd.length){
    ms=rd.map(m=>{const mine=m.h===S.teamId||m.a===S.teamId,line=(id,g,isH)=>{const w=m.done&&m.w===id;return '<div class="l'+(w?' w':'')+'"><span><span class="cmBd">'+badge(T(id))+'</span>'+E(T(id).shortName)+'</span><b>'+(m.done?g+((m.pen)?' ('+(isH?m.pen.h:m.pen.a)+')':''):'')+'</b></div>'};
     return '<div class="bm'+(mine?' me':'')+'">'+line(m.h,m.hg,true)+line(m.a,m.ag,false)+'</div>'}).join('');
   }else{for(let i=0;i<cnt;i++)ms+='<div class="bm"><div class="l"><span>A definir</span></div><div class="l"><span>A definir</span></div></div>'}
   cols+='<div class="col"><h4>'+STAGE_LBL[sg]+'</h4>'+ms+'</div>';
  });
  return '<div class="cmScroll"><div class="cmBr">'+cols+'</div></div>'+(S.po&&S.po.champ?'<div class="cmWarn">🏆 Campeón: <b>'+E(nameOf(S.po.champ))+'</b></div>':'');
 }
 function tabFixture(){
  const fx=S.fixture.map((f,i)=>{
   const n=i+1,played=f.every(m=>m.done),cur=S.phase==='regular'&&n===S.fecha;
   return '<details'+(cur?' open':'')+'><summary>Fecha '+n+(n===16?' · Interzonal':'')+(played?' ✅':cur?' ▶ (actual)':'')+'</summary>'+f.map(gmHtml).join('')+'</details>'}).join('');
  return '<div class="cmCard cmFx"><h2>Fase regular · 16 fechas</h2>'+fx+'</div><div class="cmCard"><h2>Playoffs · Octavos → Cuartos → Semis → Final</h2>'+(S.po?'':'<div class="cmNote">Se definen al terminar la fecha 16: clasifican los 8 primeros de cada zona.</div>')+bracketHtml()+'</div>';
 }

 /* ---- Mi Plantel ---- */
 function injTag(p){return p.inj==='s'?' <span title="Lesión grave · Requiere cambio" style="color:#f87171;font-weight:900;font-size:.72rem">🚑 Cambio req.</span>':p.inj==='l'?' <span title="Jugador resentido" style="color:#fbbf24">🩹</span>':''}
 /* Disciplina en "Mi Plantel": contador 🟨 n/4, aviso en 3/4 y suspendido (🟥 + .exp) */
 function discHub(p){
  const yc=p.ycTotal||0,sp=p.susp||0;
  if(sp>0)return{cls:' exp',cd:'<span class="cd" style="color:#f87171;font-weight:900">🟥 Suspendido ('+sp+' fecha'+(sp>1?'s':'')+')</span>',wn:''};
  return{cls:'',cd:'<span class="cd"'+(yc===3?' style="color:#facc15"':'')+'>🟨 '+yc+'/4</span>',wn:yc===3?'<em class="wn">⚠️ SERÁ SUSPENDIDO EN CASO DE SER AMONESTADO CON AMARILLA</em>':''};
 }
 /* card = {yc,exp,susp} → render dentro del modal de cambios (#cmSub); sin card → Mi Plantel */
 function prHtml(p,k,i,sel,card){
  let cls='cmPr'+(sel?' sel':''),cd='',wn='';
  if(card){
   if(card.exp){cls+=' exp';cd='<span class="cd" style="color:#f87171;font-weight:900">🟥 Expulsado</span>'}
   else if(card.susp){cls+=' exp';cd='<span class="cd" style="color:#f87171;font-weight:900">🟥 Suspendido</span>'}
   else if(card.yc>0)cd='<span class="cd" title="Amonestado">🟨</span>';
  }else{const d=discHub(p);cls+=d.cls;cd=d.cd;wn=d.wn}
  return '<button type="button" class="'+cls+'" data-k="'+k+'" data-i="'+i+'"><span class="n">#'+E(p.number)+'</span><span class="ps">'+(POSL[p.pos]||p.pos)+'</span><span class="nm">'+E(p.name)+injTag(p)+'</span>'+(cd||'<span class="cd"></span>')+'<span class="bar"><i style="width:'+p.stam+'%;background:'+stamCol(p.stam)+'"></i></span><b>'+p.stam+'%</b>'+wn+'</button>';
 }
 function userRow(modal){
  const P=S.player;let cls='cmPr me',cd='',wn='';
  if(modal){
   const yc=(typeof me!=='undefined'&&me&&me.yc)||0;
   if(typeof me!=='undefined'&&me&&me.rt){cls+=' exp';cd='<span class="cd" style="color:#f87171;font-weight:900">🟥 Expulsado</span>'}
   else if((P.susp||0)>0){cls+=' exp';cd='<span class="cd" style="color:#f87171;font-weight:900">🟥 Suspendido</span>'}
   else if(yc>0)cd='<span class="cd" title="Amonestado">🟨</span>';
  }else{const d=discHub(P);cls+=d.cls;cd=d.cd;wn=d.wn}
  return '<div class="'+cls+'"><span class="n">#'+E(P.num)+'</span><span class="ps" style="color:#facc15;font-weight:900">TÚ</span><span class="nm">'+E(P.name)+'</span>'+(cd||'<span class="cd"></span>')+'<span class="bar"><i style="width:100%;background:#22c55e"></i></span><b>100%</b>'+wn+'</div>';
 }
 function tabSquad(){
  const q=S.squad;
  return '<div class="cmCard"><h2>Mi Plantel</h2>'+userRow()+
   '<h3>Titulares (bots)</h3>'+q.starters.map((id,i)=>prHtml(q.info[id],'s',i,SEL&&SEL.k==='s'&&SEL.i===i)).join('')+
   '<h3>Suplentes (banco)</h3>'+q.bench.map((id,i)=>prHtml(q.info[id],'b',i,SEL&&SEL.k==='b'&&SEL.i===i)).join('')+
   '<div id="cmSqMsg" class="cmNote">Tocá un titular y después un suplente para intercambiarlos (el arquero solo por otro arquero). Con stamina baja, los bots corren menos: &lt;40% = 76% de velocidad · 40–69% = 88% · 70%+ = 100%.</div></div>';
 }
 function swapOk(a,b){return (a.pos==='GK')===(b.pos==='GK')}
 function squadClick(k,i){
  const q=S.squad;
  if(k==='b'&&(q.info[q.bench[i]].susp||0)>0){SEL=null;renderHub();const m=$('cmSqMsg');if(m)m.textContent='⚠️ Este jugador está suspendido y no puede jugar el próximo partido.';return}
  if(!SEL||SEL.k===k){SEL={k,i};return renderHub()}
  const si=k==='s'?i:SEL.i,bi=k==='b'?i:SEL.i,sid=q.starters[si],bid=q.bench[bi];
  if(!swapOk(q.info[sid],q.info[bid])){SEL=null;renderHub();const m=$('cmSqMsg');if(m)m.textContent='⚠️ El arquero solo puede cambiarse por otro arquero.';return}
  q.starters[si]=bid;q.bench[bi]=sid;SEL=null;save();renderHub();
 }
 function openHub(tab){if(tab)TAB=tab;SEL=null;renderHub();show('career-hub-screen')}

 /* ------------------------------------------------------------------
  6) PARTIDO: integración con el motor de index.html
  ------------------------------------------------------------------ */
 function hook(name,fn){try{const o=window[name];if(typeof o!=='function')return;window[name]=fn(o)}catch(e){console.warn('[CareerMode] hook '+name,e)}}

 /* a) dorsales reales: no renumerar bots durante Carrera */
 hook('uniqueBotNums',o=>function(){if(CM.live)return;return o.apply(this,arguments)});

 /* a2) marcador superior: en Carrera usa las siglas (shortName) de cada equipo; en Online sigue LOCAL / VISITANTE */
 hook('paintTeams',o=>function(){
  if(typeof teamLabel!=='function')return o.apply(this,arguments);
  const live=!!(CM.live&&LIVE&&LIVE.m),lt=live?(T(LIVE.m.h).shortName||'LOCAL'):'LOCAL',vt=live?(T(LIVE.m.a).shortName||'VISITANTE'):'VISITANTE';
  [['tL','red',lt],['pL','red',lt],['tV','blue',vt],['pV','blue',vt]].forEach(x=>{const el=$(x[0]);if(!el)return;if(el.dataset.cmTxt!==x[2]){el.dataset.cmTxt=x[2];el._k=null}teamLabel(el,x[1],x[2])});
 });
 /* b) stamina → velocidad máxima (usa el mismo canal que las lesiones) */
 hook('injM',o=>function(p){
  const m=o.apply(this,arguments);
  if(!CM.live||!p||!p.cSlot)return m;
  const f=stamF(p.stam==null?100:p.stam);if(f>=1)return m;
  return m?{sp:m.sp*f,sh:m.sh}:{sp:f,sh:1};
 });
 /* c) lesiones de tus bots → desgaste mayor al terminar */
 hook('injure',o=>function(q){const r=o.apply(this,arguments);try{if(CM.live&&q&&q.cSlot&&q.inj>0){q.cInj=true;
  const p=S&&S.squad&&S.squad.info[q.cId];
  if(p){const prev=p.inj,sev=q.injT==='s';
   if(sev)p.inj='s';else if(prev!=='s')p.inj='l';
   if(sev&&prev!=='s')showEv('🚑 '+p.name+' sufrió una lesión grave: requiere cambio',2600);
   if(subOpen())renderSub();
  }}}catch(e){}return r});

 /* d2) menú de sala durante Carrera: pausa automática y reanudación con cuenta regresiva de 3 s */
 hook('toggleMenu',o=>function(){
  const was=!!menuOpen,r=o.apply(this,arguments);
  try{if(CM.live&&LIVE&&!LIVE.res&&G&&!G.over&&!subOpen()){
   if(menuOpen){G.paused=true;G.cd=0}
   else if(was){G.paused=false;G.cd=3}
  }}catch(e){}
  return r;
 });
 /* d) empate al terminar el tiempo: Fase Regular = fin; Playoffs = 1 min extra → penales */
 hook('startVote',o=>function(){
  if(!CM.live||!LIVE)return o.apply(this,arguments);
  if(S.phase!=='playoffs')return end();
  if(!G.cET){
   G.cET=true;G.duration+=60;showEv('⏱ ¡TIEMPO EXTRA! · 1 minuto',3200);try{chime()}catch(e){}
   kickoff();G.cd=3;hud();return;
  }
  startPens();
 });
 /* e) fin del partido: congela el reinicio automático y muestra el resultado */
 hook('end',o=>function(){
  const was=!!(G&&G.over);
  if(CM.live&&LIVE&&!was)snapCards(); /* ANTES de o.apply: end() limpia p.yc / p.rc */
  const r=o.apply(this,arguments);
  if(CM.live&&LIVE&&!was)onEnd();
  return r;
 });

 /* Tarjetas del partido: se guardan en me y en cada bot de LIVE.slots (_lastYc / _wasExp) y por jugador en LIVE.cards */
 function snapCards(){
  const L=LIVE;if(!L||L.snapped)return;L.snapped=true;L.cards=L.cards||{};
  const bots=L.slots.map(s=>s.bot);
  [me].concat(bots).forEach(p=>{if(!p)return;p._lastYc=p.yc||0;p._wasExp=(p.team==='spec'&&!!p.rt)});
  L.slots.forEach(s=>{L.cards[s.id]={yc:s.bot._lastYc,exp:s.bot._wasExp}});
  L.meCards={yc:me._lastYc,exp:me._wasExp};
 }
 /* Suspensiones: cumplen fecha los ya suspendidos, después se procesan las tarjetas de este partido */
 function applyDiscipline(){
  const L=LIVE,info=S.squad.info,P=S.player;
  [P].concat(Object.keys(info).map(id=>info[id])).forEach(p=>{if((p.susp||0)>0)p.susp=Math.max(0,p.susp-1)});
  const proc=(p,yc,exp)=>{
   if(exp){p.susp=1;return}
   if(yc>0){p.ycTotal=(p.ycTotal||0)+1;if(p.ycTotal>=4){p.susp=1;p.ycTotal=0}}
  };
  Object.keys(L.cards||{}).forEach(id=>{const p=info[id];if(p)proc(p,L.cards[id].yc||0,!!L.cards[id].exp)});
  if(L.meCards)proc(P,L.meCards.yc||0,!!L.meCards.exp);
 }
 /* Auto-reemplazo de titulares suspendidos: primer suplente no suspendido del mismo puesto (GK por GK, campo por campo) */
 function fixSuspended(){
  const q=S.squad,info=q.info;
  q.starters.forEach((id,i)=>{
   if(!((info[id].susp||0)>0))return;
   const gk=info[id].pos==='GK',j=q.bench.findIndex(b=>!((info[b].susp||0)>0)&&((info[b].pos==='GK')===gk));
   if(j>=0){const bid=q.bench[j];q.bench[j]=id;q.starters[i]=bid}
  });
 }
 /* 6.º jugador de cancha cuando S.player está suspendido: primer suplente disponible (prefiere GK solo si no hay arquero titular) */
 function pickExtra(){
  const q=S.squad,info=q.info,ok=id=>!((info[id].susp||0)>0),hasGK=q.starters.some(id=>info[id].pos==='GK');
  let j=q.bench.findIndex(id=>ok(id)&&((info[id].pos==='GK')===!hasGK));
  if(j<0)j=q.bench.findIndex(ok);
  return j<0?null:{id:q.bench[j],idx:j};
 }
 /* Tarjetas en vivo de un jugador (modal de cambios): en cancha → su bot; en el banco → lo que quedó registrado */
 function liveCard(id){
  const L=LIVE,s=L&&L.slots.find(x=>x.id===id);
  if(s){const b=s.bot;return{yc:b.yc||0,exp:b.team==='spec'||!!b.rt,susp:false}}
  const c=L&&L.cards&&L.cards[id];
  return{yc:c?c.yc:0,exp:false,susp:((S.squad.info[id]||{}).susp||0)>0};
 }

 /* Dificultad dinámica del rival: Playoffs = 100% hard; fase regular según su posición en la tabla (fecha 1: por fuerza del club) */
 function pickMatchDiff(rivalId){
  if(S.phase==='playoffs')return 'hard';
  if(S.phase!=='regular')return 'normal';
  const z=S.zonaDe[rivalId],rows=stats(S.zones[z]);
  let pos;
  if(rows.every(r=>r.pts===0)){
   const ids=S.zones[z].slice().sort((a,b)=>(S.str[b]||1)-(S.str[a]||1));
   pos=ids.indexOf(rivalId)+1;
  }else pos=rankOf(rivalId).pos;
  const r=Math.random();
  if(pos<=5)return r<.85?'hard':'normal';
  if(pos<=10)return r<.25?'hard':r<.85?'normal':'easy';
  return r<.10?'hard':r<.80?'normal':'easy';
 }
 function playMatch(){
  const m=userMatch();if(!m||CM.live)return;
  const hT=T(m.h),aT=T(m.a),myHome=m.h===S.teamId,rvT=myHome?aT:hT;
  const ks=kitsFor(m),kH=ks.kH,kA=ks.kA;
  user.nick=S.player.name;user.num=String(S.player.num);
  enter({id:9001,name:'Modo Carrera',size:'realista',mode:'realistic',max:12,priv:true,pass:'',n:0,owner:'Carrera'},false);
  isAdmin=false;
  const team=myHome?'red':'blue',rteam=myHome?'blue':'red';
  fixSuspended(); /* titulares suspendidos → suplente del mismo puesto */
  const sus=(S.player.susp||0)>0,ex=sus?pickExtra():null;
  me.name=S.player.name;me.num=String(S.player.num);me.team=sus?'spec':team; /* suspendido: mirás desde afuera */
  const ids=S.squad.starters.concat(ex?[ex.id]:[]); /* suspendido: 5 titulares + 1 suplente = 6v6 */
  const mine=ids.map(id=>{const i=S.squad.info[id],b=mk(i.name,String(i.number),team,true);b.pos=i.pos;b.cSlot=true;b.cId=id;b.stam=i.stam;b.cInj=false;return b});
  const rv=[];for(let i=0;i<6;i++)rv.push(mk('','',rteam,true));
  /* 4) el rival conserva siempre su dorsal oficial: NO se le pasa el dorsal del usuario (la reasignación por duplicado solo rige en tu equipo, vía resolverPlantelCancha) */
  try{D.aplicarPlantelABots(rv,rvT.id,null)}catch(e){D.aplicarPlantelABots(rv,rvT.id,-1)}
  rv.forEach(b=>{b.name=b.nick||b.name;b.num=String(b.num)});
  G.players=[me].concat(mine,rv);
  G.uni={red:Object.assign({},kH),blue:Object.assign({},kA)};
  G.duration=S.minutes*60;G.goalLimit=0;G.super=false;G.cET=false;
  G.teamTactics={red:calcBias(m.h,true),blue:calcBias(m.a,false)};
  STAD=stadClean(m.neutral?null:hT.stadium);if(typeof STAD_CF!=='undefined')STAD_CF.length=0;
  CM.live=true;
  LIVE={m,slots:mine.map((b,i)=>({bot:b,id:ids[i],t0:0})),bench:S.squad.bench.filter(id=>!ex||id!==ex.id),extraId:ex?ex.id:null,extraIdx:ex?ex.idx:-1,cards:{},subs:0,played:{},inj:{},sel:null,res:null,done:false,timer:0};
  document.body.classList.add('careerOn','cmInGame');
  const lv=$('mLeave');if(lv)lv.textContent='Abandonar partido';
  const hn=$('hint');if(hn){if(!hn.dataset.o)hn.dataset.o=hn.textContent;hn.textContent='ESC: menú · P: pausa y cambios · Flechas / WASD: mover · Espacio / X: patear'}
  try{if(typeof setBotDiff==='function')setBotDiff(pickMatchDiff(rvT.id))}catch(e){} /* dificultad oculta al usuario */
  restart();G.cd=3;
  Object.keys(keys).forEach(k=>keys[k]=0);
  try{$('c').focus()}catch(e){}
  showEv((myHome?'🏟️ ':'✈️ ')+hT.name+' vs '+aT.name,2600);
 }

 /* ---- panel de cambios (P / menú) ---- */
 const subOpen=()=>$('cmSub')&&$('cmSub').classList.contains('on');
 function openSub(){
  if(!CM.live||!LIVE||!G||G.over||LIVE.res)return;
  if(G.pen){showEv('No hay cambios durante la tanda de penales',1800);return}
  G.paused=true;G.cd=0;Object.keys(keys).forEach(k=>keys[k]=0);
  LIVE.sel=null;renderSub();$('cmSub').classList.add('on');
 }
 function closeSub(){
  $('cmSub').classList.remove('on');
  if(G&&!G.over&&CM.live&&!menuOpen){G.paused=false;G.cd=3}
  Object.keys(keys).forEach(k=>keys[k]=0);try{$('c').focus()}catch(e){}
 }
 function renderSub(msg){
  const q=S.squad,L=LIVE;
  $('cmSub').innerHTML='<div class="cmCard"><h2>🔄 Realizar Cambio ('+L.subs+'/3)</h2><div class="cmCols"><div><h3>En cancha</h3>'+userRow(true)+
   L.slots.map((s,i)=>prHtml(q.info[s.id],'s',i,L.sel&&L.sel.k==='s'&&L.sel.i===i,liveCard(s.id))).join('')+'</div>'+
   '<div><h3>Banco de suplentes</h3>'+L.bench.map((id,i)=>prHtml(q.info[id],'b',i,L.sel&&L.sel.k==='b'&&L.sel.i===i,liveCard(id))).join('')+'</div></div>'+
   '<div class="cmNote" id="cmSubMsg">'+(msg?E(msg):'Tocá un jugador en cancha y después un suplente. Máximo 3 cambios por partido; el arquero solo por otro arquero.')+'</div>'+
   '<div class="cmRow"><button id="cmSubClose" class="cmBig" type="button">▶ Reanudar partido</button>'+(meRed()?'<button id="cmSubSim" class="cmBig" type="button">⏩ Reemplazar y simular resto</button>':'')+'</div></div>';
  $('cmSubClose').onclick=closeSub;
  const bsim=$('cmSubSim');if(bsim)bsim.onclick=simRestMatch;
  $('cmSub').querySelectorAll('.cmPr[data-k]').forEach(b=>b.onclick=()=>subClick(b.dataset.k,+b.dataset.i));
 }
 function subClick(k,i){
  const L=LIVE;
  if(k==='s'){const s=L.slots[i];if(s&&(s.bot.team==='spec'||!!s.bot.rt))return renderSub('⚠️ No podés sustituir a un jugador expulsado.')}
  if(k==='b'&&((S.squad.info[L.bench[i]].susp||0)>0))return renderSub('⚠️ Ese jugador está suspendido y no puede ingresar.');
  if(!L.sel||L.sel.k===k){L.sel={k,i};return renderSub()}
  const si=k==='s'?i:L.sel.i,bi=k==='b'?i:L.sel.i;L.sel=null;
  doSub(si,bi);
 }
 function doSub(si,bi){
  const L=LIVE,q=S.squad,sl=L.slots[si],outId=sl.id,inId=L.bench[bi],out=q.info[outId],inn=q.info[inId];
  if(sl.bot.team==='spec'||!!sl.bot.rt)return renderSub('⚠️ No podés sustituir a un jugador expulsado.');
  if((inn.susp||0)>0)return renderSub('⚠️ Ese jugador está suspendido y no puede ingresar.');
  if(L.subs>=3)return renderSub('⚠️ Ya usaste los 3 cambios.');
  if((out.pos==='GK')!==(inn.pos==='GK'))return renderSub('⚠️ El arquero solo puede cambiarse por otro arquero.');
  const now=G.clock||0;
  L.played[outId]=(L.played[outId]||0)+Math.max(0,now-sl.t0);
  L.inj[outId]=L.inj[outId]||!!sl.bot.cInj;
  L.cards=L.cards||{};const prev=L.cards[inId];
  L.cards[outId]={yc:sl.bot.yc||0,exp:false}; /* el bot de la ranura se reutiliza: las tarjetas viajan con el jugador */
  out.inj=null;L.bench[bi]=outId;sl.id=inId;sl.t0=now;
  const b=sl.bot;b.name=inn.name;b.num=String(inn.number);b.pos=inn.pos;b.stam=inn.stam;b.cId=inId;b.cInj=false;b.yc=prev?prev.yc:0;b.fc=0;b.rc=0;
  try{injClear(b)}catch(e){}b.sl=null;
  L.subs++;
  renderSub('✅ Entra '+inn.name+' (#'+inn.number+', '+inn.stam+'%) por '+out.name+'.');
  try{showEv('🔄 Cambio: entra '+inn.name+' (#'+inn.number+')',2200)}catch(e){}
 }

 /* ---- expulsión del usuario: reemplazar y simular el resto ---- */
 const meRed=()=>!!(CM.live&&LIVE&&!LIVE.res&&typeof G!=='undefined'&&G&&!G.over&&!G.pen&&typeof me!=='undefined'&&me&&me.team==='spec'&&!!me.rt);
 function syncRed(){const on=meRed();document.body.classList.toggle('cmRed',on);return on}
 /* entra el primer suplente disponible (no suspendido ni expulsado) por el bot en cancha de menor stamina (mismo rol GK/campo): la roja deja 5 bots */
 function autoSubIn(){
  const L=LIVE,info=S.squad.info,now=G.clock||0;
  for(let bi=0;bi<L.bench.length;bi++){
   const inId=L.bench[bi],inn=info[inId],pc=L.cards&&L.cards[inId];
   if((inn.susp||0)>0||(pc&&pc.exp))continue;
   let si=-1;
   L.slots.forEach((s,i)=>{
    if(s.bot.team==='spec'||!!s.bot.rt)return;
    if((info[s.id].pos==='GK')!==(inn.pos==='GK'))return;
    if(si<0||info[s.id].stam<info[L.slots[si].id].stam)si=i;
   });
   if(si<0)continue;
   const sl=L.slots[si],outId=sl.id,out=info[outId];
   L.played[outId]=(L.played[outId]||0)+Math.max(0,now-sl.t0);
   L.inj[outId]=L.inj[outId]||!!sl.bot.cInj;
   L.cards=L.cards||{};
   L.cards[outId]={yc:sl.bot.yc||0,exp:false};
   out.inj=null;L.bench[bi]=outId;sl.id=inId;sl.t0=now;
   const b=sl.bot;b.name=inn.name;b.num=String(inn.number);b.pos=inn.pos;b.stam=inn.stam;b.cId=inId;b.cInj=false;b.yc=pc?pc.yc:0;b.fc=0;b.rc=0;
   try{injClear(b)}catch(e){}b.sl=null;
   return inn;
  }
  return null;
 }
 function simRestMatch(){
  if(!meRed())return;
  if(!confirm('Quedaste expulsado. ¿Reemplazar y simular el resto del partido? Entra un suplente y el resultado se calcula con los minutos que faltan.'))return;
  const L=LIVE,m=L.m,myHome=m.h===S.teamId,base=S.minutes*60;
  const rem=Math.max(0,G.duration-G.clock);
  autoSubIn();
  snapCards(); /* registra amarillas y tu expulsión (suspensión) */
  /* goles probables de los minutos que faltan: proporcionales al tiempo y a la fuerza; el rival juega con 1 más */
  const f=Math.min(1,rem/base),sh=st(m.h),sa=st(m.a);
  let lh=1.3*Math.pow(sh/sa,.9)*1.08*f,la=1.05*Math.pow(sa/sh,.9)*f;
  if(myHome){lh*=.8;la*=1.25}else{la*=.8;lh*=1.25}
  let hg=G.score.red+Math.min(4,pois(lh)),ag=G.score.blue+Math.min(4,pois(la)),ph=null,pa=null;
  if(S.phase==='playoffs'&&hg===ag){ /* empate en eliminatoria: gol en el minuto extra o penales */
   G.cET=true;const r=Math.random();
   if(r<.22)hg++;else if(r<.44)ag++;
   else{
    const hw=Math.random()<Math.max(.3,Math.min(.7,.5+(sh-sa)*.25)),w=rnd(3,5),l=Math.max(0,w-rnd(1,2));
    ph=hw?w:l;pa=hw?l:w;
   }
  }
  G.score.red=hg;G.score.blue=ag;
  L.res={hg,ag,ph,pa,total:Math.max(base,G.clock||0)}; /* total = partido completo → desgaste de stamina completo */
  clearTimeout(L.timer);
  finishMatch();
 }

 /* ---- fin de partido ---- */
 function onEnd(){
  if(!LIVE||LIVE.res)return;
  const P=G.pen;let ph=null,pa=null;
  if(P&&P.res&&P.win){ph=P.res.red.filter(x=>x==='g').length;pa=P.res.blue.filter(x=>x==='g').length}
  LIVE.res={hg:G.score.red,ag:G.score.blue,ph,pa,total:Math.max(1,G.clock)};
  G.endT=1e9; /* evita el reinicio automático del motor */
  if(subOpen())$('cmSub').classList.remove('on');
  LIVE.timer=setTimeout(showEnd,2800);
 }
 function showEnd(){
  if(!LIVE||!LIVE.res)return;
  const m=LIVE.m,r=LIVE.res,h=T(m.h),a=T(m.a),myHome=m.h===S.teamId;
  const my=myHome?r.hg:r.ag,rv=myHome?r.ag:r.hg;
  let res,pts='';
  if(my>rv||(my===rv&&r.ph!=null&&(myHome?r.ph>r.pa:r.pa>r.ph))){res='🏆 ¡VICTORIA!';pts=S.phase==='regular'?'+3 puntos':'Pasás de ronda'}
  else if(my===rv&&r.ph==null){res='🤝 Empate';pts=S.phase==='regular'?'+1 punto':''}
  else{res='😞 Derrota';pts=S.phase==='regular'?'0 puntos':'Quedás eliminado'}
  $('cmEnd').innerHTML='<div class="cmCard"><h2>Final del partido</h2><div class="sc">'+E(h.shortName)+' '+r.hg+' - '+r.ag+' '+E(a.shortName)+'</div>'+
   (r.ph!=null?'<div class="cmNote">Penales: '+r.ph+' - '+r.pa+'</div>':'')+(G.cET?'<div class="cmNote">Se jugó tiempo extra</div>':'')+
   '<div class="rs">'+res+(pts?' · '+pts:'')+'</div><button id="cmEndBtn" class="cmBig" type="button">Continuar</button></div>';
  $('cmEndBtn').onclick=()=>finishMatch(false);
  $('cmEnd').classList.add('on');
 }
 function forfeit(){
  if(!LIVE||LIVE.done)return;
  clearTimeout(LIVE.timer);snapCards(); /* abandonar no pasa por end(): se guardan las tarjetas acá */
  const myHome=LIVE.m.h===S.teamId;
  LIVE.res={hg:myHome?0:3,ag:myHome?3:0,ph:null,pa:null,total:1,forfeit:true};
  finishMatch(true);
 }
 function finishMatch(){
  if(!LIVE||LIVE.done||!LIVE.res)return;
  LIVE.done=true;clearTimeout(LIVE.timer);
  const L=LIVE,r=L.res,m=L.m;
  const total=r.total;
  if(r.forfeit){L.slots.forEach(s=>{L.played[s.id]=total;L.inj[s.id]=false})}
  else L.slots.forEach(s=>{L.played[s.id]=(L.played[s.id]||0)+Math.max(0,total-s.t0);L.inj[s.id]=L.inj[s.id]||!!s.bot.cInj});
  applyStamina(L.played,L.inj,total);
  applyDiscipline();
  if(L.extraId!=null){ /* S.player suspendido: el 6.º de cancha vuelve al banco */
   const sid=L.slots.map(s=>s.id),ex=sid.pop(),bn=L.bench.slice();bn.splice(Math.min(L.extraIdx,bn.length),0,ex);
   S.squad.starters=sid;S.squad.bench=bn;
  }else{S.squad.starters=L.slots.map(s=>s.id);S.squad.bench=L.bench.slice()}
  recordUser(m,r);
  save();
  leaveGame();
  const champ=S.phase==='done'&&S.po.champ===S.teamId&&!S.champShown;
  if(champ){S.champShown=true;save()}
  openHub('next');
  if(champ)showChamp();
 }
 function leaveGame(){
  CM.live=false;LIVE=null;
  document.body.classList.remove('careerOn','cmInGame','cmRed');
  try{if(typeof setBotDiff==='function')setBotDiff('normal')}catch(e){}
  ['cmSub','cmEnd'].forEach(i=>{const e=$(i);if(e)e.classList.remove('on')});
  try{menuOpen=false;$('menu').classList.add('hidden');$('vote').classList.add('hidden')}catch(e){}
  if(G)G.paused=false;
  const lv=$('mLeave');if(lv)lv.textContent='Salir de la sala';
  const hn=$('hint');if(hn&&hn.dataset.o)hn.textContent=hn.dataset.o;
 }
 function showChamp(){
  const t=T(S.teamId);
  $('cmChamp').innerHTML='<div class="cmCard"><h1>🏆 ¡CAMPEÓN DE PRIMERA DIVISIÓN!</h1><span class="cmBd">'+badge(t)+'</span><b style="font-size:1.3rem">'+E(t.name)+'</b><div class="cmNote">'+E(S.player.name)+' (#'+S.player.num+') levantó la copa.</div><button id="cmChampBtn" class="cmBig" type="button">Continuar</button></div>';
  $('cmChampBtn').onclick=()=>$('cmChamp').classList.remove('on');
  $('cmChamp').classList.add('on');
 }

 /* ------------------------------------------------------------------
  7) Eventos globales (P, menú, abandonar, continuar campaña)
  ------------------------------------------------------------------ */
 function wireGlobal(){
  window.addEventListener('keydown',e=>{
   if(!CM.live||!LIVE||LIVE.res)return;
   const tg=document.activeElement&&document.activeElement.tagName||'';
   if(e.code==='KeyP'&&!e.repeat){if(/INPUT|SELECT|TEXTAREA/.test(tg))return;e.preventDefault();e.stopImmediatePropagation();if(subOpen())closeSub();else openSub();return}
   if(e.code==='Escape'&&subOpen()){e.preventDefault();e.stopImmediatePropagation();closeSub()}
  },true);
  const sb=$('cmSubBtn');if(sb)sb.onclick=()=>{subOpen()?closeSub():openSub()};
  const ms=$('cmMenuSub');if(ms)ms.onclick=()=>{try{toggleMenu(false)}catch(e){}openSub()};
  const sr=$('cmSimRestBtn');if(sr)sr.onclick=simRestMatch;
  const msr=$('cmMenuSim');if(msr)msr.onclick=simRestMatch;
  setInterval(syncRed,400);
  const menu=$('menu');
  if(menu)menu.addEventListener('click',e=>{
   if(!CM.live||!e.target.closest||!e.target.closest('#mLeave'))return;
   e.stopImmediatePropagation();e.preventDefault();
   if(confirm('¿Abandonar el partido? Se cuenta como derrota 0-3 (en Playoffs quedás eliminado).')){try{toggleMenu(false)}catch(er){}forfeit()}
  },true);
 }

 function injectContinue(){
  const root=$('career-root');if(!root)return;
  const ex=$('cmCont');
  const sv=loadSave();
  if(!sv){if(ex)ex.remove();return}
  if(ex)return;
  const t=T(sv.teamId),d=document.createElement('div');d.id='cmCont';
  const info=sv.phase==='regular'?'Fecha '+sv.fecha+'/16 · Zona '+sv.myZone:sv.phase==='playoffs'?'Playoffs':'Temporada finalizada';
  d.innerHTML='<b>▶ Campaña guardada: '+E(t.name)+'</b><div class="cNote">'+E(sv.player.name)+' (#'+sv.player.num+') · '+info+'. Si iniciás una temporada nueva, se reemplaza la guardada.</div><div class="cmRow"><button type="button" id="cmCont1" class="cmBig">▶ CONTINUAR TEMPORADA</button></div>';
  root.insertBefore(d,root.firstChild);
  $('cmCont1').onclick=()=>{S=loadSave();if(S)openHub('next')};
 }

 /* ------------------------------------------------------------------
  Portada · botón MODO CARRERA (solo UI: estilo + barra de info; no toca lógica)
  ------------------------------------------------------------------ */
 const START_INFO='Convertite en un crack y llevá a tu equipo favorito hasta la cima.',START_DEF='Selecciona una opción para continuar';
 function injectStartButton(){
  const btn=$('homeCareer');if(!btn)return;
  if(!$('cmStartCSS')){
   const s=document.createElement('style');s.id='cmStartCSS';
   s.textContent=`
#screen-home #homeCareer{background:linear-gradient(180deg,#1f6e3d 0%,#144928 100%)!important;box-shadow:inset 0 0 0 2.5px #d4af37,0 5px 0 rgba(0,0,0,.38),0 8px 10px rgba(0,0,0,.18)!important}
#screen-home #homeCareer.hbar{width:100%;height:var(--h);padding:0 6%;gap:5%;border:3px solid #111827;border-radius:clamp(18px,3.6vh,32px);
 background:#185a32;
 box-shadow:inset 0 0 0 2px #d4af37,0 5px 0 rgba(0,0,0,.4),0 8px 10px rgba(0,0,0,.18)}
#screen-home #homeCareer.hbar:hover,#screen-home #homeCareer.hbar:focus-visible{background:#185a32;box-shadow:inset 0 0 0 2px #d4af37,0 7px 0 rgba(0,0,0,.4),0 10px 12px rgba(0,0,0,.2)}
#screen-home #homeCareer.hbar:active{box-shadow:inset 0 0 0 2px #d4af37,0 2px 0 rgba(0,0,0,.4)}
#screen-home #homeCareer.hbar::after{display:none}
#screen-home #homeCareer .hico{height:83%;width:auto;aspect-ratio:1;flex:none;display:block;overflow:visible}
#screen-home #homeCareer .hsub{display:none!important}`;
   document.head.appendChild(s);
  }
  if(btn.dataset.cmStart)return;btn.dataset.cmStart='1';
  btn.removeAttribute('data-info');
  btn.innerHTML='<svg class="hico" viewBox="0 0 64 64"><path d="M18 10h28v16c0 9-6 15-14 15s-14-6-14-15V10z" fill="#facc15" stroke="#111827" stroke-width="4"/><path d="M18 14H10c0 9 4 13 8 13M46 14h8c0 9-4 13-8 13" fill="none" stroke="#facc15" stroke-width="5" stroke-linecap="round"/><path d="M18 14H10c0 9 4 13 8 13M46 14h8c0 9-4 13-8 13" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round"/><rect x="28" y="40" width="8" height="9" fill="#d4af37" stroke="#111827" stroke-width="3"/><rect x="20" y="49" width="24" height="6" rx="2" fill="#facc15" stroke="#111827" stroke-width="3"/></svg><span>MODO CARRERA</span>';
  const info=$('homeInfo');
  const on=()=>{if(info)info.textContent=START_INFO},off=()=>{if(info)info.textContent=START_DEF};
  btn.addEventListener('mouseenter',on);btn.addEventListener('focus',on);
  btn.addEventListener('mouseleave',off);btn.addEventListener('blur',off);
 }

 function init(){
  injectCSS();injectStartButton();ensureDom();wireGlobal();
  const hc=$('homeCareer');
  if(hc)hc.addEventListener('click',()=>setTimeout(injectContinue,0));
  const root=$('career-root');
  if(root)new MutationObserver(()=>{if(!$('cmCont'))injectContinue()}).observe(root,{childList:true});
  window.addEventListener('career:start',e=>{
   try{S=newSeason(e.detail);save();const c=$('cmCont');if(c)c.remove();openHub('next')}
   catch(er){console.error('[CareerMode] no se pudo crear la temporada',er)}
  });
  window.CAREER_MODE_API={getSeason:()=>S,openHub,newSeason,_t:{buildFixture,stats,simKO,rounds15,applyStamina,stamF,clash,setS:v=>{S=v},userMatch,recordUser,simRest}};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
