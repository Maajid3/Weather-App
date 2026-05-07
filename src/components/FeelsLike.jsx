import useWeatherData from "../context/useWeatherData";
import ThermostatIcon from "@mui/icons-material/Thermostat";

export default function FeelsLike() {
  const { data, isLoading, day } = useWeatherData();

  if (isLoading) {
    return (
      <p className="rounded-2xl border border-white/20 bg-white/15 p-4 text-sm text-slate-700/80 backdrop-blur-xl dark:text-slate-200/70">
        Loading...
      </p>
    );
  }
  const apprTemp = data?.weather?.current?.apparent_temperature;

  return (
    <>
      <div
        className="flex min-h-30 flex-col justify-between rounded-2xl border border-white/20 bg-white/5 p-4 text-[rgb(var(--app-text))] shadow-[0_12px_40px_rgba(15,23,42,0.14)]"
        title={
          apprTemp ? `temperature : ${apprTemp}°` : "Temperature unavailablle"
        }
      >
        <div className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--app-muted))]">
          <ThermostatIcon
            fontSize="small"
            titleAccess={
              apprTemp ? `Feels LiKe : ${apprTemp}` : "Temperature unavailablle"
            }
            className={day ? "text-amber-500" : "text-sky-200"}
          />
          <span>Feels Like</span>
        </div>
        <span className="text-3xl font-bold tracking-tight text-[rgb(var(--app-text))]">
          {apprTemp}°
        </span>
      </div>
    </>
  );
}
