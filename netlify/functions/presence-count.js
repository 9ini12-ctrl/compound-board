import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("presence");
  const now = Date.now();
  const TTL = 120000; // 2 minutes
  let count = 0;
  const list = await store.list({ prefix: "s/" });
  for (const it of (list?.blobs || [])) {
    const metaT = Number(it?.metadata?.t || 0);
    const age = now - metaT;
    if (metaT && age >= 0 && age <= TTL) count++;
  }
  return new Response(JSON.stringify({ count }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
};
