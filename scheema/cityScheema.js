const mongoose = require("mongoose");
const cityScheema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  city: String,
  location: String,
});

module.exports = mongoose.model("City", cityScheema);
