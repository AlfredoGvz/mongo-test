// const seedTestData = require("../seeds/seed-test");
const { MongoClient } = require("mongodb");
const { app } = require("../app/app");
const request = require("supertest");
const { uri } = require("../app/connection");
console.log(uri, "in test uri");
const ENV = process.env.NODE_ENV || "test";
require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

const client = new MongoClient(uri);

beforeAll(async () => {
  try {
    await client.connect();
    const db = client.db("final_project_db_test");
    usersCollection = db.collection("cities");
    console.log("Connected");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
});

// const database = require('../app/connection')

// beforeEach(() => seedTestData());

describe("API", () => {
  describe("/api/cities", (req, res) => {
    it("should respond with an array of city objects witht the correct properties", () => {
      return request(app)
        .get("/api/cities")
        .expect(200)
        .then((res) => {
          // console.log(res._body, "<<< the response in the test");
          const { cities } = res._body;
          // console.log(cities, "<<<cities");
          expect(cities.length).toBe(10);
          expect(cities[0]).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              latitude: 53.4794892,
              longitude: -2.2451148,
              name: "Manchester",
              display_name:
                "Manchester, Greater Manchester, England, United Kingdom",
              __v: 0,
            })
          );
        });
    });
    it("should respond with a 404 status code when given an incorrectly spelt endppint", () => {
      return request(app)
        .get("/api/citiez")
        .expect(404)
        .then((body) => {
          console.log(body.statusCode, "<<<<body status code in test");
          expect(body.statusCode).toBe(404);
        });
    });
  });
  describe("/api/:city_name/toilets", () => {});
});
