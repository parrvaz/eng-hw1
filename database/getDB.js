const fs = require("fs");
const logger = require("../logger");
var inside = require("point-in-polygon");

const db = require("../data.json");

const searchPolygons = function (point) {
  let result = [];
  for (var i = 0; i < db.features.length; i++) {
    if (
      inside([point.lat, point.long], db.features[i].geometry.coordinates[0])
    ) {
      logger.log(
        "info",
        `find match polygon: ${db.features[i].properties.name}`
      );
      result.push(db.features[i].properties.name);
    }
  }

  return result;
};

module.exports = { searchPolygons };
