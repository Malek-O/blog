import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function DeleteBtnSkeleton() {
    return (
        <Button variant={"outline"} className="mt-3">
            <Skeleton className="h-6 w-[20px]" />
        </Button>
    )
}
