# Танцующая крыса — Telegram Mini App

Бот открывает HTML-анимацию внутри Telegram через кнопку Web App.

## Развёртывание на Render

1. Создай бота через @BotFather командой /newbot и скопируй токен.
2. Подключи репозиторий к Render и создай Blueprint из render.yaml.
3. Render создаст статический сайт и Worker для Telegram-бота.
4. Скопируй публичный HTTPS URL статического сайта.
5. В настройках Worker добавь BOT_TOKEN (токен от BotFather) и WEBAPP_URL (HTTPS URL сайта).
6. Перезапусти Worker, открой бота и отправь /start.

Не публикуй BOT_TOKEN в GitHub. WEBAPP_URL должен начинаться с https://.
Музыка начнёт играть после нажатия «Танцевать» — браузеры запрещают автозапуск звука.

## Локальный запуск

```bash
pip install -r requirements.txt
export BOT_TOKEN="токен_от_BotFather"
export WEBAPP_URL="https://адрес-твоего-сайта"
python bot.py
```
