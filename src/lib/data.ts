import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from './prisma';

const ITEMS_PER_PAGE = 2;

export async function fetchFilteredArticles(
    query: string,
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const rows = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        article_title: {
                            contains: query
                        }
                    },
                    {
                        tags: {
                            tag_name: {
                                contains: query
                            }
                        }
                    }
                ]
            },
            include: {
                tags: true,
                user: true,
            },
            take: ITEMS_PER_PAGE,
            skip: offset
        })
        return rows;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchArticlesPages(query: string) {
    noStore();

    try {
        const count = await prisma.article.count({
            where: {
                OR: [
                    {
                        article_title: {
                            contains: query
                        }
                    },
                    {
                        tags: {
                            tag_name: {
                                contains: query
                            }
                        }
                    }
                ]
            },
        })

        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}
export async function fetchArticle(slug: string) {
    noStore();
    try {
        const row = await prisma.article.findFirst({
            where:{
                article_title: slug
            },
            include:{
                tags:true,
                user:true
            }
        })

        return row;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}