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
      <div className="hour-forecast-ui">
        <div className="headline">
          <QueryBuilderOutlinedIcon
            fontSize="small"
            sx={{ color: day ? "inherit" : "#ffffff" }}
          />
          <span>Hourly weather</span>
        </div>
        <div className="hourly-container" ref={hourlyref}>
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
              <div className="hourly-weather" key={data.timeFormat}>
                <span>{data.timeFormat}</span>
                {icon}
                <span> {data.temperature}°</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default memo(HourlyWeather);