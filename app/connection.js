const { MongoClient } = require("mongodb");
require("dotenv").config({
  path: `${__dirname}/../.env.test`,
});

const uri = process.env.MONGODB_URI;
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
