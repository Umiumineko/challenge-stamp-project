export async function onRequestGet(context) {
  const { request, env } = context;

  const url = new URL(request.url);
  const userId = url.searchParams.get("user");

  if (!userId) {
    return new Response("userIdがありません", { status: 400 });
  }

  const data = await env.CHALLENGE_KV.get(`user:${userId}`);

  if (!data) {
    return new Response(JSON.stringify({ task: null }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(data, {
    headers: { "Content-Type": "application/json" }
  });
}
