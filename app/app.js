const express = require("express");
const { connectToDb, getDb } = require("./connection");

const app = express();
const PORT = process.env.PORT || 9090;
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log("Server is online...");
    });
    db = getDb();
  }
});

app.get("/api/cities", async (req, res, next) => {
  try {
    const cities = await db.collection("cities").find().toArray();
    // console.log(cities, "<<<logging the cities");
    res.status(200).send({ cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(404).send({ message: "Endpoint not found" });
  }
});

app.get("/api/toilets", async (req, res) => {
  try {
    // const db = getDb();
    const toilets = await db.collection("toilets").find().toArray(); // Fetch all toilets
    res.status(200).json(toilets); // Send response with toilets array
  } catch (error) {
    console.error("Error fetching toilets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
