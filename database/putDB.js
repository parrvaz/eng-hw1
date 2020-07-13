const fs = require("fs");
const logger = require("../logger");
const db = require("../data.json");

const addPolygon = function (polygon) {
  db.features.push(polygon);
  fs.writeFileSync("data.json", JSON.stringify(db));
  logger.log("info", `push correctly in db=>${polygon}`);
  return db;
};

module.exports = { addPolygon };
