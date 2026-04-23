import { useState, useEffect } from "react";
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
  const fallbackCity = localStorage.getItem("city") || DEFAULT_LOCATION.city;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        ...DEFAULT_LOCATION,
        city: fallbackCity,
      };
    }

    const parsed = JSON.parse(stored);
    const longitude = Number(parsed?.longitude);
    const latitude = Number(parsed?.latitude);
    const city =
      typeof parsed?.city === "string" && parsed.city.trim()
        ? parsed.city
        : fallbackCity;

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      return {
        ...DEFAULT_LOCATION,
        city,
      };
    }

    return {
      longitude,
      latitude,
      city,
    };
  } catch {
    return {
      ...DEFAULT_LOCATION,
      city: fallbackCity,
    };
  }
};

export default function WeatherProvider({ children }) {
  const [cord, setCord] = useState(getInitialLocation);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cord));

      if (cord.city) {
        localStorage.setItem("city", cord.city);
      }
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

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return;

    setCord({
      longitude,
      latitude,
      city:
        feature.properties?.full_address ||
        feature.properties?.name_preferred ||
        feature.properties?.name ||
        "Selected location",
    });
  };

  const setCity = (city) => {
    setCord((previous) => ({
      ...previous,
      city,
    }));
  };

  const handleLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const city = await getCityFromCoords(lat, lng);

        setCord((previous) => ({
          ...previous,
          latitude: lat,
          longitude: lng,
          city,
        }));
      },
      (error) => {
        console.error("Location error:", error);
      },
    );
  };

  const { data, isLoading, isError } = useData({
    longitude: cord.longitude,
    latitude: cord.latitude,
    city: cord.city,
  });

  const day = data?.weather?.current?.is_day === 1;

  return (
    <WeatherContext.Provider
      value={{
        data,
        isLoading,
        isError,
        city: cord.city,
        setCity,
        day,
        handleRetrieve,
        handleLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
