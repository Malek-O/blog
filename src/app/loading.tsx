import { Skeleton } from "@/components/ui/skeleton"
import ArticleSkeleton from "./components/article-skeleton"

export default function Loading() {
  return (
    <main className="flex flex-col items-center ">
      <h5 className="bg-[#FAFAFA] dark:bg-[#202020] p-2 rounded-md shadow-md w-48 mx-auto text-center mt-5">
        <Skeleton className="rounded-xl w-40 mx-auto  dark:border-white p-3 px-10" />
      </h5>
      <div className="max-w-[900px] text-center mt-5">
        <h1 className="dark:text-white md:text-6xl sm:text-4xl text-xl  text-black">
          <Skeleton className="rounded-xl w-96 mt-14  dark:border-white p-3 px-10" />
        </h1>
        <p className="text-[#8D8D8D] text-lg mt-5 px-3 md:px-0">
          <Skeleton className="rounded-xl w-72 mx-auto  dark:border-white p-2 px-10" />
        </p>
      </div>

      <article >
        <h1 className="text-center font-bold mt-14 text-2xl font-serif after:content-none after:border-red-500 border2">
          <Skeleton className="rounded-xl w-40 mx-auto dark:border-white p-2 px-10" />
        </h1>

        <ArticleSkeleton />
        <div className="flex justify-center my-10">
          <Skeleton className="rounded-xl w-20  dark:border-white py-5 px-20" />
        </div>
      </article>

    </main>
  )
}
