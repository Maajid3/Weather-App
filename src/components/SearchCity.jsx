import { useState } from "react";
import "../styles/search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useWeatherData } from "../context/WeatherDataContext";

export default function SearchCity(props) {
  const { setCity, data, day } = useWeatherData();

  const [input, setInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setCity(input);
  };

  return (
    <>
      <div className="search-bar">
        <form onSubmit={handleClick}>
          <input
            style={{
              caretColor: `${day ? "black" : "white"}`,
              color: `${day ? "black" : "white"}`,
            }}
            type="div "
            placeholder="enter city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleClick}
            style={{ width: "8%", margin: "0.5em" }}
          >
            <SearchIcon />
          </button>
        </form>
      </div>
    </>
  );
}
