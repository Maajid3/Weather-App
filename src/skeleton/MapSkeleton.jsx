export default function MapSkeleton() {
  return (
    <div className="flex h-full min-h-90 items-center justify-center overflow-hidden rounded-[28px] border border-white/20 bg-white/15 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:min-h-105">
      <div className="relative overflow-hidden rounded-full border border-white/20 bg-white/20 px-6 py-3">
        <span className="relative z-10 text-sm font-semibold tracking-[0.25em] text-[rgb(var(--app-text))]/80">
          Map Loading...
        </span>
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white/25 to-transparent" />
      </div>
    </div>
  );
}
