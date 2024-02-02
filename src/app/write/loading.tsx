import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <section className="px-5 md:px-10 mt-20 flex flex-col relative">
            <h1 className="text-2xl text-center font-bold font-serif ">Write a post ✍</h1>
            <form >
                <div className="grid w-full max-w-sm items-center gap-3  my-5">
                    <Skeleton className=" h-4 w-20" />
                    <Skeleton className=" h-5 w-40" />
                </div>
                <section className=" my-5">
                    <Skeleton className=" h-5 w-40" />

                </section>
                <Skeleton className="w-full  md:p-12 p-5  h-20" />
                <div className=" mt-5">
                    <Skeleton className="ms-2 h-5 w-40" />
                </div>
            </form>
        </section>
    )
}
