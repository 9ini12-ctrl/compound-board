import { getStore } from "@netlify/blobs";

export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const payload = await request.json();
  const store = getStore("compounds");

  await store.set("data.json", JSON.stringify(payload), {
    metadata: { updated_at: String(payload?.meta?.updated_at || Date.now()) }
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
};
