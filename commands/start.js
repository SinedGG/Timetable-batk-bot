function r(bot, db, logger) {
  bot.start((ctx) => {
    db.query(
      `INSERT users (chat_id) values (${ctx.message.chat.id})`,
      function (err) {
        if (err) {
          logger(
            "DB Error",
            `Помилка додавання користувача ${ctx.message.chat.id} до бази даних!`,
            err
          );
          if (err.code == "ER_DUP_ENTRY") {
            logger(
              "User",
              `Користувач ${ctx.message.chat.id} вже є у базі даних`
            );
            ctx.reply(
              "Хм... Здається ви вже є у базі даних. \nЯкщо ви вважаєте що сталась помилка @berezovsky23"
            );
          }
        } else {
          logger(
            "DB",
            `Користувача ${ctx.message.chat.id} додано до бази даних!`
          );
          ctx.telegram.sendMessage(
            ctx.chat.id,
            "* Виберіть опцію для надсилання розкладу: * \n \n *👨‍🎓 Вибір групи* - отримувати розклад конкретної групи у текстовому форматі. \n *📅 Отримувати розклад-таблицю* - отримувати розклад у форматі таблиці (_як на сайті_)",
            {
              parse_mode: "markdown",
              reply_markup: {
                parse_mode: "markdown",
                keyboard: [
                  [
                    { text: "👨‍🎓 Вибір групи" },
                    { text: "📅 Отримувати розклад-таблицю" },
                  ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      }
    );
  });
}
module.exports = r;
