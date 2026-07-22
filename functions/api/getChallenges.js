export async function onRequestGet({ request, env }) {

  try {

    const url = new URL(request.url);

    const userId = url.searchParams.get("userId");

    if (!userId) {

      return new Response(
        JSON.stringify({
          ok: false,
          error: "userId missing"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    }

    const key = `challenge:${userId}`;

    const data =
      await env.CHALLENGE_RECORDS.get(key);

    const records =
      data ? JSON.parse(data) : [];

    return new Response(
      JSON.stringify({
        ok: true,
        records
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (e) {

    return new Response(
      JSON.stringify({
        ok: false,
        error: e.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }

}
