const controller = require("../controllers/task.controller");

let upload = require("../config/multer.config.js");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/task/add-task",
    upload.single("file"),
    controller.addTask
  );
};
