import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useWeatherData } from "../context/WeatherDataContext";

function Map() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const { data, day } = useWeatherData();

  const long = data?.longitude;
  const lat = data?.latitude;

  useEffect(() => {
    if (!long || !lat) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: day
        ? "mapbox://styles/mapbox/outdoors-v12"
        : "mapbox://styles/mapbox/dark-v11",
      config: {
        basemap: {
          lightPreset: day ? "day" : "night",
        },
      },
      center: [long, lat],
      zoom: 9,
    });

    mapRef.current = map;

    map.on("load", () => {
      const key = import.meta.env.VITE_OPENWEATHER_KEY;

      map.addSource("weather-data", {
        type: "raster",
        tiles: [
          `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${key}`,
        ],
        tileSize: 256,
      });

      new mapboxgl.Marker({ color: "red", scale: 0.6 })
        .setLngLat([long, lat])
        .addTo(mapRef.current);

      map.addLayer({
        id: "weather-layer",
        type: "raster",
        source: "weather-data",
        paint: {
          "raster-opacity": 0.85,
          "raster-contrast": day ? 0.6 : 0.4,
          "raster-saturation": day ? 0.7 : 0.5,
        },
      });
    });

    return () => {
      map.remove();
    };
  }, [long, lat]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%", borderRadius: "20px" }}
    />
  );
}

export default Map;
