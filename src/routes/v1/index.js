const admin = require("../admin");
const index = require("../index");
const customer = require("../customer");
const app_api = require("../app_api");

const v1_routes = (app) => {
  app.use("/", index);
  app.use("/api/admin", admin);
  app.use("/api/customer", customer);
  app.use("/api/app_api", app_api);
};

module.exports = { v1_routes };
