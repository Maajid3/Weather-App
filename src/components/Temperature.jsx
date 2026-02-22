import { useWeatherData } from "../context/WeatherDataContext";
import "../styles/temp.css";

export default function Temperature() {
  const { data, isLoading } = useWeatherData();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="temp-ui" title={`Temperature : ${data?.current?.temperature_2m}°`}>
      <span>{data?.current?.temperature_2m}°</span>
    </div>
  );
}
