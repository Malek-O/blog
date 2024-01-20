'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSession } from "next-auth/react"
export default function LoginButton() {

    const { data: session } = useSession()

    return (
        <>
            {!session?.user ?
                <Button variant="outline" className="p-3 px-10 md:mt-0 mt-10 w-full md:w-0">
                    <Link href={'/api/auth/signin'}>Login</Link>
                </Button>
                : 'Logged in'}
        </>
    )
}
