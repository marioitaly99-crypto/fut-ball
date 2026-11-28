/* =====================================================================
 CareerMode.js · Modo Carrera — Argentina · Primera División + Primera Nacional
 (cruce entre categorías: Tabla Anual, ascensos/descensos y Copa Argentina de 64 equipos)
 ---------------------------------------------------------------------
 Se carga DESPUÉS de LigaData.js y del script principal de index.html.
 No modifica el juego online, PeerJS, editores, lesiones, tiros libres ni
 BotAIController: solo "envuelve" (en memoria) unas pocas funciones del motor
 y únicamente mientras hay un partido de Carrera en juego (CM.live).
 Guardado: localStorage 'futball_career_save_v2'.
 ===================================================================== */
(function(){
 const D1=window.LIGA_ARGENTINA_DATA,DB=window.LIGA_BNACIONAL_DATA;
 if(!D1){console.warn('[CareerMode] Falta LigaData.js');return}
 let D=D1; /* datos de la categoría activa (S.division): 'primera' → LIGA_ARGENTINA_DATA · 'bnacional' → LIGA_BNACIONAL_DATA */
 const dataOf=div=>div==='bnacional'&&DB?DB:D1;
 const $=id=>document.getElementById(id);
 const K2='futball_career_save_v2';
 const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
 const safeTeam=(d,id)=>{try{return d&&d.getTeam?d.getTeam(id)||null:null}catch(e){return null}};
 const T=id=>safeTeam(D,id)||safeTeam(D1,id)||safeTeam(DB,id); /* un club ascendido/descendido se resuelve en cualquiera de las dos bases */
 const ownerOf=id=>safeTeam(D,id)?D:safeTeam(D1,id)?D1:safeTeam(DB,id)?DB:D; /* base de datos (LIGA_ARGENTINA_DATA / LIGA_BNACIONAL_DATA) a la que pertenece el club */
 const allTeams=()=>D1.teams.concat(DB&&DB.teams?DB.teams:[]);
 const STAGES_P=['octavos','cuartos','semis','final'],STAGES_B=['inicial','cuartos','semis','final']; /* Primera Nacional: 'inicial' = Final 1.º Ascenso + 1.ª Fase del Reducido */
 const LBL_P={octavos:'Octavos de Final',cuartos:'Cuartos de Final',semis:'Semifinales',final:'Final'};
 const LBL_B={inicial:'Final 1.º Ascenso y 1.ª Fase del Reducido',cuartos:'Cuartos de Final del Reducido',semis:'Semifinales del Reducido',final:'Final del Reducido (2.º Ascenso)',asc:'Campeón (1.º Ascenso)'};
 let STAGES=STAGES_P,STAGE_LBL=LBL_P;
 const DIVN={primera:'Primera División',bnacional:'Primera Nacional'};
 const POSL={GK:'ARQ',DEF:'DEF',MID:'MED',FWD:'DEL'};
 let S=null,TAB='next',uid=0,SEL=null,LIVE=null;
 const CM={live:false};
 const isBN=()=>!!S&&S.division==='bnacional';
 const NF=()=>isBN()?17:16; /* fechas de la fase regular */
 function setDiv(div){const b=div==='bnacional'&&!!DB;D=b?DB:D1;STAGES=b?STAGES_B:STAGES_P;STAGE_LBL=b?LBL_B:LBL_P;FXS=b?FXS_B:FXS_P;return b?'bnacional':'primera'}
 const isCopaM=m=>!!(m&&m.copa);
 const isKO=()=>!!S&&(S.phase==='playoffs'||S.phase==='trofeo'||!!(LIVE&&isCopaM(LIVE.m))); /* partido de eliminación (Copa: penales directos, sin tiempo extra) */
 /* ---- Copa Argentina: 64 equipos (30 de Primera División + 34 de Primera Nacional) desde 32avos de Final · cancha neutral ---- */
 const COPA_ST=['treintaidosavos','dieciseisavos','octavos','cuartos','semi','final'];
 const COPA_LBL={treintaidosavos:'32avos de Final',dieciseisavos:'16avos de Final',octavos:'Octavos de Final',cuartos:'Cuartos de Final',semi:'Semifinales',final:'Final'};
 const COPA_PTS=[['apertura',3,'treintaidosavos'],['apertura',8,'dieciseisavos'],['apertura',13,'octavos'],['clausura',3,'cuartos'],['clausura',9,'semi'],['clausura',14,'final']]; /* Primera: ronda tras la fecha n del torneo */
 const COPA_PTS_B=[['bnacional',3,'treintaidosavos'],['bnacional',6,'dieciseisavos'],['bnacional',9,'octavos'],['bnacional',12,'cuartos'],['bnacional',14,'semi'],['bnacional',16,'final']]; /* Primera Nacional (17 fechas) */
 const copaPts=()=>isBN()?COPA_PTS_B:COPA_PTS;
 const copaTn=t=>t==='apertura'?'Apertura':t==='clausura'?'Clausura':'torneo';
 const COPA_VENUES=['ROS','COR','MZA'];
 const TN_LBL={apertura:'TORNEO APERTURA',clausura:'TORNEO CLAUSURA',bnacional:'PRIMERA NACIONAL'};
 const tnName=()=>TN_LBL[S.torneo]||'TORNEO';

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

 /* Primera Nacional: todos contra todos a UNA rueda dentro de cada zona de 18 → 17 fechas × (9 + 9) partidos, sin libres, clásicos ni interzonal */
 function rounds18(n){
  const arr=[],out=[];for(let i=0;i<n;i++)arr.push(i);
  for(let r=0;r<n-1;r++){
   const ms=[];for(let i=0;i<n/2;i++)ms.push([arr[i],arr[n-1-i]]);
   out.push(ms);arr.splice(1,0,arr.pop());
  }
  return out;
 }
 function buildFixtureBN(A,B){
  const R=rounds18(A.length),fx=[];
  for(let r=0;r<R.length;r++){
   const f=[];
   R[r].forEach(([x,y])=>{f.push(((r+x+y)%2)?mm(A[y],A[x],'Z'):mm(A[x],A[y],'Z'))});
   R[r].forEach(([x,y])=>{f.push(((r+x+y)%2)?mm(B[y],B[x],'Z'):mm(B[x],B[y],'Z'))});
   fx.push(f);
  }
  return fx;
 }
 const BIG_B=['chacarita','atlanta','chicago','ferro','quilmes','colon','godoy_cruz','sanmartin_tuc','almirante','patronato'];
 const BIG=['boca','river','racing','independiente','sanlorenzo','estudiantes','velez','talleres','rosario','lanus'];
 /* Tácticas por club (ADN): el resto es 'balanced' */
 const CLUB_STYLE={river:'offensive',racing:'offensive',boca:'offensive',velez:'offensive',argentinos:'offensive',talleres:'offensive',defensa:'offensive',estudiantes:'defensive',sanlorenzo:'defensive',belgrano:'defensive',platense:'defensive',riestra:'defensive',sarmiento:'defensive',barracas:'defensive',central_cordoba:'defensive'};
 const styleOf=id=>CLUB_STYLE[id]||'balanced';
 function calcBias(id,isHome){
  let b=({offensive:.08,balanced:0,defensive:-.08})[styleOf(id)];
  if(S.phase==='regular'&&S.zonaDe[id]){
   const pos=rankOf(id).pos,zn=S.zones[S.zonaDe[id]].length;
   if(pos>=1&&pos<=4)b+=.05;
   else if(pos>=8&&pos<=zn-4&&S.fecha>=NF()-4)b+=.08;
   else if(pos>=zn-3&&pos<=zn){b-=.06;if(!isHome)b-=.03}
  }else if(isKO())b+=.04;
  return b;
 }
 function newSquad(teamId,num){
  const r=ownerOf(teamId).resolverPlantelCancha(teamId,num),info={};
  const st=r.starters.slice(0,5),bn=r.subs.slice(0,9); /* banco: hasta 9 suplentes; el 6.º titular del club es el lugar de tu jugador */
  const starters=[],bench=[];
  st.forEach((p,i)=>{const id='s'+i;info[id]={id,name:p.name,number:p.number,pos:p.pos,stam:100,ycTotal:0,susp:0};starters.push(id)});
  bn.forEach((p,i)=>{const id='b'+i;info[id]={id,name:p.name,number:p.number,pos:p.pos,stam:100,ycTotal:0,susp:0};bench.push(id)});
  return{info,starters,bench};
 }


 /* ------------------------------------------------------------------
  0b) CRUCE Primera ↔ Primera Nacional: zonas de ambas categorías (S.cross), Tabla Anual,
      ascensos/descensos entre temporadas. Los equipos se leen de LIGA_ARGENTINA_DATA.teams y LIGA_BNACIONAL_DATA.teams.
  ------------------------------------------------------------------ */
 const NZ={primera:15,bnacional:18};
 const zoneOk=(z,div)=>{
  if(!z||!z.A||!z.B||z.A.length!==NZ[div]||z.B.length!==NZ[div])return false;
  const all=z.A.concat(z.B);
  return new Set(all).size===all.length&&all.every(id=>!!T(id));
 };
 function newStr(){const str={};allTeams().forEach(t=>{str[t.id]=+(0.82+Math.random()*0.42+((BIG.indexOf(t.id)>=0||BIG_B.indexOf(t.id)>=0)?0.1:0)).toFixed(3)});return str}
 function ensureStr(s){s.str=s.str||{};allTeams().forEach(t=>{if(!(t.id in s.str))s.str[t.id]=+(0.82+Math.random()*0.42+((BIG.indexOf(t.id)>=0||BIG_B.indexOf(t.id)>=0)?0.1:0)).toFixed(3)})}
 /* Zona B ordenada para que B[i] sea el clásico de A[i] cuando ambos están en la zona correcta */
 function alignClassics(A,Bz){
  const set=new Set(Bz),used=new Set(),B=new Array(A.length).fill(null);
  A.forEach((id,i)=>{const t=T(id),c=t&&t.classicRivalId;if(c&&set.has(c)&&!used.has(c)){B[i]=c;used.add(c)}});
  const rest=Bz.filter(id=>!used.has(id));
  return B.map(x=>x||rest.shift());
 }
 function defaultZones(div){
  const d=div==='bnacional'?DB:D1;if(!d||!d.teams)return null;
  let z=null;
  try{if(typeof d.generarZonasAleatorias==='function'){const r=d.generarZonasAleatorias();if(r&&r.A&&r.B)z={A:r.A.slice(),B:r.B.slice()}}}catch(e){}
  if(!zoneOk(z,div)){ /* respaldo: clásicos en zonas opuestas */
   const ids=shuffle(d.teams.map(t=>t.id)),seen=new Set(),A=[],B=[],left=[];
   ids.forEach(id=>{if(seen.has(id))return;seen.add(id);const c=(safeTeam(d,id)||{}).classicRivalId;if(c&&!seen.has(c)&&ids.indexOf(c)>=0){seen.add(c);A.push(id);B.push(c)}else left.push(id)});
   left.forEach((id,i)=>(i%2?B:A).push(id));
   z={A,B};
  }
  return zoneOk(z,div)?z:null;
 }
 /* zonas de las dos categorías: la propia es la que se juega; la otra se simula al cerrar el año */
 function crossFor(st,div,zones){
  const o=div==='primera'?'bnacional':'primera',c={primera:null,bnacional:null};
  c[div]={A:zones.A.slice(),B:zones.B.slice()};
  const p=st.cross&&st.cross[o];
  c[o]=zoneOk(p,o)?{A:p.A.slice(),B:p.B.slice()}:((o==='bnacional'&&!DB)?null:defaultZones(o));
  return c;
 }
 function ensureCross(s){
  if(s.cross&&typeof s.cross==='object')return s.cross;
  const div=s.division==='bnacional'?'bnacional':'primera';
  s.cross=crossFor({},div,{A:s.zones.A,B:s.zones.B});
  return s.cross;
 }
 /* Copa Argentina: 30 clubes de Primera + 34 de Primera Nacional (si hay más, quedan los más fuertes; tu club siempre entra) */
 function copaField(cross,str,keep){
  const ids=d=>{const z=cross&&cross[d];return z&&z.A&&z.B?z.A.concat(z.B):(d==='primera'?D1.teams:(DB?DB.teams:[])).map(t=>t.id)};
  const prim=ids('primera');let bn=DB?ids('bnacional'):[];
  const need=Math.max(0,64-prim.length);
  if(bn.length>need)bn=bn.slice().sort((x,y)=>((y===keep)-(x===keep))||((str&&str[y]||1)-(str&&str[x]||1))).slice(0,need);
  return{prim,bn};
 }
 function quietSim(fx){fx.forEach(f=>f.forEach(m=>{const g=simGoals(m.h,m.a);m.hg=g[0];m.ag=g[1];m.done=true}))}
 function koQuiet(h,a){
  const g=simGoals(h,a);let hg=g[0],ag=g[1];
  if(hg===ag){const r=Math.random();if(r<.22)hg++;else if(r<.44)ag++}
  if(hg!==ag)return hg>ag?h:a;
  return Math.random()<Math.max(.3,Math.min(.7,.5+(st(h)-st(a))*.25))?h:a;
 }
 /* Primera División (categoría que no se juega): Apertura + Clausura simulados → filas ordenadas de la Tabla Anual */
 function simPrimeraYear(z){
  const A=z.A.slice(),B=alignClassics(A,z.B),fx=buildFixture(A,B),inv=fx.map(f=>f.map(m=>mm(m.a,m.h,m.kind))),all=fx.concat(inv);
  quietSim(all);
  return statsFx(all,A.concat(B));
 }
 /* Primera Nacional (categoría que no se juega): fase regular + Final 1.º Ascenso + Reducido → [campeón, ganador del Reducido] */
 function simBNYear(z){
  const fx=buildFixtureBN(z.A,z.B);quietSim(fx);
  const rA=statsFx(fx,z.A),rB=statsFx(fx,z.B),qA=rA.slice(0,8),qB=rB.slice(0,8),seed={};
  [qA,qB].forEach(rows=>rows.forEach((r,i)=>{seed[r.id]={pos:i+1,pts:r.pts,dg:r.gf-r.gc,gf:r.gf}}));
  const key=id=>{const x=seed[id]||{pos:99,pts:0,dg:0,gf:0};return[x.pos,-x.pts,-x.dg,-x.gf]};
  const cmp=(a,b)=>{const x=key(a),y=key(b);for(let i=0;i<4;i++)if(x[i]!==y[i])return x[i]-y[i];return 0};
  const duel=(a,b)=>cmp(a,b)<=0?koQuiet(a,b):koQuiet(b,a);
  const a0=qA[0].id,b0=qB[0].id,champ=duel(a0,b0),lo=champ===a0?b0:a0;
  const w1=[];for(let i=1;i<8;i++)w1.push(duel(qA[i].id,qB[8-i].id));
  const t=w1.concat([lo]).sort(cmp);
  const q=[duel(t[0],t[7]),duel(t[3],t[4]),duel(t[1],t[6]),duel(t[2],t[5])];
  const s=[duel(q[0],q[1]),duel(q[2],q[3])];
  return[champ,duel(s[0],s[1])];
 }
 /* Tabla Anual de Primera: puntos del Apertura (guardados al cerrar el torneo) + Clausura en curso = 32 fechas */
 function annualRows(){
  const ids=S.zones.A.concat(S.zones.B),cur=stats(ids),ap=S.apS||{};
  return cur.map(r=>{const a=ap[r.id]||{pj:0,g:0,e:0,p:0,gf:0,gc:0,pts:0};
   return{id:r.id,pj:r.pj+a.pj,g:r.g+a.g,e:r.e+a.e,p:r.p+a.p,gf:r.gf+a.gf,gc:r.gc+a.gc,pts:r.pts+a.pts}})
   .sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc)||b.gf-a.gf||T(a.id).name.localeCompare(T(b.id).name));
 }
 /* Cierre de año: ascensos (campeón de la Final + ganador del Reducido) ↔ descensos (2 últimos de la Tabla Anual) */
 function closeYear(){
  ensureCross(S);ensureStr(S);
  const cr=S.cross;let up=[],down=[];
  if(S.division==='primera'){
   down=annualRows().slice(-2).map(r=>r.id).reverse();
   if(DB&&zoneOk(cr.bnacional,'bnacional'))up=simBNYear(cr.bnacional);
  }else{
   up=[S.po&&S.po.champ,S.po&&S.po.asc2].filter(Boolean);
   if(zoneOk(cr.primera,'primera'))down=simPrimeraYear(cr.primera).slice(-2).map(r=>r.id).reverse();
  }
  const n=Math.min(up.length,down.length);
  return{up:up.slice(0,n),down:down.slice(0,n)};
 }
 /* intercambia en las zonas: cada ascendido ocupa el lugar de un descendido y viceversa */
 function swapDiv(cr,up,down){
  const out=JSON.parse(JSON.stringify(cr));
  const rep=(z,from,to)=>{['A','B'].forEach(k=>{const i=z[k].indexOf(from);if(i>=0)z[k][i]=to})};
  up.forEach((u,k)=>{rep(out.primera,down[k],u);rep(out.bnacional,u,down[k])});
  return out;
 }
 function clashes(cr){
  let n=0;
  ['primera','bnacional'].forEach(d=>['A','B'].forEach(k=>{const z=cr[d][k];z.forEach(id=>{const t=T(id),c=t&&t.classicRivalId;if(c&&z.indexOf(c)>=0)n++})}));
  return n;
 }
 /* simula lo que falta del año de la categoría propia (liga, Copa, playoffs/Reducido y Trofeo) */
 function simUserCopaPending(){
  const stg=S.copaDue;if(!stg)return;
  const m=copaUserM(stg);
  S.copaDue=null;
  if(m){simCopaMatch(m);if(m.w!==S.teamId&&S.copa&&!S.copa.out)S.copa.out=stg}
  S.copa.rounds[stg].forEach(x=>{if(!x.done)simCopaMatch(x)});
  advanceCopa(stg);
 }
 function finishYear(){
  let n=0;
  while(S.phase!=='done'&&n++<600){
   if(S.copaDue){simUserCopaPending();continue}
   if(S.phase==='regular'){
    S.fixture[S.fecha-1].forEach(x=>{if(!x.done)simRegular(x)});
    if(S.fecha<NF()){S.fecha++;copaCheck()}else endRegular();
   }else if(S.phase==='playoffs'){
    S.po.rounds[S.po.stage].forEach(m=>{if(!m.done)simKO(m)});advanceStage();
   }else if(S.phase==='trofeo'){
    if(S.trofeo&&!S.trofeo.done)simTrofeo();
    break;
   }else break;
  }
  if(S.copa&&!S.copa.done){ /* Copa sin terminar (p. ej. partidos pendientes): se completa */
   let k=0;while(!S.copa.done&&k++<8){const stg=COPA_ST[Math.max(0,S.copa.next-1)];
    if(S.copaDue){simUserCopaPending();continue}
    if(S.copa.next>0&&S.copa.rounds[stg]&&S.copa.rounds[stg].length&&!S.copa.rounds[stg].every(x=>x.done)){S.copa.rounds[stg].forEach(x=>{if(!x.done)simCopaMatch(x)});advanceCopa(stg);continue}
    if(S.copa.next<COPA_ST.length){copaTrigger(COPA_ST[S.copa.next]);continue}
    break}
  }
 }
 const yearOver=()=>!!S&&(S.phase==='done'||(S.phase==='trofeo'&&!!S.trofeo&&!!S.trofeo.done));
 /* Siguiente temporada: aplica ascensos y descensos y arma la nueva temporada (categoría que corresponda) */
 function nextSeasonFlow(){
  if(!S||CM.live)return;
  if(!yearOver()&&!confirm('¿Pasar a la siguiente temporada? Se simula lo que falta del año y se aplican los ascensos y descensos entre Primera División y Primera Nacional.'))return;
  try{
   finishYear();
   const R=closeYear(),me=S.teamId,old=S.division;
   let best=JSON.parse(JSON.stringify(S.cross));
   if(R.up.length){
    const c1=swapDiv(S.cross,R.up,R.down),c2=swapDiv(S.cross,R.up,R.down.slice().reverse());
    best=clashes(c1)<=clashes(c2)?c1:c2;
   }
   const nd=R.up.indexOf(me)>=0?'primera':R.down.indexOf(me)>=0?'bnacional':old;
   const z=best[nd],zonaDe={};z.A.forEach(id=>zonaDe[id]='A');z.B.forEach(id=>zonaDe[id]='B');
   const ns=newSeason({division:nd,teamId:me,player:{name:S.player.name,num:S.player.num},matchMinutes:S.minutes,zones:{A:z.A.slice(),B:z.B.slice()},zonaDe,cross:best,year:(S.year||1)+1});
   ns.modalQ=ns.modalQ||[];
   ns.modalQ.unshift({k:'move',year:ns.year,up:R.up,down:R.down,from:old,to:nd});
   S=ns;TAB='next';SEL=null;
   save();hideTorneoLayer();openHub('next');flushModals();
  }catch(e){console.warn('[CareerMode] siguiente temporada',e);try{renderHub()}catch(er){}}
 }

 function newSeasonBN(st){
  let zones=st.zones&&st.zones.A&&st.zones.B?{A:st.zones.A.slice(),B:st.zones.B.slice()}:null;
  const all=zones?zones.A.concat(zones.B):[];
  const ok=!!zones&&zones.A.length===18&&zones.B.length===18&&all.every(id=>!!T(id))&&new Set(all).size===36;
  if(!ok){const z=D.generarZonasAleatorias();zones={A:z.A.slice(),B:z.B.slice()}} /* Zonas A y B de 18 (cada clásico en zonas opuestas) */
  const zonaDe={};zones.A.forEach(id=>zonaDe[id]='A');zones.B.forEach(id=>zonaDe[id]='B');
  const str=newStr(),cross=crossFor(st,'bnacional',zones),copa=buildCopa(cross,str,st.teamId);
  return{v:2,division:'bnacional',teamId:st.teamId,copa,cross,year:st.year||1,player:{name:st.player.name,num:st.player.num,ycTotal:0,susp:0},minutes:st.matchMinutes||5,
   zones,zonaDe,myZone:zonaDe[st.teamId],str,fixture:buildFixtureBN(zones.A,zones.B),fecha:1,phase:'regular',
   po:null,squad:newSquad(st.teamId,st.player.num),champShown:false,createdAt:Date.now(),
   torneo:'bnacional',aperturaChampionId:null,aperturaRunnerUpId:null,clausuraChampionId:null,clausuraRunnerUpId:null,trofeo:null,copaDue:null,copaInfo:null,
   modalQ:[{k:'intro',torneo:'bnacional'}]};
 }
 function newSeason(st){
  let div=st.division||window._careerSelectedDivision||window.CAREER_DIVISION||'primera';
  if(div!=='bnacional')div='primera';
  if(div==='bnacional'&&!DB)div='primera';
  if(!st.cross&&!dataOf(div).getTeam(st.teamId)){const o=div==='bnacional'?'primera':'bnacional';if(o==='primera'||DB){if(dataOf(o).getTeam(st.teamId))div=o}}
  div=setDiv(div);window.CAREER_DIVISION=div;window._careerSelectedDivision=div;
  if(div==='bnacional')return newSeasonBN(st);
  const A=st.zones.A.slice();
  const B=alignClassics(A,st.zones.B);
  const str=newStr(),cross=crossFor(st,'primera',{A,B}),copa=buildCopa(cross,str,st.teamId);
  return{v:2,division:'primera',teamId:st.teamId,copa,cross,year:st.year||1,player:{name:st.player.name,num:st.player.num,ycTotal:0,susp:0},minutes:st.matchMinutes||5,
   zones:{A,B},zonaDe:st.zonaDe,myZone:st.zonaDe[st.teamId],str,fixture:buildFixture(A,B),fecha:1,phase:'regular',
   po:null,squad:newSquad(st.teamId,st.player.num),champShown:false,createdAt:Date.now(),
   torneo:'apertura',aperturaChampionId:null,aperturaRunnerUpId:null,clausuraChampionId:null,clausuraRunnerUpId:null,trofeo:null,copaDue:null,copaInfo:null,
   modalQ:[{k:'intro',torneo:'apertura'}]};
 }

 function save(){try{localStorage.setItem(K2,JSON.stringify(S))}catch(e){}}
 function loadSave(){try{const s=JSON.parse(localStorage.getItem(K2)||'null');if(s&&s.v===2&&s.fixture&&s.squad&&s.zones){setDiv(s.division||'primera');if(T(s.teamId)){migrate(s);return s}}}catch(e){}return null}
 /* guardados anteriores (una sola temporada) → Torneo Apertura; si ya estaba finalizada pasa al Clausura */
 function migrate(s){
  const prev=S;S=s;
  try{
   const legacy=!s.torneo;
   if(legacy){
    s.torneo='apertura';s.modalQ=s.modalQ||[];
    ['aperturaChampionId','aperturaRunnerUpId','clausuraChampionId','clausuraRunnerUpId'].forEach(k=>{if(!(k in s))s[k]=null});
    if(!('trofeo' in s))s.trofeo=null;
   }
   s.modalQ=s.modalQ||[];
   ensureCross(s);ensureStr(s);
   if(!s.copa||!s.copa.rounds||!s.copa.rounds.treintaidosavos){s.copa=buildCopa(s.cross,s.str,s.teamId);s.copaDue=null;s.copaInfo=null;copaCheck()} /* Copa de 64 equipos (32avos): guardados anteriores generan la nueva Copa */
   if(legacy&&s.phase==='done'&&s.po&&s.po.champ){
    const f=s.po.rounds&&s.po.rounds.final&&s.po.rounds.final[0];
    s.aperturaChampionId=s.po.champ;s.aperturaRunnerUpId=f?(f.w===f.h?f.a:f.h):null;
    startClausura();
   }
  }finally{S=prev}
 }

 /* ---- simulación de los otros partidos ---- */
 const st=id=>S.str[id]||1;
 function pois(l){const L=Math.exp(-l);let k=0,p=1;do{k++;p*=Math.random()}while(p>L&&k<9);return k-1}
 function simGoals(h,a){const sh=st(h),sa=st(a);return[Math.min(6,pois(1.3*Math.pow(sh/sa,.9)*1.08)),Math.min(6,pois(1.05*Math.pow(sa/sh,.9)))]}
 function simRegular(m){const g=simGoals(m.h,m.a);m.hg=g[0];m.ag=g[1];m.done=true;simMatchStats(m)}
 function simKO(m){
  const g=simGoals(m.h,m.a);m.hg=g[0];m.ag=g[1];
  if(m.hg===m.ag){const r=Math.random();if(r<.22){m.hg++}else if(r<.44){m.ag++}}
  if(m.hg===m.ag){const ph=Math.max(.3,Math.min(.7,.5+(st(m.h)-st(m.a))*.25)),hw=Math.random()<ph,w=rnd(3,5),l=Math.max(0,w-rnd(1,2));m.pen=hw?{h:w,a:l}:{h:l,a:w};m.w=hw?m.h:m.a}
  else m.w=m.hg>m.ag?m.h:m.a;
  m.done=true;simMatchStats(m);
 }

 /* ------------------------------------------------------------------
  1b) ESTADÍSTICAS DE TEMPORADA de toda la liga (guardadas en S.ps):
      g goles · a asistencias · r recuperaciones (DEF) · gr goles recibidos (GK) · v vallas invictas (GK) · pj partidos del GK
      Tu partido: se acumula desde window.MATCH_STATS (lo genera index.html). Resto de la fecha / ronda: simulado.
  ------------------------------------------------------------------ */
 const nm0=s=>String(s==null?'':s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
 const posN=p=>{p=String(p||'').toUpperCase();return p==='GK'||p==='DEF'||p==='FWD'||p==='MID'||p==='USR'?p:/^(MED|MC)/.test(p)?'MID':/^(DEL|FW|EXT|ATA)/.test(p)?'FWD':/^(ARQ)/.test(p)?'GK':p};
 function addP(o,t,name,num,pos,st){const id=t+'|'+num+'|'+name;if(!o[id])o[id]={id,t,n:name,num,pos:posN(pos),st:st?1:0,g:0,a:0,r:0,gr:0,v:0,pj:0};return o[id]}
 let TCS=null,TC={};
 function ps(){
  if(!S)return null;
  if(!S.ps){
   const o={};
   S.zones.A.concat(S.zones.B).forEach(tid=>{
    if(tid===S.teamId){const q=S.squad;Object.keys(q.info).forEach(id=>{const p=q.info[id];addP(o,tid,p.name,p.number,p.pos,q.starters.indexOf(id)>=0)});return}
    let r=null;try{r=ownerOf(tid).resolverPlantelCancha(tid,null)}catch(e){try{r=ownerOf(tid).resolverPlantelCancha(tid,-1)}catch(er){r=null}}
    if(!r)return;
    (r.starters||[]).forEach(p=>addP(o,tid,p.name,p.number,p.pos,true));(r.subs||[]).forEach(p=>addP(o,tid,p.name,p.number,p.pos,false));
   });
   o.USER={id:'USER',t:S.teamId,n:S.player.name,num:S.player.num,pos:'USR',st:1,g:0,a:0,r:0,gr:0,v:0,pj:0};
   S.ps=o;
  }
  if(TCS!==S.ps){TCS=S.ps;TC={}}
  return S.ps;
 }
 function teamList(tid){ps();return TC[tid]||(TC[tid]=Object.values(S.ps).filter(e=>e.t===tid&&e.id!=='USER'))}
 function findP(tid,name,num){
  const O=ps(),id=tid+'|'+num+'|'+name;if(O[id])return O[id];
  const k=nm0(name),L=teamList(tid);
  const e=L.find(x=>nm0(x.n)===k)||L.find(x=>String(x.num)===String(num)&&!name);
  if(e)return e;
  const n=addP(O,tid,name,num,'',false);TC={};return n;
 }
 function wpick(L,w,ex){let t=0;const ws=L.map(e=>e===ex?0:Math.max(0,w(e)));ws.forEach(x=>t+=x);if(t<=0)return null;let r=Math.random()*t;for(let i=0;i<L.length;i++){r-=ws[i];if(r<=0&&ws[i]>0)return L[i]}return L.find((e,i)=>ws[i]>0)||null}
 /* Reparte en un equipo: gf goles (+70 % con asistencia), ga goles recibidos al arquero; full = partido completo (recuperaciones DEF, PJ y valla del arquero) */
 function simTeamStats(tid,gf,ga,full){
  const L=teamList(tid);if(!L.length)return;
  const sf=e=>e.st?1:.3,WS={FWD:6,MID:3,DEF:1,GK:.03},WA={FWD:3,MID:4,DEF:1.5,GK:.05};
  for(let i=0;i<gf;i++){const s=wpick(L,e=>sf(e)*(WS[e.pos]||1),null);if(!s)break;s.g++;
   if(Math.random()<.7){const a=wpick(L,e=>sf(e)*(WA[e.pos]||1),s);if(a)a.a++}}
  const gks=L.filter(e=>e.pos==='GK'),gk=gks.find(e=>e.st)||gks[0];
  if(gk){gk.gr+=ga;if(full){gk.pj++;if(ga===0)gk.v++}}
  if(full){const n=rnd(4,10);for(let i=0;i<n;i++){const d=wpick(L,e=>e.pos==='DEF'?sf(e):0,null);if(d)d.r++}}
 }
 function simMatchStats(m){try{if(!S||m.hg==null||m.ag==null)return;ps();simTeamStats(m.h,m.hg,m.ag,true);simTeamStats(m.a,m.ag,m.hg,true)}catch(e){console.warn('[CareerMode] stats sim',e)}}
 /* Tu partido: acumula lo que registró index.html en window.MATCH_STATS (sin tocar el partido abandonado) */
 function accumSeason(L,r){
  if(!L||L.statsDone)return;L.statsDone=true;
  const O=ps();if(!O||r.forfeit)return;
  const m=L.m,tid={red:m.h,blue:m.a},ga={red:r.ag,blue:r.hg},MS=window.MATCH_STATS;
  if(MS&&MS.jugadores&&MS.modo==='carrera'&&MS.inicio>=L.started){
   Object.keys(MS.jugadores).forEach(k=>{const x=MS.jugadores[k];if(!x||!tid[x.equipo])return;
    const e=x.usuario?O.USER:findP(tid[x.equipo],x.nombre,x.dorsal);if(!e)return;
    e.g+=x.goles|0;e.a+=x.asistencias|0;
    if(e.pos==='DEF')e.r+=x.recuperaciones|0;
    if(e.pos==='GK'&&x.jugo){e.pj++;e.gr+=x.golesRecibidos|0;if(ga[x.equipo]===0&&!(x.golesRecibidos>0))e.v++} /* valla invicta: GK que jugó y su equipo no recibió goles */
   });
  }
  if(L.simExtra){simTeamStats(tid.red,L.simExtra.red,L.simExtra.blue,false);simTeamStats(tid.blue,L.simExtra.blue,L.simExtra.red,false)} /* goles simulados tras tu expulsión */
 }
 /* Un bot cambia de identidad (cambio): separa lo acumulado hasta ahora para que no se mezcle con el que entra */
 function splitStats(b){try{
  const MS=window.MATCH_STATS;if(!MS||!MS.jugadores||MS.finalizado||!b)return;
  const v=Object.keys(MS.jugadores).map(k=>MS.jugadores[k]).filter(x=>x&&x.equipo===b.team&&x.nombre===b.name&&String(x.dorsal)===String(b.num));
  const r=v.find(x=>MS.jugadores[x.key]===x&&x.key===b.team+'|'+b.num+'|'+b.name)||v[0];if(!r)return;
  const c=Object.assign({},r);MS.jugadores[r.key]=c;
  r.goles=r.asistencias=r.recuperaciones=r.golesRecibidos=0;r.jugo=false;r.vallaInvicta=false;r.key='';
 }catch(e){}}

 /* ---- tabla ---- */
 function stats(ids){return statsFx(S.fixture,ids)}
 function statsFx(fx,ids){
  const t={};ids.forEach(id=>t[id]={id,pj:0,g:0,e:0,p:0,gf:0,gc:0,pts:0});
  fx.forEach(f=>f.forEach(m=>{if(!m.done)return;
   [[m.h,m.hg,m.ag],[m.a,m.ag,m.hg]].forEach(x=>{const r=t[x[0]];if(!r)return;r.pj++;r.gf+=x[1];r.gc+=x[2];
    if(x[1]>x[2]){r.g++;r.pts+=3}else if(x[1]===x[2]){r.e++;r.pts++}else r.p++})}));
  return ids.map(id=>t[id]).sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc)||b.gf-a.gf||T(a.id).name.localeCompare(T(b.id).name));
 }

 /* ---- playoffs ---- */
 function endRegular(){
  if(isBN())return endRegularBN();
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
  if(isBN())return advanceStageBN();
  const i=STAGES.indexOf(S.po.stage),rd=S.po.rounds[S.po.stage];
  if(!rd.every(m=>m.done))return;
  if(i===3){const f=rd[0];S.po.champ=f.w;S.po.runnerUp=f.w===f.h?f.a:f.h;endTorneo();return}
  const w=rd.map(m=>m.w),pr=i===0?[[0,3],[1,2],[4,7],[5,6]]:i===1?[[0,1],[2,3]]:[[0,1]],nx=STAGES[i+1];
  S.po.rounds[nx]=pr.map(p=>ko(w[p[0]],w[p[1]],nx==='final'));
  S.po.stage=nx;
 }
 /* ---- Primera Nacional · Final 1.º Ascenso + Reducido (2.º Ascenso) ---- */
 const seedKey=id=>{const x=(S.seed||{})[id]||{pos:99,pts:0,dg:0,gf:0};return[x.pos,-x.pts,-x.dg,-x.gf]};
 const seedCmp=(a,b)=>{const x=seedKey(a),y=seedKey(b);for(let i=0;i<4;i++)if(x[i]!==y[i])return x[i]-y[i];return 0};
 const hiLo=(a,b)=>seedCmp(a,b)<=0?[a,b]:[b,a]; /* el mejor ubicado de la fase regular es local */
 function endRegularBN(){
  const A=stats(S.zones.A),B=stats(S.zones.B),qA=A.slice(0,8).map(r=>r.id),qB=B.slice(0,8).map(r=>r.id);
  S.seed={};
  [A,B].forEach(rows=>rows.slice(0,8).forEach((r,i)=>{S.seed[r.id]={pos:i+1,pts:r.pts,dg:r.gf-r.gc,gf:r.gf}}));
  const f1=ko(qA[0],qB[0],true);f1.tag='F1';f1.venue=pickVenue(f1.h,f1.a); /* Final por el 1.º Ascenso: partido único, cancha neutral */
  const r1=[];
  for(let i=1;i<8;i++){ /* 2.º A vs 8.º B, 3.º A vs 7.º B … 8.º A vs 2.º B (el mejor ubicado de local) */
   const a=qA[i],b=qB[8-i],aHome=(i+1)<=(9-i),m=aHome?ko(a,b,false):ko(b,a,false);m.tag='R1';r1.push(m);
  }
  const mine=qA.indexOf(S.teamId)>=0||qB.indexOf(S.teamId)>=0;
  S.q={A:qA,B:qB};
  S.po={stage:'inicial',rounds:{inicial:[f1].concat(r1),cuartos:[],semis:[],final:[]},out:mine?null:'nq',champ:null,runnerUp:null,asc2:null};
  S.phase='playoffs';
 }
 function advanceStageBN(){
  const stg=S.po.stage,rd=S.po.rounds[stg];
  if(!rd.every(m=>m.done))return;
  const mk=(a,b,neutral)=>{const p=hiLo(a,b),m=ko(p[0],p[1],neutral);if(neutral)m.venue=pickVenue(m.h,m.a);return m};
  if(stg==='inicial'){
   const f1=rd.find(m=>m.tag==='F1'),r1=rd.filter(m=>m.tag==='R1');
   const ch=f1.w,lo=f1.w===f1.h?f1.a:f1.h;
   S.po.champ=ch;S.po.runnerUp=lo; /* Campeón de la Primera Nacional = 1.º Ascenso */
   S.modalQ=S.modalQ||[];
   if(ch===S.teamId){S.modalQ.push({k:'champ',torneo:'bnacional',id:ch});S.po.out='asc'}
   const t=r1.map(m=>m.w).concat([lo]).sort(seedCmp); /* Cuartos: 7 ganadores + perdedor de la Final */
   S.po.rounds.cuartos=[mk(t[0],t[7]),mk(t[3],t[4]),mk(t[1],t[6]),mk(t[2],t[5])];
   S.po.stage='cuartos';return;
  }
  if(stg==='final'){const f=rd[0];S.po.asc2=f.w;S.phase='done';return}
  const w=rd.map(m=>m.w),nx=stg==='cuartos'?'semis':'final';
  S.po.rounds[nx]=nx==='semis'?[mk(w[0],w[1]),mk(w[2],w[3])]:[mk(w[0],w[1],true)];
  S.po.stage=nx;
 }
 function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t}return a}
 /* sede neutral: club ajeno al partido (prefiere ROS / COR / MZA si no juegan) */
 function pickVenue(h,a,all){
  const ok=(all?allTeams():D.teams).filter(t=>t.id!==h&&t.id!==a);
  const pref=ok.filter(t=>COPA_VENUES.indexOf(String(t.shortName).toUpperCase())>=0);
  const pool=pref.length?pref:ok;
  return pool.length?pool[Math.floor(Math.random()*pool.length)].id:null;
 }
 const copaMatch=(h,a)=>({h,a,hg:null,ag:null,done:false,kind:'K',pen:null,w:null,neutral:true,copa:true,venue:pickVenue(h,a,true)});
 function buildCopa(cross,str,keep){
  const f=copaField(cross,str,keep),L=shuffle(f.prim.concat(f.bn)),n=L.length;
  const byeN=Math.max(0,Math.min(n,64-n)),byes=L.slice(0,byeN),rest=L.slice(byeN),r1=[];
  for(let i=0;i+1<rest.length;i+=2)r1.push(copaMatch(rest[i],rest[i+1])); /* 64 equipos → 32 cruces de 32avos (sin libres) */
  return{rounds:{treintaidosavos:r1,dieciseisavos:[],octavos:[],cuartos:[],semi:[],final:[]},byes,np:f.prim.length,nb:f.bn.length,next:0,out:null,champ:null,runnerUp:null,done:false};
 }
 function copaPens(m,res){
  if(res&&res.ph!=null&&res.pa!=null&&res.ph!==res.pa){m.pen={h:res.ph,a:res.pa};m.w=res.ph>res.pa?m.h:m.a}
  else{const hw=Math.random()<.5;m.pen={h:hw?5:4,a:hw?4:5};m.w=hw?m.h:m.a}
 }
 /* simula un partido de Copa: tiempo normal y, si empata, penales directos (sin tiempo extra) */
 function simCopaMatch(m){
  const g=simGoals(m.h,m.a);m.hg=g[0];m.ag=g[1];
  if(m.hg===m.ag){const hw=Math.random()<Math.max(.3,Math.min(.7,.5+(st(m.h)-st(m.a))*.25)),w=rnd(3,5),l=Math.max(0,w-rnd(1,2));m.pen=hw?{h:w,a:l}:{h:l,a:w};m.w=hw?m.h:m.a}
  else m.w=m.hg>m.ag?m.h:m.a;
  m.done=true;simMatchStats(m);
 }
 function copaStage(){const C=S.copa;return C&&C.next>0?COPA_ST[C.next-1]:null}
 /* arma la ronda siguiente con los ganadores (si hubiera clasificados directos, entran en la ronda siguiente a 32avos) */
 function advanceCopa(stage){
  const C=S.copa,rd=C.rounds[stage];
  if(!rd.every(m=>m.done))return;
  const i=COPA_ST.indexOf(stage);
  if(stage==='final'){
   const f=rd[0];C.champ=f.w;C.runnerUp=f.w===f.h?f.a:f.h;C.done=true;
   if(C.champ===S.teamId){S.modalQ=S.modalQ||[];S.modalQ.push({k:'champ',torneo:'copa',id:C.champ})}
   return;
  }
  const w=rd.map(m=>m.w),hb=Math.ceil(C.byes.length/2),L=i===0?C.byes.slice(0,hb).concat(w,C.byes.slice(hb)):w,nx=[];
  for(let k=0;k+1<L.length;k+=2)nx.push(copaMatch(L[k],L[k+1]));
  C.rounds[COPA_ST[i+1]]=nx;
 }
 const copaUserM=stage=>{const r=S.copa&&S.copa.rounds[stage]||[];return r.find(m=>!m.done&&(m.h===S.teamId||m.a===S.teamId))||null};
 /* llegó la fecha de Copa: si jugás vos queda pendiente (Próximo Partido); si no, la ronda se simula */
 function copaTrigger(stage){
  const C=S.copa;C.next++;
  S.modalQ=S.modalQ||[];
  if(stage==='treintaidosavos')S.modalQ.push({k:'sorteo'});
  if(copaUserM(stage)){S.copaDue=stage;return true}
  C.rounds[stage].forEach(m=>{if(!m.done)simCopaMatch(m)});
  const mine=C.byes.indexOf(S.teamId)>=0&&stage==='treintaidosavos';
  S.copaInfo='🏆 Se jugaron los '+COPA_LBL[stage]+' de la Copa Argentina sin tu equipo'+(mine?' (clasificaste directo a los 16avos).':C.out?' (ya habías quedado eliminado).':'.');
  advanceCopa(stage);
  return false;
 }
 /* ¿toca Copa? se evalúa al terminar cada fecha de Liga */
 function copaCheck(){
  const C=S&&S.copa;if(!C||S.copaDue||S.phase!=='regular')return;
  const PT=copaPts();
  while(C.next<PT.length){
   const pt=PT[C.next],reached=(S.torneo==='clausura'&&pt[0]==='apertura')||(S.torneo===pt[0]&&S.fecha>pt[1]);
   if(!reached)break;
   if(copaTrigger(pt[2]))break;
  }
 }
 function copaNextText(){
  const C=S.copa,PT=copaPts();if(!C||C.done||C.next>=PT.length)return '';
  if(C.out)return '';
  const pt=PT[C.next];
  return '<div class="cmNote">🏆 Copa Argentina · próxima ronda: <b>'+COPA_LBL[pt[2]]+'</b> tras la Fecha '+pt[1]+' del '+(pt[0]==='bnacional'?'torneo de la Primera Nacional':'Torneo '+copaTn(pt[0]))+'.</div>';
 }
 /* Final del torneo: guarda campeón y subcampeón; Apertura → Clausura (mismas zonas, localías invertidas); Clausura → Trofeo de Campeones */
 function endTorneo(){
  const ch=S.po.champ,ru=S.po.runnerUp,tn=S.torneo;
  S.modalQ=S.modalQ||[];
  if(ch===S.teamId)S.modalQ.push({k:'champ',torneo:tn,id:ch});
  if(tn==='apertura'){S.aperturaChampionId=ch;S.aperturaRunnerUpId=ru;startClausura()}
  else{S.clausuraChampionId=ch;S.clausuraRunnerUpId=ru;startTrofeo()}
 }
 function startClausura(){
  const prevChamp=S.aperturaChampionId;
  S.apS={};stats(S.zones.A.concat(S.zones.B)).forEach(r=>{S.apS[r.id]={pj:r.pj,g:r.g,e:r.e,p:r.p,gf:r.gf,gc:r.gc,pts:r.pts}}); /* Tabla Anual: puntos del Apertura */
  S.fixture=S.fixture.map(f=>f.map(m=>mm(m.a,m.h,m.kind))); /* mismos rivales y fechas; local ↔ visitante */
  S.torneo='clausura';S.phase='regular';S.fecha=1;S.po=null;S.q=null;S.champShown=false;
  Object.keys(S.squad.info).forEach(id=>{const p=S.squad.info[id];p.stam=100;p.inj=null;p.ycTotal=0});
  S.player.ycTotal=0;
  S.modalQ=S.modalQ||[];S.modalQ.push({k:'intro',torneo:'clausura',prev:prevChamp});
  copaCheck();
 }
 function startTrofeo(){
  const a=S.aperturaChampionId,c=S.clausuraChampionId;
  const opp=a===c?S.clausuraRunnerUpId:c; /* bicampeón: juega contra el subcampeón */
  S.trofeo={h:a,a:a===c?opp:c,hg:null,ag:null,done:false,kind:'T',pen:null,w:null,neutral:true};
  S.phase='trofeo';S.po=S.po||null;
  S.modalQ=S.modalQ||[];S.modalQ.push({k:'trofeo'});
 }
 function simTrofeo(){
  if(!S.trofeo||S.trofeo.done)return;
  simKO(S.trofeo);trofeoDone();
 }
 function trofeoDone(){
  const t=S.trofeo;if(!t||!t.done)return;
  if(t.w===S.teamId){S.modalQ=S.modalQ||[];S.modalQ.push({k:'champ',torneo:'trofeo',id:t.w})}
 }
 function simRest(){
  if(S.phase==='trofeo'){simTrofeo();save();return}
  let n=0;
  while(S.phase==='playoffs'&&n++<8){S.po.rounds[S.po.stage].forEach(m=>{if(!m.done)simKO(m)});advanceStage()}
  save();
 }

 function userMatch(){
  if(!S)return null;
  if(S.copaDue){const cm=copaUserM(S.copaDue);if(cm)return cm}
  if(S.phase==='regular'){const f=S.fixture[S.fecha-1];return f&&f.find(m=>m.h===S.teamId||m.a===S.teamId)||null}
  if(S.phase==='playoffs'&&!S.po.out){return S.po.rounds[S.po.stage].find(m=>!m.done&&(m.h===S.teamId||m.a===S.teamId))||null}
  if(S.phase==='trofeo'&&S.trofeo&&!S.trofeo.done&&(S.trofeo.h===S.teamId||S.trofeo.a===S.teamId))return S.trofeo;
  return null;
 }

 /* Registra el resultado de tu partido y simula el resto de la fecha / ronda */
 function recordUser(m,res){
  m.hg=res.hg;m.ag=res.ag;m.done=true;
  /* lesiones: leve 'l' → recuperado · grave 's' → baja a leve para el partido siguiente */
  Object.keys(S.squad.info).forEach(id=>{const p=S.squad.info[id];if(p.inj==='l')p.inj=null;else if(p.inj==='s')p.inj='l'});
  S.copaInfo=null;
  if(m.copa){ /* Copa Argentina: partido único, penales directos; la Liga no avanza de fecha */
   if(m.hg===m.ag)copaPens(m,res);else m.w=m.hg>m.ag?m.h:m.a;
   const stg=S.copaDue;S.copaDue=null;
   if(m.w!==S.teamId&&S.copa)S.copa.out=stg;
   if(stg){S.copa.rounds[stg].forEach(x=>{if(!x.done)simCopaMatch(x)});advanceCopa(stg)}
   return;
  }
  if(S.phase==='trofeo'){
   if(m.hg===m.ag){
    if(res.ph!=null&&res.pa!=null&&res.ph!==res.pa){m.pen={h:res.ph,a:res.pa};m.w=res.ph>res.pa?m.h:m.a}
    else{const hw=Math.random()<.5;m.pen={h:hw?5:4,a:hw?4:5};m.w=hw?m.h:m.a}
   }else m.w=m.hg>m.ag?m.h:m.a;
   trofeoDone();return;
  }
  if(S.phase==='regular'){
   S.fixture[S.fecha-1].forEach(x=>{if(!x.done)simRegular(x)});
   if(S.fecha<NF()){S.fecha++;copaCheck()}else endRegular();
  }else{
   if(m.hg===m.ag){
    if(res.ph!=null&&res.pa!=null&&res.ph!==res.pa){m.pen={h:res.ph,a:res.pa};m.w=res.ph>res.pa?m.h:m.a}
    else{const hw=Math.random()<.5;m.pen={h:hw?5:4,a:hw?4:5};m.w=hw?m.h:m.a}
   }else m.w=m.hg>m.ag?m.h:m.a;
   if(m.w!==S.teamId&&!(isBN()&&m.tag==='F1'))S.po.out=S.po.stage; /* Primera Nacional: el perdedor de la Final 1.º Ascenso sigue en Cuartos del Reducido */
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
#career-screen{background: #0d1b2a url('career-bg.png') center center / cover no-repeat !important;}
#career-hub-screen{position:fixed;inset:0;z-index:1;width:100vw;height:100vh;height:100dvh;flex-direction:column;align-items:center;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;color:#fff;
 background: #0d1b2a url('career-bg.png') center center / cover no-repeat !important;padding:calc(env(safe-area-inset-top,0px) + 10px) 10px calc(env(safe-area-inset-bottom,0px) + 22px)}
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
.cmPr.out,.cmPr.out:hover{filter:grayscale(100%);opacity:.45;cursor:not-allowed;border-color:#6b7280}
#cmSubUndo{background:#262c34;color:#fff;border:2px solid #fbbf24;border-radius:12px;padding:8px 14px;font-weight:800;cursor:pointer}#cmSubUndo:disabled{opacity:.4;cursor:not-allowed}
.cmNote{font-size:.78rem;color:#8fb2e6}
.cmCols{display:grid;grid-template-columns:1fr 1fr;gap:14px}.cmCols>div{display:flex;flex-direction:column;gap:6px}
#cmSub,#cmEnd,#cmChamp{position:fixed;inset:0;z-index:400;display:none;align-items:center;justify-content:center;padding:12px;background:rgba(3,8,20,.82);overflow-y:auto}
#cmSub.on,#cmEnd.on,#cmChamp.on{display:flex}
#cmSub:not(.on),#cmEnd:not(.on),#cmChamp:not(.on){display:none!important;pointer-events:none!important}
#cmSub .cmCard,#cmEnd .cmCard,#cmChamp .cmCard{width:min(900px,100%);max-height:96vh;overflow-y:auto}
#cmEnd .cmCard,#cmChamp .cmCard{width:min(520px,100%);text-align:center;align-items:center}
#cmEnd .sc{font-size:1.9rem;font-weight:900;letter-spacing:1px}#cmEnd .rs{font-weight:900;font-size:1.05rem}
#cmChamp .cmCard{border-color:#facc15;box-shadow:0 0 40px rgba(250,204,21,.6)}
#cmChamp h1{font-size:clamp(1.3rem,5vw,2.1rem);color:#fde68a;text-shadow:0 2px 10px rgba(250,204,21,.7);font-style:italic}
#cmChamp .cmBd{width:110px;height:110px}
#cmRivalSub{display:none;position:fixed;z-index:130;right:12px;top:calc(env(safe-area-inset-top,0px) + 96px);max-width:min(360px,calc(100vw - 24px));flex-direction:column;align-items:flex-end;gap:4px;pointer-events:none}
#cmRivalSub div{padding:5px 10px;border-radius:10px;background:rgba(11,15,26,.82);border:1px solid rgba(56,189,248,.6);color:#fff;font-size:.76rem;font-weight:700;text-align:right}
body.careerOn.cmInGame #cmRivalSub{display:flex}
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

/* 🎨 CARTOON VECTOR · Hub del Modo Carrera */
#career-hub-screen,#cmSub,#cmEnd,#cmChamp,#cmCont{--ink:#0a1f3d;--cap:#1e2329;--cap2:#262c34;--well:#161a1f}

/* ---------- 1) Tarjetas y paneles ---------- */
.cmHead,.cmCard,#cmCont{background:rgba(30,35,41,.96);border:2.5px solid #0a1f3d;border-radius:20px;box-shadow:0 5px 0 rgba(0,0,0,.35)}
#cmCont{border-color:#0a1f3d}
.cmHead b,#cmCont b{color:#fff}
.cmHead small,.cmNote,#cmCont .cNote{color:#38bdf8}
.cmCard h2{color:#facc15;font-weight:900;font-style:italic}
.cmCard h3,.cmBr .col>h4,.cmKcols small{color:#38bdf8}
.cmVs .mid{color:#facc15}
.cmVs .tm small{color:#38bdf8}
.cmVs .tm.me{filter:drop-shadow(0 0 0 transparent)}
#cmChamp .cmCard{box-shadow:0 5px 0 rgba(0,0,0,.35),0 0 24px rgba(250,204,21,.45)}
#cmChamp h1,#cmEnd .sc,#cmEnd .rs{color:#facc15;text-shadow:-2px -2px 0 #0a1f3d,2px -2px 0 #0a1f3d,-2px 2px 0 #0a1f3d,2px 2px 0 #0a1f3d}

/* ---------- 2) Pestañas ---------- */
.cmTabs{padding:0 2px 6px}
.cmTabs button{background:#262c34;color:#fff;border:2px solid #0a1f3d;border-radius:14px;box-shadow:0 3px 0 rgba(0,0,0,.4);
 transition:transform .08s ease,box-shadow .08s ease,filter .12s ease}
.cmTabs button:hover{filter:brightness(1.15)}
.cmTabs button.on{background:linear-gradient(180deg,#4cb5f7 0%,#1f8be3 100%);color:#fff;border:2.5px solid #0a1f3d;
 box-shadow:0 4px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.28);
 text-shadow:-1px -1px 0 #0a1f3d,1px -1px 0 #0a1f3d,-1px 1px 0 #0a1f3d,1px 1px 0 #0a1f3d}

/* ---------- 3) Botones ---------- */
.cmBig{background:linear-gradient(180deg,#62c74f 0%,#439e34 100%);color:#fff;border:3px solid #0a1f3d;border-radius:16px;
 font-weight:900;font-style:normal;letter-spacing:.02em;
 text-shadow:-1.5px -1.5px 0 #0a1f3d,1.5px -1.5px 0 #0a1f3d,-1.5px 1.5px 0 #0a1f3d,1.5px 1.5px 0 #0a1f3d,0 2px 2px rgba(0,0,0,.35);
 box-shadow:0 5px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.28);
 transition:transform .08s ease,box-shadow .08s ease,filter .12s ease}
.cmBig:hover{filter:brightness(1.08)}
.cmBig:active{transform:translateY(4px);box-shadow:0 1px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.2)}
.cmBig:disabled{opacity:.5;filter:grayscale(.6);transform:none;box-shadow:0 5px 0 #0a1f3d}
.cmGhost,.cmBtn{background:linear-gradient(180deg,#303843 0%,#262c34 100%);color:#fff;border:2.5px solid #0a1f3d;border-radius:999px;
 font-weight:800;box-shadow:0 4px 0 #0a1f3d;transition:transform .08s ease,box-shadow .08s ease,filter .12s ease}
.cmBtn{border-radius:16px;font-weight:900}
.cmGhost:hover,.cmBtn:hover{filter:brightness(1.18)}
.cmGhost:active,.cmBtn:active{transform:translateY(3px);box-shadow:0 1px 0 #0a1f3d}
.cmBtn.red{background:linear-gradient(180deg,#f0615f 0%,#d23a3a 100%);border-color:#0a1f3d;
 text-shadow:-1.5px -1.5px 0 #0a1f3d,1.5px -1.5px 0 #0a1f3d,-1.5px 1.5px 0 #0a1f3d,1.5px 1.5px 0 #0a1f3d}
.cmKb{background:#262c34;color:#fff;border:2px solid #0a1f3d;border-radius:14px;box-shadow:0 3px 0 rgba(0,0,0,.4)}
.cmKb.on{background:linear-gradient(180deg,#4cb5f7 0%,#1f8be3 100%);border:2.5px solid #0a1f3d;box-shadow:0 4px 0 #0a1f3d}
body.careerOn.cmInGame #cmSubBtn{background:linear-gradient(180deg,#303843 0%,#262c34 100%);border:2.5px solid #0a1f3d;box-shadow:0 4px 0 #0a1f3d;font-weight:800}
body.careerOn.cmInGame.cmRed #cmSimRestBtn{background:linear-gradient(180deg,#f0615f 0%,#d23a3a 100%);border:2.5px solid #0a1f3d;box-shadow:0 4px 0 #0a1f3d;font-weight:800}

/* ---------- 4) Píldoras, avisos, tablas y filas ---------- */
.cmTag{background:#161a1f;color:#38bdf8;border:2px solid #0a1f3d;font-weight:900}
.cmWarn{background:#262c34;border:2px solid #f59e0b;color:#fde68a}
.cmFire{background:#2d2326;border-color:#ef4444;color:#fecaca}
.cmT{border-collapse:separate;border-spacing:0 3px}
.cmT th{color:#facc15;border-bottom:2px solid #0a1f3d}
.cmT tbody tr:nth-child(odd) td{background:#161a1f}
.cmT tbody tr:nth-child(even) td{background:#262c34}
.cmT td:first-child{border-radius:10px 0 0 10px}
.cmT td:last-child{border-radius:0 10px 10px 0}
.cmT tbody tr.q td{background:#1d3b27}
.cmT tbody tr.me td{background:#1f8be3;color:#fff}
.cmT tbody tr.q.me td{background:#2f9d45;color:#fff}
.cmT tr.cut td{border-bottom:2px dashed #62c74f}
.cmT td.pt{color:#facc15}
.cmT tbody tr.me td.pt,.cmT tbody tr.q.me td.pt{color:#fff}
.cmFx details{background:#161a1f;border:2px solid #0a1f3d;border-radius:14px}
.cmFx summary{color:#facc15}
.cmFx .gm.me{background:#1f8be3}
.cmFx .gm b{color:#facc15}
.cmFx .gm.me b{color:#fff}
.cmBr .bm{background:#161a1f;border:2px solid #0a1f3d;border-radius:12px}
.cmBr .bm.me{border-color:#38bdf8;box-shadow:none}
.cmBr .bm .l.w{color:#62c74f}
.cmPr{background:#262c34;color:#fff;border:2px solid #0a1f3d;border-radius:14px;box-shadow:0 3px 0 rgba(0,0,0,.35)}
.cmPr .n{color:#facc15}.cmPr .ps{color:#38bdf8}.cmPr .cd{color:#facc15}
.cmPr .bar{background:#161a1f;border:2px solid #0a1f3d}
.cmPr:hover{border-color:#38bdf8}
.cmPr.sel{background:linear-gradient(180deg,#4cb5f7 0%,#1f8be3 100%);border:2.5px solid #0a1f3d;box-shadow:0 4px 0 #0a1f3d}
.cmPr.sel .n,.cmPr.sel .ps,.cmPr.sel .cd{color:#fff}
.cmPr.me{border-color:#facc15}.cmPr.me:hover{border-color:#facc15}
.cmPr.exp,.cmPr.exp:hover{border-color:#ef4444}

/* =====================================================================
   5) Teléfono / pantallas bajas · hub sin scroll del body
      (cabecera + pestañas + JUGAR PARTIDO siempre a la vista)
   ===================================================================== */
@media (max-height:520px),(max-width:900px){
 #career-hub-screen.active{display:flex;flex-direction:column;height:100dvh;overflow:hidden;
  padding:calc(env(safe-area-inset-top,0px) + 6px) 8px calc(env(safe-area-inset-bottom,0px) + 8px)}
 #career-hub-screen .cmWrap{flex:1 1 0;min-height:0;height:100%;gap:6px}
 .cmHead{flex:none;padding:5px 10px;gap:8px;border-radius:16px}
 .cmHead .cmTitle{min-width:0;gap:8px}
 .cmHead .bd,.cmBd{width:32px;height:32px}
 .cmHead b{font-size:.92rem}
 .cmHead small{font-size:.68rem}
 .cmGhost{padding:4px 10px;font-size:.72rem}
 .cmTabs{flex:none;gap:5px;padding:0 2px 5px}
 .cmTabs button{padding:6px 10px;font-size:.78rem}
 /* único contenedor que scrollea: el cuerpo de cada pestaña */
 #cmBody{flex:1 1 0;min-height:0;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;gap:8px;padding:0 2px 6px;-webkit-overflow-scrolling:touch}
 #cmBody>*{flex:none}
 .cmCard{padding:8px 12px;gap:6px;border-radius:18px}
 .cmCard h2{font-size:.88rem}
 .cmVs{gap:6px}
 .cmVs .tm{font-size:.88rem;gap:2px}
 .cmVs .tm .cmBd{width:48px;height:48px}
 .cmVs .tm .cmKit{width:32px;height:32px}
 .cmVs .mid{font-size:1.1rem}
 .cmKits{gap:4px}
 .cmKb{padding:4px 8px;font-size:.68rem}
 .cmKb .cmKit{width:26px;height:26px}
 .cmT{font-size:.72rem}
 .cmT th,.cmT td{padding:3px 4px}
 .cmWarn{padding:6px 10px;font-size:.78rem}
 .cmNote{font-size:.7rem}
 .cmBig{padding:9px 14px;font-size:1rem}
 /* JUGAR PARTIDO queda pegado abajo mientras el contenido scrollea */
 #cmBody>.cmCard>.cmBig{position:sticky;bottom:0;z-index:2;margin-top:4px}
 #cmSub .cmCard,#cmEnd .cmCard,#cmChamp .cmCard{max-height:96dvh}
}

/* ---------- Modal Menú de sala (pausa) · cartoon vector ---------- */
#menu .card{background:#1e2329;border:2.5px solid #0a1f3d;border-radius:20px;box-shadow:0 5px 0 rgba(0,0,0,.35);color:#fff}
#menu .card>h2{color:#facc15;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:.02em;
 text-shadow:-1.5px -1.5px 0 #0a1f3d,1.5px -1.5px 0 #0a1f3d,-1.5px 1.5px 0 #0a1f3d,1.5px 1.5px 0 #0a1f3d}
#menu .card #mResume,#menu .card #mLeave,#menu .card #cmMenuSub{border:2.5px solid #0a1f3d;border-radius:16px;color:#fff;font-weight:900;
 letter-spacing:.02em;box-shadow:0 4px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.25);
 text-shadow:-1.5px -1.5px 0 #0a1f3d,1.5px -1.5px 0 #0a1f3d,-1.5px 1.5px 0 #0a1f3d,1.5px 1.5px 0 #0a1f3d,0 2px 2px rgba(0,0,0,.35);
 transition:transform .08s ease,box-shadow .08s ease,filter .12s ease}
#menu .card #mResume{background:linear-gradient(180deg,#62c74f 0%,#439e34 100%)}
#menu .card #mLeave{background:linear-gradient(180deg,#f0615f 0%,#d23a3a 100%)}
#menu .card #cmMenuSub{background:linear-gradient(180deg,#303843 0%,#262c34 100%)}
#menu .card #mResume:hover,#menu .card #mLeave:hover,#menu .card #cmMenuSub:hover{filter:brightness(1.1)}
#menu .card #mResume:active,#menu .card #mLeave:active,#menu .card #cmMenuSub:active{transform:translateY(3px);box-shadow:0 1px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.2)}
/* ---------- Selector de Categoría (Carrera Nueva) · cartoon vector ---------- */
#cmDiv{margin:0 0 10px;--ink:#0a1f3d}
#cmDiv .cmRow{display:grid;grid-template-columns:1fr 1fr;gap:8px}
#cmDiv .cmBtn{padding:12px 10px;font-size:.95rem;text-align:center;line-height:1.2}
#cmDiv .cmBtn.on{background:linear-gradient(180deg,#62c74f 0%,#439e34 100%);color:#fff;border:3px solid #0a1f3d;box-shadow:0 5px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.28);text-shadow:-1.5px -1.5px 0 #0a1f3d,1.5px -1.5px 0 #0a1f3d,-1.5px 1.5px 0 #0a1f3d,1.5px 1.5px 0 #0a1f3d}
@media(max-width:560px){#cmDiv .cmRow{grid-template-columns:1fr}}
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
   const rs=document.createElement('div');rs.id='cmRivalSub';rs.setAttribute('role','status');document.body.appendChild(rs);
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
 /* etiquetas por partido (Primera Nacional: Final 1.º Ascenso / 1.ª Fase del Reducido) */
 const mLbl=(m,stg)=>isBN()&&m&&m.tag==='F1'?'Final por el 1.º Ascenso':isBN()&&m&&m.tag==='R1'?'1.ª Fase del Reducido':STAGE_LBL[stg||(S.po&&S.po.stage)];
 const stgLbl=k=>STAGE_LBL[k]||k;
 const outLbl=k=>isBN()&&k==='inicial'?'1.ª Fase del Reducido':isBN()&&k==='cuartos'?'Cuartos del Reducido':isBN()&&k==='semis'?'Semifinales del Reducido':isBN()&&k==='final'?'Final del Reducido':STAGE_LBL[k];
 function statusText(){
  if(isBN()){
   if(S.phase==='regular')return 'Primera Nacional · Zona '+S.myZone+' · Fecha '+S.fecha+'/17';
   if(S.phase==='playoffs')return 'Primera Nacional · '+(S.po.out==='nq'?'Reducido (sin clasificar)':S.po.out==='asc'?'Campeón · 1.º Ascenso':S.po.out?'Eliminado en '+outLbl(S.po.out):'Final / Reducido · '+stgLbl(S.po.stage));
   return 'Temporada finalizada';
  }
  const tl=S.torneo==='clausura'?'Clausura':'Apertura';
  if(S.phase==='regular')return tl+' · Zona '+S.myZone+' · Fecha '+S.fecha+'/16';
  if(S.phase==='playoffs')return tl+' · '+(S.po.out==='nq'?'Playoffs (sin clasificar)':S.po.out?'Eliminado en '+STAGE_LBL[S.po.out]:'Playoffs · '+STAGE_LBL[S.po.stage]);
  if(S.phase==='trofeo')return 'Trofeo de Campeones';
  return 'Temporada finalizada';
 }
 function renderHub(){
  const hub=$('career-hub-screen');if(!hub||!S)return;
  const t=T(S.teamId);
  hub.innerHTML='<div class="cmWrap"><div class="cmHead"><button id="cmBack" class="cmGhost" type="button">← Menú</button>'+
   '<div class="cmTitle"><span class="bd">'+badge(t)+'</span><div><b>'+E(t.name)+'</b><small>'+E(S.player.name)+' (#'+S.player.num+') · '+statusText()+'</small></div></div>'+
   '<button id="cmNew" class="cmGhost" type="button">🆕 Nueva carrera</button></div>'+
   '<nav class="cmTabs">'+[['next','⚽ Próximo Partido'],['table','📊 Tabla de Posiciones'],['anual','📆 Tabla Anual'],['fix',isBN()?'📅 Fixture / Reducido':'📅 Fixture / Playoffs'],['cal','🗓️ Calendario'],['copa','🏆 Copa Argentina'],['squad','👕 Mi Plantel']].filter(x=>!(isBN()&&x[0]==='anual'))
    .map(x=>'<button type="button" data-tab="'+x[0]+'" class="'+(TAB===x[0]?'on':'')+'">'+x[1]+'</button>').join('')+'</nav>'+
   '<div id="cmBody"></div></div>';
  const body=$('cmBody');
  if(isBN()&&TAB==='anual')TAB='next';
  body.innerHTML=TAB==='table'?tabTable():TAB==='anual'?tabAnual():TAB==='fix'?tabFixture():TAB==='cal'?tabCal():TAB==='copa'?tabCopa():TAB==='squad'?tabSquad():tabNext();
  wireHub();
 }
 function wireHub(){
  const hub=$('career-hub-screen');
  hub.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{TAB=b.dataset.tab;SEL=null;renderHub()});
  hub.querySelectorAll('[data-rk]').forEach(b=>b.onclick=()=>{RK=b.dataset.rk;renderHub()});
  hub.querySelectorAll('[data-fx]').forEach(b=>b.onclick=()=>{FXV=b.dataset.fx;renderHub()});
  const calB=hub.querySelector('[data-cal]');if(calB)calB.onclick=()=>{CALALL=!CALALL;renderHub()};
  try{const on=hub.querySelector('.cmChips .on');if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest',inline:'center'})}catch(e){}
  $('cmBack').onclick=()=>{resetMatchFlags();show('screen-home')};
  $('cmNew').onclick=newSeasonFlow;
  const p=$('cmPlay');if(p)p.onclick=playMatch;
  const sk=$('cmSkipSusp');if(sk)sk.onclick=()=>window.cmSkipExpelledMatch();
  const sa=$('cmSimAll');if(sa)sa.onclick=()=>{simRest();renderHub();flushModals()};
  const ns=$('cmNewSeason');if(ns)ns.onclick=newSeasonFlow;
  const nx=$('cmNextSeason');if(nx)nx.onclick=nextSeasonFlow;
  hub.querySelectorAll('.cmPr[data-k]').forEach(b=>b.onclick=()=>squadClick(b.dataset.k,+b.dataset.i));
  hub.querySelectorAll('.cmKb[data-kt]').forEach(b=>b.onclick=()=>{KIT[b.dataset.kt]=b.dataset.kk;renderHub()});
 }
 const nextBtn=cls=>'<button id="cmNextSeason" class="'+cls+'" type="button">➡️ Siguiente temporada</button>';
 function newSeasonFlow(){
  if(!confirm('¿Empezar una nueva carrera? Se borra el progreso guardado de la campaña actual.'))return;
  try{localStorage.removeItem(K2)}catch(e){}
  S=null;const c=$('cmCont');if(c)c.remove();
  show('career-screen');
 }

 /* ---- Camisetas del Próximo Partido (Titular / Suplente) para Local y Visitante ---- */
 let KIT={key:'',h:null,a:null};
 function kitsFor(m){
  const key=m.h+'|'+m.a+'|'+(m.copa?'K|':'')+S.torneo+'|'+S.phase+'|'+S.fecha+'|'+(S.po&&S.po.stage||'');
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
  if(S.phase==='trofeo'&&!userMatch())return doneHtml();
  if(S.phase==='done')return doneHtml();
  const m=userMatch();
  if(!m)return outHtml();
  const myHome=m.h===S.teamId,h=T(m.h),a=T(m.a),ks=kitsFor(m),kH=ks.kH,kA=ks.kA;
  const me=myHome?h:a,rv=myHome?a:h,myKit=myHome?kH:kA,rvKit=myHome?kA:kH;
  const mySide=myHome?ks.sH:ks.sA,rvSide=myHome?ks.sA:ks.sH;
  const mySwapped=mySide==='away',rvSwapped=rvSide==='away'&&(myHome?ks.autoA:false);
  let warn='';
  if(m.copa)warn+='<div class="cmWarn">🏆 <b>COPA ARGENTINA · '+COPA_LBL[S.copaDue].toUpperCase()+'</b> · Partido único en cancha neutral (sede '+E(T(m.venue).shortName)+'). Si hay empate a los '+S.minutes+' min: penales directos, sin tiempo extra.</div>';
  if(S.copaInfo&&!m.copa)warn+='<div class="cmNote">'+E(S.copaInfo)+'</div>';
  if(!m.copa)warn+=copaNextText();
  if(S.phase==='trofeo')warn+='<div class="cmWarn">🏆 <b>TROFEO DE CAMPEONES</b> · Partido único en cancha neutral. Si hay empate a los '+S.minutes+' min: tiempo extra de 1 minuto y, si persiste, tanda de penales.</div>';
  if(S.phase==='playoffs')warn+='<div class="cmWarn">🏆 <b>'+mLbl(m).toUpperCase()+'</b> · Partido único. Si hay empate al final: tiempo extra de 1 minuto y, si persiste, tanda de penales.'+(m.neutral?' · Cancha neutral.':'')+'</div>';
  if(isBN()&&S.phase==='playoffs'&&m.tag==='F1')warn+='<div class="cmWarn">⬆️ <b>1.º ASCENSO</b> · El ganador es Campeón de la Primera Nacional y asciende a Primera División; el perdedor sigue en los Cuartos del Reducido.</div>';
  if(isBN()&&S.phase==='playoffs'&&m.tag==='R1')warn+='<div class="cmWarn">🎯 <b>REDUCIDO</b> · Quien gane sigue en Cuartos; quien pierda queda eliminado. El mejor ubicado de la fase regular es local.</div>';
  if(m.kind==='C')warn+='<div class="cmWarn cmFire">🔥 <b>¡FECHA DE CLÁSICO!</b> Hoy enfrentás a tu clásico rival.</div>';
  if(m.kind==='I')warn+='<div class="cmWarn">🌐 Fecha interzonal: rival de la otra zona.</div>';
  if((S.player.susp||0)>0)warn+='<div class="cmWarn cmFire">🟥 <b>Estás suspendido (1 fecha)</b>: no jugás este partido. Lo mirás desde afuera y tu equipo juega 6v6 con un suplente.</div>';
  const r=rankOf(S.teamId);
  const stand=(S.phase==='regular'&&!m.copa)?'<div class="cmNote">Posición actual: <b>'+r.pos+'º</b> en Zona '+r.z+' · '+r.row.pts+' pts ('+r.row.pj+' PJ) · '+(isBN()?'1.º → Final por el 1.º Ascenso · 2.º al 8.º → Reducido.':'clasifican los 8 primeros.')+'</div>':'';
  return '<div class="cmCard"><h2>'+(m.copa?'🏆 COPA ARGENTINA · '+COPA_LBL[S.copaDue]:S.phase==='regular'?tnName()+' · Fecha '+S.fecha+' de '+NF():S.phase==='trofeo'?'🏆 TROFEO DE CAMPEONES':tnName()+' · '+mLbl(m))+'</h2>'+warn+
   '<div class="cmVs"><div class="tm'+(myHome?' me':'')+'"><span class="cmBd">'+badge(h)+'</span>'+E(h.name)+'<small>LOCAL'+(myHome?' · TU CLUB':'')+'</small>'+kitSvg(myHome?myKit:kH,myHome?S.player.num:'')+'</div>'+
   '<div class="mid">VS</div>'+
   '<div class="tm'+(!myHome?' me':'')+'"><span class="cmBd">'+badge(a)+'</span>'+E(a.name)+'<small>VISITANTE'+(!myHome?' · TU CLUB':'')+'</small>'+kitSvg(!myHome?myKit:kA,!myHome?S.player.num:'')+'</div></div>'+
   '<div class="cmRow"><span class="cmTag">'+(m.copa?'🏟️ Cancha neutral · sede '+E(T(m.venue).shortName)+' ('+E(T(m.venue).name)+')':myHome?'🏟️ Jugás de LOCAL en el estadio de '+E(me.name):'✈️ Jugás de VISITANTE en el estadio de '+E(rv.name))+'</span>'+
   '<span class="cmTag">⏱ '+S.minutes+' min · Realista 6v6</span></div>'+
   (rvSwapped?'<div class="cmNote">'+E(rv.name)+' usa su camiseta suplente para evitar el choque de colores.</div>':'')+
   '<div class="cmKits"><h3>👕 Camisetas del partido</h3><div class="cmKcols"><div><small>LOCAL · '+E(h.shortName)+'</small>'+kitPick('h',h,ks.sH)+'</div><div><small>VISITANTE · '+E(a.shortName)+'</small>'+kitPick('a',a,ks.sA)+'</div></div>'+(ks.clash?'<div class="cmNote">⚠️ Los colores de ambas camisetas son muy parecidos.</div>':'')+'</div>'+
   stand+
   '<button id="cmPlay" class="cmBig" type="button">▶ JUGAR PARTIDO</button>'+
   ((S.player.susp||0)>0?'<button id="cmSkipSusp" class="cmBig" type="button">⏩ Simular partido (Suspendido)</button>':'')+'</div>';
 }
 function outHtmlBN(){
  const o=S.po.out,asc=o==='asc',nq=o==='nq';
  const msg=asc?'🏆 ¡Campeón de la Primera Nacional!':nq?'No clasificaste al Reducido':'Quedaste eliminado en '+outLbl(o);
  const note=asc?'Ganaste la Final por el 1.º Ascenso: ¡ascendés a Primera División! Podés simular el resto del Reducido o empezar otra temporada.':(nq?'Terminaste la fase regular fuera de los 8 primeros de tu zona.':'Tu camino en el torneo terminó acá.')+' Podés simular lo que resta del Reducido o empezar otra temporada.';
  return '<div class="cmCard"><h2>'+E(msg)+'</h2><div class="cmNote">'+E(note)+'</div>'+
   '<div class="cmRow"><button id="cmSimAll" class="cmBtn" type="button">⏩ Simular Reducido restante</button>'+nextBtn('cmBtn')+'<button id="cmNewSeason" class="cmBtn red" type="button">🆕 Nueva carrera</button></div></div>';
 }
 function doneHtmlBN(){
  const P=S.po||{},nm=id=>id?E(T(id).name):'—',me=id=>id===S.teamId;
  const row=(ttl,id,sub)=>id?'<div class="cmVs"><div class="tm'+(me(id)?' me':'')+'"><span class="cmBd">'+badge(T(id))+'</span>'+E(T(id).name)+'<small>'+ttl+(me(id)?' · TU CLUB':'')+'</small></div></div>'+(sub?'<div class="cmNote">'+sub+'</div>':''):'';
  return '<div class="cmCard"><h2>Temporada finalizada · Primera Nacional</h2>'+row('🏆 CAMPEÓN · 1.º ASCENSO',P.champ,'Subcampeón: <b>'+nm(P.runnerUp)+'</b>')+row('⬆️ GANADOR DEL REDUCIDO · 2.º ASCENSO',P.asc2,'')+
   '<div class="cmNote">'+(me(P.champ)?'¡Ganaste la Final y ascendiste a Primera División!':me(P.asc2)?'¡Ganaste el Reducido y ascendiste a Primera División!':'Tu equipo no ascendió en esta temporada.')+'</div>'+
   '<div class="cmNote">Al pasar a la siguiente temporada se simula la Primera División: descienden los 2 últimos de su Tabla Anual y ascienden el Campeón de la Final y el ganador del Reducido.</div>'+
   '<div class="cmRow">'+nextBtn('cmBig')+'<button id="cmNewSeason" class="cmBig red" type="button">🆕 Nueva carrera</button></div></div>';
 }
 function outHtml(){
  if(isBN())return outHtmlBN();
  const msg=S.po.out==='nq'?'No clasificaste a los Playoffs':'Quedaste eliminado en '+STAGE_LBL[S.po.out];
  return '<div class="cmCard"><h2>'+E(msg)+'</h2><div class="cmNote">'+(S.po.out==='nq'?'Terminaste la fase regular fuera de los 8 primeros de tu zona.':'Tu camino en el torneo terminó acá.')+' Podés simular lo que resta de los Playoffs o empezar otra temporada.</div>'+
   annualNote()+'<div class="cmRow"><button id="cmSimAll" class="cmBtn" type="button">⏩ Simular Playoffs restantes</button>'+(S.torneo==='clausura'?nextBtn('cmBtn'):'')+'<button id="cmNewSeason" class="cmBtn red" type="button">🆕 Nueva carrera</button></div></div>';
 }
 function doneHtml(){
  if(isBN())return doneHtmlBN();
  const t=S.trofeo,ap=S.aperturaChampionId,cl=S.clausuraChampionId;
  const nm=id=>id?E(T(id).name):'—';
  const hist='<div class="cmNote">🥈 Apertura: <b>'+nm(ap)+'</b> (sub: '+nm(S.aperturaRunnerUpId)+') · Clausura: <b>'+nm(cl)+'</b> (sub: '+nm(S.clausuraRunnerUpId)+')</div>';
  if(!t)return '<div class="cmCard"><h2>Temporada finalizada</h2>'+hist+annualNote()+'<div class="cmRow">'+nextBtn('cmBig')+'<button id="cmNewSeason" class="cmBig red" type="button">🆕 Nueva carrera</button></div></div>';
  const side=id=>'<div class="tm'+(id===S.teamId?' me':'')+'"><span class="cmBd">'+badge(T(id))+'</span>'+E(T(id).name)+'<small>'+(id===ap&&id===cl?'BICAMPEÓN':id===ap?'CAMPEÓN APERTURA':id===cl?'CAMPEÓN CLAUSURA':'SUBCAMPEÓN')+'</small></div>';
  const vs='<div class="cmVs">'+side(t.h)+'<div class="mid">VS</div>'+side(t.a)+'</div>';
  if(!t.done)return '<div class="cmCard"><h2>'+cupSvg('#facc15',46)+' TROFEO DE CAMPEONES</h2>'+vs+'<div class="cmNote">Partido único: si empatan, tiempo extra y penales. Tu equipo no participa.</div>'+hist+annualNote()+'<div class="cmRow"><button id="cmSimAll" class="cmBtn" type="button">⏩ Simular Trofeo de Campeones</button>'+nextBtn('cmBtn')+'<button id="cmNewSeason" class="cmBig red" type="button">🆕 Nueva carrera</button></div></div>';
  const c=T(t.w);
  return '<div class="cmCard"><h2>Temporada finalizada</h2>'+vs+'<div class="cmVs"><div class="tm"><span class="cmBd">'+badge(c)+'</span>🏆 Trofeo de Campeones: '+E(c.name)+'</div></div><div class="cmNote">Resultado: '+gmScore(t)+'</div>'+
   '<div class="cmNote">'+(t.w===S.teamId?'¡Ganaste el Trofeo de Campeones!':'Tu equipo no levantó el Trofeo de Campeones.')+'</div>'+hist+annualNote()+
   '<div class="cmRow">'+nextBtn('cmBig')+'<button id="cmNewSeason" class="cmBig red" type="button">🆕 Nueva carrera</button></div></div>';
 }
 function gmScore(m){return E(T(m.h).shortName)+' '+m.hg+' - '+m.ag+' '+E(T(m.a).shortName)+(m.pen?' ('+m.pen.h+'-'+m.pen.a+' p)':'')}


 /* ---- Tabla Anual (Primera División): Apertura + Clausura = 32 fechas · los 2 últimos descienden ---- */
 function injectAnualCSS(){
  if($('cmAnualCSS'))return;
  const s=document.createElement('style');s.id='cmAnualCSS';
  s.textContent='.cmT tbody tr.rel td{background:#4a1519;color:#fecaca}.cmT tbody tr.rel td:first-child{box-shadow:inset 4px 0 #ef4444;color:#fca5a5;font-weight:900}.cmT tbody tr.rel td.pt{color:#fecaca}.cmT tbody tr.rel.me td{background:#b91c1c;color:#fff}.cmT tbody tr.cutR td{border-bottom:2px dashed #ef4444}';
  document.head.appendChild(s);
 }
 function tabAnual(){
  injectAnualCSS();
  const rows=annualRows(),n=rows.length;
  const trs=rows.map((r,i)=>'<tr class="'+(i>=n-2?'rel':'')+(i===n-3?' cutR':'')+(r.id===S.teamId?' me':'')+'"><td>'+(i+1)+'</td><td class="cl"><span class="cmBd">'+badge(T(r.id))+'</span>'+E(T(r.id).name)+'</td><td>'+r.pj+'</td><td>'+r.g+'</td><td>'+r.e+'</td><td>'+r.p+'</td><td>'+r.gf+'</td><td>'+r.gc+'</td><td>'+(r.gf-r.gc>0?'+':'')+(r.gf-r.gc)+'</td><td class="pt">'+r.pts+'</td></tr>').join('');
  const me=rows.findIndex(r=>r.id===S.teamId)+1;
  return '<div class="cmCard"><h2>📆 Tabla Anual · Apertura + Clausura</h2><div class="cmNote">Suma de puntos de las 32 fechas ('+(S.torneo==='clausura'?'Apertura completo + Clausura en curso':'Apertura en curso; se completa con el Clausura')+'). 🟥 Los 2 últimos puestos descienden a la Primera Nacional. Tu club: <b>'+me+'º</b> de '+n+'.</div>'+
   '<div class="cmScroll"><table class="cmT"><thead><tr><th>Pos</th><th style="text-align:left">Club</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th></tr></thead><tbody>'+trs+'</tbody></table></div>'+
   '<div class="cmNote">Desempate: Puntos → Diferencia de Gol → Goles a Favor. Al cerrar el año ascienden a Primera División el Campeón de la Final y el ganador del Reducido de la Primera Nacional.</div></div>';
 }
 function annualNote(){
  if(isBN()||!S||S.torneo!=='clausura'||!(S.phase==='playoffs'||S.phase==='trofeo'||S.phase==='done'))return '';
  const d=annualRows().slice(-2).reverse();
  return '<div class="cmNote">📆 Tabla Anual · descienden a la Primera Nacional: '+d.map(x=>'<b style="color:#f87171">'+E(T(x.id).name)+'</b>').join(' y ')+(d.some(x=>x.id===S.teamId)?' · <b>¡Tu club desciende!</b>':'')+'. Ascienden el Campeón de la Final y el ganador del Reducido de la Primera Nacional.</div>';
 }
 function tableHtml(z){
  const rows=stats(S.zones[z]);
  return '<div class="cmCard"><h2>Zona '+z+'</h2><div class="cmScroll"><table class="cmT"><thead><tr><th>Pos</th><th style="text-align:left">Club</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th></tr></thead><tbody>'+
   rows.map((r,i)=>'<tr class="'+(i<8?'q':'')+(i===7?' cut':'')+(r.id===S.teamId?' me':'')+'"><td>'+(i+1)+'</td><td class="cl"><span class="cmBd">'+badge(T(r.id))+'</span>'+E(T(r.id).name)+'</td><td>'+r.pj+'</td><td>'+r.g+'</td><td>'+r.e+'</td><td>'+r.p+'</td><td>'+r.gf+'</td><td>'+r.gc+'</td><td>'+(r.gf-r.gc>0?'+':'')+(r.gf-r.gc)+'</td><td class="pt">'+r.pts+'</td></tr>').join('')+
   '</tbody></table></div></div>';
 }
 function posHtml(){return '<div class="cmZ">'+tableHtml('A')+tableHtml('B')+'</div><div class="cmNote">'+(isBN()?'🟩 1.º de cada zona → Final por el 1.º Ascenso · 2.º al 8.º → Reducido por el 2.º Ascenso ·':'🟩 Los 8 primeros de cada zona clasifican a los Playoffs ·')+' Desempate: Puntos → Diferencia de Gol → Goles a Favor.</div>'}
 /* ---- Rankings de la liga (Tabla de Posiciones) ---- */
 const RKS=[['pos','Posiciones'],['g','Goleadores'],['a','Asistidores'],['gk','Arqueros'],['def','Defensores']];
 let RK='pos';
 function rankHtml(kind){
  const O=ps();if(!O)return '';
  const L=Object.values(O),by=(f,tie)=>(x,y)=>f(y)-f(x)||(tie?tie(x,y):0)||String(x.n).localeCompare(String(y.n));
  let rows,val,lbl,sub=null;
  if(kind==='g'){rows=L.filter(e=>e.g>0).sort(by(e=>e.g,(x,y)=>y.a-x.a));val=e=>e.g;lbl='Goles'}
  else if(kind==='a'){rows=L.filter(e=>e.a>0).sort(by(e=>e.a,(x,y)=>y.g-x.g));val=e=>e.a;lbl='Asistencias'}
  else if(kind==='gk'){rows=L.filter(e=>e.pos==='GK'&&e.pj>0).sort(by(e=>e.v,(x,y)=>x.gr-y.gr));val=e=>e.v;lbl='Vallas Invictas';sub=e=>'Goles Recibidos '+e.gr}
  else{rows=L.filter(e=>e.pos==='DEF'&&e.r>0).sort(by(e=>e.r));val=e=>e.r;lbl='Recuperaciones'}
  rows=rows.slice(0,15);
  const ttl=RKS.filter(x=>x[0]===kind)[0][1];
  return '<h2>Top 15 · '+ttl+' <small style="color:#facc15">('+lbl+')</small></h2><div class="cmRk">'+
   (rows.length?rows.map((e,i)=>{const t=T(e.t);
    return '<div class="cmRkRow'+(e.id==='USER'?' me':'')+'"><span class="ps">'+(i+1)+'</span><span class="cmBd">'+badge(t)+'</span><span class="nm"><b>'+E(e.n)+(e.id==='USER'?' (TÚ)':'')+'</b><small>'+E(t.shortName||t.name)+' · #'+E(e.num)+'</small></span>'+
     (sub?'<span class="cmPill s">'+sub(e)+'</span>':'')+'<span class="cmPill" title="'+lbl+'">'+val(e)+'</span></div>'}).join(''):
    '<div class="cmNote">Todavía no hay datos: se completan a medida que se juegan las fechas.</div>')+'</div>';
 }
 function rkNav(){return '<div class="cmRkNav">'+RKS.map(x=>'<button type="button" data-rk="'+x[0]+'" class="'+(RK===x[0]?'on':'')+'">'+x[1]+'</button>').join('')+'</div>'}
 function userStats(){const u=(ps()||{}).USER||{g:0,a:0};
  return '<div class="cmUS"><span class="cmUSi">⚽ Goles <b class="cmPill">'+(u.g|0)+'</b></span><span class="cmUSi">🅰️ Asistencias <b class="cmPill">'+(u.a|0)+'</b></span></div>'}
 function injectStatsCSS(){
  if($('cmStatsCSS'))return;
  const s=document.createElement('style');s.id='cmStatsCSS';
  s.textContent=`
.cmRkNav{display:flex;gap:6px;overflow-x:auto;padding:2px 2px 7px}
.cmRkNav button{flex:1;min-width:max-content;padding:8px 14px;font-size:.9rem;font-weight:900;font-style:italic;letter-spacing:.02em;color:#fff;background:linear-gradient(180deg,#303843 0%,#262c34 100%);border:2.5px solid #0a1f3d;border-radius:16px;box-shadow:0 4px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.2);text-shadow:-1px -1px 0 #0a1f3d,1px -1px 0 #0a1f3d,-1px 1px 0 #0a1f3d,1px 1px 0 #0a1f3d;transition:transform .08s ease,box-shadow .08s ease,filter .12s ease}
.cmRkNav button.on{background:linear-gradient(180deg,#4cb5f7 0%,#1f8be3 100%)}
.cmRkNav button:hover{filter:brightness(1.1)}
.cmRkNav button:active{transform:translateY(3px);box-shadow:0 1px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.2)}
.cmRk{display:flex;flex-direction:column;gap:6px}
.cmRkRow{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:12px;background:#262c34;border:2px solid #0a1f3d;box-shadow:0 3px 0 rgba(0,0,0,.35);color:#fff}
.cmRkRow.me{background:rgba(2,132,199,.6);border-color:#e0f7ff}
.cmRkRow .ps{flex:none;width:24px;text-align:center;font-weight:900;color:#9fd5ff}
.cmRkRow .cmBd{flex:none;width:28px;height:28px;display:block}
.cmRkRow .cmBd svg{width:100%;height:100%;display:block}
.cmRkRow .nm{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.15}
.cmRkRow .nm b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.92rem}
.cmRkRow .nm small{color:#9fc0ee;font-weight:700;font-size:.72rem}
.cmPill{display:inline-block;flex:none;min-width:38px;text-align:center;padding:3px 12px;border-radius:999px;background:#facc15;color:#0a1f3d;border:2.5px solid #0a1f3d;box-shadow:0 2px 0 #0a1f3d;font-weight:900;font-size:1.05rem;font-style:normal}
.cmPill.s{background:#cfe3ff;min-width:0;font-size:.7rem;padding:2px 8px;white-space:nowrap}
.cmUS{display:flex;gap:10px;flex-wrap:wrap;margin:2px 0 4px}
.cmUSi{display:inline-flex;align-items:center;gap:6px;font-weight:900;font-size:.85rem;color:#fff}
/* ---- Fixture en cuadrícula · Calendario · Vitrina ---- */
.cmGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px}
.cmGc{display:flex;flex-direction:column;gap:3px;min-width:0;padding:6px 8px;background:#161a1f;border:2px solid #0a1f3d;border-radius:12px;box-shadow:0 3px 0 rgba(0,0,0,.4);font-weight:800;font-size:.78rem}
.cmGc.me{background:#1f8be3}.cmGc.cur{outline:2px solid #facc15}
.cmGc .gh,.cmGc .gf{display:flex;justify-content:space-between;gap:6px;font-size:.6rem;font-weight:900;color:#9fc0ee;text-transform:uppercase;letter-spacing:.2px;white-space:nowrap;overflow:hidden}
.cmGc.me .gh,.cmGc.me .gf{color:#e0f2ff}
.cmGc .r{display:flex;align-items:center;gap:5px;min-width:0}
.cmGc .r .cmBd{width:22px;height:22px}
.cmGc .r b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.cmGc .r em{min-width:26px;text-align:right;font-style:normal;font-weight:900;color:#facc15}
.cmGc.me .r em{color:#fff}.cmGc .r.w b,.cmGc .r.w em{color:#86efac}
.cmBd.q{display:flex;align-items:center;justify-content:center;border:2px dashed #475569;border-radius:50%;color:#94a3b8;font-size:.7rem;font-weight:900}
.cmLv{font-style:normal;font-size:.6rem;font-weight:900;line-height:1;padding:2px 5px;border-radius:999px;border:1.5px solid #000;color:#fff;white-space:nowrap}
.cmLv.l{background:#16a34a}.cmLv.v{background:#ea580c}.cmLv.n{background:#7c3aed}
.cmChips{display:flex;gap:5px;overflow-x:auto;padding:2px 0 6px;-webkit-overflow-scrolling:touch}
.cmChip{flex:none;background:#262c34;color:#fff;border:2px solid #0a1f3d;border-radius:999px;padding:4px 10px;font-size:.74rem;font-weight:900;cursor:pointer}
.cmChip.dn{color:#86efac}.cmChip.on{background:linear-gradient(180deg,#4cb5f7 0%,#1f8be3 100%);color:#fff;border-color:#0a1f3d}
.cmCal{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;padding-top:6px}
.cmCc{position:relative;display:flex;flex-direction:column;gap:6px;min-width:0;padding:8px;background:#161a1f;border:2px solid #0a1f3d;border-radius:14px;box-shadow:0 3px 0 rgba(0,0,0,.4)}
.cmCc.nx{border-color:#facc15;background:#1c2430}
.cmCc .ct{display:flex;align-items:center;gap:8px;min-width:0}
.cmCc .ci{flex:none;display:block;width:34px;height:34px}.cmCc .ci svg{width:34px;height:34px;margin:0!important;display:block}
.cmCc .ct b{display:block;font-size:.78rem;color:#facc15;font-style:italic;line-height:1.1}
.cmCc .ct small{display:block;font-size:.66rem;color:#9fc0ee;font-weight:800;line-height:1.15}
.cmCc .cr{display:flex;align-items:center;gap:6px;min-width:0;font-weight:900;font-size:.82rem}
.cmCc .cr .cmBd{width:26px;height:26px}.cmCc .cr b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cmCc .cn{font-size:.64rem;color:#9fc0ee;font-weight:800}
.cmCc .cx{position:absolute;top:-9px;right:8px;background:#facc15;color:#0a1f3d;border:2px solid #0a1f3d;border-radius:999px;font-size:.56rem;font-weight:900;padding:1px 7px}
.cmVit{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}
.cmVt{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;text-align:center;padding:8px 6px;background:#161a1f;border:2px solid #0a1f3d;border-radius:14px;box-shadow:0 3px 0 rgba(0,0,0,.4)}
.cmVt .ti{display:block}.cmVt .ti svg{display:block;margin:0!important;filter:grayscale(1) opacity(.45)}
.cmVt.got .ti svg{filter:drop-shadow(0 0 6px rgba(250,204,21,.7))}
.cmVt b{font-size:.72rem;color:#facc15;font-style:italic;text-transform:uppercase;line-height:1.1}
.cmVt .cmBd{width:40px;height:40px}
.cmVt .pd{font-size:.8rem;font-weight:900;color:#94a3b8;font-style:italic;padding:10px 0}
.cmVt .cn2{font-size:.76rem;font-weight:900;line-height:1.1}
.cmVt.me{border-color:#facc15;box-shadow:0 0 14px rgba(250,204,21,.5),0 3px 0 rgba(0,0,0,.4)}
.cmVt em{font-style:normal;font-size:.6rem;font-weight:900;color:#0a1f3d;background:#facc15;border-radius:999px;padding:1px 8px}
@media(max-width:420px){.cmGrid,.cmCal{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;
  document.head.appendChild(s);
 }
 function tabTable(){return rkNav()+(RK==='pos'?posHtml():'<div class="cmCard">'+rankHtml(RK)+'</div>')}

 function gmHtml(m){
  const mine=m.h===S.teamId||m.a===S.teamId,h=T(m.h),a=T(m.a);
  let sc=m.done?m.hg+' - '+m.ag+(m.pen?' ('+m.pen.h+'-'+m.pen.a+' p)':''):'vs';
  const ic=m.kind==='C'?'🔥 ':m.kind==='I'?'🌐 ':'';
  return '<div class="gm'+(mine?' me':'')+'"><span class="h">'+E(h.shortName)+'<span class="cmBd">'+badge(h)+'</span></span><b>'+ic+sc+'</b><span class="a"><span class="cmBd">'+badge(a)+'</span>'+E(a.shortName)+'</span></div>';
 }
 /* Ícono cartoon vector del trofeo (copa dorada con asas, base y estrella) */
 /* Copa cartoon vector: plateada (LPF, torneos) o dorada #facc15 (Trofeo de Campeones), con borde negro */
 function cupSvg(col,size,lpf){
  const d=col==='#facc15'?'#e0a800':'#94a3b8',hi=col==='#facc15'?'#fff6bf':'#ffffff';
  return '<svg class="cmTro" viewBox="0 0 64 64" width="'+size+'" height="'+size+'" style="vertical-align:middle;margin-right:4px" aria-hidden="true">'+
   '<path d="M18 14H8c0 10 5 15 10 15M46 14h10c0 10-5 15-10 15" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>'+
   '<path d="M18 14H8c0 10 5 15 10 15M46 14h10c0 10-5 15-10 15" fill="none" stroke="'+col+'" stroke-width="5" stroke-linecap="round"/>'+
   '<path d="M17 6h30v18c0 11-7 18-15 18S17 35 17 24V6z" fill="'+col+'" stroke="#000" stroke-width="4" stroke-linejoin="round"/>'+
   '<path d="M23 10v14c0 6 3 11 7 13" fill="none" stroke="'+hi+'" stroke-width="3" stroke-linecap="round"/>'+
   (lpf?'<text x="32" y="26" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="9" fill="#000">LPF</text>':'<path d="M32 15l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.9 2.7 1.1-5.3-4-3.7 5.4-.6z" fill="#000"/>')+
   '<rect x="28" y="42" width="8" height="8" fill="'+d+'" stroke="#000" stroke-width="3"/>'+
   '<rect x="19" y="50" width="26" height="8" rx="2.5" fill="'+col+'" stroke="#000" stroke-width="3.5"/></svg>';
 }
 function trophySvg(){return cupSvg('#cbd5e1',26,true)}
 function trophySvgOld(){
  return '<svg class="cmTro" viewBox="0 0 64 64" width="26" height="26" style="vertical-align:middle;margin-right:4px" aria-hidden="true">'+
   '<path d="M18 14H8c0 10 5 15 10 15M46 14h10c0 10-5 15-10 15" fill="none" stroke="#0a1f3d" stroke-width="9" stroke-linecap="round"/>'+
   '<path d="M18 14H8c0 10 5 15 10 15M46 14h10c0 10-5 15-10 15" fill="none" stroke="#facc15" stroke-width="5" stroke-linecap="round"/>'+
   '<path d="M17 6h30v18c0 11-7 18-15 18S17 35 17 24V6z" fill="#facc15" stroke="#0a1f3d" stroke-width="4" stroke-linejoin="round"/>'+
   '<path d="M23 10v14c0 6 3 11 7 13" fill="none" stroke="#fff6bf" stroke-width="3" stroke-linecap="round"/>'+
   '<path d="M32 15l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.9 2.7 1.1-5.3-4-3.7 5.4-.6z" fill="#0a1f3d"/>'+
   '<rect x="28" y="42" width="8" height="8" fill="#e0a800" stroke="#0a1f3d" stroke-width="3"/>'+
   '<rect x="19" y="50" width="26" height="8" rx="2.5" fill="#facc15" stroke="#0a1f3d" stroke-width="3.5"/></svg>';
 }
 /* Cruces proyectados de Octavos según la tabla actual (1º A vs 8º B … / 1º B vs 8º A …), igual que endRegular() */
 function projInicial(){
  const qA=stats(S.zones.A).slice(0,8).map(r=>r.id),qB=stats(S.zones.B).slice(0,8).map(r=>r.id),o=[];
  const p=(h,a,tag)=>({h,a,hg:null,ag:null,done:false,w:null,pen:null,proj:true,tag,neutral:tag==='F1'});
  o.push(p(qA[0],qB[0],'F1'));
  for(let i=1;i<8;i++){const a=qA[i],b=qB[8-i];o.push((i+1)<=(9-i)?p(a,b,'R1'):p(b,a,'R1'))}
  return o;
 }
 function projOctavos(){
  if(isBN())return projInicial();
  const qA=stats(S.zones.A).slice(0,8).map(r=>r.id),qB=stats(S.zones.B).slice(0,8).map(r=>r.id),o=[];
  for(let i=0;i<4;i++)o.push({h:qA[i],a:qB[7-i],hg:null,ag:null,done:false,w:null,pen:null,proj:true});
  for(let i=0;i<4;i++)o.push({h:qB[i],a:qA[7-i],hg:null,ag:null,done:false,w:null,pen:null,proj:true});
  return o;
 }
 function bracketHtml(){
  let cols='';
  STAGES.forEach(sg=>{
   let rd=S.po&&S.po.rounds[sg]||[];
   const proj=sg===STAGES[0]&&!rd.length&&S.phase==='regular';
   if(proj)rd=projOctavos();
   const cnt={octavos:8,inicial:8,cuartos:4,semis:2,final:1}[sg];
   let ms='';
   if(rd.length){
    ms=rd.map(m=>{const mine=m.h===S.teamId||m.a===S.teamId,line=(id,g,isH)=>{const w=m.done&&m.w===id;return '<div class="l'+(w?' w':'')+'"><span><span class="cmBd">'+badge(T(id))+'</span>'+E(T(id).shortName)+'</span><b>'+(m.done?g+((m.pen)?' ('+(isH?m.pen.h:m.pen.a)+')':''):'')+'</b></div>'};
     return '<div class="bm'+(mine?' me':'')+'">'+line(m.h,m.hg,true)+line(m.a,m.ag,false)+'</div>'}).join('');
   }else{for(let i=0;i<cnt;i++)ms+='<div class="bm"><div class="l"><span>A definir</span></div><div class="l"><span>A definir</span></div></div>'}
   cols+='<div class="col"><h4>'+(sg==='final'?trophySvg():'')+STAGE_LBL[sg]+(proj?' (proyección)':'')+'</h4>'+ms+'</div>';
  });
  return '<div class="cmScroll"><div class="cmBr">'+cols+'</div></div>'+(S.po&&S.po.champ?'<div class="cmWarn">🏆 Campeón: <b>'+E(nameOf(S.po.champ))+'</b></div>':'');
 }
 /* Copa Argentina: copa plateada con franjas celestes #38bdf8 y blancas, base escalonada oscura y contorno negro grueso */
 function copaArgSvg(size){
  const id='cmCa'+(++uid);
  return '<svg class="cmTro" viewBox="0 0 64 64" width="'+size+'" height="'+size+'" style="vertical-align:middle;margin-right:4px" aria-hidden="true"><defs><clipPath id="'+id+'"><path d="M16 5h32v17c0 12-7 19-16 19S16 34 16 22V5z"/></clipPath></defs>'+
   '<path d="M17 12H7c0 11 5 16 11 16M47 12h10c0 11-5 16-11 16" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>'+
   '<path d="M17 12H7c0 11 5 16 11 16M47 12h10c0 11-5 16-11 16" fill="none" stroke="#e2e8f0" stroke-width="4.5" stroke-linecap="round"/>'+
   '<path d="M16 5h32v17c0 12-7 19-16 19S16 34 16 22V5z" fill="#e2e8f0"/>'+
   '<g clip-path="url(#'+id+')"><rect x="16" y="5" width="6.4" height="40" fill="#38bdf8"/><rect x="22.4" y="5" width="6.4" height="40" fill="#fff"/><rect x="28.8" y="5" width="6.4" height="40" fill="#38bdf8"/><rect x="35.2" y="5" width="6.4" height="40" fill="#fff"/><rect x="41.6" y="5" width="6.4" height="40" fill="#38bdf8"/></g>'+
   '<path d="M16 5h32v17c0 12-7 19-16 19S16 34 16 22V5z" fill="none" stroke="#000" stroke-width="4" stroke-linejoin="round"/>'+
   '<rect x="12" y="4" width="40" height="5" rx="2" fill="#cbd5e1" stroke="#000" stroke-width="3"/>'+
   '<rect x="28" y="41" width="8" height="8" fill="#cbd5e1" stroke="#000" stroke-width="3"/>'+
   '<rect x="21" y="49" width="22" height="5" fill="#334155" stroke="#000" stroke-width="3"/><rect x="15" y="54" width="34" height="6" rx="1.5" fill="#1f2937" stroke="#000" stroke-width="3.5"/></svg>';
 }
 function copaBracketHtml(){
  const C=S.copa;
  let cols='';
  COPA_ST.forEach(sg=>{
   const rd=C.rounds[sg]||[],cnt={treintaidosavos:32,dieciseisavos:16,octavos:8,cuartos:4,semi:2,final:1}[sg];
   let ms='';
   if(rd.length){
    ms=rd.map(m=>{const mine=m.h===S.teamId||m.a===S.teamId,line=(id,g,isH)=>{const w=m.done&&m.w===id;return '<div class="l'+(w?' w':'')+'"><span><span class="cmBd">'+badge(T(id))+'</span>'+E(T(id).shortName)+'</span><b>'+(m.done?g+((m.pen)?' ('+(isH?m.pen.h:m.pen.a)+')':''):'')+'</b></div>'};
     return '<div class="bm'+(mine?' me':'')+'">'+line(m.h,m.hg,true)+line(m.a,m.ag,false)+'<div style="font-size:.62rem;opacity:.75;text-align:center">'+(m.venue?'🏟️ '+E(T(m.venue).shortName):'')+'</div></div>'}).join('');
   }else for(let i=0;i<cnt;i++)ms+='<div class="bm"><div class="l"><span>A definir</span></div><div class="l"><span>A definir</span></div></div>';
   const byeTxt=(sg==='treintaidosavos'&&C.byes.length)?'<div class="cmNote" style="font-size:.7rem">Pasan directo a los 16avos: <b>'+C.byes.map(id=>E(T(id).shortName)).join(' · ')+'</b></div>':'';
   cols+='<div class="col"><h4>'+(sg==='final'?copaArgSvg(26):'')+COPA_LBL[sg]+'</h4>'+ms+byeTxt+'</div>';
  });
  return '<div class="cmScroll"><div class="cmBr" style="grid-template-columns:repeat(6,minmax(170px,1fr))">'+cols+'</div></div>';
 }
 function tabCopa(){
  const C=S.copa;if(!C)return '<div class="cmCard"><h2>Copa Argentina</h2><div class="cmNote">Sin datos de Copa.</div></div>';
  const stg=S.copaDue?'¡Te toca jugar los '+COPA_LBL[S.copaDue]+'! Andá a Próximo Partido.':C.done?'Copa finalizada · Campeón: '+E(nameOf(C.champ))+' (subcampeón: '+E(nameOf(C.runnerUp))+')':C.out?'Tu equipo quedó eliminado en '+COPA_LBL[C.out]+'.':C.next===0?'El sorteo se revela antes de los 32avos de Final.':'Seguís en carrera.';
  const cal=copaPts().map(pt=>COPA_LBL[pt[2]]+' → tras Fecha '+pt[1]+(pt[0]==='bnacional'?'':' del '+copaTn(pt[0]))).join(' · ');
  return '<div class="cmCard"><h2>'+copaArgSvg(40)+' COPA ARGENTINA</h2><div class="cmNote">'+(C.np||30)+' clubes de Primera División + '+(C.nb||34)+' de la Primera Nacional · cuadro de 64 equipos desde 32avos de Final · partido único en cancha neutral · penales directos si empatan.</div>'+
   '<div class="cmWarn">'+stg+'</div>'+copaBracketHtml()+'<div class="cmNote">📅 '+cal+'</div></div>';
 }
 /* ---- Fixture / Playoffs en cuadrícula de tarjetas compactas ---- */
 let FXV=null,FXK='',CALALL=false;
 const FXS_P={octavos:'Octavos',cuartos:'Cuartos',semis:'Semis',final:'Final'},FXS_B={inicial:'Final + 1.ª Fase',cuartos:'Cuartos',semis:'Semis',final:'Final Red.'};
 let FXS=FXS_P;
 const lvPill=(c,t)=>'<i class="cmLv '+c+'">'+t+'</i>';
 /* tarjeta compacta: escudo + sigla + L/V (o sede neutral) + resultado/estado + fecha */
 function gcHtml(m,head,cur,proj){
  const mine=m.h===S.teamId||m.a===S.teamId,neutral=!!m.neutral;
  const win=m.done?(m.w||(m.hg>m.ag?m.h:m.ag>m.hg?m.a:null)):null;
  const row=(id,g,isH)=>{const t=T(id);return '<div class=\"r'+(win===id?' w':'')+'\"><span class=\"cmBd\">'+badge(t)+'</span><b>'+E(t.shortName)+'</b>'+(neutral?'':lvPill(isH?'l':'v',isH?'L':'V'))+'<em>'+(m.done?g+(m.pen?' ('+(isH?m.pen.h:m.pen.a)+')':''):'–')+'</em></div>'};
  let st;
  if(m.done){st='Final'+(m.pen?' · pen.':'');if(mine)st=win===S.teamId?'✅ Ganaste':win?'❌ Perdiste':'🤝 Empate'}
  else st=proj?'Proyección':(cur&&mine)?'▶ Tu partido':'Por jugar';
  const ic=m.kind==='C'?'🔥 Clásico':m.kind==='I'?'🌐 Interzonal':'';
  const nt=neutral?'🏟️ Neutral'+(m.venue?' · '+E(T(m.venue).shortName):''):'';
  return '<div class=\"cmGc'+(mine?' me':'')+(cur&&mine&&!m.done?' cur':'')+'\"><div class=\"gh\"><span>'+E(head)+'</span><span>'+ic+'</span></div>'+row(m.h,m.hg,true)+row(m.a,m.ag,false)+'<div class=\"gf\"><span>'+st+'</span><span>'+nt+'</span></div></div>';
 }
 function tabFixture(){
  const key=S.torneo+'|'+S.phase+'|'+S.fecha+'|'+(S.po&&S.po.stage||'');
  if(key!==FXK){FXK=key;FXV=null}
  const opts=[];for(let n=1;n<=NF();n++)opts.push(['f'+n,'F'+n]);STAGES.forEach(sg=>opts.push([sg,FXS[sg]]));
  const def=S.phase==='regular'?'f'+Math.min(NF(),S.fecha):(S.phase==='playoffs'&&S.po)?S.po.stage:S.po?'final':'f'+NF();
  if(!FXV||!opts.some(o=>o[0]===FXV))FXV=def;
  const isF=/^f\d+$/.test(FXV),mineN=m=>+(m.h===S.teamId||m.a===S.teamId);
  let cards='',ttl='';
  if(isF){
   const n=+FXV.slice(1),fx=(S.fixture[n-1]||[]).slice().sort((a,b)=>mineN(b)-mineN(a));
   ttl='Fase regular · Fecha '+n+' de '+NF()+(!isBN()&&n===16?' · Interzonal':'');
   cards=fx.map(m=>gcHtml(m,'Fecha '+n,S.phase==='regular'&&n===S.fecha,false)).join('');
  }else{
   let rd=S.po&&S.po.rounds[FXV]||[];const proj=FXV===STAGES[0]&&!rd.length&&S.phase==='regular';
   if(proj)rd=projOctavos();
   ttl=(isBN()?'Final 1.º Ascenso / Reducido · ':'Playoffs · ')+STAGE_LBL[FXV]+(proj?' (proyección)':'');
   if(rd.length)cards=rd.slice().sort((a,b)=>mineN(b)-mineN(a)).map(m=>gcHtml(m,mLbl(m,FXV),S.phase==='playoffs'&&S.po.stage===FXV,proj)).join('');
   else{const cnt={octavos:8,inicial:8,cuartos:4,semis:2,final:1}[FXV];for(let i=0;i<cnt;i++)cards+='<div class=\"cmGc\"><div class=\"gh\"><span>'+E(STAGE_LBL[FXV])+'</span><span></span></div><div class=\"r\"><span class=\"cmBd q\">?</span><b>A definir</b></div><div class=\"r\"><span class=\"cmBd q\">?</span><b>A definir</b></div><div class=\"gf\"><span>Por jugar</span><span></span></div></div>'}
  }
  const chips=opts.map(o=>{const done=/^f\d+$/.test(o[0])?(S.fixture[+o[0].slice(1)-1]||[]).every(m=>m.done):!!(S.po&&S.po.rounds[o[0]]&&S.po.rounds[o[0]].length&&S.po.rounds[o[0]].every(m=>m.done));return '<button type=\"button\" class=\"cmChip'+(FXV===o[0]?' on':'')+(done?' dn':'')+'\" data-fx=\"'+o[0]+'\">'+o[1]+'</button>'}).join('');
  return '<div class=\"cmCard\"><h2>'+tnName()+' · '+ttl+'</h2><div class=\"cmChips\">'+chips+'</div><div class=\"cmGrid\">'+cards+'</div>'+
   (!S.po?'<div class=\"cmNote\">'+(isBN()?'Cruces proyectados según la tabla actual; se confirman al terminar la fecha 17 (1.º de cada zona: Final por el 1.º Ascenso · 2.º al 8.º: Reducido).':'Octavos proyectados según la tabla actual; se confirman al terminar la fecha 16 (clasifican los 8 primeros de cada zona).')+'</div>':'')+
   (S.po&&S.po.champ?'<div class=\"cmWarn\">🏆 Campeón: <b>'+E(nameOf(S.po.champ))+'</b></div>':'')+'</div>';
 }

 /* ---- Calendario (próximos compromisos del club) + vitrina Campeones de la Temporada ---- */
 const CERT={apertura:'Torneo Apertura',clausura:'Torneo Clausura',copa:'Copa Argentina',trofeo:'Trofeo de Campeones',bnacional:'Primera Nacional',reducido:'Reducido · 2.º Ascenso'};
 const certIcon=(k,sz)=>k==='bnacional'||k==='reducido'?cupSvg('#cbd5e1',sz,false):k==='copa'?copaArgSvg(sz):k==='trofeo'?cupSvg('#facc15',sz):cupSvg('#cbd5e1',sz,true);
 function userFxM(n,inv){
  const f=S.fixture[n-1],m=f&&f.find(x=>x.h===S.teamId||x.a===S.teamId);if(!m)return null;
  const bh=m.h===S.teamId,home=inv?!bh:bh;
  return{rival:bh?m.a:m.h,loc:home?'L':'V',kind:m.kind,done:m.done};
 }

 function copaItemFn(out){
  const C=S.copa,tid=S.teamId;
  return i=>{
   const stg=COPA_ST[i];let rival=null,venue=null,note='';
   const known=C.rounds[stg]&&C.rounds[stg].length&&!(i===0&&C.next===0);
   if(known){
    const m=C.rounds[stg].find(x=>x.h===tid||x.a===tid);
    if(m){rival=m.h===tid?m.a:m.h;venue=m.venue}
    else if(i===0&&C.byes.indexOf(tid)>=0)note='Libre: clasificado directo a los 16avos';
   }else if(i===0)note='Sorteo pendiente';
   else note='Si avanzás de ronda';
   out.push({ic:'copa',title:CERT.copa,sub:COPA_LBL[stg],rival,loc:'N',venue,note});
  };
 }
 function calItemsBN(){
  const out=[],tid=S.teamId,ic='bnacional',ttl=CERT.bnacional,C=S.copa,copaOn=!!C&&!C.done&&!C.out,copaItem=copaOn?copaItemFn(out):null;
  if(S.phase==='regular'){
   if(copaOn&&S.copaDue)copaItem(COPA_ST.indexOf(S.copaDue));
   for(let n=S.fecha;n<=17;n++){const u=userFxM(n,false);if(u&&!u.done)out.push({ic,title:ttl,sub:'Fecha '+n+' de 17',rival:u.rival,loc:u.loc,venue:null,note:''});if(copaOn)COPA_PTS_B.forEach((pt,i)=>{if(pt[1]===n&&i>=C.next)copaItem(i)})}
   out.push({ic,title:ttl,sub:'Final por el 1.º Ascenso',rival:null,loc:'N',venue:null,note:'Si terminás 1.º de tu zona'});
   out.push({ic,title:ttl,sub:'Reducido · 1.ª Fase',rival:null,loc:'',venue:null,note:'Si terminás 2.º al 8.º de tu zona'});
  }else if(S.phase==='playoffs'&&S.po&&!S.po.out){
   STAGES.forEach((sg,si)=>{
    if(si<STAGES.indexOf(S.po.stage))return;
    const m=(S.po.rounds[sg]||[]).find(x=>!x.done&&(x.h===tid||x.a===tid));
    out.push({ic,title:ttl,sub:m?mLbl(m,sg):stgLbl(sg),rival:m?(m.h===tid?m.a:m.h):null,loc:m?(m.neutral?'N':m.h===tid?'L':'V'):(sg==='final'?'N':''),venue:null,note:m?'':'Si avanzás de ronda'});
   });
  }
  return out;
 }
 function calItems(){
  const out=[],C=S.copa,tid=S.teamId;
  if(!S||!(S.phase==='regular'||S.phase==='playoffs'||S.phase==='trofeo'))return out;
  if(isBN())return calItemsBN();
  const copaOn=!!C&&!C.done&&!C.out;
  const copaItem=copaItemFn(out);
  if(copaOn&&S.copaDue)copaItem(COPA_ST.indexOf(S.copaDue));
  const tns=S.phase==='trofeo'?[]:S.torneo==='apertura'?['apertura','clausura']:['clausura'];
  tns.forEach(tn=>{
   const cur=tn===S.torneo,f0=cur?(S.phase==='regular'?S.fecha:17):1;
   for(let n=f0;n<=16;n++){
    const u=userFxM(n,!cur);
    if(u&&!(cur&&u.done))out.push({ic:tn,title:CERT[tn],sub:'Fecha '+n+(n===16?' · Interzonal':''),rival:u.rival,loc:u.loc,venue:null,note:u.kind==='C'?'🔥 Clásico':u.kind==='I'?'🌐 Interzonal':''});
    if(copaOn)COPA_PTS.forEach((pt,i)=>{if(pt[0]===tn&&pt[1]===n&&i>=C.next)copaItem(i)});
   }
   if(cur&&S.phase==='playoffs'){
    if(!S.po.out)STAGES.forEach((sg,si)=>{
     if(si<STAGES.indexOf(S.po.stage))return;
     const m=(S.po.rounds[sg]||[]).find(x=>!x.done&&(x.h===tid||x.a===tid));
     out.push({ic:tn,title:CERT[tn],sub:'Playoffs · '+STAGE_LBL[sg],rival:m?(m.h===tid?m.a:m.h):null,loc:m?(m.neutral?'N':m.h===tid?'L':'V'):(sg==='final'?'N':''),venue:null,note:m?'':'Si avanzás de ronda'});
    });
   }else out.push({ic:tn,title:CERT[tn],sub:'Playoffs · Octavos → Final',rival:null,loc:'',venue:null,note:'Si clasificás (8 primeros de la zona)'});
  });
  const tr=S.trofeo;
  if(S.phase==='trofeo'){if(tr&&!tr.done&&(tr.h===tid||tr.a===tid))out.push({ic:'trofeo',title:CERT.trofeo,sub:'Partido único',rival:tr.h===tid?tr.a:tr.h,loc:'N',venue:null,note:''})}
  else out.push({ic:'trofeo',title:CERT.trofeo,sub:'Campeón Apertura vs Campeón Clausura',rival:null,loc:'N',venue:null,note:'Si ganás un torneo'});
  return out;
 }
 function calCard(it,i){
  const rv=it.rival?T(it.rival):null;
  const sh=rv?'<span class=\"cmBd\">'+badge(rv)+'</span><b>'+E(rv.shortName)+'</b>':'<span class=\"cmBd q\">?</span><b>Por definir</b>';
  const loc=it.loc==='L'||it.loc==='V'?lvPill(it.loc==='L'?'l':'v',it.loc):it.loc==='N'?'<i class=\"cmLv n\">🏟️ Neutral</i>':'';
  const note=(it.venue?'🏟️ Sede: '+E(T(it.venue).shortName)+(it.note?' · ':''):'')+E(it.note||'');
  return '<div class=\"cmCc'+(i===0?' nx':'')+'\">'+(i===0?'<span class=\"cx\">PRÓXIMO</span>':'')+'<div class=\"ct\"><span class=\"ci\">'+certIcon(it.ic,34)+'</span><div><b>'+E(it.title)+'</b><small>'+E(it.sub)+'</small></div></div><div class=\"cr\">'+sh+loc+'</div>'+(note?'<div class=\"cn\">'+note+'</div>':'')+'</div>';
 }
 function vitrinaHtml(){
  const C=S.copa,tr=S.trofeo;
  const L=isBN()?[['bnacional',S.po&&S.po.champ||null],['reducido',S.po&&S.po.asc2||null],['copa',C&&C.done?C.champ:null]]:[['apertura',S.aperturaChampionId],['copa',C&&C.done?C.champ:null],['clausura',S.clausuraChampionId],['trofeo',tr&&tr.done?tr.w:null]];
  return '<div class=\"cmCard\"><h2>🏆 Campeones de la Temporada</h2><div class=\"cmVit\">'+L.map(x=>{
   const id=x[1],t=id?T(id):null,mine=!!id&&id===S.teamId;
   return '<div class=\"cmVt'+(id?' got':'')+(mine?' me':'')+'\"><span class=\"ti\">'+certIcon(x[0],46)+'</span><b>'+E(CERT[x[0]])+'</b>'+(t?'<span class=\"cmBd\">'+badge(t)+'</span><span class=\"cn2\">'+E(t.name)+'</span>'+(mine?'<em>¡Tu club!</em>':''):'<span class=\"pd\">Por definir</span>')+'</div>';
  }).join('')+'</div></div>';
 }
 function tabCal(){
  const it=calItems(),lim=12,show=CALALL?it:it.slice(0,lim);
  return vitrinaHtml()+'<div class=\"cmCard\"><h2>🗓️ Calendario · Próximos compromisos</h2>'+
   (it.length?'<div class=\"cmCal\">'+show.map(calCard).join('')+'</div>'+(it.length>lim?'<button type=\"button\" class=\"cmGhost\" data-cal=\"1\" style=\"align-self:center\">'+(CALALL?'Ver menos':'Ver todos ('+it.length+')')+'</button>':''):'<div class=\"cmNote\">No hay más compromisos programados para tu club en esta temporada.</div>')+'</div>';
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
  let cls='cmPr'+(sel?' sel':''),cd='',wn='',dis='';
  if(card){
   if(card.out){cls+=' out';dis=' disabled aria-disabled="true"';cd='<span class="cd" style="color:#9ca3af;font-weight:900">Salió</span>'}
   else if(card.exp){cls+=' exp';cd='<span class="cd" style="color:#f87171;font-weight:900">🟥 Expulsado</span>'}
   else if(card.susp){cls+=' exp';cd='<span class="cd" style="color:#f87171;font-weight:900">🟥 Suspendido</span>'}
   else if(card.yc>0)cd='<span class="cd" title="Amonestado">🟨</span>';
  }else{const d=discHub(p);cls+=d.cls;cd=d.cd;wn=d.wn}
  return '<button type="button"'+dis+' class="'+cls+'" data-k="'+k+'" data-i="'+i+'"><span class="n">#'+E(p.number)+'</span><span class="ps">'+(POSL[p.pos]||p.pos)+'</span><span class="nm">'+E(p.name)+injTag(p)+'</span>'+(cd||'<span class="cd"></span>')+'<span class="bar"><i style="width:'+p.stam+'%;background:'+stamCol(p.stam)+'"></i></span><b>'+p.stam+'%</b>'+wn+'</button>';
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
  return '<div class="cmCard"><h2>Mi Plantel</h2>'+userRow()+userStats()+
   '<h3>Titulares (bots)</h3>'+q.starters.map((id,i)=>prHtml(q.info[id],'s',i,SEL&&SEL.k==='s'&&SEL.i===i)).join('')+
   '<h3>Suplentes (banco)</h3>'+q.bench.map((id,i)=>prHtml(q.info[id],'b',i,SEL&&SEL.k==='b'&&SEL.i===i)).join('')+
   '<div id="cmSqMsg" class="cmNote">Tocá un titular y después un suplente para intercambiarlos (el arquero solo por otro arquero). Con stamina baja los jugadores corren menos.</div></div>';
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
 function openHub(tab){if(tab)TAB=tab;SEL=null;sweepOverlays();renderHub();show('career-hub-screen')}

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
  if(!isKO())return end();
  if(!G.cET&&!isCopaM(LIVE.m)){
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
 function applyDiscipline(L0){
  const L=L0||LIVE,info=S.squad.info,P=S.player;
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
  if(s){const b=s.bot;return{yc:b.yc||0,exp:b.team==='spec'||!!b.rt,susp:false,out:false}}
  const c=L&&L.cards&&L.cards[id];
  return{yc:c?c.yc:0,exp:false,susp:((S.squad.info[id]||{}).susp||0)>0,out:wasSubbedOut(id)};
 }

 /* Dificultad dinámica del rival: Playoffs = 100% hard; fase regular según su posición en la tabla (fecha 1: por fuerza del club) */
 function pickMatchDiff(rivalId){
  if(S.phase==='playoffs'||S.phase==='trofeo')return 'hard';
  if(S.phase!=='regular')return 'normal';
  if(!S.zonaDe[rivalId]){const v=S.str[rivalId]||1,rr=Math.random();return v>=1.1?(rr<.8?'hard':'normal'):v>=.95?(rr<.2?'hard':rr<.85?'normal':'easy'):(rr<.1?'hard':rr<.8?'normal':'easy')} /* rival de la otra categoría (Copa): por fuerza */
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
 /* Banderas globales para el motor (index.html): finales y estadio dividido */
 function resetMatchFlags(){window._isFinalMatch=false;window._isSplitStadium=false}
 function setMatchFlags(m){
  const copa=isCopaM(m),poFinal=!copa&&!!S&&S.phase==='playoffs'&&!!S.po&&(S.po.stage==='final'||(isBN()&&m&&m.tag==='F1')),trofeo=!copa&&!!S&&S.phase==='trofeo';
  window._isFinalMatch=!!((copa&&S.copaDue==='final')||poFinal||trofeo);
  window._isSplitStadium=!!(copa||poFinal||trofeo);
 }
 function playMatch(){
  const m=userMatch();if(!m||CM.live)return;
  setMatchFlags(m);
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
  try{ownerOf(rvT.id).aplicarPlantelABots(rv,rvT.id,null)}catch(e){ownerOf(rvT.id).aplicarPlantelABots(rv,rvT.id,-1)}
  rv.forEach(b=>{b.name=b.nick||b.name;b.num=String(b.num)});
  rv.forEach(b=>initRivalStam(b,rnd(62,100),0));
  G.players=[me].concat(mine,rv);
  G.uni={red:Object.assign({},kH),blue:Object.assign({},kA)};
  G.duration=S.minutes*60;G.goalLimit=0;G.super=false;G.cET=false;
  G.teamTactics={red:calcBias(m.h,true),blue:calcBias(m.a,false)};
  STAD=stadClean(m.copa&&m.venue?T(m.venue).stadium:m.neutral?null:hT.stadium); /* Copa: colores de tribunas de la sede neutral */if(typeof STAD_CF!=='undefined')STAD_CF.length=0;
  CM.live=true;hideTorneoLayer();
  LIVE={started:Date.now(),m,slots:mine.map((b,i)=>({bot:b,id:ids[i],t0:0})),bench:S.squad.bench.filter(id=>!ex||id!==ex.id),extraId:ex?ex.id:null,extraIdx:ex?ex.idx:-1,cards:{},subs:0,subbedOutIds:[],win:null,rival:{bots:rv,bench:rivalBench(rvT.id,rv),subs:0},played:{},inj:{},sel:null,res:null,done:false,timer:0};
  document.body.classList.add('careerOn','cmInGame');
  const lv=$('mLeave');if(lv)lv.textContent='Abandonar partido';
  const hn=$('hint');if(hn){if(!hn.dataset.o)hn.dataset.o=hn.textContent;hn.textContent='ESC: menú · P: pausa y cambios · Flechas / WASD: mover · Espacio / X: patear'}
  try{if(typeof setBotDiff==='function')setBotDiff(pickMatchDiff(rvT.id))}catch(e){} /* dificultad oculta al usuario */
  restart();G.cd=3;
  Object.keys(keys).forEach(k=>keys[k]=0);
  try{$('c').focus()}catch(e){}
  neutralTag(m);
  showEv((m.copa?'🏆 Copa Argentina · ':myHome?'🏟️ ':'✈️ ')+hT.name+' vs '+aT.name,2600);
 }

 /* ---- panel de cambios (P / menú) ---- */
 const subOpen=()=>$('cmSub')&&$('cmSub').classList.contains('on');
 function openSub(){
  if(!CM.live||!LIVE||!G||G.over||LIVE.res)return;
  if(G.pen){showEv('No hay cambios durante la tanda de penales',1800);return}
  G.paused=true;G.cd=0;Object.keys(keys).forEach(k=>keys[k]=0);
  LIVE.sel=null;winSnap();renderSub();$('cmSub').classList.add('on');
 }
 function closeSub(){
  if(LIVE)LIVE.win=null; /* reanudar = confirmar los cambios de esta ventana */
  $('cmSub').classList.remove('on');
  if(G&&!G.over&&CM.live&&!menuOpen){G.paused=false;G.cd=3}
  Object.keys(keys).forEach(k=>keys[k]=0);try{$('c').focus()}catch(e){}
 }
 /* jugadores ya reemplazados en este partido: no pueden volver a entrar */
 const wasSubbedOut=id=>!!(LIVE&&LIVE.subbedOutIds&&LIVE.subbedOutIds.indexOf(id)>=0);
 /* foto del estado al abrir la ventana de cambios (para ↩ Anular cambio) */
 function winSnap(){
  const L=LIVE,info=S.squad.info,MS=window.MATCH_STATS,w={subs:L.subs,bench:L.bench.slice(),out:(L.subbedOutIds||[]).slice(),
   slots:L.slots.map(sl=>({sl,id:sl.id,t0:sl.t0,bot:sl.bot,snap:Object.assign({},sl.bot)})),
   played:Object.assign({},L.played),inj:Object.assign({},L.inj),cards:JSON.parse(JSON.stringify(L.cards||{})),
   pinj:{},ms:null};
  Object.keys(info).forEach(id=>{w.pinj[id]=info[id].inj});
  try{if(MS&&MS.jugadores)w.ms=Object.keys(MS.jugadores).map(k=>({k,o:MS.jugadores[k],c:Object.assign({},MS.jugadores[k])}))}catch(e){}
  L.win=w;
 }
 function undoSubs(){
  const L=LIVE,w=L&&L.win;
  if(!w||L.subs<=w.subs)return renderSub('No hay cambios para anular en esta ventana.');
  const info=S.squad.info;
  L.subs=w.subs;L.bench=w.bench.slice();L.subbedOutIds=w.out.slice();
  w.slots.forEach(x=>{x.sl.id=x.id;x.sl.t0=x.t0;const b=x.bot;Object.keys(b).forEach(k=>{if(!(k in x.snap))delete b[k]});Object.assign(b,x.snap)});
  L.played=Object.assign({},w.played);L.inj=Object.assign({},w.inj);L.cards=JSON.parse(JSON.stringify(w.cards));
  Object.keys(w.pinj).forEach(id=>{if(info[id])info[id].inj=w.pinj[id]});
  try{const MS=window.MATCH_STATS;if(w.ms&&MS&&MS.jugadores){Object.keys(MS.jugadores).forEach(k=>delete MS.jugadores[k]);w.ms.forEach(e=>{Object.assign(e.o,e.c);MS.jugadores[e.k]=e.o})}}catch(e){}
  L.sel=null;
  renderSub('↩ Cambios anulados: el plantel volvió a como estaba al abrir la ventana.');
 }
 function renderSub(msg){
  const q=S.squad,L=LIVE;
  $('cmSub').innerHTML='<div class="cmCard"><h2>🔄 Realizar Cambio ('+L.subs+'/3)</h2><div class="cmCols"><div><h3>En cancha</h3>'+userRow(true)+
   L.slots.map((s,i)=>prHtml(q.info[s.id],'s',i,L.sel&&L.sel.k==='s'&&L.sel.i===i,liveCard(s.id))).join('')+'</div>'+
   '<div><h3>Banco de suplentes</h3>'+L.bench.map((id,i)=>prHtml(q.info[id],'b',i,L.sel&&L.sel.k==='b'&&L.sel.i===i,liveCard(id))).join('')+'</div></div>'+
   '<div class="cmNote" id="cmSubMsg">'+(msg?E(msg):'Tocá un jugador en cancha y después un suplente. Máximo 3 cambios por partido; el arquero solo por otro arquero.')+'</div>'+
   '<div class="cmRow"><button id="cmSubUndo" type="button"'+((L.win&&L.subs>L.win.subs)?'':' disabled')+'>↩ Anular cambio</button><button id="cmSubClose" class="cmBig" type="button">▶ Reanudar partido</button>'+(meRed()?'<button id="cmSubSim" class="cmBig" type="button">⏩ Reemplazar y simular resto</button>':'')+'</div></div>';
  $('cmSubClose').onclick=closeSub;
  $('cmSubUndo').onclick=undoSubs;
  const bsim=$('cmSubSim');if(bsim)bsim.onclick=simRestMatch;
  $('cmSub').querySelectorAll('.cmPr[data-k]').forEach(b=>b.onclick=()=>subClick(b.dataset.k,+b.dataset.i));
 }
 function subClick(k,i){
  const L=LIVE;
  if(k==='s'){const s=L.slots[i];if(s&&(s.bot.team==='spec'||!!s.bot.rt))return renderSub('⚠️ No podés sustituir a un jugador expulsado.')}
  if(k==='b'&&wasSubbedOut(L.bench[i]))return renderSub('⚠️ Ese jugador ya salió y no puede volver a entrar.');
  if(k==='b'&&((S.squad.info[L.bench[i]].susp||0)>0))return renderSub('⚠️ Ese jugador está suspendido y no puede ingresar.');
  if(!L.sel||L.sel.k===k){L.sel={k,i};return renderSub()}
  const si=k==='s'?i:L.sel.i,bi=k==='b'?i:L.sel.i;L.sel=null;
  doSub(si,bi);
 }
 function doSub(si,bi){
  const L=LIVE,q=S.squad,sl=L.slots[si],outId=sl.id,inId=L.bench[bi],out=q.info[outId],inn=q.info[inId];
  if(sl.bot.team==='spec'||!!sl.bot.rt)return renderSub('⚠️ No podés sustituir a un jugador expulsado.');
  if(wasSubbedOut(inId))return renderSub('⚠️ Ese jugador ya salió y no puede volver a entrar.');
  if((inn.susp||0)>0)return renderSub('⚠️ Ese jugador está suspendido y no puede ingresar.');
  if(L.subs>=3)return renderSub('⚠️ Ya usaste los 3 cambios.');
  if((out.pos==='GK')!==(inn.pos==='GK'))return renderSub('⚠️ El arquero solo puede cambiarse por otro arquero.');
  const now=G.clock||0;
  L.played[outId]=(L.played[outId]||0)+Math.max(0,now-sl.t0);
  L.inj[outId]=L.inj[outId]||!!sl.bot.cInj;
  L.cards=L.cards||{};const prev=L.cards[inId];
  L.cards[outId]={yc:sl.bot.yc||0,exp:false}; /* el bot de la ranura se reutiliza: las tarjetas viajan con el jugador */
  L.subbedOutIds=L.subbedOutIds||[];if(L.subbedOutIds.indexOf(outId)<0)L.subbedOutIds.push(outId);
  out.inj=null;L.bench[bi]=outId;sl.id=inId;sl.t0=now;
  splitStats(sl.bot);
  const b=sl.bot;b.name=inn.name;b.num=String(inn.number);b.pos=inn.pos;b.stam=inn.stam;b.cId=inId;b.cInj=false;b.yc=prev?prev.yc:0;b.fc=0;b.rc=0;
  try{injClear(b)}catch(e){}b.sl=null;
  L.subs++;
  renderSub('✅ Entra '+inn.name+' (#'+inn.number+', '+inn.stam+'%) por '+out.name+'.');
  try{showEv('🔄 Cambio: entra '+inn.name+' (#'+inn.number+')',2200)}catch(e){}
 }

 /* ---- cambios automáticos de la CPU rival en pelota parada ---- */
 const CPU_MAX_SUBS=3,CPU_STAM_MIN=35;
 /* banco rival: plantel del club menos los 6 que están en cancha (hasta 9 suplentes) */
 function rivalBench(teamId,onField){
  let r;try{r=ownerOf(teamId).resolverPlantelCancha(teamId,null)}catch(e){try{r=ownerOf(teamId).resolverPlantelCancha(teamId,-1)}catch(er){return[]}}
  const used=p=>onField.some(b=>String(b.num)===String(p.number)||b.name===p.name);
  return r.starters.concat(r.subs).filter(p=>!used(p)).slice(0,9).map(p=>({name:p.name,number:p.number,pos:p.pos}));
 }
 /* stamina del rival: llega con desgaste previo y baja según los minutos jugados (solo decide los cambios; no altera su velocidad) */
 function initRivalStam(b,start,now){
  b.cRvS0=start;b.cRvT0=now;
  b.cRvDrain=b.pos==='GK'?rnd(8,12):rnd(35,55); /* puntos que pierde en un partido completo */
 }
 const rivalStam=b=>Math.max(0,Math.round(b.cRvS0-b.cRvDrain*Math.max(0,(G.clock||0)-b.cRvT0)/(S.minutes*60)));
 function cpuSubs(){
  if(!CM.live||!LIVE||LIVE.res||!LIVE.rival||!G||G.over||G.pen)return;
  const R=LIVE.rival;
  if(R.subs>=CPU_MAX_SUBS||!R.bench.length)return;
  /* candidatos en cancha (los expulsados no se reemplazan): primero lesionados, después el más cansado */
  const cand=R.bots.filter(b=>b.team!=='spec'&&!b.rt&&(b.inj>0||rivalStam(b)<CPU_STAM_MIN))
   .sort((a,b)=>(b.inj>0)-(a.inj>0)||rivalStam(a)-rivalStam(b));
  cand.forEach(b=>{
   if(R.subs>=CPU_MAX_SUBS)return;
   const gk=b.pos==='GK',fits=p=>(p.pos==='GK')===gk; /* arquero solo por arquero */
   let i=R.bench.findIndex(p=>p.pos===b.pos);
   if(i<0)i=R.bench.findIndex(fits);
   if(i<0)return;
   const inn=R.bench.splice(i,1)[0],outName=b.name; /* el que sale no vuelve a entrar */
   splitStats(b);
   b.name=inn.name;if('nick' in b)b.nick=inn.name;b.num=String(inn.number);b.pos=inn.pos;
   b.yc=0;b.fc=0;b.rc=0;b.sl=null;
   try{injClear(b)}catch(e){}
   initRivalStam(b,100,G.clock||0);
   R.subs++;
   rivalNotice('🔄 Cambio rival: SALE '+outName+' • ENTRA '+inn.name);
  });
 }
 /* aviso discreto propio: no pisa el cartel central (lateral, córner, etc.) */
 function rivalNotice(txt){
  const box=$('cmRivalSub');if(!box)return;
  const d=document.createElement('div');d.textContent=txt;box.appendChild(d);
  setTimeout(()=>d.remove(),3800);
 }
 hook('onSetPiece',o=>function(){const r=o.apply(this,arguments);try{cpuSubs()}catch(e){console.warn('[CareerMode] cambio rival',e)}return r});

 /* ---- expulsión del usuario: reemplazar y simular el resto ---- */
 const meRed=()=>!!(CM.live&&LIVE&&!LIVE.res&&typeof G!=='undefined'&&G&&!G.over&&!G.pen&&typeof me!=='undefined'&&me&&me.team==='spec'&&!!me.rt);
 function syncRed(){const on=meRed();document.body.classList.toggle('cmRed',on);return on}
 /* entra el primer suplente disponible (no suspendido ni expulsado) por el bot en cancha de menor stamina (mismo rol GK/campo): la roja deja 5 bots */
 function autoSubIn(){
  const L=LIVE,info=S.squad.info,now=G.clock||0;
  for(let bi=0;bi<L.bench.length;bi++){
   const inId=L.bench[bi],inn=info[inId],pc=L.cards&&L.cards[inId];
   if((inn.susp||0)>0||(pc&&pc.exp)||wasSubbedOut(inId))continue;
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
   L.subbedOutIds=L.subbedOutIds||[];if(L.subbedOutIds.indexOf(outId)<0)L.subbedOutIds.push(outId);
   out.inj=null;L.bench[bi]=outId;sl.id=inId;sl.t0=now;
   splitStats(sl.bot);
   const b=sl.bot;b.name=inn.name;b.num=String(inn.number);b.pos=inn.pos;b.stam=inn.stam;b.cId=inId;b.cInj=false;b.yc=pc?pc.yc:0;b.fc=0;b.rc=0;
   try{injClear(b)}catch(e){}b.sl=null;
   return inn;
  }
  return null;
 }
 function simRestMatch(){
  if(!meRed())return;
  if(!confirm('Quedaste expulsado. ¿Reemplazar y simular el resto del partido? Entra un suplente y el resultado se calcula con los minutos que faltan.'))return;
  doSimRest();
 }
 function doSimRest(){
  if(!meRed())return false;
  if(LIVE)LIVE.win=null;
  const L=LIVE,m=L.m,myHome=m.h===S.teamId,base=S.minutes*60;
  const rem=Math.max(0,G.duration-G.clock);
  autoSubIn();
  snapCards(); /* registra amarillas y tu expulsión (suspensión) */
  /* goles probables de los minutos que faltan: proporcionales al tiempo y a la fuerza; el rival juega con 1 más */
  const f=Math.min(1,rem/base),sh=st(m.h),sa=st(m.a);
  let lh=1.3*Math.pow(sh/sa,.9)*1.08*f,la=1.05*Math.pow(sa/sh,.9)*f;
  if(myHome){lh*=.8;la*=1.25}else{la*=.8;lh*=1.25}
  let hg=G.score.red+Math.min(4,pois(lh)),ag=G.score.blue+Math.min(4,pois(la)),ph=null,pa=null;
  if((isKO()||isCopaM(m))&&hg===ag){ /* empate en eliminatoria: gol en el minuto extra o penales (Copa: penales directos) */
   const cp=isCopaM(m);if(!cp)G.cET=true;const r=cp?1:Math.random();
   if(r<.22)hg++;else if(r<.44)ag++;
   else{
    const hw=Math.random()<Math.max(.3,Math.min(.7,.5+(sh-sa)*.25)),w=rnd(3,5),l=Math.max(0,w-rnd(1,2));
    ph=hw?w:l;pa=hw?l:w;
   }
  }
  L.simExtra={red:Math.max(0,hg-G.score.red),blue:Math.max(0,ag-G.score.blue)};
  G.score.red=hg;G.score.blue=ag;
  L.res={hg,ag,ph,pa,total:Math.max(base,G.clock||0)}; /* total = partido completo → desgaste de stamina completo */
  clearTimeout(L.timer);
  finishMatch();
  return true;
 }

 /* ---- Suspendido: simular el partido completo sin jugarlo (1 fecha de suspensión) ---- */
 function skipSuspendedMatch(){
  const m=userMatch();
  if(!m||CM.live||(S.player.susp||0)<=0)return false;
  const myHome=m.h===S.teamId,base=S.minutes*60,sh=st(m.h),sa=st(m.a);
  fixSuspended();
  const ex=pickExtra(),ids=S.squad.starters.concat(ex?[ex.id]:[]);
  let lh=1.3*Math.pow(sh/sa,.9)*1.08,la=1.05*Math.pow(sa/sh,.9);
  if(myHome)lh*=.92;else la*=.92; /* jugás sin el crack: el equipo rinde un poco menos */
  let hg=Math.min(6,pois(lh)),ag=Math.min(6,pois(la)),ph=null,pa=null;
  if((isKO()||isCopaM(m))&&hg===ag){
   const r=isCopaM(m)?1:Math.random();
   if(r<.22)hg++;else if(r<.44)ag++;
   else{
    const hw=Math.random()<Math.max(.3,Math.min(.7,.5+(sh-sa)*.25)),w=rnd(3,5),l=Math.max(0,w-rnd(1,2));
    ph=hw?w:l;pa=hw?l:w;
   }
  }
  const played={};ids.forEach(id=>{played[id]=base});
  m.hg=hg;m.ag=ag;
  applyStamina(played,{},base);
  applyDiscipline({cards:{}}); /* cumple la fecha de suspensión */
  const res={hg,ag,ph,pa,total:base};
  m.done=false;
  recordUser(m,res);
  save();
  openHub('next');
  flushModals();
  return true;
 }
 /* Global: si estás expulsado en el partido actual simula los minutos restantes (la suspensión de 1 fecha se aplica al terminar);
    si estás suspendido en Próximo Partido simula ese partido completo */
 window.cmSkipExpelledMatch=function(){
  try{
   if(meRed())return doSimRest();
   return skipSuspendedMatch();
  }catch(e){console.warn('[CareerMode] cmSkipExpelledMatch',e);return false}
 };

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
  const my=myHome?r.hg:r.ag,rv=myHome?r.ag:r.hg,cp=isCopaM(m),reg=S.phase==='regular'&&!cp;
  let res,pts='';
  if(my>rv||(my===rv&&r.ph!=null&&(myHome?r.ph>r.pa:r.pa>r.ph))){res='🏆 ¡VICTORIA!';pts=reg?'+3 puntos':S.phase==='trofeo'?'¡Ganás el Trofeo de Campeones!':'Pasás de ronda'}
  else if(my===rv&&r.ph==null){res='🤝 Empate';pts=reg?'+1 punto':''}
  else{res='😞 Derrota';pts=reg?'0 puntos':S.phase==='trofeo'?'Perdés el Trofeo de Campeones':cp?'Quedás eliminado de la Copa':'Quedás eliminado'}
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
  try{accumSeason(L,r)}catch(e){console.warn('[CareerMode] stats',e)}
  if(L.extraId!=null){ /* S.player suspendido: el 6.º de cancha vuelve al banco */
   const sid=L.slots.map(s=>s.id),ex=sid.pop(),bn=L.bench.slice();bn.splice(Math.min(L.extraIdx,bn.length),0,ex);
   S.squad.starters=sid;S.squad.bench=bn;
  }else{S.squad.starters=L.slots.map(s=>s.id);S.squad.bench=L.bench.slice()}
  recordUser(m,r);
  save();
  leaveGame();
  openHub('next');
  flushModals();
 }
 /* rótulo de la sede neutral (Copa Argentina) */
 function neutralTag(m){
  const el=$('cmVenue');if(el)el.remove(); /* sin cartel inferior izquierdo: nunca se crea ni se muestra */
 }
 function leaveGame(){
  CM.live=false;LIVE=null;neutralTag(null);resetMatchFlags();
  document.body.classList.remove('careerOn','cmInGame','cmRed');
  try{if(typeof setBotDiff==='function')setBotDiff('normal')}catch(e){}
  const rn=$('cmRivalSub');if(rn)rn.textContent='';
  ['cmSub','cmEnd'].forEach(i=>{const e=$(i);if(e)e.classList.remove('on')});
  try{menuOpen=false;$('menu').classList.add('hidden');$('vote').classList.add('hidden')}catch(e){}
  if(G)G.paused=false;
  const lv=$('mLeave');if(lv)lv.textContent='Salir de la sala';
  const hn=$('hint');if(hn&&hn.dataset.o)hn.textContent=hn.dataset.o;
 }
 /* ---- cola de carteles (persistida en S.modalQ): inicio de torneo, campeón, Trofeo de Campeones ---- */
 /* ---- Escena de celebración del campeón: <canvas> cartoon vector (estadio nocturno, 6 titulares, trofeo, fuegos artificiales, confeti y fanfarria) ---- */
 var CAMP=null;
 function stopCampScene(){
  const C=CAMP;if(!C)return;
  CAMP=null;
  try{if(C.raf)cancelAnimationFrame(C.raf)}catch(e){}
  try{if(C.onResize){window.removeEventListener('resize',C.onResize);window.removeEventListener('orientationchange',C.onResize)}}catch(e){}
  try{if(C.onUnlock)document.removeEventListener('pointerdown',C.onUnlock,true)}catch(e){}
  try{if(C.ac)C.ac.close()}catch(e){}
 }
 const campRgb=(h,f)=>'rgb('+hexRgb(h).map(v=>Math.max(0,Math.min(255,Math.round(f(v))))).join(',')+')';
 const campDark=(h,a)=>campRgb(h,v=>v*a);
 const campLight=(h,a)=>campRgb(h,v=>v+(255-v)*a);
 const campFont=sz=>'italic 900 '+sz+'px "Arial Black","Impact","Segoe UI Black",Arial,sans-serif';
 function campRR(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
 /* Letras gruesas cartoon: sombra negra extruida + contorno negro + relleno */
 function campText(c,txt,x,y,sz,fill,maxW){
  c.save();c.font=campFont(sz);
  if(maxW){const w=c.measureText(txt).width;if(w>maxW){sz*=maxW/w;c.font=campFont(sz)}}
  c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.miterLimit=2;
  c.fillStyle='#000';c.strokeStyle='#000';c.lineWidth=sz*.3;
  c.strokeText(txt,x,y+sz*.1);c.fillText(txt,x,y+sz*.1);
  c.strokeText(txt,x,y);
  c.fillStyle=fill;c.fillText(txt,x,y);
  c.restore();
 }
 /* Ficha circular de la camiseta (mismo diseño que kitSvg) con contorno negro grueso y dorsal */
 function campKit(c,k,x,y,R,num){
  const c1=k.c1||'#1d4ed8',c2=k.c2||'#ffffff',c3=k.c3||'#ffffff',s=k.st,n=k.n;
  const rc=(col,rx,ry,w,h)=>{c.fillStyle=col;c.fillRect(rx,ry,w,h)};
  c.save();c.translate(x-R,y-R);const f=2*R/64;c.scale(f,f);
  c.beginPath();c.arc(32,32,32,0,Math.PI*2);c.clip();
  rc(c1,0,0,64,64);
  if(n===2){
   if(s==='v1')rc(c2,22,0,20,64);
   else if(s==='h1')rc(c2,0,22,64,20);
   else if(s==='vs'){for(let i=1;i<5;i+=2)rc(c2,i*12.8,0,12.8,64)}
   else if(s==='hs'){for(let i=1;i<5;i+=2)rc(c2,0,i*12.8,64,12.8)}
   else if(s==='mv')rc(c2,32,0,32,64);
   else if(s==='mh')rc(c2,0,32,64,32);
   else if(s==='vv'){c.strokeStyle=c2;c.lineWidth=14;c.beginPath();c.moveTo(2,18);c.lineTo(32,46);c.lineTo(62,18);c.stroke()}
   else{c.strokeStyle=c2;c.lineWidth=17;c.beginPath();c.moveTo(-4,-4);c.lineTo(68,68);c.stroke()}
  }else if(n===3){
   if(s==='bv'){for(let i=1;i<5;i+=2)rc(c2,i*12.8,0,12.8,64);for(let i=1;i<5;i++)rc(c3,i*12.8-1,0,2,64)}
   else if(s==='bh'){for(let i=1;i<5;i+=2)rc(c2,0,i*12.8,64,12.8);for(let i=1;i<5;i++)rc(c3,0,i*12.8-1,64,2)}
   else if(s==='cb'){rc(c2,0,20,64,10);rc(c3,0,34,64,10)}
   else{rc(c2,21.3,0,21.4,64);rc(c3,42.7,0,21.3,64)}
  }
  c.restore();
  c.save();c.strokeStyle='#000';c.lineWidth=R*.17;c.beginPath();c.arc(x,y,R-R*.085,0,Math.PI*2);c.stroke();c.restore();
  if(num!==''&&num!=null){
   c.save();let fs=R*.95;c.font='900 '+fs+'px "Segoe UI",system-ui,sans-serif';
   const w=c.measureText(String(num)).width;if(w>R*1.45){fs*=R*1.45/w;c.font='900 '+fs+'px "Segoe UI",system-ui,sans-serif'}
   c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.lineWidth=fs*.26;c.strokeStyle='#000';c.fillStyle='#fff';
   c.strokeText(String(num),x,y+R*.05);c.fillText(String(num),x,y+R*.05);c.restore();
  }
 }
 /* Copas cartoon vector (mismos trazos que cupSvg/copaArgSvg): 'lpf' plateada, 'gold' dorada, 'copa' celeste/plateada. (cx,by) = centro de la base */
 function campCup(c,type,cx,by,size){
  const s=size/64,gold=type==='gold',copa=type==='copa',bot=copa?60:58;
  c.save();c.translate(cx-32*s,by-bot*s);c.scale(s,s);c.lineJoin='round';c.lineCap='round';
  const st=(col,w)=>{c.strokeStyle=col;c.lineWidth=w};
  if(copa){
   const hd=new Path2D('M17 12H7c0 11 5 16 11 16M47 12h10c0 11-5 16-11 16'),bd=new Path2D('M16 5h32v17c0 12-7 19-16 19S16 34 16 22V5z');
   c.fillStyle='none';st('#000',9);c.stroke(hd);st('#e2e8f0',4.5);c.stroke(hd);
   c.fillStyle='#e2e8f0';c.fill(bd);
   c.save();c.clip(bd);const cols=['#38bdf8','#ffffff','#38bdf8','#ffffff','#38bdf8'];cols.forEach((k,i)=>{c.fillStyle=k;c.fillRect(16+i*6.4,5,6.4,40)});c.restore();
   st('#000',4);c.stroke(bd);
   campRR(c,12,4,40,5,2);c.fillStyle='#cbd5e1';c.fill();st('#000',3);c.stroke();
   c.fillStyle='#cbd5e1';c.fillRect(28,41,8,8);st('#000',3);c.strokeRect(28,41,8,8);
   c.fillStyle='#334155';c.fillRect(21,49,22,5);c.strokeRect(21,49,22,5);
   campRR(c,15,54,34,6,1.5);c.fillStyle='#1f2937';c.fill();st('#000',3.5);c.stroke();
  }else{
   const col=gold?'#facc15':'#cbd5e1',dk=gold?'#e0a800':'#94a3b8',hi=gold?'#fff6bf':'#ffffff';
   const hd=new Path2D('M18 14H8c0 10 5 15 10 15M46 14h10c0 10-5 15-10 15'),bd=new Path2D('M17 6h30v18c0 11-7 18-15 18S17 35 17 24V6z');
   st('#000',9);c.stroke(hd);st(col,5);c.stroke(hd);
   c.fillStyle=col;c.fill(bd);st('#000',4);c.stroke(bd);
   st(hi,3);c.stroke(new Path2D('M23 10v14c0 6 3 11 7 13'));
   if(gold){c.fillStyle='#000';c.fill(new Path2D('M32 15l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.9 2.7 1.1-5.3-4-3.7 5.4-.6z'))}
   else{c.fillStyle='#000';c.font='900 9px Arial,sans-serif';c.textAlign='center';c.textBaseline='alphabetic';c.fillText(type==='nac'?'PN':'LPF',32,26)}
   c.fillStyle=dk;c.fillRect(28,42,8,8);st('#000',3);c.strokeRect(28,42,8,8);
   campRR(c,19,50,26,8,2.5);c.fillStyle=col;c.fill();st('#000',3.5);c.stroke();
  }
  c.restore();
 }
 function campStar(c,x,y,r,rot){
  c.beginPath();for(let i=0;i<8;i++){const a=rot+i*Math.PI/4,d=i%2?r*.28:r;c.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d)}c.closePath();c.fill();
 }
 /* Fanfarria triunfal breve (Web Audio): tres notas rápidas + arpegio ascendente + acorde final */
 function campFanfare(ST){
  let played=false;
  try{
   const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
   const ac=new AC();ST.ac=ac;
   const play=()=>{
    if(played||CAMP!==ST||ac.state!=='running')return;played=true;
    const t0=ac.currentTime+.05,master=ac.createGain();
    master.gain.setValueAtTime(.55,t0);master.gain.setValueAtTime(.55,t0+1.9);master.gain.exponentialRampToValueAtTime(.001,t0+2.6);master.connect(ac.destination);
    const tone=(f,at,d,vol,type)=>{
     const o=ac.createOscillator(),g=ac.createGain(),fl=ac.createBiquadFilter();
     o.type=type;o.frequency.value=f;fl.type='lowpass';fl.frequency.value=3000;
     g.gain.setValueAtTime(.0001,t0+at);g.gain.exponentialRampToValueAtTime(vol,t0+at+.02);
     g.gain.setValueAtTime(vol,t0+at+Math.max(.03,d-.08));g.gain.exponentialRampToValueAtTime(.0001,t0+at+d);
     o.connect(fl);fl.connect(g);g.connect(master);o.start(t0+at);o.stop(t0+at+d+.05);
    };
    const note=(f,at,d,v)=>{tone(f,at,d,v||.2,'square');tone(f*1.003,at,d,(v||.2)*.55,'sawtooth')};
    note(392,0,.11);note(392,.14,.11);note(392,.28,.11);
    note(523.25,.44,.3);note(659.25,.78,.18);note(783.99,.98,.18);
    note(1046.5,1.18,.95,.22);note(523.25,1.18,.95,.13);note(659.25,1.18,.95,.13);note(783.99,1.18,.95,.13);
    tone(130.81,1.18,.95,.25,'triangle');tone(130.81,.44,.3,.2,'triangle');
   };
   if(ac.resume){try{ac.resume().then(play,function(){})}catch(e){}}
   play();
   if(!played){ST.onUnlock=()=>{try{ac.resume().then(play,function(){})}catch(e){}play()};document.addEventListener('pointerdown',ST.onUnlock,true)}
  }catch(e){console.warn('[CareerMode] fanfarria',e)}
 }
 function startCampScene(cv,it){
  stopCampScene();
  const t=T(it.id),kit=t.kitHome||{c1:'#1d4ed8',c2:'#facc15',n:1},c1=kit.c1||'#1d4ed8',c2=kit.c2||'#facc15';
  const TNAME={apertura:'TORNEO APERTURA',clausura:'TORNEO CLAUSURA',copa:'COPA ARGENTINA',trofeo:'TROFEO DE CAMPEONES',bnacional:'PRIMERA NACIONAL'};
  const line1='CAMPEÓN '+(TNAME[it.torneo]||'TORNEO'),line2=String(t.name||'').toLocaleUpperCase('es');
  const cupType=it.torneo==='trofeo'?'gold':it.torneo==='copa'?'copa':it.torneo==='bnacional'?'nac':'lpf';
  const q=S.squad,nums=[];
  q.starters.forEach(id=>{const p=q.info[id];if(p)nums.push(String(p.number))});
  q.bench.forEach(id=>{const p=q.info[id];if(p&&nums.length<5)nums.push(String(p.number))});
  while(nums.length<5)nums.push('');
  const userNum=String(S.player.num),userName=String(S.player.name||'').toLocaleUpperCase('es');
  const c=cv.getContext('2d');
  const ST={raf:0,cv,ac:null,onResize:null,onUnlock:null};CAMP=ST;
  /* escudo del club (SVG → Image) con respaldo dibujado */
  let bimg=null,bok=false;
  try{
   let sv=String(t.badgeSvg||'');
   if(sv){if(!/xmlns=/.test(sv))sv=sv.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"');bimg=new Image();bimg.onload=()=>{bok=true};bimg.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(sv)}
  }catch(e){bimg=null}
  const rn=(a,b)=>a+Math.random()*(b-a);
  const PAL=['#facc15','#ffffff','#f472b6','#38bdf8','#4ade80','#fb923c','#c084fc',campLight(c1,.35),campLight(c2,.35)];
  const SKIN=['#f5cba7','#e0ac69','#c68642','#8d5524','#ffdbac'];
  let W=0,H=0,dpr=1,L={};
  const layout=()=>{
   const r=cv.getBoundingClientRect();
   W=Math.max(240,Math.round(r.width||window.innerWidth));H=Math.max(240,Math.round(r.height||window.innerHeight));
   dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
   const cp=H<460,pad=Math.max(6,H*.012),B=Math.min(H*(cp?.085:.1),W*.2);
   let F1=Math.min(H*(cp?.05:.046),W*.07),F2=Math.min(H*(cp?.085:.078),W*.115);
   const mw=W*.9-2*pad;
   c.font=campFont(F1);let w1=c.measureText(line1).width;if(w1>mw){F1*=mw/w1;w1=mw}
   c.font=campFont(F2);let w2=c.measureText(line2).width;if(w2>mw){F2*=mw/w2;w2=mw}
   const gap=F1*.25,top=Math.max(4,H*.012),pw=Math.min(W-8,Math.max(w1,w2,B)+F2*.9);
   const l1=top+pad+B+gap+F1*.55,l2=l1+F1*.55+gap*.6+F2*.6,ph=l2+F2*.62+pad-top,bb=top+ph;
   const G=Math.min(H*.8,H-72),R=Math.max(12,Math.min(W*.062,H*.07,(G-bb-6)/9.6));
   L={pad,B,F1,F2,pw,ph,top,l1,l2,bb,standTop:H*.4,standBot:H*.66,pitchTop:H*.69,G,R};
  };
  layout();
  ST.onResize=()=>{if(CAMP===ST&&cv.isConnected)layout()};
  window.addEventListener('resize',ST.onResize);window.addEventListener('orientationchange',ST.onResize);
  /* elementos de la escena */
  const stars=[];for(let i=0;i<80;i++)stars.push({u:Math.random(),v:Math.random()*.4,r:rn(.6,1.6),ph:rn(0,6.28)});
  const ROWS=7,crowd=[];
  for(let r=0;r<ROWS;r++){const n=32+r*3;for(let i=0;i<n;i++)crowd.push({r,n,u:(i+.5+rn(-.25,.25))/n,ph:rn(0,6.28),sk:SKIN[(Math.random()*5)|0],arm:Math.random()<.45,w:i%3===0})}
  const camF=[];let nextCam=.3;
  const slots=[{dx:-3.4,row:0},{dx:3.4,row:0},{dx:-5.7,row:1},{dx:5.7,row:1},{dx:-1.9,row:1}],AMP=[1,1.15,.85,1.05,.95];
  const players=slots.map((s,i)=>({kit,num:nums[i],dx:s.dx,row:s.row,sc:s.row?.92:1,per:.62+.07*i,phase:(i*.23)%1,amp:AMP[i],skin:SKIN[(i+1)%5],user:false}));
  const user={kit,num:userNum,dx:0,row:0,sc:1.25,per:.8,phase:0,amp:1.5,skin:SKIN[0],user:true};
  const rockets=[],sparks=[],flashes=[],conf=[];
  let nextL=.15,nL=0,T0=0;
  const hs=()=>H/700;
  const launch=()=>{rockets.push({x0:W*rn(.1,.9),y0:L.standTop,x:0,ty:H*rn(.07,.3),age:0,dur:rn(.7,1),col:PAL[(Math.random()*PAL.length)|0]});const r=rockets[rockets.length-1];r.x=r.x0+rn(-W*.04,W*.04)};
  const explode=(x,y,col)=>{
   const n=44+((Math.random()*26)|0),k=hs(),ring=Math.random()<.35,col2=PAL[(Math.random()*PAL.length)|0];
   for(let i=0;i<n;i++){const a=i/n*6.2832+rn(-.05,.05),sp=(ring?170:rn(70,230))*k;sparks.push({x,y,px:x,py:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:0,max:rn(.9,1.5),col:i%3===0?col2:col,w:rn(1.6,2.6)*Math.max(.7,k),g:1})}
   flashes.push({x,y,age:0});
   if(sparks.length>900)sparks.splice(0,sparks.length-900);
  };
  const NC=Math.round(Math.min(260,Math.max(120,W*H/3200)));
  const mkConf=(init)=>({bx:rn(0,W),y:init?rn(-H*.1,H):-rn(10,H*.15),vy:rn(70,150)*Math.max(.8,hs()),sw:rn(.8,2.2),ph:rn(0,6.28),amp:rn(10,36),rot:rn(0,6.28),vr:rn(-5,5),fl:rn(0,6.28),vf:rn(4,10),w:rn(6,11)*Math.max(.8,Math.min(1.4,hs())),h:rn(3,6)*Math.max(.8,Math.min(1.4,hs())),col:Math.random()<.5?c1:c2,x:0});
  for(let i=0;i<NC;i++)conf.push(mkConf(true));
  /* ---- actualización ---- */
  const update=(dt,tm)=>{
   nextL-=dt;if(nextL<=0){launch();nextL=nL<3?rn(.15,.35):rn(.35,.8);nL++}
   for(let i=rockets.length-1;i>=0;i--){
    const r=rockets[i];r.age+=dt;const k=Math.min(1,r.age/r.dur),e=1-(1-k)*(1-k);
    r.cx=r.x0+(r.x-r.x0)*e;r.cy=r.y0+(r.ty-r.y0)*e;
    sparks.push({x:r.cx,y:r.cy,px:r.cx,py:r.cy,vx:rn(-12,12),vy:rn(10,40),life:0,max:.35,col:'#fde68a',w:1.4,g:1});
    if(k>=1){explode(r.cx,r.cy,r.col);rockets.splice(i,1)}
   }
   const k=hs(),dr=Math.exp(-2*dt);
   for(let i=sparks.length-1;i>=0;i--){
    const s=sparks[i];s.life+=dt;if(s.life>=s.max){sparks.splice(i,1);continue}
    s.px=s.x;s.py=s.y;s.vx*=dr;s.vy=s.vy*dr+140*k*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;
   }
   for(let i=flashes.length-1;i>=0;i--){flashes[i].age+=dt;if(flashes[i].age>.2)flashes.splice(i,1)}
   conf.forEach(p=>{p.y+=p.vy*dt;p.rot+=p.vr*dt;p.fl+=p.vf*dt;p.x=p.bx+Math.sin(tm*p.sw+p.ph)*p.amp;if(p.y>H+20){p.y=-rn(10,40);p.bx=rn(0,W)}});
   nextCam-=dt;if(nextCam<=0){camF.push({u:Math.random(),v:rn(.05,.95),age:0});nextCam=rn(.05,.18)}
   for(let i=camF.length-1;i>=0;i--){camF[i].age+=dt;if(camF[i].age>.12)camF.splice(i,1)}
  };
  /* ---- dibujo ---- */
  const drawSky=tm=>{
   const g=c.createLinearGradient(0,0,0,H*.7);g.addColorStop(0,'#030712');g.addColorStop(.55,'#0a1a44');g.addColorStop(1,'#16295f');
   c.fillStyle=g;c.fillRect(0,0,W,H);
   c.fillStyle='#fff';
   stars.forEach(s=>{c.globalAlpha=.35+.55*Math.abs(Math.sin(tm*1.5+s.ph));c.beginPath();c.arc(s.u*W,s.v*H,s.r,0,6.2832);c.fill()});
   c.globalAlpha=1;
  };
  const drawFireworks=()=>{
   c.save();c.globalCompositeOperation='lighter';c.lineCap='round';
   flashes.forEach(f=>{const a=(1-f.age/.2)*.45,g=c.createRadialGradient(f.x,f.y,0,f.x,f.y,H*.22);g.addColorStop(0,'rgba(255,240,200,'+a+')');g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(f.x-H*.22,f.y-H*.22,H*.44,H*.44)});
   sparks.forEach(s=>{const a=Math.max(0,1-s.life/s.max);c.globalAlpha=a;c.strokeStyle=s.col;c.lineWidth=s.w;c.beginPath();c.moveTo(s.px,s.py);c.lineTo(s.x,s.y);c.stroke();c.fillStyle=s.col;c.beginPath();c.arc(s.x,s.y,s.w*.9,0,6.2832);c.fill()});
   c.globalAlpha=1;
   rockets.forEach(r=>{if(r.cx==null)return;c.fillStyle='#fff7d6';c.beginPath();c.arc(r.cx,r.cy,2.4,0,6.2832);c.fill()});
   c.restore();
  };
  const drawStadium=tm=>{
   const sT=L.standTop,sB=L.standBot,rh=(sB-sT)/ROWS,SEC=8,sw=W/SEC;
   /* techo y reflectores */
   c.fillStyle='#0a0f1f';c.fillRect(0,sT-H*.03,W,H*.03);
   c.fillStyle='#fef3c7';for(let x=10;x<W;x+=Math.max(26,W/40)){c.globalAlpha=.5+.4*Math.sin(tm*3+x);c.beginPath();c.arc(x,sT-H*.015,2,0,6.2832);c.fill()}
   c.globalAlpha=1;
   /* tribunas con los colores del campeón */
   for(let s=0;s<SEC;s++){c.fillStyle=campDark(s%2?c2:c1,.5);c.fillRect(s*sw,sT,sw+1,sB-sT)}
   c.strokeStyle='rgba(0,0,0,.45)';c.lineWidth=2;
   for(let r=0;r<=ROWS;r++){c.beginPath();c.moveTo(0,sT+r*rh);c.lineTo(W,sT+r*rh);c.stroke()}
   for(let s=1;s<SEC;s++){c.beginPath();c.moveTo(s*sw,sT);c.lineTo(s*sw,sB);c.stroke()}
   /* hinchada */
   crowd.forEach(p=>{
    const x=p.u*W,pr=Math.min(rh*.27,(W/p.n)*.42),base=sT+(p.r+1)*rh-rh*.08,bob=Math.abs(Math.sin(tm*5+p.ph))*rh*.16,sec=Math.min(SEC-1,Math.floor(p.u*SEC));
    const body=p.w?'#ffffff':(sec%2?c1:c2),y=base-bob;
    if(p.arm){c.strokeStyle=p.sk;c.lineWidth=Math.max(1.2,pr*.5);c.lineCap='round';c.beginPath();c.moveTo(x-pr*1.1,y-pr*.4);c.lineTo(x-pr*1.5,y-pr*2.9-Math.sin(tm*8+p.ph)*pr*.5);c.moveTo(x+pr*1.1,y-pr*.4);c.lineTo(x+pr*1.5,y-pr*2.9+Math.sin(tm*8+p.ph)*pr*.5);c.stroke()}
    c.fillStyle=body;c.beginPath();c.arc(x,y,pr*1.3,Math.PI,0);c.fill();
    c.fillStyle=p.sk;c.beginPath();c.arc(x,y-pr*1.4,pr,0,6.2832);c.fill();
   });
   /* flashes de cámaras */
   c.fillStyle='#fff';camF.forEach(f=>{c.globalAlpha=1-f.age/.12;campStar(c,f.u*W,sT+f.v*(sB-sT),Math.max(3,H*.009),0)});c.globalAlpha=1;
   /* torres de reflectores */
   [W*.05,W*.95].forEach(x=>{
    const hy=H*.15,hw=Math.min(W*.07,52),hh=hw*.55;
    c.fillStyle='#1f2937';c.fillRect(x-3,hy,6,sT-hy);
    const g=c.createRadialGradient(x,hy,0,x,hy,hw*2.4);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(x-hw*2.4,hy-hw*2.4,hw*4.8,hw*4.8);
    c.fillStyle='#111827';c.strokeStyle='#000';c.lineWidth=2.5;campRR(c,x-hw/2,hy-hh/2,hw,hh,3);c.fill();c.stroke();
    c.fillStyle='#fff';for(let i=0;i<3;i++)for(let j=0;j<2;j++){c.beginPath();c.arc(x-hw/3+i*hw/3,hy-hh/4+j*hh/2,hw*.09,0,6.2832);c.fill()}
   });
   /* vallas con las siglas del club */
   const by=sB,bh=L.pitchTop-sB,bw=W/10;
   c.font='900 '+Math.max(8,bh*.6)+'px Arial,sans-serif';c.textAlign='center';c.textBaseline='middle';
   for(let i=0;i<10;i++){c.fillStyle=i%2?c2:c1;c.fillRect(i*bw,by,bw+1,bh);c.fillStyle='#fff';c.strokeStyle='#000';c.lineWidth=3;c.lineJoin='round';c.strokeText(t.shortName||'',i*bw+bw/2,by+bh/2);c.fillText(t.shortName||'',i*bw+bw/2,by+bh/2)}
   c.strokeStyle='#000';c.lineWidth=3;c.strokeRect(-2,by,W+4,bh);
  };
  const drawPitch=()=>{
   const py=L.pitchTop,nb=7,bh=(H-py)/nb;
   c.fillStyle='#157a37';c.fillRect(0,py,W,H-py);
   c.fillStyle='#1b8f41';for(let i=1;i<nb;i+=2)c.fillRect(0,py+i*bh,W,bh);
   c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=3;
   c.beginPath();c.moveTo(0,py+bh*.7);c.lineTo(W,py+bh*.7);c.stroke();
   c.beginPath();c.ellipse(W/2,H*.93,W*.26,H*.055,0,0,6.2832);c.stroke();
   /* haces de luz */
   c.save();c.globalCompositeOperation='lighter';
   [W*.05,W*.95].forEach(x=>{const g=c.createLinearGradient(x,H*.15,W/2,L.G);g.addColorStop(0,'rgba(255,255,255,.16)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.beginPath();c.moveTo(x-6,H*.15);c.lineTo(x+6,H*.15);c.lineTo(W*.5+W*.35,H);c.lineTo(W*.5-W*.35,H);c.closePath();c.fill()});
   const g2=c.createRadialGradient(W/2,L.G-L.R*3,10,W/2,L.G-L.R*3,W*.6);g2.addColorStop(0,'rgba(255,255,255,.2)');g2.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g2;c.fillRect(0,0,W,H);
   c.restore();
  };
  /* ficha circular pura: camiseta + dorsal + contorno negro grueso, sombra ovalada en el césped que se achica al saltar */
  const drawPlayer=(p,tm)=>{
   const R=L.R*p.sc,gy=L.G-p.row*L.R*1.15,ph=((tm/p.per)+p.phase)%1,h=4*ph*(1-ph),jump=h*p.amp*L.R;
   const cx=W/2+p.dx*L.R,cy=gy-R-jump,f=Math.min(1,jump/(2.4*L.R));
   c.fillStyle='rgba(0,0,0,'+(.45-.25*f)+')';c.beginPath();c.ellipse(cx,gy+R*.04,R*(1-.45*f),R*(.26-.1*f),0,0,6.2832);c.fill();
   if(p.user){
    const gl=c.createRadialGradient(cx,cy-R*.6,R*.4,cx,cy-R*.6,R*3.2),pu=.28+.1*Math.sin(tm*4);
    gl.addColorStop(0,'rgba(250,204,21,'+pu+')');gl.addColorStop(1,'rgba(250,204,21,0)');c.fillStyle=gl;c.fillRect(cx-R*3.2,cy-R*3.8,R*6.4,R*6.4);
   }
   campKit(c,p.kit,cx,cy,R,p.num);
   if(!p.user)return;
   /* trofeo flotando justo encima de la ficha */
   const tS=L.R*3.1,ty=cy-R-L.R*.3-Math.sin(tm*3)*L.R*.12;
   c.save();c.translate(cx,ty);c.rotate(Math.sin(tm*2.4)*.07);campCup(c,cupType,0,0,tS);c.restore();
   c.save();c.fillStyle='#fff7d6';
   for(let i=0;i<6;i++){const a=tm*1.2+i*1.047,rr=tS*(.55+.1*Math.sin(tm*3+i)),sz=tS*(.05+.05*Math.abs(Math.sin(tm*5+i*2)));campStar(c,cx+Math.cos(a)*rr,ty-tS*.45+Math.sin(a)*rr*.8,sz,a)}
   c.restore();
   campText(c,userName,cx,gy+L.R*.8,L.R*.6,'#ffffff',W*.34);
  };
  const drawConfetti=()=>{
   c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1;
   conf.forEach(p=>{c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.scale(1,Math.cos(p.fl));c.fillStyle=p.col;c.fillRect(-p.w/2,-p.h/2,p.w,p.h);c.strokeRect(-p.w/2,-p.h/2,p.w,p.h);c.restore()});
  };
  const drawBadge=(x,y,B,tm)=>{
   const sc=1+.03*Math.sin(tm*4);
   c.save();c.translate(x,y);c.scale(sc,sc);
   const g=c.createRadialGradient(0,0,B*.2,0,0,B*.8);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(-B,-B,2*B,2*B);
   let ok=false;
   if(bok&&bimg){try{c.drawImage(bimg,-B/2,-B/2,B,B);ok=true}catch(e){ok=false}}
   if(!ok){
    c.fillStyle=c1;c.strokeStyle='#000';c.lineWidth=B*.1;c.beginPath();c.arc(0,0,B*.45,0,6.2832);c.fill();c.stroke();
    c.strokeStyle=c2;c.lineWidth=B*.07;c.beginPath();c.arc(0,0,B*.34,0,6.2832);c.stroke();
    campText(c,String(t.shortName||'').slice(0,3),0,0,B*.3,'#ffffff',B*.6);
   }
   c.restore();
  };
  const drawBanner=tm=>{
   const k=Math.min(1,tm/.6),e=1+2.70158*Math.pow(k-1,3)+1.70158*Math.pow(k-1,2),sc=Math.max(.01,e)*(1+.015*Math.sin(tm*3)),cyy=L.top+L.ph/2;
   c.save();c.globalAlpha=Math.min(1,k*2);c.translate(W/2,cyy);c.scale(sc,sc);c.translate(-W/2,-cyy);
   const x=W/2-L.pw/2,g=c.createLinearGradient(0,L.top,0,L.top+L.ph);g.addColorStop(0,'rgba(18,30,76,.9)');g.addColorStop(1,'rgba(5,10,32,.9)');
   campRR(c,x,L.top,L.pw,L.ph,L.F2*.45);c.fillStyle=g;c.fill();c.lineWidth=6;c.strokeStyle='#000';c.stroke();
   campRR(c,x+5,L.top+5,L.pw-10,L.ph-10,L.F2*.38);c.lineWidth=2;c.strokeStyle='rgba(250,204,21,.9)';c.stroke();
   drawBadge(W/2,L.top+L.pad+L.B/2,L.B,tm);
   campText(c,line1,W/2,L.l1,L.F1,'#facc15',L.pw-L.F2*.6);
   campText(c,line2,W/2,L.l2,L.F2,'#ffffff',L.pw-L.F2*.6);
   c.restore();
  };
  const render=tm=>{
   c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);
   drawSky(tm);drawFireworks();drawStadium(tm);drawPitch();
   players.filter(p=>p.row).concat(players.filter(p=>!p.row)).forEach(p=>drawPlayer(p,tm));
   drawPlayer(user,tm);
   drawConfetti();
   drawBanner(tm);
   const v=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.45,W/2,H/2,Math.max(W,H)*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.55)');c.fillStyle=v;c.fillRect(0,0,W,H);
  };
  /* ---- bucle ---- */
  let last=0,tm=0;
  const frame=now=>{
   if(CAMP!==ST)return;
   if(!cv.isConnected){stopCampScene();return}
   const dt=last?Math.min(.05,(now-last)/1000):.016;last=now;tm+=dt;
   try{update(dt,tm);render(tm)}catch(e){console.warn('[CareerMode] escena',e)}
   ST.raf=requestAnimationFrame(frame);
  };
  ST.raf=requestAnimationFrame(frame);
  campFanfare(ST);
 }
 function injectTorneoCSS(){
  if($('cmTorneoCSS'))return;
  const st=document.createElement('style');st.id='cmTorneoCSS';
  st.textContent='#cmTorneo{position:fixed;inset:0;z-index:99999;display:none;pointer-events:none;visibility:hidden;align-items:center;justify-content:center;padding:12px;background:transparent;overflow-y:auto}'+
   '#cmTorneo.on{display:flex;pointer-events:auto;visibility:visible}#cmTorneo:not(.on){display:none!important;pointer-events:none!important}'+
   '#cmTorneo .cmBk{position:fixed;inset:0;z-index:99999;background:rgba(3,8,20,.82)}#cmTorneo .cmTc{position:relative;z-index:100000;margin:auto;display:block!important;opacity:1!important;visibility:visible!important}'+
   '#cmTorneo .cmTc{width:min(420px,94vw);text-align:center;padding:18px 20px 16px;background:#fff7e6;color:#1b1b1b;border:4px solid #000;border-radius:24px;box-shadow:0 6px 0 #000,0 16px 30px rgba(0,0,0,.5);animation:cmTPop .3s cubic-bezier(.2,1.6,.4,1)}'+
   '#cmTorneo .cmTc.gold{background:#fff3b0}'+
   '#cmTorneo h1{margin:6px 0 4px;font-size:clamp(1.3rem,6vw,1.8rem);font-weight:900;font-style:italic;color:#facc15;-webkit-text-stroke:2px #000;text-shadow:0 3px 0 #000;letter-spacing:.5px}'+
   '#cmTorneo p{margin:0 0 10px;font-size:.88rem;font-weight:700;color:#374151;line-height:1.35}'+
   '#cmTorneo .vs{display:flex;align-items:center;justify-content:center;gap:10px;margin:8px 0 10px;font-weight:900}#cmTorneo .vs .cmBd{width:64px;height:64px;display:block;margin:0 auto 2px}#cmTorneo .vs small{display:block;font-size:.66rem;color:#6b7280}#cmTorneo .vs div{flex:1;font-size:.82rem}'+
   '#cmTorneo button{width:100%;padding:11px 12px;font-size:1rem;font-weight:900;border-radius:14px;border:3px solid #000;color:#fff;cursor:pointer;background:linear-gradient(180deg,#4cb5f7 0%,#1f8be3 100%);box-shadow:0 4px 0 #000}#cmTorneo button:active{transform:translateY(3px);box-shadow:0 1px 0 #000}'+
   '#cmTorneo .sorteo{max-height:34vh;overflow-y:auto;margin:6px 0;padding:6px;border:2px solid #000;border-radius:12px;background:#fff;font-size:.78rem;text-align:left}#cmTorneo .sorteo div{padding:2px 4px;border-radius:6px}#cmTorneo .sorteo .me{background:#bae6fd;font-weight:900}#cmTorneo .sorteo small{opacity:.7}'+
   '#cmTorneo.cmScene{padding:0;overflow:hidden;align-items:stretch;justify-content:stretch;background:#030712}'+
   '#cmTorneo .cmSc{position:fixed;inset:0;z-index:100000;margin:0}#cmTorneo .cmSc canvas{position:absolute;inset:0;width:100%;height:100%;display:block}'+
   '#cmTorneo .cmScBtn{position:absolute;left:0;right:0;bottom:max(12px,env(safe-area-inset-bottom));display:flex;justify-content:center;padding:0 12px}#cmTorneo .cmScBtn button{width:min(340px,86vw);font-size:1.15rem;padding:12px 14px}'+
   '@keyframes cmTPop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}';
  document.head.appendChild(st);
 }
 /* elimina por completo la capa oscura de carteles (nada queda tapando ni bloqueando el hub) */
 function hideTorneoLayer(){
  stopCampScene();
  const el=$('cmTorneo');
  if(el){el.classList.remove('on');el.innerHTML='';el.style.display='none';el.style.pointerEvents='none';el.remove()}
 }
 /* limpia capas colgadas al entrar al hub (fuera de partido) */
 function sweepOverlays(){
  if(CM.live)return;
  ['cmSub','cmEnd','cmChamp'].forEach(i=>{const e=$(i);if(e)e.classList.remove('on')});
  if(!(S&&S.modalQ&&S.modalQ.length))hideTorneoLayer();
 }
 function modalDone(){
  try{const q=S&&S.modalQ;if(q&&q.length)q.shift();save()}catch(e){console.warn('[CareerMode] modal',e)}
  hideTorneoLayer(); /* primero se quita la capa; si queda otro cartel en cola se vuelve a crear */
  try{renderHub()}finally{flushModals()}
 }
 function flushModals(){
  if(!S||CM.live){hideTorneoLayer();return}
  const q=S.modalQ;if(!q||!q.length){hideTorneoLayer();return}
  const it=q[0];injectTorneoCSS();
  let el=$('cmTorneo');if(!el){el=document.createElement('div');el.id='cmTorneo';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');document.body.appendChild(el)}
  if(it.k!=='champ'){el.classList.remove('cmScene');stopCampScene()}
  let h='';
  if(it.k==='intro'){
   const cl=it.torneo==='clausura';
   h='<div class="cmTc">'+cupSvg('#cbd5e1',84,it.torneo!=='bnacional')+'<h1>🏆 '+TN_LBL[it.torneo]+'</h1><p>'+(cl?'Mismas zonas y mismos rivales que en el Apertura, con todas las localías invertidas.'+(it.prev?'<br>Campeón del Apertura: <b>'+E(T(it.prev).name)+'</b>':''):(it.torneo==='bnacional'?'17 fechas a una rueda en la Zona '+E(S.myZone)+'. El 1.º de cada zona juega la Final por el 1.º Ascenso; del 2.º al 8.º juegan el Reducido por el 2.º Ascenso a Primera División.':'16 fechas en la Zona '+E(S.myZone)+' y Playoffs: los 8 primeros de cada zona clasifican.'))+'</p><button id="cmTorneoBtn" type="button">Comenzar Torneo</button></div>';
  }else if(it.k==='sorteo'&&S.copa){
   const C=S.copa,r=C.rounds.treintaidosavos,um=r.find(m=>m.h===S.teamId||m.a===S.teamId);
   const mine=um?(um.h===S.teamId?um.a:um.h):null,sg=id=>'<b>'+E(T(id).shortName)+'</b>';
   const rv=mine?'<p><span class="cmBd" style="display:block;width:72px;height:72px;margin:0 auto 4px">'+badge(T(mine))+'</span>Tu rival en 32avos de Final: <b style="font-size:1.05rem">'+E(T(mine).name)+'</b><br>Sede neutral: <b>'+E(T(um.venue).shortName)+'</b> ('+E(T(um.venue).name)+')</p>':'<p><b>¡Bolilla de privilegio!</b> Tu equipo pasa directo a los 16avos de Final.</p>';
   h='<div class="cmTc">'+copaArgSvg(84)+'<h1>🏆 SORTEO COPA ARGENTINA</h1>'+rv+'<div class="sorteo">'+r.map(m=>'<div class="'+((m.h===S.teamId||m.a===S.teamId)?'me':'')+'">'+sg(m.h)+' vs '+sg(m.a)+' <small>🏟️ '+E(T(m.venue).shortName)+'</small></div>').join('')+'</div>'+(C.byes.length?'<p style="margin:8px 0">Directo a 16avos: '+C.byes.map(sg).join(' · ')+'</p>':'<p style="margin:8px 0">64 equipos: '+C.np+' de Primera División + '+C.nb+' de Primera Nacional</p>')+'<p>Partido único · penales directos si empatan.</p><button id="cmTorneoBtn" type="button">Continuar</button></div>';
  }else if(it.k==='move'){
   const li=(ids,c)=>ids.length?ids.map(id=>'<div style="color:'+c+'"'+(id===S.teamId?' class="me"':'')+'><b>'+E(T(id).name)+'</b></div>').join(''):'<div>—</div>';
   const mine=it.to!==it.from?(it.to==='primera'?'<p style="color:#15803d"><b>⬆️ ¡Tu club ASCENDIÓ a Primera División!</b></p>':'<p style="color:#b91c1c"><b>⬇️ Tu club DESCENDIÓ a la Primera Nacional.</b></p>'):'<p>Tu club sigue en '+DIVN[it.to]+'.</p>';
   h='<div class="cmTc gold">'+cupSvg('#facc15',72)+'<h1>ASCENSOS Y DESCENSOS</h1><p>Temporada '+it.year+' · '+DIVN[it.to]+'</p>'+mine+'<div class="sorteo"><div><b>⬆️ Ascienden a Primera División</b></div>'+li(it.up,'#15803d')+'<div style="margin-top:6px"><b>⬇️ Descienden a Primera Nacional</b></div>'+li(it.down,'#b91c1c')+'</div><button id="cmTorneoBtn" type="button">Continuar</button></div>';
  }else if(it.k==='champ'){
   el.classList.add('cmScene');
   if(CAMP&&CAMP.cv&&CAMP.cv.isConnected&&el.contains(CAMP.cv))return; /* la escena ya está en curso */
   el.innerHTML='<div class="cmSc"><canvas id="cmCampCv"></canvas><div class="cmScBtn"><button id="cmTorneoBtn" type="button">Continuar</button></div></div>';
   el.style.display='';el.style.pointerEvents='';el.classList.add('on');el.onclick=null;
   const cb=$('cmTorneoBtn');cb.onclick=modalDone;try{cb.focus({preventScroll:true})}catch(e){}
   startCampScene($('cmCampCv'),it);
   return;
  }else if(it.k==='trofeo'&&S.trofeo){
   const t=S.trofeo,side=id=>'<div><span class="cmBd">'+badge(T(id))+'</span>'+E(T(id).name)+'<small>'+(id===S.aperturaChampionId&&id===S.clausuraChampionId?'BICAMPEÓN':id===S.aperturaChampionId?'CAMPEÓN APERTURA':id===S.clausuraChampionId?'CAMPEÓN CLAUSURA':'SUBCAMPEÓN')+'</small></div>';
   h='<div class="cmTc gold">'+cupSvg('#facc15',96)+'<h1>🏆 TROFEO DE CAMPEONES</h1><div class="vs">'+side(t.h)+'<div>VS</div>'+side(t.a)+'</div><p>Partido único en cancha neutral. Si empatan, tiempo extra y penales.</p><button id="cmTorneoBtn" type="button">Continuar</button></div>';
  }else{q.shift();save();return flushModals()}
  el.innerHTML='<div class="cmBk"></div>'+h;el.style.display='';el.style.pointerEvents='';el.classList.add('on');
  const card=el.querySelector('.cmTc');
  if(card){['display:block','opacity:1','visibility:visible'].forEach(d=>{const k=d.split(':');card.style.setProperty(k[0],k[1],'important')})}
  const bt=$('cmTorneoBtn');if(bt){bt.onclick=modalDone;try{bt.focus({preventScroll:true})}catch(e){}}
  el.onclick=e=>{if(!el.querySelector('.cmTc')||!$('cmTorneoBtn')){if(e.target===el||(e.target.classList&&e.target.classList.contains('cmBk')))modalDone()}}; /* modal vacío: clic en cualquier lugar lo elimina */
  if(!card||!bt)setTimeout(()=>{const e2=$('cmTorneo');if(e2&&(!e2.querySelector('.cmTc')||!$('cmTorneoBtn')))modalDone()},0); /* nunca dejar un backdrop sin tarjeta */
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
  const bn=sv.division==='bnacional',tl=bn?'Primera Nacional · ':sv.torneo==='clausura'?'Clausura · ':'Apertura · ',info=sv.phase==='regular'?tl+'Fecha '+sv.fecha+'/'+(bn?17:16)+' · Zona '+sv.myZone:sv.phase==='playoffs'?tl+(bn?'Final / Reducido':'Playoffs'):sv.phase==='trofeo'?'Trofeo de Campeones':'Temporada finalizada';
  d.innerHTML='<b>▶ Campaña guardada: '+E(t.name)+'</b><div class="cNote">'+E(sv.player.name)+' (#'+sv.player.num+') · '+info+'. Si iniciás una temporada nueva, se reemplaza la guardada.</div><div class="cmRow"><button type="button" id="cmCont1" class="cmBig">▶ CONTINUAR TEMPORADA</button></div>';
  root.insertBefore(d,root.firstChild);
  $('cmCont1').onclick=()=>{S=loadSave();if(S){openHub('next');flushModals()}};
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

 /* La categoría se elige en el desplegable "Liga" de index.html (window._careerSelectedDivision); ya no se inyecta ninguna tarjeta "Categoría". */
 function restoreData(){if(window.LIGA_ARGENTINA_DATA!==D1&&D1)window.LIGA_ARGENTINA_DATA=D1}
 function removeLegacyDiv(){const el=$('cmDiv');if(el)el.remove()}
 function init(){
  resetMatchFlags();injectCSS();injectStatsCSS();injectStartButton();ensureDom();wireGlobal();removeLegacyDiv();
  hook('show',o=>function(id){if(id!=='career-screen')restoreData();return o.apply(this,arguments)});
  const hc=$('homeCareer');
  if(hc)hc.addEventListener('click',()=>{restoreData();setTimeout(()=>{injectContinue();removeLegacyDiv()},0)});
  const root=$('career-root');
  if(root)new MutationObserver(()=>{if(!$('cmCont'))injectContinue();removeLegacyDiv()}).observe(root,{childList:true});
  window.addEventListener('career:start',e=>{
   try{S=newSeason(e.detail||{});save();restoreData();const c=$('cmCont');if(c)c.remove();removeLegacyDiv();openHub('next');flushModals()}
   catch(er){console.error('[CareerMode] no se pudo crear la temporada',er)}
  });
  window.CAREER_MODE_API={getSeason:()=>S,getDivision:()=>S?S.division||'primera':(window.CAREER_DIVISION||'primera'),openHub,newSeason,_t:{buildFixture,stats,simKO,rounds15,applyStamina,stamF,clash,setS:v=>{S=v},userMatch,recordUser,simRest}};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
