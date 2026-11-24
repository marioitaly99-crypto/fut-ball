/**
 * BotAIController.js — IA de bots para "Fut-ball ⚽" (2D estilo Haxball)
 * ---------------------------------------------------------------------------
 * Uso (navegador):
 *   const ai = new window.BotAIController({ difficulty: 'normal' });
 *   const inputs = ai.update(gameState);           // { [botId]: { ix, iy, kick, slide } }
 *   // o bien, bot por bot:
 *   const input = ai.decide(botPlayer, gameState); // { ix, iy, kick, slide }
 *
 * Forma esperada de `gameState` (todos los campos opcionales tienen fallback):
 *   stadium : { width, height, left=0, top=0, goalTop?, goalBottom? }  // cancha = [left, left+width] x [top, top+height]
 *   goalTop / goalBottom : (dinámicos, p.ej. por 'big_goals'). También acepta gameState.goals = { left:{top,bottom}, right:{top,bottom} }
 *   ball    : { x, y, vx, vy, r }
 *   players : [{ id, team, x, y, vx, vy, r, isBot, frozen, slideCooldown, ... }]
 *   isRealistic : boolean (o mode === 'realistic')
 *   setPiece    : { type: 'throw_in'|'corner'|'free_kick'|'goal_kick', team, executorId? }  (balón parado en ball.x/ball.y)
 *   activePowerEvent : 'ice' | 'giant_ball' | 'big_goals' | 'fire_ball' | 'magnet' | 'tag' | { type, magnetId }
 *   teamDirs? : { [team]: +1 | -1 }  (+1 = ataca hacia +x). Por defecto: team 1 / 'red' / 'left' ataca hacia +x.
 *
 * Movimiento: (ix, iy) se recalcula en CADA frame; los ticks de reacción solo refrescan decisiones tácticas.
 *
 * Todas las distancias están expresadas como fracción de stadium.width / stadium.height.
 * Sin dependencias externas.
 */
(function (global) {
  'use strict';

  const DEG = Math.PI / 180;

  // ---------------------------------------------------------------------------
  // Niveles de dificultad
  // ---------------------------------------------------------------------------
  const DIFFICULTY = {
    easy:   { react: [14, 18], aim: 20, predict: 4,  through: false, wallBounce: false, smartPass: false, passChance: 0.5, shootMul: 0.7,
              kickTol: 0.55, alignTol: 1.0, precise: false,
              slide: true, slideChance: 0.06, slideFront: -0.4, slideBallFirst: false, slideStrict: false, slideReach: 1.15, slideErr: 1.6 },
    normal: { react: [7, 9],   aim: 8,  predict: 12, through: false, wallBounce: false, smartPass: false, passChance: 0.9, shootMul: 1,
              kickTol: 0.32, alignTol: 0.85, precise: false,
              slide: true, slideChance: 0.6,  slideFront: -0.15, slideBallFirst: true, slideStrict: false, slideReach: 1.2,  slideErr: 0.5 },
    hard:   { react: [3, 4],   aim: 2,  predict: 24, through: true,  wallBounce: true,  smartPass: true,  passChance: 1,   shootMul: 1.15,
              kickTol: 0.16, alignTol: 0.6, precise: true,
              slide: true, slideChance: 1,    slideFront: 0.0,  slideBallFirst: true,  slideStrict: true,  slideReach: 1.0,  slideErr: 0.15 }
  };

  // ---------------------------------------------------------------------------
  // Utilidades matemáticas
  // ---------------------------------------------------------------------------
  const hyp = Math.hypot;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  function norm(x, y) { const d = Math.hypot(x, y) || 1e-9; return { x: x / d, y: y / d, d }; }
  function rot(v, a) { const c = Math.cos(a), s = Math.sin(a); return { x: v.x * c - v.y * s, y: v.x * s + v.y * c }; }
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    const t = l2 ? clamp(((px - ax) * dx + (py - ay) * dy) / l2, 0, 1) : 0;
    return { d: hyp(px - (ax + dx * t), py - (ay + dy * t)), t };
  }
  function reflect(v, lo, hi) {
    const span = hi - lo;
    if (span <= 0) return lo;
    let t = (v - lo) % (2 * span);
    if (t < 0) t += 2 * span;
    return lo + (t <= span ? t : 2 * span - t);
  }
  function mk(ix, iy, kick, slide, meta) {
    const m = hyp(ix, iy);
    if (m > 1) { ix /= m; iy /= m; }
    return { ix: ix || 0, iy: iy || 0, kick: !!kick, slide: !!slide, meta: meta || {} };
  }
  const isPlaying = (t) => t != null && t !== -1 && t !== 'spectator' && t !== 'spectators' && t !== 'spec';

  // ===========================================================================
  class BotAIController {
    constructor(options) {
      options = options || {};
      this.difficulty = DIFFICULTY[options.difficulty] ? options.difficulty : 'normal';
      this.rng = typeof options.rng === 'function' ? options.rng : Math.random;
      this._mem = new Map();
    }

    setDifficulty(level) {
      if (DIFFICULTY[level]) { this.difficulty = level; this._mem.clear(); }
    }
    reset() { this._mem.clear(); }

    /** Devuelve { [id]: {ix,iy,kick,slide} } para todos los jugadores con isBot. */
    update(gameState) {
      const out = {};
      for (const p of gameState.players || []) if (p.isBot) out[p.id] = this.decide(p, gameState);
      return out;
    }

    // -------------------------------------------------------------------------
    // Punto de entrada por bot (con tiempo de reacción según dificultad)
    // -------------------------------------------------------------------------
    decide(bot, gs) {
      if (bot.frozen) return { ix: 0, iy: 0, kick: false, slide: false };
      const cfg = DIFFICULTY[bot.difficulty] || DIFFICULTY[this.difficulty];
      const key = bot.id != null ? bot.id : 'bot';
      let mem = this._mem.get(key);
      if (!mem) {
        mem = { age: 0, nextAge: 0, sig: '', aimErr: 0, aimErrCur: 0, slideRoll: false, passRoll: true, spSig: '', spStart: 0,
                gkHold: -1, gkAdv: null, vmax: 0, act: null, actUntil: 0, reactTicks: 6, passMate: null, shotSide: 0,
                spReady: null, spWait: 55, spAim: 0, spMate: null, spSpot: null, spSpotUntil: 0 };
        this._mem.set(key, mem);
      }
      mem.age++;
      const sp = this._normSP(gs.setPiece, gs);
      const sig = sp ? sp.type + sp.team : '';
      if (mem.sig !== sig) { mem.sig = sig; mem.act = null; mem.nextAge = 0; }

      // Solo las decisiones tácticas / el error de puntería se refrescan con el tiempo de reacción.
      if (mem.age >= mem.nextAge) {
        mem.reactTicks = cfg.react[0] + Math.floor(this.rng() * (cfg.react[1] - cfg.react[0] + 1));
        mem.nextAge = mem.age + mem.reactTicks;
        mem.aimErr = (this.rng() * 2 - 1) * cfg.aim * DEG;
        mem.slideRoll = this.rng() < cfg.slideChance;
        mem.passRoll = this.rng() < cfg.passChance;
      }
      mem.aimErrCur += (mem.aimErr - mem.aimErrCur) * 0.2;       // el error cambia suave, sin saltos

      // Velocidad máxima observada (para la amortiguación de llegada)
      const W = gs.stadium.width, spd = Math.hypot(bot.vx || 0, bot.vy || 0);
      mem.vmax = Math.max(W * 0.004, mem.vmax * 0.998, Math.min(spd, Math.max(mem.vmax * 1.04, W * 0.004)));

      // Movimiento (ix, iy) recalculado en cada frame hacia el objetivo actual
      const ctx = this._buildCtx(bot, gs, mem);
      let dec = this._think(ctx.me, gs, ctx, cfg, mem, sp);
      dec = this.handleSuperpowers(bot, gs, dec);
      return { ix: dec.ix, iy: dec.iy, kick: dec.kick, slide: dec.slide };
    }

    // -------------------------------------------------------------------------
    // Contexto (todo proporcional al tamaño del estadio)
    // -------------------------------------------------------------------------
    _buildCtx(bot, gs, mem) {
      const st = gs.stadium, W = st.width, H = st.height;
      const L = st.left != null ? st.left : 0, T = st.top != null ? st.top : 0;
      const R = L + W, B = T + H, cx = L + W / 2, cy = T + H / 2;
      const dir = this._attackDir(bot, gs);
      const ownX = dir > 0 ? L : R, oppX = dir > 0 ? R : L;
      const gb = gs.ball;
      const ball = { x: gb.x, y: gb.y, vx: gb.vx || 0, vy: gb.vy || 0, r: gb.r || W * 0.012 };
      const nz = (p) => ({ raw: p, id: p.id, team: p.team, x: p.x, y: p.y, vx: p.vx || 0, vy: p.vy || 0,
        r: p.r || W * 0.018, isBot: !!p.isBot, frozen: !!p.frozen });

      const me = nz(bot);
      me.isBot = true;
      me.slideCd = bot.slideCooldown || bot.slideCd || 0;
      me.canSlide = bot.canSlide !== false && !(me.slideCd > 0) && !bot.sliding;

      const mates = [], rivals = [], teamBots = [];
      let found = false;
      for (const p of gs.players || []) {
        if (p === bot || (p.id != null && p.id === bot.id)) { teamBots.push(me); found = true; continue; }
        const q = nz(p);
        if (q.team === bot.team) { mates.push(q); if (q.isBot) teamBots.push(q); }
        else if (isPlaying(q.team)) rivals.push(q);
      }
      if (!found) teamBots.unshift(me);

      const own = this._goalSpan(gs, st, dir > 0 ? 'left' : 'right', cy, H);
      const opp = this._goalSpan(gs, st, dir > 0 ? 'right' : 'left', cy, H);
      own.x = ownX; opp.x = oppX;

      const vmax = (mem && mem.vmax) || W * 0.005;
      let pt = gs.activePowerEvent;
      if (pt && typeof pt === 'object') pt = pt.type || pt.name;

      return {
        W, H, L, T, R, B, cx, cy, dir, ownX, oppX, ball, me, mates, rivals, teamBots,
        ownGoal: own, oppGoal: opp, power: pt || null,
        tacticBias: clamp((gs.tactics && gs.tactics[bot.team]) || 0, -0.22, 0.25),
        isRealistic: !!(gs.isRealistic || gs.mode === 'realistic'),
        depth: (x) => (x - ownX) * dir,          // distancia a la línea de fondo propia (+ hacia el rival)
        unDepth: (d) => ownX + d * dir,
        vmax, slowR: clamp(vmax * 12, W * 0.015, W * 0.15), deadzone: W * 0.006, gap: W * 0.012, kickReach: W * 0.010, brakeTicks: 5,
        cutDist: W * 0.055, pressR: W * 0.09, laneR: Math.max(H * 0.03, ball.r * 1.6),
        shootRange: W * 0.30,
        box: { depth: W * 0.16, halfH: H * 0.22, smallDepth: W * 0.07 }
      };
    }

    _attackDir(bot, gs) {
      if (gs.teamDirs && gs.teamDirs[bot.team] != null) return gs.teamDirs[bot.team] >= 0 ? 1 : -1;
      const t = bot.team;
      return (t === 1 || t === 0 || t === 'red' || t === 'left' || t === 'home' || t === 'A' || t === 'a') ? 1 : -1;
    }

    _goalSpan(gs, st, side, cy, H) {
      let top, bottom;
      const g = gs.goals && gs.goals[side];
      if (g && g.top != null) { top = g.top; bottom = g.bottom; }
      else if (gs.goalTop != null && gs.goalBottom != null) { top = gs.goalTop; bottom = gs.goalBottom; }
      else if (st.goalTop != null && st.goalBottom != null) { top = st.goalTop; bottom = st.goalBottom; }
      else { const half = (st.goalHeight != null ? st.goalHeight : H * 0.2) / 2; top = cy - half; bottom = cy + half; }
      return { top, bottom, cy: (top + bottom) / 2, h: bottom - top };
    }

    /**
     * Normaliza gameState.setPiece. Ignora mayúsculas, guiones y espacios.
     *  throw_in : throw_in, throwin, throw, lateral, out
     *  corner   : corner, corner_kick, cornerkick
     *  free_kick: free_kick, freekick, foul
     *  goal_kick: goal_kick, goalkick
     *  kickoff  : kickoff, kick_off
     *  generic  : setPiece con team válido pero type desconocido → saque genérico
     */
    _normSP(sp, gs) {
      if (!sp) return null;
      const obj = typeof sp === 'object';
      const t = String((obj ? (sp.type || sp.kind || sp.name) : sp) || '').toLowerCase().replace(/[^a-z]/g, '');
      let type = null;
      if (/kickoff|saqueinicial|saquedecentro/.test(t)) type = 'kickoff';
      else if (/corner|esquina/.test(t)) type = 'corner';
      else if (/goalkick|saquedearco|saquearco|saquedemeta/.test(t)) type = 'goal_kick';
      else if (/^out$|throw|lateral|^side/.test(t)) type = 'throw_in';
      else if (/free|libre|foul|falta/.test(t)) type = 'free_kick';
      else if (obj && sp.team != null && isPlaying(sp.team)) type = 'generic';
      if (!type) return null;
      const b = gs.ball;
      if (hyp(b.vx || 0, b.vy || 0) > gs.stadium.width * 0.004) return null; // ya se ejecutó
      return { type, team: obj ? sp.team : undefined, executorId: obj ? sp.executorId : undefined, botTake: obj ? !!sp.botTake : false };
    }

    _roleInfo(me, ctx) {
      const tb = ctx.teamBots;
      const idx = tb.indexOf(me);
      const isGK = tb.length > 1 && idx === 0;
      const solo = tb.length === 1;
      const fieldBots = isGK ? tb.slice(1) : tb.slice();
      const fieldIdx = Math.max(0, fieldBots.indexOf(me));
      const roles = fieldBots.length === 2 ? ['DEF', 'FWD'] : ['DEF', 'MID', 'FWD'];
      const role = solo ? 'MID' : roles[fieldIdx % roles.length];
      return { isGK, solo, role, fieldBots, fieldIdx };
    }

    // -------------------------------------------------------------------------
    // Cerebro principal
    // -------------------------------------------------------------------------
    _think(me, gs, ctx, cfg, mem, sp) {
      const info = this._roleInfo(me, ctx);
      let dec;
      if (sp) dec = this._setPieceLogic(me, ctx, cfg, mem, info, sp);
      else if (info.isGK) dec = this._goalkeeper(me, ctx, cfg, mem, info);
      else dec = this._fieldPlayer(me, ctx, cfg, mem, info);
      dec.meta = Object.assign(dec.meta || {}, { ctx, cfg, mem, info });
      return dec;
    }

    // -------------------------------------------------------------------------
    // Primitivas: predicción, steering, perfilado y golpeo
    // -------------------------------------------------------------------------
    _predBall(ctx, ticks) {
      const b = ctx.ball;
      return {
        x: clamp(b.x + b.vx * ticks, ctx.L, ctx.R),
        y: reflect(b.y + b.vy * ticks, ctx.T + b.r, ctx.B - b.r)
      };
    }

    _clampField(ctx, x, y) {
      const m = ctx.H * 0.02;
      return { x: clamp(x, ctx.L + m, ctx.R - m), y: clamp(y, ctx.T + m, ctx.B - m) };
    }

    /**
     * Movimiento hacia un punto. Se recalcula en cada frame.
     *  - arrive:false → carga directa a máxima velocidad (solo se frena dentro de la deadzone).
     *  - arrive:true  → amortiguación suave (arrival): el input se mezcla con (vel. deseada - bot.vx/vy),
     *                   que además cancela la deriva lateral → sin pasarse de largo ni zigzaguear.
     */
    _steer(me, tx, ty, ctx, o) {
      o = o || {};
      const dx = tx - me.x, dy = ty - me.y, d = hyp(dx, dy);
      const dead = o.dead != null ? o.dead : ctx.deadzone;
      const vmax = ctx.vmax, sp = hyp(me.vx, me.vy);
      if (d < dead) {                                           // deadzone: freno proporcional a la velocidad
        if (sp < vmax * 0.05) return { ix: 0, iy: 0, d };
        const k = Math.min(1, 1.2 * sp / vmax) / sp;
        return { ix: -me.vx * k, iy: -me.vy * k, d };
      }
      const ux = dx / d, uy = dy / d;
      if (o.arrive === false) return { ix: ux, iy: uy, d };
      const slowR = o.slowR || ctx.slowR;
      const k = clamp((d - dead) / Math.max(slowR - dead, 1e-6), 0, 1);   // 1 = lejos, 0 = llegando
      const kk = Math.max(k, 0.12);
      const ex = (ux * vmax * kk - me.vx) / vmax, ey = (uy * vmax * kk - me.vy) / vmax;
      let ix = ux * k + ex * (1 - k) * 1.5, iy = uy * k + ey * (1 - k) * 1.5;
      const m = hyp(ix, iy);
      if (m > 1) { ix /= m; iy /= m; }
      return { ix, iy, d };
    }

    _goTo(me, tx, ty, ctx, extraMeta) {
      const p = this._clampField(ctx, tx, ty);
      const s = this._steer(me, p.x, p.y, ctx, { arrive: true });
      return mk(s.ix, s.iy, false, false, Object.assign({ target: p, positional: true }, extraMeta));
    }

    /**
     * Va a disputar/controlar la pelota y la golpea hacia `target`.
     *  - Alineado (detrás de la pelota respecto de la línea de empuje) → carga recta y la conduce en contacto.
     *  - Poco desalineado → va recto al punto de empuje, sin rodeos.
     *  - Del lado equivocado → gira alrededor del radio de contacto (bot.r + ball.r) hasta quedar detrás.
     * opts: { kick:false } conducir sin patear, { soft:true } toque suave, { direct:true } embestir la pelota
     *       (barrida/marca), { kickOk:(dirBot→pelota)=>bool } filtro de seguridad para patear.
     */
    _strike(me, target, ctx, cfg, mem, opts, tag) {
      opts = opts || {};
      const ball = ctx.ball, contact = me.r + ball.r;
      const dBall = hyp(me.x - ball.x, me.y - ball.y);
      const vEff = Math.max(hyp(me.vx, me.vy), ctx.vmax * 0.85);
      const pb = this._predBall(ctx, clamp(dBall / vEff, 0, cfg.predict));   // punto de intercepción

      const ae = opts.aimErr != null ? opts.aimErr : (mem.aimErrCur || 0);
      let dv;
      if (opts.direct) dv = norm(pb.x - me.x, pb.y - me.y);
      else dv = rot(norm(target.x - pb.x, target.y - pb.y), ae);

      const rx = me.x - pb.x, ry = me.y - pb.y, rd = hyp(rx, ry) || 1e-9;
      const along = rx * dv.x + ry * dv.y;
      const perp = -rx * dv.y + ry * dv.x;
      const aligned = !!opts.direct || (along < 0 && Math.abs(perp) < contact * cfg.alignTol);

      let tx, ty, mode;
      if (aligned && opts.hold) {                               // se planta pegado a la pelota, sin tocarla
        const gs = contact + Math.min(ctx.W * 0.002, 3);
        const p = this._clampField(ctx, pb.x - dv.x * gs, pb.y - dv.y * gs);
        tx = p.x; ty = p.y; mode = 'hold';
      } else if (aligned) {
        tx = pb.x + dv.x * contact * 0.5; ty = pb.y + dv.y * contact * 0.5; mode = 'drive';
      } else {
        const gap = contact + ctx.gap * 0.5;
        const behind = this._clampField(ctx, pb.x - dv.x * gap, pb.y - dv.y * gap);
        const ang = Math.acos(clamp(-along / rd, -1, 1));
        const cuts = segDist(pb.x, pb.y, me.x, me.y, behind.x, behind.y).d < contact * 1.05;
        if (ang < 1.75 && !cuts) { tx = behind.x; ty = behind.y; mode = 'behind'; }
        else {                                                  // girar alrededor de la pelota
          const a = Math.atan2(ry, rx), goal = Math.atan2(-dv.y, -dv.x);
          let da = goal - a;
          while (da > Math.PI) da -= 2 * Math.PI;
          while (da < -Math.PI) da += 2 * Math.PI;
          const step = (da >= 0 ? 1 : -1) * Math.min(Math.abs(da), 0.9);
          const R0 = contact + ctx.W * 0.003;
          const R = Math.max(R0, Math.min(rd * 0.85, R0 * 2.2));   // espiral hacia el radio de contacto
          const p = this._clampField(ctx, pb.x + Math.cos(a + step) * R, pb.y + Math.sin(a + step) * R);
          tx = p.x; ty = p.y; mode = 'orbit';
        }
      }

      const s = this._steer(me, tx, ty, ctx, { arrive: mode === 'hold', dead: mode === 'hold' ? 1.5 : ctx.deadzone * 0.5 });
      let ix = s.ix, iy = s.iy;
      if (opts.soft && mode === 'drive' && dBall < contact * 2) { ix *= 0.85; iy *= 0.85; }

      let kick = false;
      if (opts.kick !== false && dBall <= contact + ctx.kickReach) {
        const bd = norm(ball.x - me.x, ball.y - me.y);
        kick = (opts.direct || opts.forceKick) ? true : bd.x * dv.x + bd.y * dv.y >= Math.cos(cfg.kickTol);
        if (kick && opts.kickOk && !opts.kickOk(bd)) kick = false;
      }
      return mk(ix, iy, kick, false, {
        target: { x: tx, y: ty }, driving: mode === 'drive', aligned, mode, tag,
        dv, dBall, contact, along, perp,
        strike: { target, opts }, hasBall: dBall <= contact + ctx.kickReach * 2.5
      });
    }

    _laneClear(ax, ay, bx, by, ctx, rad, skip) {
      const len = hyp(bx - ax, by - ay);
      for (const r of ctx.rivals) {
        const sd = segDist(r.x, r.y, ax, ay, bx, by);
        if (sd.t * len < (skip || 0)) continue;
        if (sd.d < rad + r.r) return false;
      }
      return true;
    }

    _nearestDist(list, pt) {
      let m = 1e9;
      for (const p of list) { const d = hyp(p.x - pt.x, p.y - pt.y); if (d < m) m = d; }
      return m;
    }

    _possessor(ctx) {
      const ball = ctx.ball, extra = ctx.W * 0.025;
      let best = null, bd = 1e9;
      for (const p of [ctx.me].concat(ctx.mates, ctx.rivals)) {
        const d = hyp(p.x - ball.x, p.y - ball.y);
        if (d <= p.r + ball.r + extra && d < bd) { bd = d; best = p; }
      }
      return best;
    }

    _slideAllowed(me, cfg, ctx) {
      return ctx.isRealistic && cfg.slide && me.canSlide;   // me.canSlide = slideCooldown nativo del juego (sin cooldown propio)
    }

    /**
     * Barrida táctica: solo en la propia mitad, contra un rival con pelota que avanza hacia nuestro arco.
     *  easy:   rara vez (tirada baja) y con margen de error en la dirección.
     *  normal: moderada; solo cortes frontales/laterales con la pelota más cerca que el rival.
     *  hard:   quirúrgica anti-faltas: ataca por delante/costado, pelota más cerca que el cuerpo, sin pasar por el rival.
     */
    _slideCheck(me, ctx, cfg, mem, carrier) {
      if (!carrier || carrier.team === me.team || !this._slideAllowed(me, cfg, ctx)) return null;
      const ball = ctx.ball, W = ctx.W, dir = ctx.dir;
      if (ctx.depth(ball.x) > W * 0.58 || ctx.depth(me.x) > W * 0.58) return null;  // solo su mitad (y un poco más allá)
      if (carrier.vx * dir > -W * 0.0008) return null;                            // no avanza hacia nuestro arco
      if (!cfg.slideStrict && !mem.slideRoll) return null;
      const contact = me.r + ball.r;
      const dBall = hyp(me.x - ball.x, me.y - ball.y);
      if (dBall > ctx.cutDist * cfg.slideReach || dBall < contact * 1.05) return null;

      const cs = hyp(carrier.vx, carrier.vy) || 1e-9;
      const f = { x: carrier.vx / cs, y: carrier.vy / cs };                        // hacia dónde mira/avanza el rival
      const rel = norm(me.x - carrier.x, me.y - carrier.y);
      if (rel.x * f.x + rel.y * f.y < cfg.slideFront) return null;                 // nunca desde atrás

      if (cfg.slideBallFirst) {                                                    // llega a la pelota antes que al cuerpo
        const dBody = hyp(me.x - carrier.x, me.y - carrier.y);
        const margin = cfg.slideStrict ? me.r * 0.1 : 0;
        if (!(dBall - ball.r < dBody - carrier.r - margin)) return null;
      }
      const tb = this._predBall(ctx, cfg.slideStrict ? 2 : 0);
      let dv = norm(tb.x - me.x, tb.y - me.y);
      if (cfg.slideErr) dv = rot(dv, (mem.aimErrCur || 0) * cfg.slideErr);
      const og = norm(ctx.ownX - ball.x, ctx.ownGoal.cy - ball.y);
      if (dv.x * og.x + dv.y * og.y >= 0.35) return null;                          // no mandar la pelota a nuestro arco
      if (cfg.slideStrict) {
        if (me.vx * dv.x + me.vy * dv.y < 0) return null;                          // viene cerrando
        if (segDist(carrier.x, carrier.y, me.x, me.y, tb.x, tb.y).d < carrier.r * 0.8) return null;
      }
      return mk(dv.x, dv.y, false, true, { target: tb, tag: 'slide' });
    }

    /** Tiro al arco rival: apunta al palo más alejado del arquero rival si el ángulo está libre. */
    _shotTarget(fx, fy, ctx, mem) {
      const g = ctx.oppGoal;
      let gk = null, bd = 1e9;
      for (const r of ctx.rivals) {
        const d = hyp(r.x - g.x, r.y - g.cy);
        if (d < bd && d < ctx.box.depth * 1.6) { bd = d; gk = r; }
      }
      const inset = Math.max(ctx.ball.r * 1.3, g.h * 0.14);
      const top = g.top + inset, bot = g.bottom - inset;
      const c = [];
      if (gk) {
        const dt = Math.abs(gk.y - top), db = Math.abs(gk.y - bot);
        let pickTop = dt >= db;
        if (mem && mem.shotSide && Math.abs(dt - db) < g.h * 0.2) pickTop = mem.shotSide > 0;   // evita cambiar de palo
        if (mem) mem.shotSide = pickTop ? 1 : -1;
        if (pickTop) c.push(top, bot); else c.push(bot, top);
      }
      else { if (fy > g.cy) c.push(top, bot); else c.push(bot, top); }
      c.push(g.cy);
      const skip = ctx.me.r + ctx.ball.r;
      for (const y of c) if (this._laneClear(fx, fy, g.x, y, ctx, ctx.laneR * 0.75, skip)) return { x: g.x, y };
      return null;
    }

    /** Mejor compañero para pase: línea limpia (distancia punto-segmento), libre de marca y con progreso. */
    _bestPass(me, ctx, cfg, fx, fy, o) {
      o = o || {};
      let best = null, bs = -1e9;
      const fd = ctx.depth(fx);
      const skip = me.r + ctx.ball.r;
      for (const m of ctx.mates) {
        if (m.frozen) continue;
        const free = this._nearestDist(ctx.rivals, m);
        if (free < ctx.W * 0.07) continue;
        let tx = m.x, ty = m.y;
        if (cfg.through && !o.noThrough) {                      // pase al hueco, adelantado
          tx = m.x + m.vx * 10 + ctx.dir * ctx.W * 0.07;
          ty = m.y + m.vy * 10;
        } else if (cfg.precise || cfg.predict > 6) { tx = m.x + m.vx * 5; ty = m.y + m.vy * 5; }
        const p = this._clampField(ctx, tx, ty);
        if (!this._laneClear(fx, fy, p.x, p.y, ctx, ctx.laneR, skip)) {
          if (p.x === m.x && p.y === m.y) continue;
          if (!this._laneClear(fx, fy, m.x, m.y, ctx, ctx.laneR, skip)) continue;
          p.x = m.x; p.y = m.y;
        }
        const prog = ctx.depth(m.x) - fd;
        if (o.minProgress != null && prog < o.minProgress) continue;
        const score = prog + Math.min(free, ctx.W * 0.2) * 0.8 - hyp(m.x - fx, m.y - fy) * 0.2 + (o.prefer != null && m.id === o.prefer ? ctx.W * 0.15 : 0);
        if (score > bs) { bs = score; best = { mate: m, target: p, score }; }
      }
      return best;
    }

    /** Busca un hueco libre cerca de (bx,by), separado de rivales y compañeros. */
    _openSpot(ctx, me, bx, by, spreadY) {
      let best = { x: bx, y: by }, bs = -1e9;
      for (const oy of [-1, -0.5, 0, 0.5, 1]) {
        for (const ox of [-0.06, 0, 0.06]) {
          const p = this._clampField(ctx, bx + ox * ctx.W, by + oy * spreadY);
          let s = Math.min(this._nearestDist(ctx.rivals, p), ctx.W * 0.2);
          const mm = this._nearestDist(ctx.mates, p);
          if (mm < ctx.W * 0.06) s -= (ctx.W * 0.06 - mm) * 2;
          s -= hyp(p.x - bx, p.y - by) * 0.2;
          if (s > bs) { bs = s; best = p; }
        }
      }
      return best;
    }

    // -------------------------------------------------------------------------
    // Jugadores de campo
    // -------------------------------------------------------------------------
    _fieldPlayer(me, ctx, cfg, mem, info) {
      const ball = ctx.ball;
      const poss = this._possessor(ctx);
      const rivalHas = poss && poss.team !== me.team;
      const ourHas = poss && poss.team === me.team;
      const fb = info.fieldBots;

      // Bloque bajo: con sesgo defensivo y la pelota lejos de nuestro arco, los DEF no salen a presionar/buscar
      const lowBlock = ctx.tacticBias < -0.05 && ctx.depth(ball.x) > ctx.W * 0.58 && fb.length > 1;
      const roleAt = (i) => (fb.length === 2 ? (i % 2 ? 'FWD' : 'DEF') : ['DEF', 'MID', 'FWD'][i % 3]);
      const cand = lowBlock ? fb.filter((b, i) => roleAt(i) !== 'DEF') : fb;
      const pool = cand.length ? cand : fb;
      const meHeld = lowBlock && info.role === 'DEF';

      // Quién presiona (más cercano al poseedor rival) / quién busca la pelota
      if (rivalHas) {
        let pr = null, bd = 1e9;
        for (const b of pool) { const d = hyp(b.x - poss.x, b.y - poss.y); if (d < bd) { bd = d; pr = b; } }
        if (pr === me && !meHeld) return this._press(me, ctx, cfg, mem, poss);
      } else {
        const tb = this._predBall(ctx, 6);
        let ch = null, bd = 1e9;
        for (const b of pool) { const d = hyp(b.x - tb.x, b.y - tb.y); if (d < bd) { bd = d; ch = b; } }
        const humanNear = ctx.mates.some((m) => !m.isBot && hyp(m.x - ball.x, m.y - ball.y) < bd * 0.7);
        if (ch === me && !meHeld && !humanNear && (!ourHas || poss === me)) return this._withBall(me, ctx, cfg, mem, info);
      }

      // Sin pelota
      const attacking = ourHas || (!poss && ctx.depth(ball.x) > ctx.W * 0.5);
      const spot = attacking ? this._supportSpot(me, ctx, info) : this._defendSpot(me, ctx, info);
      return this._goTo(me, spot.x, spot.y, ctx, { role: info.role });
    }

    /** Defensa: cierra la línea de tiro entre la pelota y el arco según su rol. */
    _defendSpot(me, ctx, info) {
      const W = ctx.W, H = ctx.H;
      const pb = this._predBall(ctx, 8);
      const bd = Math.max(ctx.depth(pb.x), W * 0.05);
      let d;
      if (info.role === 'DEF') d = W * 0.14 + bd * 0.15;
      else if (info.role === 'MID') d = W * 0.25 + bd * 0.30;
      else d = W * 0.38 + bd * 0.40;
      d += ctx.tacticBias * W * 0.7;
      d = Math.max(W * 0.04, Math.min(d, bd + W * 0.05, W * 0.6));
      const spread = (info.fieldIdx % 2 ? 1 : -1) * H * 0.07 * (info.role === 'MID' ? 1 : 1.4);
      const y = ctx.cy + (pb.y - ctx.cy) * clamp(d / bd, 0, 1) + spread;
      return this._clampField(ctx, ctx.unDepth(d), y);
    }

    /** Ataque sin pelota: se desmarca abriendo la cancha hacia el lado opuesto de la pelota. */
    _supportSpot(me, ctx, info) {
      const W = ctx.W, H = ctx.H;
      const bd = ctx.depth(ctx.ball.x);
      let d;
      if (info.role === 'FWD') d = clamp(Math.max(bd + W * 0.12, W * 0.62), 0, W * 0.86);
      else if (info.role === 'MID') d = clamp(bd + W * 0.05, W * 0.25, W * 0.8);
      else d = clamp(bd - W * 0.22, W * 0.12, W * 0.6);
      d = clamp(d + ctx.tacticBias * W * 0.7, W * 0.08, W * 0.9);
      const side = ctx.ball.y >= ctx.cy ? -1 : 1;
      const by = ctx.cy + side * H * (info.role === 'MID' ? 0.18 : 0.22);
      return this._openSpot(ctx, me, ctx.unDepth(d), by, H * 0.12);
    }

    /** Presión: el más cercano al poseedor rival embiste la pelota (sin rodeos); barrida en Realista. */
    _press(me, ctx, cfg, mem, carrier) {
      const ball = ctx.ball;
      const sl = this._slideCheck(me, ctx, cfg, mem, carrier);
      if (sl) return sl;
      const og = norm(ctx.ownX - ball.x, ctx.ownGoal.cy - ball.y);
      return this._strike(me, { x: ctx.oppX, y: ctx.oppGoal.cy }, ctx, cfg, mem,
        { direct: true, kick: true, kickOk: (b) => b.x * og.x + b.y * og.y < 0.35 }, 'tackle');
    }

    /** Con la pelota: remate, centro, pase/pared, despeje o conducción (decisión con histéresis por dificultad). */
    _withBall(me, ctx, cfg, mem, info) {
      const ball = ctx.ball, W = ctx.W, H = ctx.H, cy = ctx.cy;
      const dGoal = hyp(ball.x - ctx.oppX, ball.y - ctx.oppGoal.cy);
      const bd = ctx.depth(ball.x);
      const rivalD = this._nearestDist(ctx.rivals, ball);
      const pressured = rivalD < ctx.pressR;
      const side = ball.y >= cy ? 1 : -1;

      const A = {
        shot: () => (dGoal < ctx.shootRange * (1 + ctx.tacticBias * 0.9) * cfg.shootMul ? this._shotTarget(ball.x, ball.y, ctx, mem) : null),
        cross: () => (Math.abs(ball.y - cy) > H * 0.30 && Math.abs(ball.x - ctx.oppX) < W * 0.22
          ? { x: ctx.unDepth(W * 0.88), y: cy } : null),
        clear: () => (bd < W * 0.18 && pressured ? { x: ctx.unDepth(W * 0.5), y: cy + side * H * 0.48 } : null),
        pass: () => {
          if (!pressured && !(cfg.smartPass && rivalD < ctx.pressR * 1.8)) return null;
          if (pressured && !mem.passRoll) return null;                       // easy a veces no ve el pase
          const p = this._bestPass(me, ctx, cfg, ball.x, ball.y,
            { minProgress: pressured ? -W * 0.05 : W * 0.12, prefer: mem.passMate });
          if (!p) return null;
          mem.passMate = p.mate.id;
          return p.target;
        },
        wall: () => {
          if (!cfg.wallBounce || !pressured) return null;
          if (Math.min(ball.y - ctx.T, ctx.B - ball.y) >= H * 0.09) return null;
          const wallY = ball.y - ctx.T < ctx.B - ball.y ? ctx.T : ctx.B;
          const py = ball.y + (cy - ball.y) * 0.4;
          return { x: ball.x + ctx.dir * W * 0.30, y: 2 * wallY - py };
        },
        forward: () => (pressured && rivalD < (me.r + ball.r) * 2.2 ? { x: ctx.oppX, y: ctx.oppGoal.cy } : null),
        dribble: () => this._dribbleTarget(ctx)
      };
      const order = ['shot', 'cross', 'clear', 'pass', 'wall', 'forward', 'dribble'];

      let pick = null;
      for (const t of order) { const tg = A[t](); if (tg) { pick = { tag: t, target: tg }; break; } }
      // Compromiso: mantiene la acción elegida durante el tiempo de reacción (salvo que aparezca un remate)
      if (mem.act && mem.act !== 'dribble' && mem.age < mem.actUntil && pick.tag !== 'shot' && mem.act !== pick.tag) {
        const tg = A[mem.act]();
        if (tg) pick = { tag: mem.act, target: tg };
      }
      if (mem.act !== pick.tag) { mem.act = pick.tag; mem.actUntil = mem.age + mem.reactTicks; }

      const o = pick.tag === 'dribble' ? { kick: false, soft: true } : { kick: true };
      return this._strike(me, pick.target, ctx, cfg, mem, o, pick.tag);
    }

    _dribbleTarget(ctx) {
      const ball = ctx.ball;
      const base = Math.atan2(ctx.oppGoal.cy - ball.y, ctx.oppX - ball.x);
      let best = null, bs = -1e9;
      for (const da of [-0.45, 0, 0.45]) {
        const a = base + da;
        const p = this._clampField(ctx, ball.x + Math.cos(a) * ctx.W * 0.14, ball.y + Math.sin(a) * ctx.W * 0.14);
        const s = Math.min(this._nearestDist(ctx.rivals, p), ctx.W * 0.2) - Math.abs(da) * ctx.W * 0.03;
        if (s > bs) { bs = s; best = { x: ball.x + Math.cos(a) * ctx.W * 0.4, y: ball.y + Math.sin(a) * ctx.W * 0.4 }; }
      }
      return best;
    }

    // -------------------------------------------------------------------------
    // Arquero
    // -------------------------------------------------------------------------
    _gkStance(me, ctx) {
      const g = ctx.ownGoal, ball = ctx.ball;
      const lineD = me.r * 1.2 + ctx.W * 0.008;
      const bd = Math.max(ctx.depth(ball.x), lineD + 1);
      const k = clamp((lineD / bd) * 2.2, 0, 1);
      const pad = Math.min(me.r * 0.6, g.h * 0.4);
      const y = clamp(g.cy + (ball.y - g.cy) * k, g.top + pad, g.bottom - pad);
      const s = this._steer(me, ctx.unDepth(lineD), y, ctx, { arrive: true, dead: ctx.deadzone * 0.7 });
      return mk(s.ix, s.iy, false, false, { target: { x: ctx.unDepth(lineD), y }, positional: true, tag: 'gk-hold' });
    }

    _goalkeeper(me, ctx, cfg, mem, info) {
      const ball = ctx.ball, W = ctx.W, H = ctx.H, dir = ctx.dir;
      const g = ctx.ownGoal, box = ctx.box;
      const contact = me.r + ball.r;
      const reach = contact + ctx.kickReach;
      const dBall = hyp(me.x - ball.x, me.y - ball.y);
      const bs = hyp(ball.vx, ball.vy);
      const bd = ctx.depth(ball.x);
      const toward = -ball.vx * dir;                              // velocidad hacia nuestro arco
      const lineD = me.r * 1.2 + W * 0.008;
      const inArea = (p) => ctx.depth(p.x) < box.depth && Math.abs(p.y - g.cy) < box.halfH;

      // 1) Atajar: en CADA frame, mientras la pelota avance hacia el arco, proyecta la intersección con la línea de gol
      if (toward > W * 0.0012 && bd > 0) {
        const t = bd / toward;
        const yLine = reflect(ball.y + ball.vy * t, ctx.T + ball.r, ctx.B - ball.r);
        if (yLine > g.top - ball.r * 2 && yLine < g.bottom + ball.r * 2) {
          const targetY = clamp(yLine, g.top, g.bottom);
          const goalX = ctx.unDepth(me.r * 0.6);                 // sobre la línea de gol (cuerpo apenas adentro)
          const s = this._steer(me, goalX, targetY, ctx, { arrive: false, dead: 1.5 });   // directo, a máxima velocidad
          const kick = dBall <= me.r + ball.r + 12;              // radio de alcance del atajo
          return mk(s.ix, s.iy, kick, false, { target: { x: goalX, y: targetY }, tag: 'save', hasBall: kick });
        }
      }

      // 2) Mano a mano
      let carrier = null;
      for (const r of ctx.rivals) {
        if (hyp(r.x - ball.x, r.y - ball.y) <= r.r + ball.r + W * 0.04 && (inArea(r) || inArea(ball))) { carrier = r; break; }
      }
      if (carrier) {
        const cd = ctx.depth(carrier.x);
        const covered = ctx.mates.some((m) => {
          const md = ctx.depth(m.x);
          return md < cd + contact && segDist(m.x, m.y, carrier.x, carrier.y, ctx.ownX, g.cy).d < H * 0.07;
        });
        if (!covered) return this._gkOneOnOne(me, ctx, cfg, mem, carrier);
      }

      // 3) Pelota suelta en el área o en nuestro poder → distribuir
      const nearestRival = this._nearestDist(ctx.rivals, ball);
      const loose = bs < W * 0.004 || dBall <= reach * 1.5;
      if (inArea(ball) && loose && dBall < nearestRival) return this._gkDistribute(me, ctx, cfg, mem);
      mem.gkHold = -1;
      mem.gkAdv = null;

      // 4) Anticipar centros: pelota en banda cerca de nuestro fondo
      if ((Math.abs(ball.y - ctx.cy) > H * 0.30) && bd < W * 0.30) {
        const y = clamp(g.cy + (ball.y - g.cy) * 0.3, g.top - g.h * 0.2, g.bottom + g.h * 0.2);
        return this._goTo(me, ctx.unDepth(box.smallDepth + me.r), y, ctx, { tag: 'gk-cross' });
      }
      // 5) Línea de arco
      return this._gkStance(me, ctx);
    }

    /**
     * Mano a mano: el arquero SIEMPRE se mantiene sobre la recta pelota → centro del arco.
     *  - Nunca se perfila detrás de la pelota ni rodea al atacante.
     *  - Avanza de a pasos (mem.gkAdv = distancia al centro del arco sobre la recta) para achicar el ángulo, sin pasarse de largo.
     *  - kick: true apenas la pelota entra en su radio de alcance (bot.r + ball.r + 12).
     *  - slide: solo de frente y a quemarropa (dist <= bot.r + ball.r + 18), apuntando al centro de la pelota.
     */
    _gkOneOnOne(me, ctx, cfg, mem, carrier) {
      const ball = ctx.ball, W = ctx.W, g = ctx.ownGoal, box = ctx.box;
      const contact = me.r + ball.r;
      const gx = ctx.ownX, gy = g.cy;
      const dBall = hyp(me.x - ball.x, me.y - ball.y);

      // Recta pelota → centro del arco (con una mínima anticipación de la pelota)
      const pb = this._predBall(ctx, 2);
      const v = norm(gx - pb.x, gy - pb.y);                       // de la pelota hacia el arco
      const D = v.d;                                               // distancia pelota ↔ centro del arco
      const lineD = me.r * 1.2 + W * 0.008;
      const maxKd = Math.max(lineD, D - (contact + ctx.gap));      // nunca más allá de la pelota (sin pasarse de largo)

      // Distancia deseada del arquero al centro del arco: achica el ángulo; a quemarropa se pega a la pelota
      const close = dBall < W * 0.09 || D < box.depth;
      let want = close ? maxKd : Math.min(D * 0.5, maxKd);
      want = clamp(want, lineD, maxKd);

      // Avance paso a paso (retroceder es inmediato)
      const myKd = clamp(hyp(me.x - gx, me.y - gy), lineD, box.depth * 2);
      if (mem.gkAdv == null) mem.gkAdv = myKd;
      const step = Math.max(ctx.vmax * 1.2, W * 0.004);
      mem.gkAdv += clamp(want - mem.gkAdv, -step * 4, step);
      mem.gkAdv = Math.min(mem.gkAdv, maxKd);

      // Punto estrictamente sobre la bisectriz: arco ← keeper ← pelota
      const tp = this._clampField(ctx, gx - v.x * mem.gkAdv, gy - v.y * mem.gkAdv);
      const s = this._steer(me, tp.x, tp.y, ctx, { arrive: true, dead: ctx.deadzone * 0.5 });

      // Patada de atajo apenas la pelota entra en el radio de alcance
      const kick = dBall <= me.r + ball.r + 12;

      // Barrida: solo de frente y a quemarropa, interpuesto en la recta pelota→arco
      let slide = false, ix = s.ix, iy = s.iy;
      if (this._slideAllowed(me, cfg, ctx) && dBall <= contact + 18 && dBall > 1e-6) {
        const bv = norm(gx - ball.x, gy - ball.y);                 // pelota → arco
        const wx = me.x - ball.x, wy = me.y - ball.y;
        const along = wx * bv.x + wy * bv.y;                       // >0: el arquero está entre la pelota y el arco
        const perp = Math.abs(wx * bv.y - wy * bv.x);              // desvío respecto de la recta
        if (along > 0 && perp <= contact * 0.6 && ctx.depth(ball.x) >= ctx.depth(me.x)) {
          const dv = norm(ball.x - me.x, ball.y - me.y);           // directo al centro de la pelota (hacia afuera del arco)
          ix = dv.x; iy = dv.y; slide = true;
        }
      }
      return mk(ix, iy, kick, slide, { target: tp, positional: !kick && !slide, tag: slide ? 'gk-slide' : 'gk-rush', hasBall: kick });
    }

    _gkClearTarget(me, ctx) {
      const ball = ctx.ball, W = ctx.W, H = ctx.H, g = ctx.ownGoal;
      let side = ball.y - g.cy;
      if (Math.abs(side) < 1) side = me.y - g.cy || 1;
      side = side >= 0 ? 1 : -1;                                  // mismo lado: nunca cruza por el centro del área
      return { x: ctx.unDepth(W * 0.38), y: ctx.cy + side * (H * 0.5 - H * 0.03) };
    }

    _gkDistribute(me, ctx, cfg, mem) {
      const ball = ctx.ball, W = ctx.W;
      const pressure = Math.min(this._nearestDist(ctx.rivals, me), this._nearestDist(ctx.rivals, ball)) < W * 0.10;
      const defenders = [], forwards = [];
      for (const m of ctx.mates) (ctx.depth(m.x) < W * 0.45 ? defenders : forwards).push(m);
      const savedMates = ctx.mates;

      // 1) Pase corto a defensor libre
      ctx.mates = defenders;
      const shortP = this._bestPass(me, ctx, cfg, ball.x, ball.y, { noThrough: true });
      if (shortP) { ctx.mates = savedMates; return this._strike(me, shortP.target, ctx, cfg, mem, { kick: true }, 'gk-short'); }
      // 2) Pase largo a mediocampista/delantero libre
      ctx.mates = forwards;
      const longP = this._bestPass(me, ctx, cfg, ball.x, ball.y, {});
      ctx.mates = savedMates;
      if (longP) return this._strike(me, longP.target, ctx, cfg, mem, { kick: true }, 'gk-long');

      // 3) Despeje de emergencia (o espera breve si no hay presión)
      if (mem.gkHold < 0) mem.gkHold = mem.age;
      if (pressure || mem.age - mem.gkHold > 100) {
        return this._strike(me, this._gkClearTarget(me, ctx), ctx, cfg, mem, { kick: true }, 'gk-emergency');
      }
      const dv = norm(this._gkClearTarget(me, ctx).x - ball.x, this._gkClearTarget(me, ctx).y - ball.y);
      return this._goTo(me, ball.x - dv.x * (me.r + ball.r + ctx.gap * 2), ball.y - dv.y * (me.r + ball.r + ctx.gap * 2), ctx, { tag: 'gk-wait' });
    }

    // -------------------------------------------------------------------------
    // Balón parado: lateral, córner, tiro libre, saque de arco
    // -------------------------------------------------------------------------
    _setPieceLogic(me, ctx, cfg, mem, info, sp) {
      const ball = ctx.ball;
      const sig = sp.type + '|' + sp.team + '|' + Math.round(ball.x) + '|' + Math.round(ball.y) + '|' + (sp.botTake ? 1 : 0);
      if (mem.spSig !== sig) {
        mem.spSig = sig; mem.spStart = mem.age;
        mem.spReady = null; mem.spMate = null; mem.spSpot = null;
        mem.spWait = 50 + Math.floor(this.rng() * 16);                       // ~50-65 ticks (≈1 s) de espera
        mem.spAim = (this.rng() * 2 - 1) * cfg.aim * DEG * 0.5;              // error de puntería fijo durante el saque
      }
      const weTake = sp.team === me.team;
      // botTake solo rige en tiro libre / córner (alternancia del Modo Carrera). El lateral lo saca SIEMPRE el más cercano (humano o bot).
      const bt = (sp.type === 'free_kick' || sp.type === 'corner') ? !!sp.botTake : false;

      if (weTake) {
        const team = [me].concat(ctx.mates);
        const nearest = (list) => {
          let best = null, nd = 1e9;
          for (const q of list) { if (q.frozen) continue; const d = hyp(q.x - ball.x, q.y - ball.y); if (d < nd) { nd = d; best = q; } }
          return best;
        };
        let exec = null;
        if (sp.executorId != null) {                                        // ejecutante designado por el juego (humano o bot)
          const c = team.find((p) => p.id === sp.executorId) || null;
          if (c && !(bt && !c.isBot)) exec = c;                             // botTake=true: solo vale si es un bot
        }
        if (!exec && sp.type === 'goal_kick') exec = ctx.teamBots[0];
        if (!exec && sp.type === 'throw_in') exec = nearest(team);          // lateral: el más cercano; si es humano, los bots NO sacan
        if (!exec) {                                                        // el bot más cercano a la pelota
          let bd = 1e9;
          for (const b of ctx.teamBots) { const d = hyp(b.x - ball.x, b.y - ball.y); if (d < bd) { bd = d; exec = b; } }
          if (!sp.botTake) {                                                // "Que lo ejecute otro pateador" (Carrera): sin override humano
            for (const m of ctx.mates) {                                    // un humano claramente encima de la pelota la saca él
              if (m.isBot || m.frozen) continue;
              const d = hyp(m.x - ball.x, m.y - ball.y);
              if (d < bd * 0.6 && d < ctx.W * 0.08) exec = m;
            }
          }
        }
        if (exec === me) return this._spExecute(me, ctx, cfg, mem, sp);
        if (info.isGK) return this._gkStance(me, ctx);
        const supporters = info.fieldBots.filter((b) => b !== exec);
        return this._spSupport(me, ctx, info, sp, supporters, mem);
      }
      if (info.isGK) return this._gkStance(me, ctx);
      return this._spDefend(me, ctx, info, sp);
    }

    _leadPoint(m, ctx, cfg) {
      const lead = cfg.precise ? 8 : (cfg.predict > 6 ? 5 : 0);
      return this._clampField(ctx, m.x + m.vx * lead, m.y + m.vy * lead);
    }

    /** Compañero más libre/desmarcado (línea de pase limpia, progreso y distancia razonable). Siempre devuelve alguno si existe. */
    _spMateTarget(me, ctx, cfg, mem, sp, pool) {
      const ball = ctx.ball, W = ctx.W;
      const progW = sp.type === 'kickoff' ? 0.05 : 0.25;
      let best = null, bs = -1e9;
      for (const m of (pool || ctx.mates)) {
        if (m.frozen) continue;
        const free = Math.min(this._nearestDist(ctx.rivals, m), W * 0.22);
        const lane = this._laneClear(ball.x, ball.y, m.x, m.y, ctx, ctx.laneR, me.r + ball.r) ? W * 0.10 : 0;
        const prog = clamp(ctx.depth(m.x) - ctx.depth(ball.x), -W * 0.3, W * 0.3) * progW;
        const d = hyp(m.x - ball.x, m.y - ball.y);
        const sc = free + lane + prog - Math.abs(d - W * 0.2) * 0.3 + (mem.spMate === m.id ? W * 0.1 : 0);
        if (sc > bs) { bs = sc; best = m; }
      }
      if (!best) return null;
      mem.spMate = best.id;
      return this._leadPoint(best, ctx, cfg);
    }

    /** Córner: mejor compañero dentro/borde del área rival; si todos están marcados, centro del área rival. */
    _spCornerTarget(me, ctx, cfg, mem, sp) {
      const ball = ctx.ball, W = ctx.W, H = ctx.H;
      const center = { x: ctx.unDepth(W * 0.90), y: ctx.cy };
      const inBox = ctx.mates.filter((m) => !m.frozen && ctx.depth(m.x) > W * 0.78 && Math.abs(m.y - ctx.cy) < H * 0.32);
      if (inBox.length) {
        let best = null, bs = -1e9, bf = 0;
        for (const m of inBox) {
          const free = Math.min(this._nearestDist(ctx.rivals, m), W * 0.22);
          const lane = this._laneClear(ball.x, ball.y, m.x, m.y, ctx, ctx.laneR, me.r + ball.r) ? W * 0.06 : 0;
          const sc = free + lane - hyp(m.x - center.x, m.y - center.y) * 0.1 + (mem.spMate === m.id ? W * 0.1 : 0);
          if (sc > bs) { bs = sc; best = m; bf = free; }
        }
        if (best && bf >= W * 0.04) { mem.spMate = best.id; return this._leadPoint(best, ctx, cfg); }
        return center;                                                      // todos marcados
      }
      return this._spMateTarget(me, ctx, cfg, mem, sp) || center;
    }

    _spTarget(me, ctx, cfg, mem, sp) {
      const ball = ctx.ball, W = ctx.W;
      const dGoal = hyp(ball.x - ctx.oppX, ball.y - ctx.oppGoal.cy);
      let t = null;
      if (sp.type === 'corner') t = this._spCornerTarget(me, ctx, cfg, mem, sp);
      else {
        if (sp.type === 'free_kick' && dGoal < ctx.shootRange * 0.9) t = this._shotTarget(ball.x, ball.y, ctx, mem);
        if (!t && sp.type === 'goal_kick') { const p = this._bestPass(me, ctx, cfg, ball.x, ball.y, {}); if (p) t = p.target; }
        if (!t) {
          const ln = this._spLineN(ctx, ball);
          let pool;
          if (ln) pool = ctx.mates.filter((m) => this._spInOk(norm(m.x - ball.x, m.y - ball.y), ln, 0.3));   // solo hacia adentro de la cancha
          t = this._spMateTarget(me, ctx, cfg, mem, sp, pool && pool.length ? pool : undefined);
        }
      }
      if (!t) {                                                             // sin compañeros: avanza hacia el medio
        const d = clamp(ctx.depth(ball.x) + W * 0.3, W * 0.3, W * 0.9);
        t = { x: ctx.unDepth(d), y: ctx.cy + (ball.y - ctx.cy) * 0.4 };
      }
      return t;
    }

    /** Pelota pegada a una línea: no se puede golpear "desde atrás" → apunta al rebote en la pared (decisión fija, sin parpadeo). */
    _spMirror(tg, ctx, ball) {
      const t = { x: tg.x, y: tg.y }, m = ctx.H * 0.02 + 8;
      if (ball.x - ctx.L < m) t.x = 2 * ctx.L - t.x; else if (ctx.R - ball.x < m) t.x = 2 * ctx.R - t.x;
      if (ball.y - ctx.T < m) t.y = 2 * ctx.T - t.y; else if (ctx.B - ball.y < m) t.y = 2 * ctx.B - t.y;
      return t;
    }

    /** Si la pelota está pegada a una banda/línea de fondo (lateral, córner), devuelve la normal hacia el interior de la cancha. */
    _spLineN(ctx, ball) {
      const m = ctx.H * 0.02 + 8;
      const nx = ball.x - ctx.L < m ? 1 : ctx.R - ball.x < m ? -1 : 0;
      const ny = ball.y - ctx.T < m ? 1 : ctx.B - ball.y < m ? -1 : 0;
      return nx || ny ? { nx, ny } : null;
    }

    /** ¿La dirección v apunta hacia el interior de la cancha (todas las componentes de la normal con al menos `min`)? */
    _spInOk(v, ln, min) {
      if (!ln) return true;
      min = min != null ? min : 0.2;
      return (!ln.nx || v.x * ln.nx >= min) && (!ln.ny || v.y * ln.ny >= min);
    }

    /** Fuerza que la dirección de saque tenga componente hacia adentro (nunca hacia el borde exterior ni rebotando en la pared). */
    _spInDir(v, ln) {
      if (!ln) return v;
      const mn = ln.nx && ln.ny ? 0.4 : 0.5;
      let x = v.x, y = v.y;
      if (ln.nx && x * ln.nx < mn) x = ln.nx * mn;
      if (ln.ny && y * ln.ny < mn) y = ln.ny * mn;
      const n = norm(x, y);
      return { x: n.x, y: n.y };
    }

    /**
     * Saque sobre la línea (lateral / córner): el ejecutante se coloca POR FUERA de la banda o la esquina, detrás de la pelota
     * y mirando hacia el interior (sin _clampField), espera ~1 s y patea hacia un compañero desmarcado o el centro del área rival.
     * El juego le permite pisar esa zona exterior al equipo que saca (spFree).
     */
    _spExecuteOnLine(me, ctx, cfg, mem, sp, ln) {
      const ball = ctx.ball, W = ctx.W;
      const contact = me.r + ball.r;
      const dBall = hyp(me.x - ball.x, me.y - ball.y);
      const elapsed = mem.age - mem.spStart;
      const force = elapsed > 180;                                          // anti-atasco: sin espera ni error de puntería

      let tg;
      if (force) {
        let near = null, nd = 1e9;
        for (const m of ctx.mates) {
          if (m.frozen) continue;
          const d = hyp(m.x - ball.x, m.y - ball.y);
          if (d < nd && this._spInOk(norm(m.x - ball.x, m.y - ball.y), ln, 0.3)) { nd = d; near = m; }
        }
        tg = near ? { x: near.x, y: near.y } : { x: ctx.unDepth(W * 0.9), y: ctx.cy };
      } else tg = this._spTarget(me, ctx, cfg, mem, sp);

      let dv = norm(tg.x - ball.x, tg.y - ball.y);
      if (!force) dv = rot(dv, mem.spAim);                                   // error fijo durante todo el saque
      dv = this._spInDir(dv, ln);                                           // siempre hacia adentro

      // Punto de saque: detrás de la pelota respecto de la dirección de pase (queda fuera de la línea), sin clamp a la cancha
      const gs = contact + Math.min(W * 0.002, 3);
      const spot = { x: ball.x - dv.x * gs, y: ball.y - dv.y * gs };
      let tx = spot.x, ty = spot.y;
      const rx = me.x - ball.x, ry = me.y - ball.y;
      const along = rx * dv.x + ry * dv.y;
      if (along > -contact * 0.3 && segDist(ball.x, ball.y, me.x, me.y, spot.x, spot.y).d < contact * 1.3) {
        // rodea la pelota para llegar al punto exterior sin pasar por encima
        const px = -dv.y, py = dv.x, sg = rx * px + ry * py >= 0 ? 1 : -1;
        tx = ball.x + px * sg * contact * 2.2 - dv.x * contact * 0.7;
        ty = ball.y + py * sg * contact * 2.2 - dv.y * contact * 0.7;
      }
      const s = this._steer(me, tx, ty, ctx, { arrive: true, dead: 1.5 });

      const bd = norm(ball.x - me.x, ball.y - me.y);
      const inRange = dBall <= contact + 5;
      const aimed = bd.x * dv.x + bd.y * dv.y >= Math.cos(Math.max(cfg.kickTol, 0.2)) && this._spInOk(bd, ln, 0.2);
      const still = hyp(me.vx, me.vy) < ctx.vmax * 0.3;
      if (inRange && aimed && still) { if (mem.spReady == null) mem.spReady = mem.age; }
      else if (dBall > contact + 12) mem.spReady = null;
      let kick = false;
      if (inRange && aimed && mem.spReady != null && (force || mem.age - mem.spReady >= mem.spWait)) kick = true;
      return mk(s.ix, s.iy, kick, false, {
        target: { x: tx, y: ty }, tag: force ? 'sp-force' : 'sp-approach', dv, dBall, contact,
        hasBall: dBall <= contact + ctx.kickReach * 2.5
      });
    }

    /**
     * Ejecutante: va directo a la pelota hasta quedar en contacto (dist <= r + ball.r + 5), se frena, espera ~50-65 ticks,
     * apunta al compañero más libre y patea. Fail-safe: a los 180 ticks fuerza kick:true hacia el compañero más cercano.
     */
    _spExecute(me, ctx, cfg, mem, sp) {
      const ball = ctx.ball, W = ctx.W;
      const contact = me.r + ball.r;
      const dBall = hyp(me.x - ball.x, me.y - ball.y);
      const elapsed = mem.age - mem.spStart;

      const ln = this._spLineN(ctx, ball);                                  // lateral / córner: sacar desde fuera de la línea, hacia adentro
      if (ln) return this._spExecuteOnLine(me, ctx, cfg, mem, sp, ln);

      if (elapsed > 180) {                                                  // anti-atasco
        let near = null, nd = 1e9;
        for (const m of ctx.mates) { if (m.frozen) continue; const d = hyp(m.x - ball.x, m.y - ball.y); if (d < nd) { nd = d; near = m; } }
        const tg = near ? { x: near.x, y: near.y } : { x: ctx.unDepth(W * 0.5), y: ctx.cy };
        const r = this._strike(me, this._spMirror(tg, ctx, ball), ctx, cfg, mem, { kick: true, forceKick: true, aimErr: 0 }, 'sp-force');
        r.kick = true;
        return r;
      }

      const target = this._spMirror(this._spTarget(me, ctx, cfg, mem, sp), ctx, ball);
      const r = this._strike(me, target, ctx, cfg, mem, { hold: true, kick: false, aimErr: mem.spAim }, 'sp-approach');
      const dv = r.meta.dv, bd = norm(ball.x - me.x, ball.y - me.y);
      const inRange = dBall <= contact + 5;
      const aimed = bd.x * dv.x + bd.y * dv.y >= Math.cos(Math.max(cfg.kickTol, 0.2));
      const still = hyp(me.vx, me.vy) < ctx.vmax * 0.3;
      if (inRange && aimed && still) { if (mem.spReady == null) mem.spReady = mem.age; }
      else if (dBall > contact + 12) mem.spReady = null;
      if (inRange && aimed && mem.spReady != null && mem.age - mem.spReady >= mem.spWait) r.kick = true;
      return r;
    }

    /** Laterales (y saque genérico): punto a 0.12–0.28·W de la pelota, separado de marcadores, con línea de pase limpia. */
    _spRingSpot(me, ctx, mem, k) {
      if (mem.spSpot && mem.age < mem.spSpotUntil) return mem.spSpot;
      const W = ctx.W, ball = ctx.ball;
      const inward = Math.atan2(ctx.cy - ball.y, (ctx.cx - ball.x) * 0.6 + ctx.dir * W * 0.1);
      const bias = [-0.6, 0.6, 0][k % 3];
      let best = null, bs = -1e9;
      for (const r of [0.12, 0.16, 0.20, 0.24, 0.28]) {
        for (const da of [-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2]) {
          const a = inward + da;
          const p = this._clampField(ctx, ball.x + Math.cos(a) * r * W, ball.y + Math.sin(a) * r * W);
          const d = hyp(p.x - ball.x, p.y - ball.y);
          if (d < W * 0.12 || d > W * 0.28) continue;
          const free = Math.min(this._nearestDist(ctx.rivals, p), W * 0.2);
          const lane = this._laneClear(ball.x, ball.y, p.x, p.y, ctx, ctx.laneR, 0) ? W * 0.10 : -W * 0.10;
          const mm = this._nearestDist(ctx.mates, p);
          const pen = mm < W * 0.08 ? (W * 0.08 - mm) * 2 : 0;
          const prog = (ctx.depth(p.x) - ctx.depth(ball.x)) * 0.15;
          const sc = free + lane + prog - pen - Math.abs(da - bias) * W * 0.03;
          if (sc > bs) { bs = sc; best = p; }
        }
      }
      if (!best) best = this._clampField(ctx, ball.x + Math.cos(inward) * W * 0.2, ball.y + Math.sin(inward) * W * 0.2);
      mem.spSpot = best; mem.spSpotUntil = mem.age + mem.reactTicks * 3;
      return best;
    }

    /** Córner: 2–3 compañeros entran escalonados (punto penal, segundo palo, primer palo). */
    _spCornerSlot(me, ctx, k) {
      const W = ctx.W, ball = ctx.ball, g = ctx.oppGoal;
      const nearTop = Math.abs(ball.y - g.top) <= Math.abs(ball.y - g.bottom);
      const nearY = nearTop ? g.top : g.bottom, farY = nearTop ? g.bottom : g.top;
      const inset = me.r * 0.8, sgn = nearTop ? 1 : -1;
      const slots = [
        { x: ctx.unDepth(W * 0.86), y: ctx.cy },                 // punto penal
        { x: ctx.unDepth(W * 0.90), y: farY - sgn * inset },     // segundo palo
        { x: ctx.unDepth(W * 0.90), y: nearY + sgn * inset }     // primer palo
      ];
      return slots[k];
    }

    _spSupport(me, ctx, info, sp, supporters, mem) {
      const W = ctx.W, H = ctx.H, ball = ctx.ball;
      const k = Math.max(0, supporters.indexOf(me));
      if (sp.type === 'corner') {
        if (k < 3) { const s = this._spCornerSlot(me, ctx, k); return this._goTo(me, s.x, s.y, ctx, { tag: 'sp-box' }); }
        return this._goTo(me, ctx.unDepth(W * 0.70), ctx.cy + (ball.y > ctx.cy ? -1 : 1) * H * 0.12, ctx, { tag: 'sp-edge' });
      }
      if (sp.type === 'throw_in' || sp.type === 'generic') {
        const p = this._spRingSpot(me, ctx, mem, k);
        return this._goTo(me, p.x, p.y, ctx, { tag: 'sp-open' });
      }
      if (sp.type === 'kickoff') {                               // se mantienen en su mitad
        const side = k % 2 ? 1 : -1;
        const p = this._openSpot(ctx, me, ctx.unDepth(W * (0.30 + 0.06 * k)), ctx.cy + side * H * 0.16, H * 0.06);
        return this._goTo(me, p.x, p.y, ctx, { tag: 'sp-kickoff' });
      }
      const nearRivalGoal = hyp(ball.x - ctx.oppX, ball.y - ctx.oppGoal.cy) < W * 0.35;
      const ys = [-0.10, 0.10, 0, -0.2, 0.2];
      if (sp.type === 'free_kick' && nearRivalGoal) {
        if (info.role === 'MID' || info.solo) return this._goTo(me, ctx.unDepth(W * 0.70), ctx.cy + (ball.y > ctx.cy ? -1 : 1) * H * 0.12, ctx, { tag: 'sp-edge' });
        if (info.role === 'DEF') return this._goTo(me, ctx.unDepth(W * 0.55), ctx.cy, ctx, { tag: 'sp-back' });
        const p = this._openSpot(ctx, me, ctx.unDepth(W * 0.88), ctx.cy + ys[info.fieldIdx % ys.length] * H, H * 0.04);
        return this._goTo(me, p.x, p.y, ctx, { tag: 'sp-box' });
      }
      if (sp.type === 'goal_kick') {
        const side = info.fieldIdx % 2 ? 1 : -1;
        const p = this._openSpot(ctx, me, ctx.unDepth(W * (0.28 + 0.12 * info.fieldIdx)), ctx.cy + side * H * 0.30, H * 0.1);
        return this._goTo(me, p.x, p.y, ctx, { tag: 'sp-wide' });
      }
      const side = info.fieldIdx % 2 ? 1 : -1;
      const base = { x: ball.x + ctx.dir * W * (0.14 + 0.06 * info.fieldIdx), y: ball.y + (ctx.cy - ball.y) * 0.5 + side * H * 0.12 };
      const p = this._openSpot(ctx, me, base.x, base.y, H * 0.12);
      return this._goTo(me, p.x, p.y, ctx, { tag: 'sp-open' });
    }

    _spDefend(me, ctx, info, sp) {
      const W = ctx.W, H = ctx.H, ball = ctx.ball, g = ctx.ownGoal;
      const dBallGoal = hyp(ball.x - ctx.ownX, ball.y - g.cy);
      const keepAway = (x, y) => {                                // respeta distancia mínima a la pelota
        const d = hyp(x - ball.x, y - ball.y), min = W * 0.10;
        if (d >= min) return { x, y };
        const v = norm(x - ball.x, y - ball.y);
        return { x: ball.x + v.x * min, y: ball.y + v.y * min };
      };

      if (sp.type === 'free_kick' && dBallGoal < W * 0.35) {      // barrera de 1 o 2
        const n = dBallGoal < W * 0.25 ? 2 : 1;
        const sorted = info.fieldBots.slice().sort((a, b) => hyp(a.x - ball.x, a.y - ball.y) - hyp(b.x - ball.x, b.y - ball.y));
        const k = sorted.slice(0, n).indexOf(me);
        if (k >= 0) {
          const dv = norm(ctx.ownX - ball.x, g.cy - ball.y);
          const nx = -dv.y, ny = dv.x, off = n === 2 ? (k === 0 ? -1 : 1) * H * 0.03 : 0;
          const d = W * 0.105;
          return this._goTo(me, ball.x + dv.x * d + nx * off, ball.y + dv.y * d + ny * off, ctx, { tag: 'barrier' });
        }
      }
      // Marca: se ubica del lado del arco respecto al rival libre más cercano
      let tgt = null, bd = 1e9;
      for (const r of ctx.rivals) {
        if (hyp(r.x - ball.x, r.y - ball.y) < W * 0.04) continue; // el ejecutante
        const d = hyp(r.x - me.x, r.y - me.y);
        if (d < bd) { bd = d; tgt = r; }
      }
      if (tgt) {
        const v = norm(ctx.ownX - tgt.x, g.cy - tgt.y);
        const p = keepAway(tgt.x + v.x * W * 0.03, tgt.y + v.y * W * 0.03);
        return this._goTo(me, p.x, p.y, ctx, { tag: 'mark' });
      }
      const p = keepAway(ctx.unDepth(W * 0.2), ctx.cy);
      return this._goTo(me, p.x, p.y, ctx, { tag: 'sp-def' });
    }

    // =========================================================================
    // Modo Superpoderes
    // =========================================================================
    /**
     * Adapta la decisión al evento global activo (gameState.activePowerEvent).
     * Devuelve siempre { ix, iy, kick, slide } (sin metadatos).
     */
    handleSuperpowers(bot, gameState, decision) {
      const ZERO = { ix: 0, iy: 0, kick: false, slide: false };
      if (bot && bot.frozen) return ZERO;
      const out = { ix: decision.ix || 0, iy: decision.iy || 0, kick: !!decision.kick, slide: !!decision.slide };
      const meta = decision.meta || {};
      const ctx = meta.ctx;
      let ev = gameState && gameState.activePowerEvent;
      const evObj = ev && typeof ev === 'object' ? ev : null;
      if (evObj) ev = evObj.type || evObj.name;
      if (!ev || !ctx) return out;

      const me = ctx.me, ball = ctx.ball, W = ctx.W;
      const cfg = meta.cfg, mem = meta.mem;
      const sp = hyp(me.vx, me.vy);
      const finish = (o) => { const m = hyp(o.ix, o.iy); if (m > 1) { o.ix /= m; o.iy /= m; } return o; };

      switch (ev) {
        case 'ice': {                                             // frena con mucha anticipación e impulsos suaves
          if (meta.target && !meta.driving) {
            const d = hyp(meta.target.x - me.x, meta.target.y - me.y);
            const dv = norm(meta.target.x - me.x, meta.target.y - me.y);
            const along = me.vx * dv.x + me.vy * dv.y;
            const stop = Math.max(along, 0) * 22;                 // ctx.brakeTicks base = 5
            if (sp > 0.02 && along > 0 && stop > d) { out.ix = (-me.vx / sp) * 0.9; out.iy = (-me.vy / sp) * 0.9; }
            else { const k = clamp(d / (W * 0.12), 0.3, 1); out.ix *= k; out.iy *= k; }
          } else if (meta.driving) { out.ix *= 0.75; out.iy *= 0.75; }
          out.slide = false;                                      // deslizarse sobre hielo es impredecible
          return finish(out);
        }
        case 'giant_ball': {                                      // contacto según ball.r real
          if (meta.strike && !decision.kick && hyp(me.x - ball.x, me.y - ball.y) < (me.r + ball.r) * 1.7) {
            const ctx2 = Object.assign({}, ctx, { gap: ctx.gap + ball.r * 0.7 });
            const r = this._strike(me, meta.strike.target, ctx2, cfg, mem, meta.strike.opts, 'giant');
            return finish({ ix: r.ix, iy: r.iy, kick: r.kick, slide: out.slide });
          }
          return finish(out);
        }
        case 'big_goals':
        case 'fire_ball': {                                       // tiros desde mitad de cancha
          const far = ctx.shootRange * 1.7;
          const dGoal = hyp(ball.x - ctx.oppX, ball.y - ctx.oppGoal.cy);
          if (meta.hasBall && !decision.kick && !(meta.tag && String(meta.tag).indexOf('sp-') === 0) && dGoal < far && dGoal >= ctx.shootRange * 0.9 && this._bearsToward(ctx)) {
            const shot = this._shotTarget(ball.x, ball.y, ctx);
            if (shot) {
              const r = this._strike(me, shot, ctx, cfg, mem, { kick: true }, 'long-shot');
              return finish({ ix: r.ix, iy: r.iy, kick: r.kick, slide: false });
            }
          }
          return finish(out);
        }
        case 'magnet': {
          const mid = (evObj && (evObj.magnetId != null ? evObj.magnetId : evObj.playerId)) != null
            ? (evObj.magnetId != null ? evObj.magnetId : evObj.playerId)
            : (gameState.magnetId != null ? gameState.magnetId : gameState.magnetPlayerId);
          if (mid == null) return finish(out);
          if (mid === me.id) {                                    // soy el imán: directo al área rival
            const s = this._steer(me, ctx.oppX - ctx.dir * W * 0.06, ctx.oppGoal.cy, ctx, { arrive: false, dead: 1 });
            const shotOk = meta.tag === 'shot';
            return finish({ ix: s.ix, iy: s.iy, kick: shotOk ? out.kick : false, slide: false });
          }
          const mg = ctx.rivals.find((r) => r.id === mid);
          if (mg) {                                               // un rival es el imán: distancia o despeje rápido
            const dm = hyp(me.x - mg.x, me.y - mg.y);
            if (meta.hasBall && dm < W * 0.20) {
              const away = norm(ball.x - mg.x, ball.y - mg.y);
              const t = this._clampField(ctx, ball.x + away.x * W * 0.4 + ctx.dir * W * 0.2, ball.y + away.y * W * 0.4);
              const r = this._strike(me, t, ctx, cfg, mem, { kick: true }, 'magnet-clear');
              return finish({ ix: r.ix, iy: r.iy, kick: r.kick, slide: false });
            }
            if (dm < W * 0.14) {
              const away = norm(me.x - mg.x, me.y - mg.y);
              out.ix = away.x * 0.8 + out.ix * 0.4; out.iy = away.y * 0.8 + out.iy * 0.4;
            }
          }
          return finish(out);
        }
        case 'tag': {                                             // evita tocar pelota veloz sin ventaja clara
          const bs = hyp(ball.vx, ball.vy);
          if (bs > W * 0.008) {
            const dBall = hyp(me.x - ball.x, me.y - ball.y);
            const shotClear = hyp(ball.x - ctx.oppX, ball.y - ctx.oppGoal.cy) < ctx.shootRange && !!this._shotTarget(ball.x, ball.y, ctx);
            const free = this._nearestDist(ctx.rivals, me) > ctx.pressR * 1.5;
            const advantage = shotClear || (free && ctx.depth(ball.x) > W * 0.5);
            const approaching = ((me.x - ball.x) * ball.vx + (me.y - ball.y) * ball.vy) > 0;
            if (!advantage && approaching) {
              if (dBall <= me.r + ball.r + ctx.kickReach * 2) {   // despeje a un toque
                const side = ball.y >= ctx.cy ? 1 : -1;
                const r = this._strike(me, { x: ctx.unDepth(W * 0.6), y: ctx.cy + side * ctx.H * 0.48 }, ctx, cfg, mem, { kick: true }, 'tag-clear');
                return finish({ ix: r.ix, iy: r.iy, kick: true, slide: false });
              }
              const vv = norm(ball.vx, ball.vy);                  // si no, se hace a un lado de la trayectoria
              const side = (me.x - ball.x) * -vv.y + (me.y - ball.y) * vv.x >= 0 ? 1 : -1;
              out.ix = -vv.y * side; out.iy = vv.x * side; out.kick = false; out.slide = false;
            }
          }
          return finish(out);
        }
        default:
          return finish(out);
      }
    }

    /** ¿El bot está del lado correcto de la pelota para rematar hacia el arco rival? */
    _bearsToward(ctx) {
      const me = ctx.me, ball = ctx.ball;
      return ctx.depth(me.x) <= ctx.depth(ball.x) + ctx.ball.r;
    }
  }

  global.BotAIController = BotAIController;
  if (typeof module !== 'undefined' && module.exports) module.exports = BotAIController;
})(typeof window !== 'undefined' ? window : globalThis);
