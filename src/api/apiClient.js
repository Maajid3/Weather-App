import axios from "axios";

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

export const getCityFromCoords = async (lat, lng) => {
  const token = import.meta.env.VITE_MAPBOX_API;

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`,
  );

  const data = await res.json();

  const place = data.features?.[0].context?.[4]?.text;
  // console.log(place);

  return place || "Current Location";
};
