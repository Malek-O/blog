import { fetchArticle } from "@/lib/data"
import { convertTime, unslugify } from "@/lib/utils";
import { notFound } from "next/navigation";
export default async function page({ params }: { params: { slug: string } }) {

    const article = await fetchArticle(params.slug)

    if (!article) {
        notFound();
    }

    return (
        <article className="md:px-0 px-5 max-w-[868px] mx-auto p-2 my-20 relative">
            <h1 className="text-center text-5xl font-bold font-serif first-letter:capitalize" >{unslugify(article.article_title)}</h1>
            <h6 className="text-center font-light mt-5">{article.user.author_name} - {convertTime(article.createdAt.toString())} ({article.article_time} mins read)</h6>
            <h6 className="text-center font-light mt-2">#{article.tags.tag_name}</h6>

            <div className="break-words mt-10 quill-class" dangerouslySetInnerHTML={{ __html: article.article_content }}>
            </div>

        </article>
    )
}
