export async function onRequestGet(context) {
  try {
    const { request, env } = context;

    if (!env.CHALLENGE_KV) {
      return new Response("KV未接続");
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get("user");

    if (!userId) {
      return new Response(JSON.stringify({ task: null }), {
        headers: { "Content-Type": "application/json" }
      });
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

  } catch (e) {
    return new Response("エラー: " + e.toString());
  }
}
