import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent} from "@/components/ui/card";

const LoadingSkeleton = () => {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen items-center p-4">
      {/* Botão de voltar */}
      <div className="w-[400px] mt-3 mb-5">
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>

      {/* Tabs */}
      <div className="w-[400px]">
        <div className="grid w-full grid-cols-3 gap-2 mb-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Conteúdo da Tab "Conta" */}
        <div>
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-3/4 mb-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="flex justify-between gap-2">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-10 w-1/2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo da Tab "Redes Sociais" */}
        <div className="mt-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-3/4 mb-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo da Tab "Senha" */}
        <div className="mt-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-3/4 mb-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default LoadingSkeleton;