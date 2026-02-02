import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("compounds");
  const raw = await store.get("data.json", { type: "text" });

  const base = raw || JSON.stringify({
    meta: { updated_at: 0, schema: 2, rev: "init" },
    settings: { goal_ratio: 1, coverage_ratio: null },
    stages: [],
    cards: []
  });

  // Ensure rev exists (for old data)
  let obj;
  try { obj = JSON.parse(base); } catch(e) { obj = null; }
  if(obj && (!obj.meta || !obj.meta.rev)){
    obj.meta = obj.meta || {};
    obj.meta.rev = "srv_" + Date.now();
    obj.meta.schema = obj.meta.schema || 2;
    obj.meta.updated_at = obj.meta.updated_at || 0;
    await store.set("data.json", JSON.stringify(obj), { metadata: { updated_at: String(obj.meta.updated_at || Date.now()) }});
    return new Response(JSON.stringify(obj), { headers: { "Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store" }});
  }

  return new Response(base, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
};
