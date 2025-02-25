import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        <Skeleton className="h-8 w-48 mx-auto" />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="flex flex-col-reverse">
        {/* Itens Criados (Renderizados) */}
        <div>
          <h2 className="text-lg text-gray-700 font-medium mb-4">
            <Skeleton className="h-6 w-32" />
          </h2>
          <div className="columns-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-4 shadow-md hover:shadow-lg transition-shadow w-fit max-h-fit">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Novos Itens */}
        <div>
          <div className="columns-3 gap-6">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="p-4 shadow-md hover:shadow-lg transition-shadow w-fit max-h-fit">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoadingSkeleton;