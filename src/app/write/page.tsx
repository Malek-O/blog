import { getServerSession } from "next-auth";
import RichTextEditor from "../components/RichTextEditor";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
export default async function page() {

    const session = await getServerSession()

    if (!session?.user) {
        redirect('/')
    }

    const tags = await prisma.tag.findMany({
        select: {
            tag_name: true
        }
    })

    const propedTags = tags.map((item) => ({ value: item.tag_name.toLocaleLowerCase(), label: item.tag_name }))

    return (
        <section className="px-5 md:px-10 mt-20 flex flex-col relative">
            <h1 className="text-2xl text-center font-bold font-serif ">Write a post ✍</h1>
            <RichTextEditor tags={propedTags} />
        </section>
    )
}

