const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
var cors_proxy = require("cors-anywhere");
//const meals = require("./meals.json");
var fs = require("fs");
var meals = fs.readFileSync("db.json", "utf8");

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

cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
  })
  .listen(PORT, () => {
    console.log("Server started");
  });
