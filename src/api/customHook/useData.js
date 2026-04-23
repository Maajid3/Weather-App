import { useQuery } from "@tanstack/react-query";
import { mainApi } from "../apiClient";

export default function useData({ latitude, longitude, city }) {
  const weatherData = async () => {
    const weather = await mainApi(latitude, longitude);

    // console.log(latitude, longitude, city);

    return {
      weather,
      latitude,
      longitude,
      cityName: city || "Current Location",
    };
  };

  return useQuery({
    queryKey: ["weather", city, latitude, longitude],
    queryFn: weatherData,
    enabled: Boolean(city || (latitude != null && longitude != null)),
    placeholderData: (previousData) => previousData,

    useErrorBoundary: false,
  });
}
