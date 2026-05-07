import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WifiOffOutlinedIcon from "@mui/icons-material/WifiOffOutlined";
import LocationOffOutlinedIcon from "@mui/icons-material/LocationOffOutlined";
import { useQueryClient } from "@tanstack/react-query";

export default function Error({
  title = "Something went wrong",
  message = "Please try again in a moment.",
  actionLabel = "Reload",
  variant = "generic",
  onAction,
}) {
  const queryClient = useQueryClient();

  const handleClick = () => {
    if (onAction) {
      onAction();
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["weather"] });
  };

  const iconClass = "text-6xl text-red-500";
  const icon =
    variant === "network" ? (
      <WifiOffOutlinedIcon className={iconClass} />
    ) : (
      <ErrorOutlineOutlinedIcon className={iconClass} />
    );

  return (
    <div className="flex max-w-md flex-col items-center gap-4 rounded-[28px] border border-white/20 bg-white/20 px-6 py-8 text-center text-[rgb(var(--app-text))] shadow-[0_18px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl">
      <div className="animate-pulse">{icon}</div>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-[rgb(var(--app-text))]">
          {title}
        </p>
        <p className="text-sm text-[rgb(var(--app-muted))]">{message}</p>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="rounded-full border border-white/25 bg-slate-950/10 px-5 py-2 text-sm font-medium text-[rgb(var(--app-text))] transition hover:-translate-y-0.5 hover:bg-slate-950/20"
      >
        {actionLabel}
      </button>
    </div>
  );
}
