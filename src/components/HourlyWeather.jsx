import { useRef, useEffect, memo } from "react";
import useWeatherData from "../context/useWeatherData";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

function HourlyWeather() {
  const hourlyref = useRef(null);

  const { data, day } = useWeatherData();

  const hourlyData = data?.weather?.hourly;
  const dataBindHourTemp = hourlyData?.time.map((time, index) => ({
    timeFormat: new Date(time).toLocaleTimeString(undefined, {
      hour: "numeric",
      hour12: true,
    }),
    temperature: hourlyData.temperature_2m[index],
  }));

  useEffect(() => {
    const container = hourlyref.current;

    if (!container) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <div className="flex min-h-30 flex-col gap-3 rounded-2xl border border-white/20 bg-white/5 p-4 text-[rgb(var(--app-text))] shadow-[0_12px_40px_rgba(15,23,42,0.14)]  sm:col-span-2">
        <div className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--app-muted))]">
          <QueryBuilderOutlinedIcon
            fontSize="small"
            className={day ? "text-violet-600" : "text-sky-200"}
          />
          <span>Hourly weather</span>
        </div>
        <div
          className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.6)_transparent]"
          ref={hourlyref}
        >
          {dataBindHourTemp?.map((data) => {
            const [hourStr, period] = data.timeFormat.split(" ");
            let hour = parseInt(hourStr);

            // 24 hr
            if (period === "PM" && hour !== 12) hour += 12;
            if (period === "AM" && hour === 12) hour = 0;

            let icon;

            if (hour >= 6 && hour < 12) {
              icon = <WbSunnyIcon sx={{ color: "#FFD54F" }} />;
            } else if (hour >= 12 && hour < 16) {
              icon = <WbSunnyIcon sx={{ color: "#FFB300" }} />;
            } else if (hour >= 16 && hour < 18) {
              icon = <WbTwilightIcon sx={{ color: "#FF7043" }} />;
            } else {
              icon = <BedtimeIcon sx={{ color: "#90CAF9" }} />;
            }

            return (
              <div
                className="flex w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-white/25 bg-white/20 px-2 py-3 text-center text-xs text-[rgb(var(--app-text))] shadow-sm backdrop-blur-md"
                key={data.timeFormat}
              >
                <span className="font-medium">{data.timeFormat}</span>
                {icon}
                <span className="font-semibold">{data.temperature}°</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default memo(HourlyWeather);
