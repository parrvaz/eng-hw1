const express = require("express");
const body_parser = require("body-parser");
const logger = require("./logger");

const gis = require("./gis/gis");

const app = express();

app.use(body_parser.json());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

app.use("/gis", gis);

app.get("/", function (req, res) {
  res.send("Hi!");
});

app.listen(port, () => console.log(`Example app ${port}`));
