const admin = require("../admin");
const index = require("../admin");

const v1_routes = (app) => {
  app.use("/", index);
  app.use("/api/admin", admin);
};

module.exports = { v1_routes };
