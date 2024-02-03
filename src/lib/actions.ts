"use server"

import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { slugify } from "./utils";
import { cookies } from "next/headers";
export async function addPost(prevState: any, formData: FormData) {


    const min = formData.get('minutes') as string;
    const cat = formData.get('cat') as string
    const title = formData.get('title') as string;
    const article = formData.get('article') as string
    let cleanedText = article.replace(/(<p><br><\/p>)+/g, '<p><br></p>').trim();
    

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
    if (!cleanedText.length || cleanedText.length < 250) {
        return {
            message: 'Article should be at least 250 characters',
        }
    }


    let status = 500;
    let text;
    try {

        const response = await fetch('http://localhost:3000/api/write', {
            method: 'POST',
            headers: { Cookie: cookies().toString() },
            body: formData
        })
        const data = await response.json()
        text = data

        status = response.status

    } catch (error) {
        console.log(error);
    }

    if (status == 201) {
        redirect(`/blog/${slugify(title)}`)
    } else {
        return {
            message: text ? text.message : "Something went wrong",
        }
    }
}

export async function deletePost(id: string) {

    const session = await getServerSession()
    try {
        const userRow = await prisma.user.findUnique({ where: { author_email: session?.user?.email ?? "" } })

        const deletedArt = await prisma.article.delete({
            where: {
                article_id: id,
                user_id: userRow?.user_id ?? ""
            }
        })

        revalidatePath('/profile')
        return { message: 'Deleted Article.' };

    } catch (error) {
        console.log(error);
        return { message: 'Database Error: Failed to Delete Article.' };
    }
}
