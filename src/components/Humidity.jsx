import { useWeatherData } from "../context/WeatherDataContext";

import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";

export default function Humidity() {
  const { data, isLoading, day } = useWeatherData();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const humidity = data?.weather?.current?.relative_humidity_2m;

  return (
    <>
      <div className="humidity-ui" title={`Wind : ${humidity} %`}>
        <div className="headline">
          <OpacityOutlinedIcon
            fontSize="small"
            sx={{ color: day ? "inherit" : "#ffffff" }}
          />
          <span>Humidity </span>
        </div>
        <span>{humidity} %</span>
      </div>
    </>
  );
}
