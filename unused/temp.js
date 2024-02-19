const { MongoClient } = require("mongodb");
require("dotenv").config();

let uri;
const ENV = process.env.NODE_ENV || "development";

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