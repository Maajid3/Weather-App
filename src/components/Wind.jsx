import useWeatherData from "../context/useWeatherData";
import AirIcon from "@mui/icons-material/Air";

export default function Wind() {
  const { data, isLoading, day } = useWeatherData();
  const wind = data?.weather?.current?.wind_speed_10m;

  if (isLoading) {
    return (
      <p className="rounded-2xl border border-white/20 bg-white/15 p-4 text-sm text-slate-700/80 backdrop-blur-xl dark:text-slate-200/70">
        Loading...
      </p>
    );
  }
  return (
    <>
      <div
        className="flex min-h-30 flex-col justify-between rounded-2xl border border-white/20 bg-white/5 p-4 text-[rgb(var(--app-text))] shadow-[0_12px_40px_rgba(15,23,42,0.14)]"
        title={`Wind : ${wind} Km/h`}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--app-muted))]">
          <AirIcon
            fontSize="small"
            className={day ? "text-cyan-600" : "text-sky-200"}
          />
          <span>Wind</span>
        </div>
        <span className="text-3xl font-bold tracking-tight text-[rgb(var(--app-text))]">
          {wind} Km/h
        </span>
      </div>
    </>
  );
}
