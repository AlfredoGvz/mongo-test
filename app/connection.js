const { MongoClient } = require("mongodb");

const ENV = process.env.NODE_ENV || "test";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});
console.log(ENV, "<<<the ENV");

const uri = process.env.MONGODB_URI;
console.log(uri, "<<<the URI");
let dbConnection;
module.exports = {
  connectToDb: (cb) => {
    if (!uri) {
      throw new Error("MONGODB_URI not set");
    }

    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        console.log("Connected to MongoDB");
        return cb();
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        return cb(err);
        // throw err;
      });
  },
  getDb: () => {
    if (!dbConnection) {
      throw new Error("Database connection has not been established");
    }
    return dbConnection;
  },
  uri: uri,
};
