import dayBg from "../assets/day1.jpeg";
import nightBg from "../assets/night1.jpeg";
import { useWeatherData } from "../context/WeatherDataContext";
import WeatherEffects from "./WeatherEffects";

export default function WeatherBg({ children }) {
  const { data } = useWeatherData();
  const isDay = data?.current?.is_day;
  const bgImage = isDay ? dayBg : nightBg;

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        position: "relative",
      }}
    >

      <WeatherEffects />

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: isDay
            ? "rgba(180, 210, 255, 0.06)"
            : "rgba(5, 8, 30, 0.28)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
