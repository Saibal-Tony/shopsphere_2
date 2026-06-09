export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl aspect-[3/4] mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-4 bg-gray-200 rounded-full w-1/3 mt-2" />
      </div>
    </div>
  );
}
