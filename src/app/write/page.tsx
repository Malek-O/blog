import RichTextEditor from "../components/RichTextEditor";

export default function page() {

    return (
        <section className="px-5 md:px-10 mt-20 flex flex-col relative">
            <h1 className="text-2xl text-center font-bold font-serif ">Write a post ✍</h1>
            <RichTextEditor />
        </section>
    )
}

