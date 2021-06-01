const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;
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

app.listen(PORT, () => {
  console.log("Server started");
});
