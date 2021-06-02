require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");

const PORT = process.env.PORT || 8080;
//const meals = require("./meals.json");
var fs = require("fs");
var meals = fs.readFileSync("_helpers/meals.json", "utf8");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./users/users.controller"));

// global error handler
app.use(errorHandler);

app.get("/meals", (req, res) => {
  res.status(200).send(meals);
});

app.get("/meals/random", (req, res) => {
  const data = JSON.parse(meals);
  // Generate random index based on number of keys
  const randIndex = Math.floor(Math.random() * data.Meals.length);
  //res.send(data.Meals[randIndex]);
  res.json({ meals: [data.Meals[randIndex]] });
});

app.listen(PORT, () => {
  console.log("Server started");
});
