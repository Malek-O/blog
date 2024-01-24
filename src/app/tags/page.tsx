import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import SearchBar from "../components/search-bar";
import ArticlesData from "../components/articles-data";
import Pagination from "../components/pagination";
import { fetchArticlesPages } from "@/lib/data";

type articleSearchTypes = {
    searchParams?: {
        query?: string,
        page?: string
    }
}

export default async function page({ searchParams }: articleSearchTypes) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchArticlesPages(query)

    const tagsRows = await prisma.tag.findMany({
        take: 15
    })

    return (
        <section className="flex justify-center mt-28 flex-col">
            <SearchBar placeholder="ReactJS..." />
            <div className="mt-10 max-w-[850px] mx-auto flex-wrap flex gap-3 justify-center">
                {tagsRows.map((item, index) => {
                    if (index < 4) {
                        return (
                            <h1 key={item.tag_id} className="rounded-3xl border-2 border-black p-2">#{item.tag_name}</h1>
                        )
                    }
                })}
            </div>
            <div className="mt-5 max-w-[850px] mx-auto flex-wrap flex gap-3 justify-center">
                {tagsRows.map((item, index) => {
                    if (index >= 4) {
                        return (
                            <h1 key={item.tag_id} className="rounded-3xl border-2 border-black p-2">#{item.tag_name}</h1>
                        )
                    }
                })}
            </div>
            <ArticlesData currentPage={currentPage} query={query} />
            <div className="my-10 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </section>
    )
}
