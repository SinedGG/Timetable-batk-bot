module.exports = {
  apps: [
    {
      name: "batk-bot",
      cwd: "/var/pm2/apps/batk-bot",
      script: "index.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",

      env: {
        TG_TOKEN: "",

        DATABASE_URL: "",

        TIMETABLE_URL: "",
      },
    },
  ],
};
