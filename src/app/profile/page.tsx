import { getServerSession } from 'next-auth'
import Image from 'next/image';
import { redirect } from 'next/navigation'
import UserArticles from '../components/user-articles';
import { fetchUserArticlesPages } from '@/lib/data';
import { Suspense } from 'react';
import ArticleSkeleton from '../components/article-skeleton';
import Pagination from '../components/pagination';


type UserArticleTypes = {
    searchParams?: {
        page?: string
    }
}

export default async function page({ searchParams }: UserArticleTypes) {

    const session = await getServerSession()
    let currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchUserArticlesPages()
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }
    return (
        <>
            <section className='flex justify-center items-center sm:flex-row flex-col text-center sm:text-left px-5 md:px-0 max-w-[600px] mx-auto gap-3 mt-20'>
                <Image src={session.user.image || "/hero.png"} width={100} height={100} className='rounded-full' alt='pfp' />
                <div>
                    <h1 className='text-lg font-bold'>{session.user.name}</h1>
                    <h6 className='text-black/35'>@{session.user.name}</h6>
                    <p>
                        This is your profile. You have full control over your blogs here. You can create new posts, and delete any that you no longer want to keep. Navigate effortlessly between your blogs using the intuitive interface. Make your online presence truly yours.
                    </p>
                </div>
            </section>
            <h1 className="text-center font-bold mt-14 text-2xl font-serif after:content-none ">My Articles</h1>
            <Suspense key={currentPage} fallback={<ArticleSkeleton />}>
                <UserArticles currentPage={currentPage} />
            </Suspense>
            <div className="my-10 flex w-full justify-center">
                {totalPages > 0 ?
                    <Pagination totalPages={totalPages} />
                    : <h2 className='font-bold'>You dont have articles yet :) </h2>}
            </div>


        </>
    )
}
