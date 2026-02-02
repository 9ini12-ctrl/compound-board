import { getStore } from "@netlify/blobs";

export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const store = getStore("presence");
  let payload = {};
  try { payload = await request.json(); } catch (e) {}
  const sid = String(payload?.sid || "").slice(0, 80);
  if (!sid) return new Response(JSON.stringify({ ok: false }), { status: 400, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }});
  const now = Date.now();
  await store.set(`s/${sid}.json`, JSON.stringify({ sid, t: now }), { metadata: { t: String(now) } });
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }});
};
