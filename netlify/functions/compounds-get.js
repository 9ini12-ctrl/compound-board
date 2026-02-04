import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("compounds");
  const raw = await store.get("data.json", { type: "text" });

  const body = raw || JSON.stringify({
    meta: { updated_at: 0, schema: 1 },
    settings: {},
    stages: [],
    cards: []
  });

  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
};
