export default function ContributorsSkeleton() {
  return (
    <div className="mt-12">
      <div className="h-8 w-48 bg-muted/60 rounded-lg animate-pulse mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="text-center">
            <div className="w-20 h-20 rounded-full bg-muted/60 animate-pulse mx-auto" />
            <div className="mt-2 h-6 w-24 bg-muted/60 rounded-lg animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}