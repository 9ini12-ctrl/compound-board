import { getStore } from "@netlify/blobs";

export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const payload = await request.json();
  const store = getStore("compounds");

  // Read current for conflict detection
  const raw = await store.get("data.json", { type: "text" });
  let current = null;
  try { current = raw ? JSON.parse(raw) : null; } catch(e) { current = null; }

  const curRev = current?.meta?.rev || "init";
  const baseRev = payload?.meta?.base_rev || payload?.meta?.rev || null;

  // If mismatch and current exists, return conflict
  if (current && baseRev && baseRev !== curRev) {
    return new Response(JSON.stringify({ ok:false, conflict:true, current }), {
      status: 409,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  // Stamp new revision
  const newRev = "srv_" + Date.now();
  payload.meta = payload.meta || {};
  payload.meta.schema = payload.meta.schema || 2;
  payload.meta.rev = newRev;
  payload.meta.updated_at = Date.now();
  // keep base_rev same as new for clients
  payload.meta.base_rev = newRev;

  await store.set("data.json", JSON.stringify(payload), {
    metadata: { updated_at: String(payload?.meta?.updated_at || Date.now()) }
  });

  return new Response(JSON.stringify({ ok:true, rev:newRev, updated_at: payload.meta.updated_at }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
};
