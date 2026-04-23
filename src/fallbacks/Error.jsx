import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import "../styles/loader.css";
import { useQueryClient } from "@tanstack/react-query";

export default function Error() {
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ["weather"] });
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
