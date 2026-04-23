import { useContext } from "react";
import WeatherContext from "./weatherContext";

export default function useWeatherData() {
  return useContext(WeatherContext);
}
