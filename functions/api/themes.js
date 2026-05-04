export async function onRequestGet(context) {
  const data = await context.env.KV.get("themes:current");

  return new Response(data || "[]", {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
