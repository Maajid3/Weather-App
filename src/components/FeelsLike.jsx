import { useWeatherData } from "../context/WeatherDataContext";
import ThermostatIcon from "@mui/icons-material/Thermostat";

export default function FeelsLike() {
  const { data, isLoading, day } = useWeatherData();


  if (isLoading) {
    return <p>Loading...</p>;
  }
  const apprTemp = data?.weather?.current?.apparent_temperature;

  return (
    <>
      <div
        className="feels-like"
        title={
          apprTemp ? `temperature : ${apprTemp}°` : "Temperature unavailablle"
        }
      >
        <div className="headline">
          <ThermostatIcon
            fontSize="small"
            titleAccess={
              apprTemp
                ? `Feels LiKe : ${apprTemp}`
                : "Temperature unavailablle"
            }
            sx={{ color: day ? "inherit" : "#ffffff" }}
          />
          <span>Feels Like</span>
        </div>
        <span className="weather-reading">{apprTemp}°</span>
      </div>
    </>
  );
}
