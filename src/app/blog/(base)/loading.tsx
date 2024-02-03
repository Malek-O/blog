import { Skeleton } from "@/components/ui/skeleton"
import ArticleSkeleton from "../../components/article-skeleton"

export default function Loading() {
  return (
    <section className="flex justify-center mt-28 flex-col">
      <Skeleton className="w-[250px] mx-auto p-5 " />
      <div className="mt-10 max-w-[850px] mx-auto flex-wrap flex gap-3 justify-center">
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-20" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-12" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-14" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-8" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-10" />
      </div>
      <div className="mt-5 max-w-[850px] mx-auto flex-wrap flex gap-3 justify-center">
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-4" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-20" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-14" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-8" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-14" />
        <Skeleton
          className="rounded-3xl border-2 w-20 border-black/20 dark:border-white p-4 px-14" />
      </div>
      <ArticleSkeleton />
    </section>
  )
}
