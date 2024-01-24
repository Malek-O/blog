import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleSkeleton() {
  return (
      <main className="flex flex-col items-center">
          <article className="mt-10">
              <div className="grid md:grid-cols-2 grid-cols-1 mt-10 gap-10 md:mx-0 mx-10">
                  <div  className="dark:border-white border-2 p-5 max-w-96">
                      <Skeleton className="h-4 w-[300px]" />
                      <Skeleton className="h-7 w-[250px] mt-3" />
                      <Skeleton className="h-2 w-[180px] mt-3" />

                  </div>
                  <div className="dark:border-white border-2 p-5 max-w-96">
                      <Skeleton className="h-4 w-[300px]" />
                      <Skeleton className="h-7 w-[250px] mt-3" />
                      <Skeleton className="h-2 w-[180px] mt-3" />
                  </div>
              </div>
          </article>
      </main>
  )
}
