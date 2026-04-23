import "../styles/search.css";
import useWeatherData from "../context/useWeatherData";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Geocoder } from "@mapbox/search-js-react";

export default function SearchCity() {
  const accessToken = import.meta.env.VITE_MAPBOX_API;
  const { handleRetrieve, handleLocation } = useWeatherData();

  const handleSuggestError = (error) => {
    console.error("Mapbox Geocoder suggest error:", error);
  };

  const handleLocationClick = (e) => {
    e.preventDefault();
    handleLocation();
  };

  return (
    <>
      <div className="search-bar" title="search city">
        <Geocoder
          accessToken={accessToken}
          options={{ language: "en", limit: 6 }}
          onRetrieve={handleRetrieve}
          onSuggestError={handleSuggestError}
          theme={{
            variables: {
              borderRadius: "20px",
            },
          }}
        />
        <button
          type="button"
          className="searchBtn"
          onClick={handleLocationClick}
        >
          <NearMeIcon
            titleAccess="Get Location"
            fontSize="small"
            sx={{
              " &:hover": {
                color: "red",
              },
            }}
          />
        </button>
      </div>
    </>
  );
}
