export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("Dancing Rat Telegram bot is running 🐀", {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    if (request.method !== "POST" || url.pathname !== "/webhook") {
      return new Response("Not found", { status: 404 });
    }

    if (!env.BOT_TOKEN || !env.WEBAPP_URL || !env.WEBHOOK_SECRET) {
      return new Response("Worker secrets are not configured", { status: 500 });
    }

    if (request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== env.WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    let update;
    try {
      update = await request.json();
    } catch {
      return new Response("Bad request", { status: 400 });
    }

    const message = update.message;
    if (!message?.chat?.id || typeof message.text !== "string") {
      return new Response("OK");
    }

    const text = message.text.trim();
    if (text === "/start" || text.startsWith("/start ")) {
      await telegram(env.BOT_TOKEN, "sendMessage", {
        chat_id: message.chat.id,
        text: "Привет! Это Танцующая крыса 🐀\\n\\nНажми кнопку ниже, чтобы открыть её прямо в Telegram. Включи танец и настрой темп и стиль!",
        reply_markup: {
          inline_keyboard: [[
            { text: "🐀 Запустить крысу", web_app: { url: env.WEBAPP_URL } }
          ]]
        }
      });
    } else if (text === "/help") {
      await telegram(env.BOT_TOKEN, "sendMessage", {
        chat_id: message.chat.id,
        text: "Отправь /start, чтобы открыть Танцующую крысу 🐀"
      });
    }

    return new Response("OK");
  }
};

async function telegram(token, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    console.error("Telegram API error:", await response.text());
  }
}
