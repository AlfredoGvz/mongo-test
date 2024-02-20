const fs = require('fs').promises;
const cityWithToiletsSchema = require('../scheema/city-with-toilets-schema')
const toiletSchema = require('../scheema/toilet-schema')
const axios = require('axios');

const cities = [
    {
      "place_id": 270010055,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 146656,
      "lat": "53.4794892",
      "lon": "-2.2451148",
      "class": "boundary",
      "type": "administrative",
      "place_rank": 16,
      "importance": 0.6817187195894088,
      "addresstype": "city",
      "name": "Manchester",
      "display_name": "Manchester, Greater Manchester, England, United Kingdom",
      "boundingbox": ["53.3401044", "53.5445923", "-2.3199185", "-2.1468288"]
    },
    {
      "place_id": 271544355,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 172987,
      "lat": "53.4071991",
      "lon": "-2.99168",
      "class": "boundary",
      "type": "administrative",
      "place_rank": 16,
      "importance": 0.6707510142855765,
      "addresstype": "city",
      "name": "Liverpool",
      "display_name": "Liverpool, Liverpool City Region, England, United Kingdom",
      "boundingbox": ["53.3115427", "53.4749885", "-3.0191726", "-2.8180003"]
    },
    {
      "place_id": 272013054,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 118362,
      "lat": "53.7974185",
      "lon": "-1.5437941",
      "class": "boundary",
      "type": "administrative",
      "place_rank": 16,
      "importance": 0.6288010623341473,
      "addresstype": "city",
      "name": "Leeds",
      "display_name": "Leeds, West Yorkshire, England, United Kingdom",
      "boundingbox": ["53.6989675", "53.9458715", "-1.8004214", "-1.2903516"]
    },
    {
      "place_id": 243548941,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 162370,
      "lat": "52.4081812",
      "lon": "-1.510477",
      "class": "boundary",
      "type": "administrative",
      "place_rank": 16,
      "importance": 0.5927519006502161,
      "addresstype": "city",
      "name": "Coventry",
      "display_name": "Coventry, West Midlands Combined Authority, England, United Kingdom",
      "boundingbox": ["52.3639374", "52.4647822", "-1.6144589", "-1.4239574"]
    },
    {
      "place_id": 275512916,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "node",
      "osm_id": 738885245,
      "lat": "51.4816546",
      "lon": "-3.1791934",
      "class": "place",
      "type": "city",
      "place_rank": 16,
      "importance": 0.6420928681277642,
      "addresstype": "city",
      "name": "Cardiff",
      "display_name": "Cardiff, Cymru / Wales, CF10 2AF, United Kingdom",
      "boundingbox": ["51.3216546", "51.6416546", "-3.3391934", "-3.0191934"]
    },
    {
      "place_id": 275277495,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 5746665,
      "lat": "51.4538022",
      "lon": "-2.5972985",
      "class": "place",
      "type": "city",
      "place_rank": 16,
      "importance": 0.6397596853910299,
      "addresstype": "city",
      "name": "Bristol",
      "display_name": "Bristol, City of Bristol, West of England, England, United Kingdom",
      "boundingbox": ["51.3972838", "51.5444317", "-2.7183704", "-2.5104192"]
    },
    {
      "place_id": 271162755,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 106956,
      "lat": "53.3806626",
      "lon": "-1.4702278",
      "class": "boundary",
      "type": "administrative",
      "place_rank": 16,
      "importance": 0.6319375905870335,
      "addresstype": "city",
      "name": "Sheffield",
      "display_name": "Sheffield, South Yorkshire, England, United Kingdom",
      "boundingbox": ["53.3045116", "53.5031042", "-1.8014715", "-1.3246685"]
    },
    {
      "place_id": 271577923,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "node",
      "osm_id": 20913294,
      "lat": "53.9590555",
      "lon": "-1.0815361",
      "class": "place",
      "type": "city",
      "place_rank": 16,
      "importance": 0.610326374365943,
      "addresstype": "city",
      "name": "York",
      "display_name": "York, England, YO1 8RS, United Kingdom",
      "boundingbox": ["53.7990555", "54.1190555", "-1.2415361", "-0.9215361"]
    },
    {
      "place_id": 372110415,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "way",
      "osm_id": 1219767831,
      "lat": "54.596391",
      "lon": "-5.9301829",
      "class": "place",
      "type": "city",
      "place_rank": 16,
      "importance": 0.6500238353643837,
      "addresstype": "city",
      "name": "Belfast",
      "display_name": "Belfast, County Antrim, Northern Ireland / Tuaisceart Éireann, United Kingdom",
      "boundingbox": ["54.5306104", "54.6594247", "-6.0454798", "-5.8076879"]
    },
    {
      "place_id": 269262206,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 1920901,
      "lat": "55.9533456",
      "lon": "-3.1883749",
      "class": "boundary",
      "type": "administrative",
      "place_rank": 12,
      "importance": 0.6767042570635242,
      "addresstype": "city",
      "name": "City of Edinburgh",
      "display_name": "City of Edinburgh, Alba / Scotland, United Kingdom",
      "boundingbox": ["55.8187919", "56.0040837", "-3.4495326", "-3.0749528"]
    }
]



async function populateToiletsInCities() {
    try {
        for (const city of cities) {
            let { name, lat, lon } = city
            console.log(city, '<<< each city object');
            const info = await axios.get(
                "https://www.refugerestrooms.org/api/v1/restrooms/by_location",
                {
                    params: {
                        lat,
                        lng: lon,
                        page: 1,
                        per_page: 25,
                        offset: 0,
                    },
                }
            );
            const toiletsData = info.data;
            let toilets = [];

            for (const toiletData of toiletsData) {
                const toilet = {
                    refuge_id: toiletData.id,
                    name: toiletData.name,
                    street: toiletData.street,
                    city: toiletData.city,
                    country: toiletData.country,
                    unisex: toiletData.unisex,
                    changing_table: toiletData.changing_table,
                    comment: toiletData.comment,
                    latitude: toiletData.latitude,
                    longitude: toiletData.longitude,
                    distance: toiletData.distance,
                    accessible: toiletData.accessible
                };
                toilets.push(toilet); // Add toilet to array
            }

            // Create a city object with the toilets array
            const newCity = new cityWithToiletsSchema({
                name,
                lat,
                lon,
                toilets
            });

            await newCity.save(); // Save city to database
            console.log("Toilets added to city:", name);
        }
    } catch (err) {
        console.error("Error adding toilets to city:", err);
    }
}

populateToiletsInCities();
