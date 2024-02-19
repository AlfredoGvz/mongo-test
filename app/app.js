const express = require("express");
const { connectToDb, getDb } = require("./connection");
const app = express();

let db;
connectToDb((err) => {
  if (!err) {
    app.listen(9090, () => {
      console.log("Server is online...");
    });
    db = getDb();
  }
});

app.get("/api/cities", (request, response) => {
  let cities = [];

  db.collection("cities")
    .find()
    .forEach((city) => {
      cities.push(city);
    })
    .then(() => {
      response.status(200).send({ cities: cities });
    });
});

app.get("/api/toilets", (request, response) => {
  let toilets = [];

  db.collection("toilets")
    .find()
    .forEach((toilet) => toilets.push(toilet))
    .then(() => {
      response.status(200).send(toilets);
    })
    .catch((err) => console.log(err));
});

module.exports = { app };
