import { useWeatherData } from "../context/WeatherDataContext";

import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';


export default function Humidity() {
  const { data, isLoading,day } = useWeatherData();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <div className="humidity-ui">
        <div className="headline">
          <OpacityOutlinedIcon fontSize="small" sx={{ color: day ? "inherit" : "#ffffff" }}/>  
          <span>Humidity </span>
        </div>
        <span>{data?.current?.relative_humidity_2m}</span>
      </div>
    </>
  );
}
