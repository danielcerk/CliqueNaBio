export default function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto my-8 p-4">
      {/* Header Skeleton */}
      <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-8" />

      {/* Status Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Contributors Skeleton */}
      <div className="mt-12">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mx-auto" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-2 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



