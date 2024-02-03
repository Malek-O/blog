import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { convertTime } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import ArticleSkeleton from "./components/article-skeleton";

export default async function Home() {


  const featuredArticles = await prisma.article.findMany({
    take: 3,
    include: {
      tags: true,
      user: true,
    }
  })


  return (
    <main className="flex flex-col items-center ">
      <h5 className="bg-[#FAFAFA] dark:bg-[#202020] p-2 rounded-md shadow-md w-48 mx-auto text-center mt-5">nuntium. is online !</h5>
      <div className="max-w-[900px] text-center mt-5">
        <h1 className="dark:text-white md:text-6xl sm:text-4xl text-3xl  text-black"><span className="font-bold">nuntium!</span>,Explore Limitless Insights and Inspiration</h1>
        <p className="text-[#8D8D8D] text-lg mt-5 px-3 md:px-0">Your Gateway to Thoughtful Content and Engaging Stories</p>
      </div>

      <article >
        <h1 className="text-center font-bold mt-14 text-2xl font-serif after:content-none after:border-red-500 border2">Featured Articles</h1>


        <Suspense fallback={<ArticleSkeleton />}>
          <div className="grid md:grid-cols-2 grid-cols-1 mt-10 gap-10 md:mx-0 mx-10">
            {featuredArticles.map((article) => {
              return (
                <Link href={`/blog/${article.article_id}/${article.article_title}`} key={article.article_id} className="dark:border-white border-2 p-5 max-w-96">
                  <h5 className="uppercase font-light my-2">{article.tags.tag_name}</h5>
                  <h1 className="font-bold text-lg text-wrap">{article.article_title}</h1>
                  <h6 className="text-sm font-extralight mt-2">{article.user.author_name} - {convertTime(article.createdAt.toString())} ({article.article_time} mins read)</h6>
                </Link>
              )
            })}
          </div>
        </Suspense>

        <div className="flex justify-center my-10">
          <Button variant={"outline"}>
            <Link href={"/blog"}>Explore More</Link>
          </Button>
        </div>
      </article>

    </main>
  );
}
