const express = require("express");
const app = express();
//const meals = require("./meals.json");
var fs = require("fs");
var meals = fs.readFileSync("meals.json", "utf8");

app.get("/meals", (req, res) => {
  res.status(200).send(meals);
});

app.get("/meals/random", (req, res) => {
  const data = JSON.parse(meals);
  // Generate random index based on number of keys
  const randIndex = Math.floor(Math.random() * data.apiMeal.length);
  res.send(data.apiMeal[randIndex]);
});

app.listen(8080, () => {
  console.log("Server started");
});
