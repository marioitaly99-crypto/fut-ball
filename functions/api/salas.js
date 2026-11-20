export async function onRequestGet({ env }) {
  try {
    const list = await env.SALAS_KV.list({ prefix: 'sala:' });
    const salas = [];

    for (const key of list.keys) {
      const data = await env.SALAS_KV.get(key.name, 'json');
      if (data) salas.push(data);
    }

    return new Response(JSON.stringify(salas), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    if (!body.peerId) {
      return new Response('Falta peerId', { status: 400 });
    }

    await env.SALAS_KV.put(`sala:${body.peerId}`, JSON.stringify(body), {
      expirationTtl: 60
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestDelete({ request, env }) {
  try {
    const { peerId } = await request.json();
    if (peerId) {
      await env.SALAS_KV.delete(`sala:${peerId}`);
    }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
