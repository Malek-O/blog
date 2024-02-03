import { prisma } from "@/lib/prisma"
import { estimateTimeToRead, getWordCount, slugify } from "@/lib/utils";
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
    const form = await request.formData()
    const cat = form.get('cat') as string
    const title = form.get('title') as string;
    const article = form.get('article') as string
    let cleanedText = article.replace(/(<p><br><\/p>)+/g, '<p><br></p>').trim();

    const wordCount = getWordCount(cleanedText)
    const minutesToRead = estimateTimeToRead(wordCount)

    const session = await getServerSession()
    if (!session?.user) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    try {
        const findTag = await prisma.tag.findFirst({
            where: {
                tag_name: {
                    equals: cat,
                }
            }
        })

        if (!findTag) return NextResponse.json({ message: "Cannot find tag" }, { status: 401 })

        const findUser = await prisma.user.findUnique({ where: { author_email: session.user.email as string } })
        if (!findUser) return NextResponse.json({ message: "Forbidden" }, { status: 403 })


        const row = await prisma.article.create({
            data: {
                article_content: DOMPurify.sanitize(cleanedText),
                article_time: minutesToRead,
                article_title: slugify(title),
                user_id: findUser.user_id,
                tagId: findTag.tag_id
            }
        })
        
        return NextResponse.json({ message: "Successfully written", id: row.article_id }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}