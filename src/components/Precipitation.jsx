import useWeatherData from "../context/useWeatherData";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

export default function Precipitation() {
  const { data, isLoading, day } = useWeatherData();

  if (isLoading) {
    return (
      <p className="rounded-2xl border border-white/20 bg-white/15 p-4 text-sm text-slate-700/80 backdrop-blur-xl dark:text-slate-200/70">
        Loading...
      </p>
    );
  }

  const precipitation = data?.weather?.current?.precipitation;
  return (
    <>
      <div
        className="flex min-h-30 flex-col justify-between rounded-2xl border border-white/20 bg-white/5 p-4 text-[rgb(var(--app-text))] shadow-[0_12px_40px_rgba(15,23,42,0.14)]"
        title={`Precipitation : ${precipitation} mm`}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--app-muted))]">
          <WaterDropOutlinedIcon
            fontSize="small"
            className={day ? "text-blue-600" : "text-sky-200"}
          />
          <span>Precipitation</span>
        </div>
        <span className="text-3xl font-bold tracking-tight text-[rgb(var(--app-text))]">
          {precipitation} mm
        </span>
      </div>
    </>
  );
}
