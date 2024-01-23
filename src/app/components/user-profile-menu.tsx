'use client'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function UserProfileMenu() {

    const { data: session } = useSession()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="md:mt-0 mt-5 flex text-black items-center gap-2 dark:text-white">Profile
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel  >{session?.user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup >
                    <DropdownMenuItem asChild>
                        <Link href={'/profile'} className="w-full cursor-pointer"  >My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={'/write'} className="w-full cursor-pointer">Write</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="bg-red-100 dark:bg-red-900 mt-2 cursor-pointer">
                        <Link href={'/api/auth/signout'} className="w-full" >Sign out</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
