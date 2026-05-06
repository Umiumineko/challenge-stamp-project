export async function onRequestGet(context) {
  try {
    return new Response(JSON.stringify({
      message: "APIは動いている"
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response("エラー: " + e.toString());
  }
}
``
