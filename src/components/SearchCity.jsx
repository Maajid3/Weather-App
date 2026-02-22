import { useState } from "react";
import "../styles/search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useWeatherData } from "../context/WeatherDataContext";

export default function SearchCity(props) {
  const { setCity, data } = useWeatherData();

  const [input, setInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setCity(input);
  };

  const dayNight = data?.current?.is_day;

  return (
    <>
      <div className="search-bar">
        <form onClick={handleClick}>
          <input
            style={{
              caretColor: `${dayNight ? "black" : "white"}`,
              color: `${dayNight ? "black" : "white"}`,
            }}
            type="div "
            placeholder="enter city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button style={{ width: "8%" }}>
            <SearchIcon />
          </button>
        </form>
      </div>
    </>
  );
}
