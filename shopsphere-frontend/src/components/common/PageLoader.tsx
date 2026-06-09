export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#031716] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Animated logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#0C969C]/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#0A7075] to-[#0C969C] flex items-center justify-center shadow-2xl">
            <span className="text-white text-2xl font-bold tracking-widest">
              S
            </span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-white text-2xl font-bold tracking-[0.3em] uppercase mb-2">
            ShopSphere
          </h1>
          <p className="text-[#0C969C] text-xs tracking-[0.2em] uppercase">
            Premium Fashion Store
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#0A7075] to-[#0C969C] rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
