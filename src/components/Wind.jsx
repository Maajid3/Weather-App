import { useWeatherData } from "../context/WeatherDataContext";
import AirIcon from '@mui/icons-material/Air';

export default function Wind() {
  const { data, isLoading,day } = useWeatherData();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="wind-ui" title={`Wind : ${data?.current?.wind_speed_10m} Km/h`}>
        <div className="headline">
          <AirIcon fontSize="small" sx={{ color: day ? "inherit" : "#ffffff" }}/>
          <span>Wind </span>
          </div>
        <span>{data?.current?.wind_speed_10m} Km/h</span>
      </div>
    </>
  );
}
