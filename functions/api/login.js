export async function onRequestPost({ request, env }) {

  // --------------------
  // ① リクエストを受け取る
  // --------------------
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { number, code } = body;

  if (!number || !code) {
    return new Response(
      JSON.stringify({ ok: false }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // --------------------
  // ② KVから「正しいコード」を取得
  // キー：出席番号
  // 値：ログインコード
  // --------------------
  const correctCode = await env.LOGIN_CODES.get(String(number));

  // --------------------
  // ③ 判定
  // --------------------
  if (correctCode && correctCode === code) {

    // OK：Cookieを発行
    return new Response(
      JSON.stringify({ ok: true }),
      {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": [
            `session=${number}; Path=/; HttpOnly; SameSite=Lax`
          ].join('; ')
        }
      }
    );
  }

  // --------------------
  // ④ NG
  // --------------------
  return new Response(
    JSON.stringify({ ok: false }),
    { headers: { "Content-Type": "application/json" } }
  );
}
