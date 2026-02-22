import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import "../styles/loader.css";
import { useWeatherData } from "../context/WeatherDataContext";

export default function Error() {
  const { setCity } = useWeatherData();
  const handleClick = () => {
    window.location.reload();
    setCity("");
  };
  return (
    <>
      <div className="error-ui">
        <ErrorOutlineOutlinedIcon
          className="alert"
          sx={{ color: "red", fontSize: "4rem" }}
        />
        <p>Something Went Wrong</p>
        <button onClick={handleClick}>Reload</button>
      </div>
    </>
  );
}
