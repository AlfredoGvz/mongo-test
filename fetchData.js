const fs = require("fs").promises;
const axios = require("axios");
const schedule = require("node-schedule");

// I was playing around with this one to see if i could get
//cities and their information like: geolocation and other things
async function getCityLocation(city) {
  let apiUrl =
    "https://nominatim.openstreetmap.org/search?format=json&q=" +
    encodeURIComponent(city);
  //Nominatim is a search engine for OpenStreetMap data. It allows you to search for places by name and obtain their geolocation information.
  try {
    const containedData = await fs.readFile("cities.json", "utf-8");
    //Get the files with the cities info to append the data later on (writeFile and overwriting)
    const parsedData = JSON.parse(containedData);

    let positionInfo = await axios.get(apiUrl).then(({ data }) => {
      return data;
    });
    parsedData.push(positionInfo[0]);

    await fs.writeFile("cities.json", JSON.stringify(parsedData), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("saved");
      }
    });
  } catch (err) {
    console.log(err);
  }
}

let city = "York, United Kingdom";
// getCityLocation(city);

//========================================================================

// schedule.scheduleJob("*/3 * * * * *", async function () {
//   try {
//     const info = await axios.get(
//       "https://www.refugerestrooms.org/api/v1/restrooms/by_location",
//       {
//         params: {
//           lat: 53.483959,
//           lng: -2.244644,
//           page: 1,
//           per_page: 25,
//           offset: 0,
//         },
//       }
//     );
//     const data = info.data;
//     await fs.writeFile("toilets.json", JSON.stringify(data, null, 2));
//     console.log("Fetched and saved");
//   } catch (err) {
//     console.error("Error fetching or saving data:", err);
//   }
// });

// module.exports = { scheduledFetch, getCityLocation };
