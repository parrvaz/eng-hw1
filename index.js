const express = require("express");
const body_parser = require("body-parser");
const logger = require("./logger");

const gis = require("./gis/gis");

const app = express();

app.use(body_parser.json());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

PORT = process.env.port || 3000;

app.use("/gis", gis);

app.get("/", function (req, res) {
  res.send("Hi!");
});

app.listen(PORT, () => console.log(`Example app ${PORT}`));
