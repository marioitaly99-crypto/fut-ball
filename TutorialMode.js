/* ===== TutorialMode.js · Entrenamiento interactivo (estilo cartoon vector) =====
   Se carga al final de index.html. No modifica la física: solo OBSERVA el motor real
   (G, me, G.score, me.chg, me.sl) y dibuja un aro dorado sobre el canvas #c.
   Firmas usadas: enter(r,true); startHost(r); show(); netLeave(); draw(). */
(() => {
  'use strict';
  if (window.__tutorialModeLoaded) return;
  window.__tutorialModeLoaded = true;

  const $ = id => document.getElementById(id);
  const TOUCH = () => { try { return !!IS_TOUCH; } catch (e) { return false; } };
  const FONT = '"Fredoka","Baloo 2","Nunito","Arial Rounded MT Bold","Segoe UI",sans-serif';

  /* ---------- estilos cartoon ---------- */
  const css = `
#tmQuick{margin-top:8px;padding:6px 10px;border-radius:14px;background:rgba(30,35,41,.86);border:2px solid #0a1f3d;box-shadow:0 3px 0 rgba(0,0,0,.35);color:#dbeafe;font:700 .66rem/1.45 ${FONT};text-align:center;box-sizing:border-box;width:100%;pointer-events:none}
#tmQuick div{white-space:normal}
#tmQuick b{color:#facc15}
#tmCta{display:block;width:100%;margin:10px 0 6px;padding:12px 14px;font:900 1.05rem ${FONT};letter-spacing:.3px;color:#3b2a00;background:linear-gradient(180deg,#fde047 0%,#f59e0b 100%);border:3px solid #0a1f3d;border-radius:16px;box-shadow:0 5px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.5);cursor:pointer;animation:tmPulse 1.6s ease-in-out infinite}
#tmCta:active{transform:translateY(4px);box-shadow:0 1px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.4)}
@keyframes tmPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
#tmBanner{position:fixed;top:calc(env(safe-area-inset-top,0px) + 58px);left:50%;transform:translateX(-50%);z-index:90;display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;max-width:min(96vw,780px);box-sizing:border-box;padding:6px 10px;border-radius:16px;background:#1e2329;border:3px solid #0a1f3d;box-shadow:0 4px 0 rgba(0,0,0,.45);color:#fff;font:700 .8rem/1.25 ${FONT};pointer-events:none}
#tmBanner.pop{animation:tmPop .35s ease-out}
@keyframes tmPop{0%{transform:translateX(-50%) scale(.9)}60%{transform:translateX(-50%) scale(1.05)}100%{transform:translateX(-50%) scale(1)}}
#tmBanner .tmChip{flex:none;min-width:2.6em;text-align:center;padding:3px 8px;border-radius:999px;background:#facc15;color:#3b2a00;border:2px solid #0a1f3d;font-weight:900}
#tmBanner .tmTxt{flex:1 1 220px;min-width:0}
#tmBanner .tmT{display:block;color:#facc15;font-size:.9rem}
#tmBanner .tmD{display:block;color:#e5edf7}
#tmBanner .tmN{display:block;color:#7dd3fc;min-height:1.1em}
#tmBanner .tmTag{flex:none;padding:3px 8px;border-radius:999px;background:#fde68a;color:#5b4300;border:2px solid #0a1f3d;font-weight:900;font-size:.72rem}
#tmBanner .tmDots{flex:none;display:flex;gap:4px}
#tmBanner .tmDots i{width:10px;height:10px;border-radius:50%;background:#3a4452;border:2px solid #0a1f3d}
#tmBanner .tmDots i.on{background:#facc15}#tmBanner .tmDots i.ok{background:#62c74f}
.tmBtn{pointer-events:auto;flex:none;padding:6px 12px;border-radius:12px;border:2.5px solid #0a1f3d;color:#fff;font:900 .78rem ${FONT};cursor:pointer;box-shadow:0 3px 0 #0a1f3d,inset 0 2px 0 rgba(255,255,255,.25)}
.tmBtn:active{transform:translateY(3px);box-shadow:0 0 0 #0a1f3d}
.tmBtn.red{background:linear-gradient(180deg,#f0615f 0%,#d23a3a 100%)}
.tmBtn.green{background:linear-gradient(180deg,#62c74f 0%,#439e34 100%)}
#tmDone{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:95;width:min(92vw,380px);box-sizing:border-box;padding:18px 16px 16px;text-align:center;border-radius:22px;background:#1e2329;border:4px solid #0a1f3d;box-shadow:0 7px 0 rgba(0,0,0,.5);color:#fff;font:700 .95rem/1.4 ${FONT};animation:tmPopC .45s ease-out}
@keyframes tmPopC{0%{transform:translate(-50%,-50%) scale(.6);opacity:0}70%{transform:translate(-50%,-50%) scale(1.06);opacity:1}100%{transform:translate(-50%,-50%) scale(1)}}
#tmDone h2{margin:0 0 8px;font:900 1.35rem ${FONT};color:#facc15;-webkit-text-stroke:1px #0a1f3d;paint-order:stroke fill}
#tmDone p{margin:0 0 12px;color:#e5edf7}#tmDone b{color:#7dd3fc}
#tmDone .tmBtn{font-size:1rem;padding:9px 18px}
`;
  const st = document.createElement('style');
  st.id = 'tmStyle';
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- 1) Pastilla de controles rápidos en #screen-home ---------- */
  function injectQuick() {
    if ($('tmQuick')) return;
    const home = $('screen-home');
    if (!home) return;
    const pill = document.createElement('div');
    pill.id = 'tmQuick';
    pill.innerHTML =
      '<div>🖥 PC: Moverse <b>WASD / Flechas</b> · Patear <b>Espacio/X</b> · Pausa <b>P</b> · Menú <b>ESC</b></div>' +
      '<div>📱 Celular: <b>Joystick + Botón táctil</b> · Pausa <b>⏸</b> / Menú <b>☰</b> arriba</div>';
    const nav = home.querySelector('nav.hmenu');
    (nav || home).appendChild(pill);
  }

  /* ---------- 2) Entrenamiento ---------- */
  const STEPS = [
    null,
    { t: '🏃 Moverse', realista: false },
    { t: '⚽ Patear al arco', realista: false },
    { t: '🎯 Disparo cargado', realista: true },
    { t: '🛷 Barrida deslizante', realista: true }
  ];
  const T = { active: false, step: 0, G: null, base: 0, peak: 0, chargedAt: 0, warnUntil: 0, banner: null, card: null };

  const desc = n => {
    const touch = TOUCH();
    if (n === 1) return `Llevá tu ficha hasta el <b>aro dorado</b> del medio de la cancha (${touch ? 'joystick' : 'WASD / Flechas'}).`;
    if (n === 2) return `Metele <b>1 gol</b> con un <b>toque rápido</b> de Patear (${touch ? 'botón ⚽' : 'Espacio / X'}).`;
    if (n === 3) return 'La <b>barra de potencia</b> es exclusiva del <b>Modo Realista</b>. Con la pelota, mantené apretado Patear hasta pasar la marca (<b>≥ 45%</b>), soltá y metela: <b>1 gol</b>.';
    return 'La <b>barrida</b> es exclusiva del <b>Modo Realista</b>. Alejate de la pelota y, corriendo, mantené apretado Patear (~0,4 s) para deslizarte: <b>1 barrida</b>.';
  };

  function buildBanner() {
    removeBanner();
    const b = document.createElement('div');
    b.id = 'tmBanner';
    b.innerHTML =
      '<span class="tmChip"></span>' +
      '<div class="tmTxt"><b class="tmT"></b><span class="tmD"></span><span class="tmN"></span></div>' +
      '<span class="tmTag" style="display:none">🟨 Solo Modo Realista</span>' +
      '<span class="tmDots"><i></i><i></i><i></i><i></i></span>' +
      '<button type="button" class="tmBtn red" tabindex="-1">Salir al menú</button>';
    const btn = b.querySelector('.tmBtn');
    btn.addEventListener('mousedown', e => e.preventDefault()); /* no roba el foco: Espacio no activa el botón */
    btn.addEventListener('click', leave);
    document.body.appendChild(b);
    T.banner = b;
  }
  function removeBanner() { if (T.banner) { T.banner.remove(); T.banner = null; } }
  function removeCard() { if (T.card) { T.card.remove(); T.card = null; } }

  function renderStep() {
    const b = T.banner;
    if (!b) return;
    const s = STEPS[T.step];
    b.querySelector('.tmChip').textContent = T.step + '/4';
    b.querySelector('.tmT').textContent = s.t;
    b.querySelector('.tmD').innerHTML = desc(T.step);
    b.querySelector('.tmN').textContent = '';
    b.querySelector('.tmTag').style.display = s.realista ? '' : 'none';
    b.querySelectorAll('.tmDots i').forEach((d, i) => { d.className = i + 1 < T.step ? 'ok' : i + 1 === T.step ? 'on' : ''; });
    b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
  }

  const total = () => (G.score.red | 0) + (G.score.blue | 0);

  function goStep(n) {
    T.step = n;
    T.base = total();
    T.peak = 0;
    T.chargedAt = 0;
    T.warnUntil = 0;
    renderStep();
  }

  function finish() {
    T.active = false;
    removeBanner();
    removeCard();
    const touch = TOUCH();
    const c = document.createElement('div');
    c.id = 'tmDone';
    c.innerHTML =
      '<h2>🏆 ¡Entrenamiento completado!</h2>' +
      `<p>En partido, se pausa con <b>P</b>${touch ? ' (<b>⏸</b> en celular)' : ' (<b>⏸</b> en celular)'} y se abre el menú con <b>ESC</b> (<b>☰</b> en celular).</p>` +
      '<button type="button" class="tmBtn green" tabindex="-1">Volver al menú</button>';
    const btn = c.querySelector('.tmBtn');
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', leave);
    document.body.appendChild(c);
    T.card = c;
  }

  function stop() { T.active = false; T.G = null; removeBanner(); removeCard(); }

  function leave() {
    stop();
    try { netLeave(); } catch (e) { /* sala solo local */ }
    try { menuOpen = false; } catch (e) { /* noop */ }
    try { $('menu').classList.add('hidden'); $('vote').classList.add('hidden'); } catch (e) { /* noop */ }
    try { show('screen-home'); } catch (e) { /* noop */ }
  }

  /* ---------- lógica por frame (se ejecuta dentro de draw()) ---------- */
  function tick() {
    if (!T.active || !G || G !== T.G || !me) return;
    if (G.ko) G.ko = null; /* sin rivales: se quita la barrera de saque para poder barrer / patear libre */
    const now = performance.now();

    if (T.step === 1) {
      const R = 62 * (G.k || 1);
      if (Math.hypot(me.x - G.w / 2, me.y - G.h / 2) <= R) goStep(2);
    } else if (T.step === 2) {
      if (total() > T.base) goStep(3);
    } else if (T.step === 3) {
      const c = me.chg || 0;
      if (c > T.peak) T.peak = c;
      if (c === 0 && T.peak > 0) { /* soltó (o disparó solo al 100%): registra si la carga llegó a ≥ 45% */
        T.chargedAt = T.peak >= 0.45 ? now : 0;
        T.peak = 0;
      }
      const n = T.banner && T.banner.querySelector('.tmN');
      if (n) n.textContent = now < T.warnUntil ? '⚠️ Entró, pero sin carga ≥ 45%. ¡Probá de nuevo!' : (c > 0.02 ? `Carga: ${Math.round(c * 100)}% ${c >= 0.45 ? '✅' : '(meta ≥ 45%)'}` : '');
      if (total() > T.base) {
        if (T.chargedAt && now - T.chargedAt < 12000) goStep(4);
        else { T.base = total(); T.warnUntil = now + 4000; }
      }
    } else if (T.step === 4) {
      if (me.sl) finish();
    }
  }

  /* ---------- aro dorado sobre el canvas #c ---------- */
  function drawRing() {
    try {
      if (!T.active || T.step !== 1 || !G || G !== T.G || !G.cam) return;
      const Z = IS_TOUCH ? MOBILE_ZOOM : 0.9;
      const k = G.k || 1, R = 62 * k, cx = G.w / 2, cy = G.h / 2, t = performance.now() / 1000;
      ctx.save();
      ctx.setTransform(Z * DPR, 0, 0, Z * DPR, (VW / 2 - G.cam.x * Z) * DPR, (VH / 2 - G.cam.y * Z) * DPR);
      ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      const pul = 1 + Math.sin(t * 4) * 0.05;
      /* resplandor */
      const g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.5 * pul);
      g.addColorStop(0, 'rgba(253,224,71,.38)'); g.addColorStop(1, 'rgba(253,224,71,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.5 * pul, 0, 7); ctx.fill();
      /* aro: contorno oscuro + oro + brillo */
      ctx.beginPath(); ctx.arc(cx, cy, R * pul, 0, 7);
      ctx.strokeStyle = '#6b4600'; ctx.lineWidth = 15 * k; ctx.stroke();
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 9 * k; ctx.stroke();
      ctx.strokeStyle = '#fff7c2'; ctx.lineWidth = 2.5 * k; ctx.setLineDash([14 * k, 12 * k]); ctx.lineDashOffset = -t * 30;
      ctx.beginPath(); ctx.arc(cx, cy, R * pul, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      /* estrellitas orbitando */
      for (let i = 0; i < 4; i++) {
        const a = t * 1.6 + i * Math.PI / 2, sx = cx + Math.cos(a) * R * pul, sy = cy + Math.sin(a) * R * pul, s = (6 + Math.sin(t * 6 + i) * 1.5) * k;
        ctx.beginPath();
        for (let j = 0; j < 8; j++) { const rr = j % 2 ? s * 0.45 : s, aa = j * Math.PI / 4 - Math.PI / 2; ctx[j ? 'lineTo' : 'moveTo'](sx + Math.cos(aa) * rr, sy + Math.sin(aa) * rr); }
        ctx.closePath(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#6b4600'; ctx.lineWidth = 2.2 * k; ctx.stroke(); ctx.fill();
      }
      /* globito "¡ACÁ!" */
      const by = cy - R - 34 * k + Math.sin(t * 5) * 4 * k, bw = 74 * k, bh = 26 * k;
      ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#0a1f3d'; ctx.lineWidth = 3.5 * k;
      ctx.beginPath(); ctx.moveTo(cx - bw / 2 + 8 * k, by - bh / 2); ctx.lineTo(cx + bw / 2 - 8 * k, by - bh / 2);
      ctx.quadraticCurveTo(cx + bw / 2, by - bh / 2, cx + bw / 2, by - bh / 2 + 8 * k); ctx.lineTo(cx + bw / 2, by + bh / 2 - 8 * k);
      ctx.quadraticCurveTo(cx + bw / 2, by + bh / 2, cx + bw / 2 - 8 * k, by + bh / 2);
      ctx.lineTo(cx + 8 * k, by + bh / 2); ctx.lineTo(cx, by + bh / 2 + 9 * k); ctx.lineTo(cx - 8 * k, by + bh / 2);
      ctx.lineTo(cx - bw / 2 + 8 * k, by + bh / 2); ctx.quadraticCurveTo(cx - bw / 2, by + bh / 2, cx - bw / 2, by + bh / 2 - 8 * k);
      ctx.lineTo(cx - bw / 2, by - bh / 2 + 8 * k); ctx.quadraticCurveTo(cx - bw / 2, by - bh / 2, cx - bw / 2 + 8 * k, by - bh / 2);
      ctx.closePath(); ctx.stroke(); ctx.fill();
      ctx.fillStyle = '#3b2a00'; ctx.font = `900 ${15 * k}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('¡ACÁ!', cx, by + 1 * k);
      ctx.restore();
    } catch (e) { try { ctx.restore(); } catch (_) { /* noop */ } }
  }

  /* ---------- enganche en el render real (sin tocar la física) ---------- */
  const origDraw = window.draw;
  if (typeof origDraw === 'function') {
    window.draw = function () {
      const r = origDraw.apply(this, arguments);
      try { tick(); drawRing(); } catch (e) { console.error('tutorial', e); }
      return r;
    };
  }
  setInterval(() => { /* si se sale de la partida (menú, ESC → salir, nueva sala) se limpia todo */
    let inG = false; try { inG = !!inGame; } catch (e) { /* noop */ }
    if ((T.active || T.card) && (!inG || (G !== T.G))) stop();
  }, 400);

  /* ---------- arranque: sala local vacía, Modo Realista ---------- */
  function start() {
    if (typeof enter !== 'function') return;
    stop();
    const hm = $('helpModal'); if (hm) hm.classList.add('hidden');
    try { if (!user.nick) user.nick = 'Jugador'; } catch (e) { /* noop */ }
    const r = {
      id: Date.now(), name: 'Entrenamiento', max: 1, n: 1, owner: user.nick,
      priv: true, pass: 'tr' + Math.random().toString(36).slice(2, 8), /* privada: no queda abierta a otros jugadores */
      size: 'realista', mode: 'realista', duration: 0, goalLimit: 0,
      online: true, mine: true, flag: FLAG, ping: 0, training: true /* sin r.test → 0 bots */
    };
    enter(r, true); startHost(r);
    G.duration = 0; G.goalLimit = 0; /* sin límite de tiempo ni de goles */
    T.G = G; T.active = true;
    buildBanner();
    goStep(1);
    const c = $('c'); if (c) c.focus();
  }

  /* ---------- botón destacado dentro de #helpModal ---------- */
  function injectCta() {
    if ($('tmCta')) return;
    const m = $('helpModal'), ok = $('helpOk');
    if (!m || !ok) return;
    const b = document.createElement('button');
    b.id = 'tmCta'; b.type = 'button';
    b.textContent = '🎮 Iniciar Entrenamiento Interactivo';
    b.addEventListener('click', start);
    ok.parentNode.insertBefore(b, ok);
  }

  function init() { injectQuick(); injectCta(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
