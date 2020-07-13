var express = require("express");
var router = express.Router();
const validations = require("../module/validations");
const putDB = require("../database/putDB");
const getDB = require("../database/getDB");
const logger = require("../logger");

router.use("/testpoint", function (req, res, next) {
  logger.log("info", `${req.method} request`);
  if (req.method.toString() !== "GET") {
    logger.log("error", `incorrect request method=>${req.method}`);
    return res.status(400).json({
      status: "error",
      message: "The method for this request must be get",
    });
  }

  //validation inputs
  if (!validations.isPoint(req.query)) {
    logger.log("error", `incorrect input argumants for points`);
    return res.status(400).json({
      status: "error",
      message: "lat and long is required",
    });
  }
  next();
});

//test polygons
router.get("/testpoint", function (req, res) {
  let point = req.query;
  //searche
  let result = getDB.searchPolygons(point);
  //return response
  if (result.length == 0) {
    logger.log("info", `not found any polygon`);
    return res.json({
      status: "error",
      message: "not found any area",
    });
  }
  res.json(result);
});

router.use("/addpolygon", function (req, res, next) {
  logger.log("info", `${req.method} request`);
  if (req.method.toString() !== "PUT") {
    logger.log("error", `incorrect request method=>${req.method}`);
    return res.status(400).json({
      status: "error",
      message: "The method for this request must be put",
    });
  }
  //validate inputs
  if (!validations.isPolygon(req.body.geometry)) {
    logger.log("error", `incorrect input argumants for polygon`);
    return res.status(400).json({
      status: "error",
      message: "input is not valide",
    });
  }
  next();
});

router.put("/addpolygon", function (req, res) {
  const polygon = req.body;
  //save in file
  console.log(putDB.addPolygon(polygon));
  //send res
  res.status(200).send("put in db correctly");
});

module.exports = router;
