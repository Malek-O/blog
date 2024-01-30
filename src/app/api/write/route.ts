import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { limiter } from "../config/limiter";
import createDOMPurify from 'dompurify'
import { JSDOM } from "jsdom"
export async function POST(request: NextRequest) {

    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);

    const origin = request.headers.get('origin')
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ message: "Too many requests" }, {
            status: 429,
            statusText: 'Too Many Requests',
            headers: {
                "Access-Control-Allow-Origin": origin || "*",
                "Content-Type": "text/plain"
            }
        })
    }
    console.log("Remaining tokens: ", remaining);
    const form = await request.formData()
    const min = form.get('minutes') as string;
    const cat = form.get('cat') as string
    const title = form.get('title') as string;
    const article = form.get('article') as string

    const session = await getServerSession()
    console.log(session);
    if (!session?.user) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    try {
        const findTag = await prisma.tag.findFirst({
            where: {
                tag_name: {
                    equals: cat,
                    mode: 'insensitive'
                }
            }
        })
        console.log(findTag, cat);

        if (!findTag) return NextResponse.json({ message: "Cannot find tag" }, { status: 401 })

        const findUser = await prisma.user.findUnique({ where: { author_email: session.user.email as string } })
        if (!findUser) return NextResponse.json({ message: "Forbidden" }, { status: 403 })


        await prisma.article.create({
            data: {
                article_content: DOMPurify.sanitize(article),
                article_time: parseInt(min),
                article_title: slugify(title),
                user_id: findUser.user_id,
                tagId: findTag.tag_id
            }
        })

        return NextResponse.json({ message: "Successfully written" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}