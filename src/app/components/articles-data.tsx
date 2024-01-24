import { fetchFilteredArticles } from "@/lib/data"
import { convertTime } from "@/lib/utils"

export default async function ArticlesData({ query, currentPage, }: { query: string, currentPage: number }) {

    const articles = await fetchFilteredArticles(query, currentPage)

    return (
        <main className="flex flex-col items-center">
        <article className="mt-10">
            <div className="grid md:grid-cols-2 grid-cols-1 mt-10 gap-10 md:mx-0 mx-10">
                {articles.map((article) => {
                    return (
                        <div key={article.article_id} className="dark:border-white border-2 p-5 max-w-96">
                            <h5 className="uppercase font-light my-2">{article.tags.tag_name}</h5>
                            <h1 className="font-bold text-lg text-wrap">{article.article_title}</h1>
                            <h6 className="text-sm font-extralight mt-2">{article.user.author_name} - {convertTime(article.createdAt.toString())} ({article.article_time} mins read)</h6>
                        </div>
                    )
                })}
            </div>
        </article>
        </main>
    )
}
