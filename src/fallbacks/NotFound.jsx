import NotListedLocationOutlinedIcon from "@mui/icons-material/NotListedLocationOutlined";
import "../styles/loader.css"

export default function NotFound() {
  return (
    <>
      <div className="not-found">
        <NotListedLocationOutlinedIcon
          className="alert"
          sx={{ color: "red", fontSize: "4rem" }}
        />
        <p>City Not Found</p>
      </div>
    </>
  );
}
