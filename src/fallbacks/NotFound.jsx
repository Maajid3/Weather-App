import NotListedLocationOutlinedIcon from "@mui/icons-material/NotListedLocationOutlined";

export default function NotFound() {
  return (
    <div className="flex max-w-md flex-col items-center gap-4 rounded-[28px] border border-white/20 bg-white/20 px-6 py-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.2)] backdrop-blur-xl">
      <NotListedLocationOutlinedIcon className="animate-pulse text-6xl text-red-500" />
      <p className="text-lg font-semibold text-slate-950 dark:text-white">
        City not found
      </p>
    </div>
  );
}
