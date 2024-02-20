






const express = require("express");
const { MongoClient } = require("mongodb");
const { connectToDb, getDb } = require("./connection");

const app = express();
const PORT = process.env.PORT || 9090;

const uri = process.env.MONGODB_URI;
console.log(uri);

connectToDb(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.get("/api/cities", async (req, res, next) => {
  try {
    const db = getDb(); 
    const cities = await db.collection("cities").find().toArray()
    console.log(cities, '<<<logging the cities');
    res.status(200).send({cities})
  } catch(error) {
    console.error("Error fetching cities:", error);
    res.status(404).send({message: 'Endpoint not found'}) 
  }
});

app.use((err, req, res, next) => {
  console.log(err.code, 'manual reject errors middleware')
  if (err.status && err.message){
  res.status(err.status).send({ message: err.message })
  }
  else {
      next(err)
  }
})

app.use((err, req, res, next) => {
  console.log(err.code, 'primary error middleware')
  if {
    
  }
  else {
      next(err)
      }
  })

app.use((err, req, res, next) => {
  console.log(err.code, 'edgecase error middleware')
  res.status(500).send({ message: 'Internal server error' })
})


app.get("/api/toilets", async (req, res) => {
  try {
    const db = getDb(); // Get database instance
    const toilets = await db.collection("toilets").find().toArray(); // Fetch all toilets
    res.status(200).json(toilets); // Send response with toilets array
  } catch (error) {
    console.error("Error fetching toilets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
