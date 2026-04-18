export async function onRequestPost({ request, env }) {
  try {
    const { number, code } = await request.json();

    if (!number || !code) {
      return new Response(
        JSON.stringify({ ok: false }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const correctCode = await env.LOGIN_CODES.get(String(number));

    if (correctCode && correctCode === code) {
      return new Response(
        JSON.stringify({ ok: true }),
        {
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `session=${number}; Path=/; HttpOnly; SameSite=Lax`
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ ok: false }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: "server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
