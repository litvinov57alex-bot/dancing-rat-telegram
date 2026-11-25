import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
TOKEN = os.environ["BOT_TOKEN"]
WEBAPP_URL = os.environ["WEBAPP_URL"].strip()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [[InlineKeyboardButton("🐀 Запустить крысу", web_app=WebAppInfo(url=WEBAPP_URL))]]
    await update.message.reply_text(
        "Привет! Это Танцующая крыса 🐀\n\nНажми кнопку ниже, чтобы открыть её прямо в Telegram. "
        "Внутри можно запускать танец, менять темп и стиль музыки.",
        reply_markup=InlineKeyboardMarkup(keyboard),
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Отправь /start, чтобы открыть Танцующую крысу. "
                                    "Если приложение не открывается, обнови Telegram и попробуй ещё раз.")

def main() -> None:
    if not WEBAPP_URL.startswith("https://"):
        raise RuntimeError("WEBAPP_URL должен быть публичным HTTPS-адресом")
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    logging.info("Бот запущен")
    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
