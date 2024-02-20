const mongoose = require("mongoose");
const toiletSchema = require('../scheema/toilet-schema')

const cityWithToiletsSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lon: Number,
    toilets: [toiletSchema]
});

module.exports = mongoose.model('City-With-Toilets', cityWithToiletsSchema)

