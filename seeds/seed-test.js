const db = require("../app/connection");
const testData = require("../data/test-data/cities");

async function seedTestData() {
  try {
    await db.connectToDb();
    const collection = db.getDb().collection("testCities");
    await collection.insertMany(testData);
    console.log("Test data seeded successfully.");
  } catch (error) {
    console.error("Error seeding test data:", error);
  }
}

module.exports = seedTestData;
