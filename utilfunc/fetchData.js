const fs = require("fs").promises;
const axios = require("axios");
const schedule = require("node-schedule");
const cities = require('../data/test-data/cities')



// async function getCityCoordinates(City) {
//   let apiUrl = "https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(City);
//   try {
//     const response = await axios.get(apiUrl);
//     if (response.data && response.data.length > 0) {
//       console.log(response, '<<<coordinates response');
//       const { lat, lon } = response.data[0]; 
//       console.log(lat, lon)  // Extract latitude and longitude
//       return { lat, lon };
//     } else {
//       throw new Error("City coordinates not found");
//     }
//   } catch (error) {
//     console.error("Error fetching city coordinates:", error);
//     throw error;
//   }
// }


async function fetchToiletsDataForCities() {
  for (const cityData of cities) {
      try {
          const { name, lat, lon } = cityData;
          console.log(cityData, '<<<the city data in the fetch toilets');
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
          const data = info.data;
          await fs.writeFile(`toilets_${name}.json`, JSON.stringify(data, null, 2));
          console.log("Fetched and saved for city:", name);
      } catch (err) {
          console.error("Error fetching or saving data:", err);
      }
  }
}

fetchToiletsDataForCities();


// module.exports = { getCityCoordinates };
