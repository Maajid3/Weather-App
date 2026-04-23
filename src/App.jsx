import "./App.css";
import SearchCity from "./components/SearchCity";
import Temperature from "./components/Temperature";
import Wind from "./components/Wind";
import Humidity from "./components/Humidity";
import Precipitation from "./components/Precipitation";
import FeelsLike from "./components/FeelsLike";
import useWeatherData from "./context/useWeatherData";
import HourlyWeather from "./components/HourlyWeather";
import Loader from "./fallbacks/Loader";
import Error from "./fallbacks/Error";
import NotFound from "./fallbacks/NotFound";
import MapSkeleton from "./skeleton/MapSkeleton.jsx";
import { lazy, Suspense } from "react";

const Map = lazy(() => import("./components/Map.jsx"));

function App() {
  const { city, data, isLoading, isError, day } = useWeatherData();
  const loc = data?.cityName.split(",")?.[0];

  if (isLoading)
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  if (isError)
    return (
      <div className="loader-container">
        <Error />
      </div>
    );

  return (
    <>
      <main className={`app-container ${day ? "day-mode" : "night-mode"}`}>
        <div className="search-wrapper">
          <SearchCity city={city} />
        </div>
        <section className="weather-data">
          {!data ? (
            <div className="loader-container">
              <NotFound />
            </div>
          ) : (
            <>
              <div className="hero-section">
                <p className="city-label" title={loc}>
                  {loc}
                </p>

                <div className="temp-card">
                  <Temperature city={city} />
                </div>
                <p className="datetime">
                  {new Date(data?.weather?.current?.time).toLocaleDateString(
                    undefined,
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <FeelsLike />
                </div>
                <div className="stat-card">
                  <Wind />
                </div>
                <div className="stat-card">
                  <Humidity />
                </div>
                <div className="stat-card">
                  <Precipitation />
                </div>
                <div className="stat-card">
                  <HourlyWeather />
                </div>
              </div>
            </>
          )}
        </section>
        <Suspense fallback={<MapSkeleton />}>
          <section className="map-wrapper">
            <Map />
          </section>
        </Suspense>
      </main>
    </>
  );
}

export default App;
