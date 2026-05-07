import { useRef, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useWeatherData from "../context/useWeatherData";

function Map() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  const { data, day } = useWeatherData();
  const dayRef = useRef(day);

  useEffect(() => {
    dayRef.current = day;
  }, [day]);

  const long = data?.longitude;
  const lat = data?.latitude;

  const addWeatherLayer = useCallback((map, isDay) => {
    const key = import.meta.env.VITE_OPENWEATHER_KEY;
    if (!key) return;

    if (!map.getSource("weather-data")) {
      map.addSource("weather-data", {
        type: "raster",
        tiles: [
          `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${key}`,
        ],
        tileSize: 256,
      });
    }

    if (!map.getLayer("weather-layer")) {
      map.addLayer({
        id: "weather-layer",
        type: "raster",
        source: "weather-data",
        paint: {
          "raster-opacity": 0.9,
          "raster-contrast": isDay ? 0.6 : 0.4,
          "raster-saturation": isDay ? 0.7 : 0.5,
        },
      });
    }
  }, []);

  const ensureWeatherLayer = useCallback(
    (map, isDay) => {
      if (map.isStyleLoaded()) {
        addWeatherLayer(map, isDay);
      } else {
        map.once("style.load", () => addWeatherLayer(map, isDay));
      }
    },
    [addWeatherLayer, lat, long],
  );

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: dayRef.current
        ? "mapbox://styles/mapbox/outdoors-v12"
        : "mapbox://styles/mapbox/dark-v11",
      center: [0, 0],
      zoom: 2,
    });

    mapRef.current = map;

    map.on("load", () => {
      ensureWeatherLayer(map, dayRef.current);
    });

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      mapRef.current = null;
      map.remove();
    };
  }, [ensureWeatherLayer]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (lat == null || long == null) return;

    const map = mapRef.current;

    const runFly = () => {
      map.flyTo({
        center: [long, lat],
        zoom: 9,
        duration: 2000,
        essential: true,
      });
    };

    if (map.loaded()) {
      requestAnimationFrame(runFly);
    } else {
      map.once("load", () => {
        requestAnimationFrame(runFly);
      });
    }

    if (markerRef.current) markerRef.current.remove();

    markerRef.current = new mapboxgl.Marker({ color: "red", scale: 0.6 })
      .setLngLat([long, lat])
      .addTo(map);
  }, [lat, long]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    map.setStyle(
      day
        ? "mapbox://styles/mapbox/outdoors-v12"
        : "mapbox://styles/mapbox/dark-v11",
    );

    ensureWeatherLayer(map, day);
  }, [day, ensureWeatherLayer]);

  return (
    <>
      <div ref={mapContainerRef} className="h-full w-full min-h-full" />
    </>
  );
}

export default Map;
