import { useWeatherData } from "../context/WeatherDataContext";
import "../styles/temp.css";

export default function Temperature() {
  const { data, isLoading } = useWeatherData();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="temp-ui">
      <span>{data?.current?.temperature_2m}°</span>
    </div>
  );
}
