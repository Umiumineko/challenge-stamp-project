export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const themeId = url.searchParams.get("themeId");

  const data = await context.env.KV.get(`tasks:${themeId}`);

  return new Response(data || "[]", {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
