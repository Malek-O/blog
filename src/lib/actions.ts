"use server"

import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export async function addPost(prevState: any, formData: FormData) {

    const session = await getServerSession()

    if (!session?.user) {
        redirect('/')
    }
    const min = formData.get('minutes') as string;
    const cat = formData.get('cat') as string
    const title = formData.get('title') as string;
    const article = formData.get('article') as string

    if (parseInt(min) < 1) {
        return {
            message: 'Please enter a valid minutes count , more than or equal to 1',
        }
    }
    if (!cat.length) {
        return {
            message: 'Please enter a valid catagory',
        }
    }
    if (!title.length || title.length < 3) {
        return {
            message: 'Title should be at least 3 characters',
        }
    }
    if (!article.length || article.length < 250) {
        return {
            message: 'Article should be at least 250 characters',
        }
    }

    const slugify = (str: string) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    try {
        const findTag = await prisma.tag.findFirst({ where: { tag_name: cat } })
        if (!findTag) redirect('/')
        const findUser = await prisma.user.findUnique({ where: { author_email: session?.user?.email as string } })
        if (!findUser) redirect('/')

        const insertArticle = await prisma.article.create({
            data: {
                article_content: article,
                article_time: parseInt(min),
                article_title: slugify(title),
                user_id: findUser.user_id,
                tagId: findTag.tag_id
            }
        })
        
        console.log(insertArticle);

    } catch (error) {
        console.log(error);
    }

    redirect('/')


}
