module.exports = async (bot) => {
  const vars = require("../models/vars");
  const timetable = require("../models/timetable");

  try {
    const oldFile = await vars.get("file-size");
    const newFile = await require("./getFileSize")();
    if (oldFile.value != newFile.value) {
      const download = await require("./downloadFile.js")();
      console.log(
        `Файл завантажено. Час отримання - ${download.elapsedTime} ms`
      );
      const day = await require("./getPdfDay.js")();
      const lastDay = await vars.get("last-day");
      var text = `Новий розклад📚 на ${day}`;
      var isTableChanged = false;
      if (day == lastDay.value) {
        text = `Зміни в розкладі📚 на ${day}`;
        isTableChanged = false;
      }
      vars.set("last-day", day);
      vars.set("file-size", newFile.value);
      const sendTable = require("./sendMessage");
      const sendGroup = require("./sendGroup");

      const tableProm = sendTable(bot, isTableChanged, text, "table");
      const parsedTable = await require("./parsePDF")();
      const groupProm = sendGroup(bot, isTableChanged, text, parsedTable);

      await Promise.all([tableProm, groupProm]);

      await timetable.set(parsedTable);
      cycle(bot);
    }
  } catch (e) {
    console.log(e);
    cycle(bot);
  }
};

function cycle(bot) {
  setTimeout(() => {
    require("./fileMonitor")(bot);
  }, 30 * 1000);
}
