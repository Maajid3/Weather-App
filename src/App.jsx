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
import StarsField from "./components/StarsField.jsx";
import DayField from "./components/DayField.jsx";

const Map = lazy(() => import("./components/Map.jsx"));

function App() {
  const { city, data, isLoading, isError, day, locErr, handleLocation } =
    useWeatherData();
  const loc = data?.cityName.split(",")?.[0];
  const panelClass = day
    ? "border-white/35 bg-white/25 shadow-[0_18px_60px_rgba(15,23,42,0.18)]"
    : "border-white/15 bg-slate-950/30 shadow-[0_18px_60px_rgba(2,6,23,0.35)]";

  const networkErrorProps = {
    title: "Network error",
    message: "Please check your internet connection and retry.",
    actionLabel: "Retry",
    variant: "network",
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950/90">
        <Loader />
      </div>
    );
  return (
    <>
      <div className="fixed inset-0 z-0 h-dvh w-full overflow-hidden bg-linear-to-br from-sky-200 via-cyan-100 to-blue-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_45%)] opacity-80" />
        <div className="absolute inset-0 h-full w-full">
          {day ? <DayField /> : <StarsField />}
        </div>
      </div>
      <main
        className={`relative z-10 min-h-dvh w-full overflow-y-auto px-3 py-3 transition-colors duration-300 sm:px-4 lg:px-6 ${day ? "day-mode text-[rgb(var(--app-text))]" : "night-mode text-[rgb(var(--app-text))]"}`}
      >
        <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col gap-4 lg:overflow-hidden lg:gap-5">
          <SearchCity city={city} />
          <section className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-stretch">
            <div
              className={`rounded-[28px] border border-white/20 p-4 sm:p-5 lg:p-6 lg:min-h-[min(100%,760px)]`}
            >
              {isError && !data ? (
                <div className="flex min-h-80 items-center justify-center sm:min-h-105">
                  <Error {...networkErrorProps} />
                </div>
              ) : !data ? (
                <div className="flex min-h-80 items-center justify-center sm:min-h-105">
                  <NotFound />
                </div>
              ) : (
                <>
                  <p
                    className="text-center text-4xl font-black tracking-[0.18em] drop-shadow-sm text-[rgb(var(--app-text))] sm:text-5xl lg:text-6xl"
                    title={loc}
                  >
                    {loc}
                  </p>

                  <Temperature city={city} />

                  <p className="mt-2 text-center text-[0.7rem] uppercase tracking-[0.2em] text-[rgb(var(--app-muted))]">
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

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2">
                    <FeelsLike />
                    <Wind />
                    <Humidity />
                    <Precipitation />
                    <HourlyWeather />
                  </div>
                </>
              )}
            </div>
            <Suspense fallback={<MapSkeleton />}>
              <section
                className={`relative min-h-90 overflow-hidden rounded-[28px] border backdrop-blur-xl sm:min-h-105 lg:h-[clamp(420px,65vh,760px)] ${panelClass}`}
              >
                <Map />
              </section>
            </Suspense>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
