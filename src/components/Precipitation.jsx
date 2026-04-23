import useWeatherData from "../context/useWeatherData";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

export default function Precipitation() {
  const { data, isLoading,day } = useWeatherData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const precipitation = data?.weather?.current?.precipitation
  return (
    <>
      <div className="precipitation-ui" title={`Wind : ${precipitation} mm`}>
        <div className="headline">
          <WaterDropOutlinedIcon fontSize="small" sx={{ color: day ? "inherit" : "#ffffff" }}/>
          <span>Precipitation </span>
        </div>
        <span>{precipitation} mm</span>
      </div>
    </>
  );
}
