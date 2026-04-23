import dayBg from "../assets/day1.jpeg";
import nightBg from "../assets/night1.jpeg";
import useWeatherData from "../context/useWeatherData";
import WeatherEffects from "./WeatherEffects";

export default function WeatherBg({ children }) {
  const { day } = useWeatherData();

  const bgImage = day ? dayBg : nightBg;

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
          background: day
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
