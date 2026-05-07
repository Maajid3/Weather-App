import useWeatherData from "../context/useWeatherData";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Geocoder } from "@mapbox/search-js-react";
import { FmdBadOutlined } from "@mui/icons-material";

export default function SearchCity() {
  const accessToken = import.meta.env.VITE_MAPBOX_API;
  const { handleRetrieve, handleLocation, locErr } = useWeatherData();

  const handleSuggestError = (error) => {
    console.error("Mapbox Geocoder suggest error:", error);
  };

  const handleLocationClick = (e) => {
    e.preventDefault();
    handleLocation();
  };

  return (
    <>
      <div className="z-15 flex w-full items-center justify-center gap-3 rounded-full mt-0.5 px-1 py-1 shadow-[0_10px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl lg:mx-auto lg:max-w-4xl focus-within:ring-1 focus-within:ring-blue-600">
        <div className="w-full ">
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
        </div>
        <button
          type="button"
          onClick={handleLocationClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-900/10 text-slate-900 transition hover:scale-105 hover:bg-slate-900/20 dark:text-white"
          aria-label="Use current location"
        >
          <NearMeIcon
            titleAccess="Get Location"
            fontSize="small"
            className="transition-colors hover:text-red-500 cursor-pointer"
          />
        </button>
        {locErr && (
          <div className="mr-1">
            <FmdBadOutlined color="warning" />
            <p className="text-red-500 text-sm font-semibold">error</p>
          </div>
        )}
      </div>
    </>
  );
}
