const { MongoClient } = require("mongodb");
const express = require("express");
const { connectToDb, getDb } = require("./connection");
const app = express();


const ENV = process.env.NODE_ENV || "development";
console.log(ENV, '<<<<the ENV');

let db;
connectToDb((err) => {
  if (!err) {
    app.listen(9090, () => {
      console.log("Server is online...");
    });
    db = getDb();
  }
});

require("dotenv").config();

let uri;

if (ENV === "production") {
  uri = process.env.PRODUCTION_MONGODB_URI;
} else if (ENV === "test") {
  uri = process.env.TEST_MONGODB_URI;
} else {
  uri = process.env.DEVELOPMENT_MONGODB_URI;
}

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};














app.get("/api/cities", (request, response) => {
  let cities = [];

  db.collection("cities")
    .find()
    .forEach((city) => {
      cities.push(city);
    })
    .then((response) => {
      console.log(response, '<<<< reponse in the cities')
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
