import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import SearchBar from "../components/search-bar";
import ArticlesData from "../components/articles-data";
import Pagination from "../components/pagination";
import { fetchArticlesPages } from "@/lib/data";
import ScatteredTags from "../components/scattered-tags";

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
            <ScatteredTags tags={tagsRows} />
            <ArticlesData currentPage={currentPage} query={query} />
            <div className="my-10 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </section>
    )
}
