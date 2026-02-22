import { useWeatherData } from "../context/WeatherDataContext";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

export default function Precipitation() {
  const { data, isLoading,day } = useWeatherData();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="precipitation-ui" title={`Wind : ${data?.current?.precipitation} mm`}>
        <div className="headline">
          <WaterDropOutlinedIcon fontSize="small" sx={{ color: day ? "inherit" : "#ffffff" }}/>
          <span>Precipitation </span>
        </div>
        <span>{data?.current?.precipitation} mm</span>
      </div>
    </>
  );
}
