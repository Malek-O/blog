'use client'
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { deletePost } from "@/lib/actions"

export default function DeleteArticle({ id }: { id: string }) {

    const [isClient, setIsClient] = useState(false)
    const deleteArticleWithId = deletePost.bind(null, id)

    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <>
            {isClient &&
                <Dialog>
                    <DialogTrigger className="mt-2">
                        <Button variant={"outline"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-900 dark:text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form action={deleteArticleWithId} className="flex flex-col">
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your article
                                    and remove it from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <Button className="mt-3 w-28" variant={"destructive"}>Delete</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}