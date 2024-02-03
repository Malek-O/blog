import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <article className="md:px-0 px-5 max-w-[868px] mx-auto p-2 my-20 relative">
            <h1 className="text-center text-5xl font-bold font-serif first-letter:capitalize" >
                <Skeleton className="h-8 max-w-40 mx-auto" />
            </h1>
            <h6 className="text-center font-light mt-5">
                <Skeleton className="h-4 max-w-72 mx-auto" />
            </h6>
            <h6 className="text-center font-light mt-4">
                <Skeleton className="h-6 max-w-60 mx-auto" />
            </h6>
            <div className="break-words mt-10 quill-class max-">
                <Skeleton className="h-4 max-w-[868px] my-2" />
                <Skeleton className="h-4 max-w-[720px] my-2" />
                <Skeleton className="h-4 max-w-[520px] my-2" />
                <Skeleton className="h-4 max-w-[700px] my-2" />
                <Skeleton className="h-4 max-w-[820px] my-2" />
                <Skeleton className="h-4 max-w-[640px] my-2" />
                <Skeleton className="h-4 max-w-[630px] my-2" />
                <Skeleton className="h-4 max-w-[680px] my-2" />
                <Skeleton className="h-4 max-w-[440px] my-2" />
                <Skeleton className="h-4 max-w-[640px] my-2" />
            </div>

        </article>
    )
}
