const toiletsData = require("./toilets.json");
const citiesData = require("./cities.json");
const mongoose = require("mongoose");
const Toilet = require("./scheema/scheema");
const City = require("./scheema/cityScheema");

require("dotenv").config({
  path: `${__dirname}/./.env.test`,
});
const uri = process.env.MONGODB_URI;
console.log(uri);
const seed = mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");

    runCities()
      .then(() => runToilets())
      .then(() => mongoose.disconnect());

    // runToilets().then(() => mongoose.disconnect());
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function runToilets() {
  try {
    // await Toilet.deleteMany({});
    for (const toilet of toiletsData) {
      const existingToilet = await Toilet.findOne({
        name: toilet.name,
      });
      if (!existingToilet) {
        const toiletSave = new Toilet({
          name: toilet.name,
          street: toilet.street,
          city: toilet.city,
          unisex: toilet.unisex,
          comment: toilet.comment,
          latitude: toilet.latitude,
          longitude: -toilet.longitude,
          country: toilet.country,
          changing_table: toilet.changing_table,
        });
        await toiletSave.save();
        console.log("Toilet saved:", toilet.name);
        console.log("All toilets saved successfully.");
      } else {
        console.log("Toilet already exists ->", toilet.name);
      }
    }
  } catch (error) {
    console.error("Error saving cities:", error);
  }
}

async function runCities() {
  try {
    // await City.deleteMany({});
    for (const city of citiesData) {
      const existingCity = await City.findOne({
        display_name: city.display_name,
      });
      if (!existingCity) {
        const citySave = new City({
          latitude: city.lat,
          longitude: city.lon,
          city: city.name,
          location: city.display_name,
        });
        await citySave.save();
        console.log("City saved:", city.display_name);
        console.log("All cities saved successfully.");
      } else {
        console.log("City already exists ->", city.display_name);
      }
    }
  } catch (error) {
    console.error("Error saving cities:", error);
  }
}

module.exports = { seed };
