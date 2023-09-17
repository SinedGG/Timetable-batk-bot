const { Markup } = require("telegraf");

module.exports = {
  keyboard: Markup.keyboard([["📅 Розклад", "🔔 Сповіщення та інше"]])
    .resize()
    .oneTime(),
  execute(bot) {
    bot.hears("📅 Розклад", async (ctx) => {
      const subscribed = await require("../modules/ifUserSubscribed")(ctx);
      if (!subscribed) return;

      const { keyboard } = require("./timetable");
      ctx.reply("🔧 Виберіть опцію", keyboard);
    });
  },
};
