import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <Card className="w-full max-w-xl h-fit">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
          <div className="text-center sm:text-left space-y-2 w-full">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-40" />
          </div>
        </CardHeader>
        <CardContent className="pb-1 space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
        </CardContent>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
        <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-2">
          <Skeleton className="h-10 w-full sm:w-32" />
          <Skeleton className="h-10 w-full sm:w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}

