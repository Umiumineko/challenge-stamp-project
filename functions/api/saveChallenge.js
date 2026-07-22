export async function onRequestPost({ request, env }) {

  try {

    const data = await request.json();

    const {
      userId,
      taskId,
      taskName,
      answers
    } = data;

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

    const existing =
      await env.CHALLENGE_RECORDS.get(key);

    let records = [];

    if (existing) {
      records = JSON.parse(existing);
    }

    records.push({
      taskId,
      taskName,
      answers,
      completedAt: new Date().toISOString()
    });

    await env.CHALLENGE_RECORDS.put(
      key,
      JSON.stringify(records)
    );

    return new Response(
      JSON.stringify({ ok: true }),
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
