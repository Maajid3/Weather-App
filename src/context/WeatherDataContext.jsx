import { useContext, createContext, useState, useEffect } from "react";
import useData from "../api/customHook/useData";

const Context = createContext(null);

export const useWeatherData = () => useContext(Context);

export default function WeatherProvider({ children }) {
  const [city, setCity] = useState(() => {
    return localStorage.getItem("city") || "Nagpur";
  });

  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  const { data, isLoading, isError  } = useData(city);
  

  const day = data?.current?.is_day;

  return (
    <Context.Provider
      value={{
        data,
        isLoading,
        isError,
        city,
        setCity,
        day,
      }}
    >
      {children}
    </Context.Provider>
  );
}
