// functions/api/salas.js — Cloudflare Pages Function
// Todas las salas vigentes viven en UNA sola clave KV ("salas_activas").
// Requiere un binding KV llamado SALAS_KV (Settings → Functions → KV namespace bindings).
// Una sala se considera inactiva si no recibe heartbeat (POST) en más de 35 s.

const KEY = "salas_activas";
const TTL_MS = 35000;
const MAX_ROOMS = 200;
const ID_RE = /^[\w-]{1,64}$/;
const JSON_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store" };

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });

// 1 lectura KV: devuelve solo las salas vigentes.
async function load(kv) {
  let list = null;
  try { list = await kv.get(KEY, "json"); } catch (e) { list = null; }
  const now = Date.now();
  return (Array.isArray(list) ? list : []).filter(
    (r) => r && typeof r.peerId === "string" && now - (+r.ts || 0) <= TTL_MS
  );
}

// 1 escritura KV. expirationTtl (mín. 60 s) limpia la clave sola si nadie publica.
const save = (kv, list) =>
  kv.put(KEY, JSON.stringify(list), { expirationTtl: 60 });

const publicView = ({ ts, ...r }) => r; // no se expone el timestamp interno

// GET /api/salas → lista de salas vigentes (solo lectura, no escribe en KV)
export async function onRequestGet({ env }) {
  const rooms = await load(env.SALAS_KV);
  return json(rooms.map(publicView));
}

// POST /api/salas → alta o heartbeat de una sala (el host, cada 15 s)
export async function onRequestPost({ request, env }) {
  let b;
  try { b = await request.json(); } catch (e) { return json({ error: "JSON inválido" }, 400); }
  if (!b || typeof b.peerId !== "string" || !ID_RE.test(b.peerId))
    return json({ error: "peerId inválido" }, 400);

  const room = {
    peerId: b.peerId,
    name: String(b.name || "Sala").slice(0, 40),
    owner: String(b.owner || "?").slice(0, 24),
    flag: String(b.flag || "🌐").slice(0, 16),
    ping: Math.max(0, Math.min(9999, +b.ping || 0)),
    n: Math.max(0, Math.min(99, +b.n || 0)),
    max: Math.max(1, Math.min(99, +b.max || 12)),
    priv: !!b.priv,
    code: b.peerId,
    ts: Date.now(),
  };

  const rooms = (await load(env.SALAS_KV)).filter((r) => r.peerId !== room.peerId);
  rooms.push(room);
  await save(env.SALAS_KV, rooms.slice(-MAX_ROOMS));
  return json({ ok: true });
}

// DELETE /api/salas → el host cierra la sala
export async function onRequestDelete({ request, env }) {
  let b = null;
  try { b = await request.json(); } catch (e) { /* sin cuerpo */ }
  const id = b && typeof b.peerId === "string" ? b.peerId : "";
  if (!ID_RE.test(id)) return json({ error: "peerId inválido" }, 400);

  const rooms = await load(env.SALAS_KV);
  const left = rooms.filter((r) => r.peerId !== id);
  if (left.length !== rooms.length) await save(env.SALAS_KV, left);
  return json({ ok: true });
}
