import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="w-[380px] min-h-screen mx-auto p-4 space-y-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-16 w-full max-w-[300px]" />
      </div>

      {/* Content Items */}
      <div className="space-y-4">
        {/* Generate 3 link-like skeletons */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={`link-${i}`} className="h-14 w-full rounded-lg" />
        ))}

        {/* Generate 2 photo-like skeletons */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={`photo-${i}`} className="aspect-square w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

