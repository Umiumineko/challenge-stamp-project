export async function onRequestPost(context) {
  const { request, env } = context;

  const body = await request.json();
  const { user, task } = body;

  if (!user || !task) {
    return new Response("データ不足", { status: 400 });
  }

  const data = {
    task: task,
    weekId: getWeekId()
  };

  await env.CHALLENGE_KV.put(`user:${user}`, JSON.stringify(data));

  return new Response("OK");
}

// 週ID生成（簡易）
function getWeekId() {
  const now = new Date();
  const year = now.getFullYear();
  const week = Math.ceil(
    ((now - new Date(year, 0, 1)) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7
  );

  return `${year}-W${week}`;
}
