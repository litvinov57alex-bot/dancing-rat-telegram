# Бесплатный запуск Telegram-бота «Танцующая крыса»

Этот вариант не использует платный Render. Страница игры размещается на GitHub Pages, а Telegram-бот работает на Cloudflare Workers Free.

## 1. Опубликовать игру на GitHub Pages

1. Откройте Settings репозитория: https://github.com/litvinov57alex-bot/dancing-rat-telegram/settings/pages
2. В разделе **Build and deployment** выберите **Source: GitHub Actions**.
3. Откройте вкладку Actions и дождитесь успешного запуска **Deploy static site to GitHub Pages**.
4. Адрес приложения будет: https://litvinov57alex-bot.github.io/dancing-rat-telegram/

## 2. Создать бесплатный Worker

1. Войдите в https://dash.cloudflare.com/ (бесплатного аккаунта достаточно).
2. Откройте **Workers & Pages** → **Create** → **Create Worker**.
3. Назовите его, например, `dancing-rat-telegram`, создайте и нажмите **Edit code**.
4. Скопируйте содержимое файла `worker/telegram-worker.js` из этого репозитория в редактор и нажмите **Deploy**.
5. В настройках Worker откройте **Settings** → **Variables and Secrets** и добавьте три переменные типа Secret:
   - `BOT_TOKEN` — токен от BotFather;
   - `WEBAPP_URL` — `https://litvinov57alex-bot.github.io/dancing-rat-telegram/`;
   - `WEBHOOK_SECRET` — придумайте длинную строку из латинских букв, цифр, дефиса и подчёркивания (например, 32 случайных символа).
6. Сохраните переменные и выполните повторный Deploy.

Запомните публичный адрес Worker, например `https://dancing-rat-telegram.<ваш-аккаунт>.workers.dev`.

## 3. Подключить Telegram к Worker

Откройте терминал на компьютере и выполните команду, подставив свои значения. Не публикуйте её и не отправляйте никому: в ней находится токен бота.

```bash
curl -X POST "https://api.telegram.org/botВАШ_BOT_TOKEN/setWebhook" \
  -d "url=https://ВАШ_WORKER.workers.dev/webhook" \
  -d "secret_token=ВАШ_WEBHOOK_SECRET"
```

Значения `BOT_TOKEN` и `WEBHOOK_SECRET` должны в точности совпадать с Secret-переменными Worker.

## 4. Проверить

Откройте бота в Telegram, отправьте `/start` и нажмите **🐀 Запустить крысу**.

## Важно

- GitHub Pages и Cloudflare Workers имеют бесплатные тарифы с лимитами; при обычном небольшом использовании платный тариф не требуется.
- Музыка и анимация запускаются после нажатия кнопки внутри приложения.
- Не вставляйте токен в публичный репозиторий, исходный код или переписку.
