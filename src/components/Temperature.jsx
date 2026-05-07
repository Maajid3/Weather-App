import useWeatherData from "../context/useWeatherData";

export default function Temperature() {
  const { data, isLoading } = useWeatherData();

  if (isLoading) {
    return (
      <p className="py-8 text-center text-sm text-slate-700/80 dark:text-slate-200/70">
        Loading...
      </p>
    );
  }

  return (
    <div
      className="mt-2 flex items-center justify-center py-2"
      title={`Temperature : ${data?.weather?.current?.temperature_2m}°`}
    >
      <span className="bg-linear-to-b from-[rgb(var(--app-text))] via-[rgb(var(--app-text))] to-[rgb(var(--app-muted))] bg-clip-text text-7xl font-black leading-none text-transparent drop-shadow-[0_6px_24px_rgba(15,23,42,0.18)] sm:text-8xl lg:text-[7rem]">
        {data?.weather?.current?.temperature_2m}°
      </span>
    </div>
  );
}
