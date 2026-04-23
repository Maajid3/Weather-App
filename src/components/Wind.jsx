import useWeatherData from "../context/useWeatherData";
import AirIcon from "@mui/icons-material/Air";

export default function Wind() {
  const { data, isLoading, day } = useWeatherData();
  const wind = data?.weather?.current?.wind_speed_10m;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="wind-ui" title={`Wind : ${wind} Km/h`}>
        <div className="headline">
          <AirIcon
            fontSize="small"
            sx={{ color: day ? "inherit" : "#ffffff" }}
          />
          <span>Wind </span>
        </div>
        <span>{wind} Km/h</span>
      </div>
    </>
  );
}
