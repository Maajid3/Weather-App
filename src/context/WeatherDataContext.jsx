import { useState, useEffect, useMemo } from "react";
import useData from "../api/customHook/useData";
import WeatherContext from "./weatherContext";
import { getCityFromCoords } from "../api/apiClient";

const STORAGE_KEY = "weather-location";

const DEFAULT_LOCATION = {
  longitude: 79.0882,
  latitude: 21.1458,
  city: "Nagpur",
};

const getInitialLocation = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return DEFAULT_LOCATION;

    const parsed = JSON.parse(stored);

    const longitude = Number(parsed?.longitude);
    const latitude = Number(parsed?.latitude);
    const city =
      typeof parsed?.city === "string" && parsed.city.trim()
        ? parsed.city
        : DEFAULT_LOCATION.city;

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      return {
        ...DEFAULT_LOCATION,
        city,
      };
    }

    return { longitude, latitude, city };
  } catch (err) {
    console.error("Error reading localStorage:", err);
    return DEFAULT_LOCATION;
  }
};

export default function WeatherProvider({ children }) {
  const [cord, setCord] = useState(getInitialLocation);
  const [locErr, setLocErr] = useState(false);

  // Persist location
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cord));
    } catch (error) {
      console.error("Local storage write error:", error);
    }
  }, [cord]);

  const handleRetrieve = (feature) => {
    if (!feature) return;

    const geometryCoordinates = feature.geometry?.coordinates;
    const propertyCoordinates = feature.properties?.coordinates;

    const longitude = Number(
      geometryCoordinates?.[0] ?? propertyCoordinates?.longitude,
    );
    const latitude = Number(
      geometryCoordinates?.[1] ?? propertyCoordinates?.latitude,
    );

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      console.warn("Invalid coordinates from feature:", feature);
      return;
    }

    const newCity =
      feature.properties?.full_address ||
      feature.properties?.name_preferred ||
      feature.properties?.name ||
      cord.city;

    setCord({
      longitude,
      latitude,
      city: newCity,
    });
  };

  const setCity = (city) => {
    setCord((prev) => ({
      ...prev,
      city: city || prev.city,
    }));
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setLocErr(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLocErr(false);

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const city = await getCityFromCoords(lat, lng);

          setCord((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            city: city || prev.city,
          }));
        } catch (err) {
          console.error("Failed to fetch city:", err);
          setLocErr(true);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocErr(true);
      },
    );
  };

  const { data, isLoading, isError } = useData({
    longitude: cord.longitude,
    latitude: cord.latitude,
    city: cord.city,
  });

  const day = data?.weather?.current?.is_day === 1;
  console.log(day);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      isError,
      city: cord.city,
      setCity,
      day,
      handleRetrieve,
      handleLocation,
      locErr,
    }),
    [data, isLoading, isError, cord.city, day, locErr],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}
