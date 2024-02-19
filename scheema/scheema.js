const mongoose = require("mongoose");

const toiletScheema = new mongoose.Schema({
  name: String,
  street: String,
  city: String,
  unisex: Boolean,
  comment: String, //--> think about this having comments on the toilets
  latitude: Number,
  longitude: Number,
  country: mongoose.SchemaTypes.ObjectId,
  changing_table: Boolean,
});

module.exports = mongoose.model("Toilet", toiletScheema);
