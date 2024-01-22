import { getServerSession } from "next-auth";
import RichTextEditor from "../components/RichTextEditor";
import { redirect } from "next/navigation";

export default async function page() {

    const session = await getServerSession()

    if(!session?.user){
        redirect('/')
    }
    return (
        <section className="px-5 md:px-10 mt-20 flex flex-col relative">
            <h1 className="text-2xl text-center font-bold font-serif ">Write a post ✍</h1>
            <RichTextEditor />
        </section>
    )
}

