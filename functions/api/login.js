export async function onRequestPost() {
  return new Response(
    JSON.stringify({ ok: true, test: "login.js is running" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
