import axios from "axios";

export const cityApi = async (city) => {
  try {
    const res = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: city,
        },
      },
    );
    return res.data;
  } catch (err) {
    console.log("error fetching data");
    throw err;
  }
};

export const mainApi = async (latitude, longitude) => {
  try {
    const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude,
        longitude,
        timezone: "auto",
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,rain,is_day",
        hourly: "temperature_2m",
        forecast_days: 1,
      },
    });
    return res.data;
  } catch (err) {
    console.log("error fetching data");
    throw err;
  }
};
