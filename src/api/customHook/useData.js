import { useQuery } from "@tanstack/react-query";
import { cityApi, mainApi } from "../apiClient";

export default function useData(city) {
  const weatherData = async () => {
    const res = await cityApi(city);

    if (
      !res?.results ||
      res.results.length === 0 ||
      res.results[0].status === 404
    ) {
      return null; 
    }

    console.log(res);

    const { latitude, longitude } = res?.results[0];

    return await mainApi(latitude, longitude);
  };

  return useQuery({
    queryKey: ["weather", city],
    queryFn: weatherData,
    enabled: !!city,
    useErrorBoundary: false,
  });
}
