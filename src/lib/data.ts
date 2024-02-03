import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from './prisma';
import { notFound, redirect } from 'next/navigation';

const ITEMS_PER_PAGE = 15;

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
export async function fetchArticle(str: string[]) {
    noStore();
    if (str.length !== 2) notFound()
    try {
        const row = await prisma.article.findFirst({
            where: {
                article_title: str[1],
                article_id: str[0]
            },
            include: {
                tags: true,
                user: true
            }
        })
        if (row) return row
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
    notFound()
}

export async function fetchUserArticles(
    currentPage: number,
) {
    noStore();
    const offset = ((currentPage > 0 ? currentPage : 1) - 1) * ITEMS_PER_PAGE;
    try {
        const rows = await prisma.article.findMany({
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

export async function fetchUserArticlesPages() {
    noStore();

    try {
        const count = await prisma.article.count()

        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}