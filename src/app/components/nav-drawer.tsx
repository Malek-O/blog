'use client'
import Link from "next/link";
import LoginButton from "./login-button";
import ToggleMode from "./light-dark-toggle";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerOverlay,
    DrawerTitle,
    DrawerPortal
} from "@/components/ui/drawer"
export default function NavDrawer() {
    return (
        <Drawer direction="bottom">
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                    </svg>
                </Button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerContent className="border-none dark:bg-white bg-black flex flex-col rounded-t-[10px] h-full fixed bottom-0 right-0">
                    <div className="p-4 dark:bg-white bg-black flex-1 h-full">
                        <main className="flex justify-between">
                            <div className="mt-5 ">
                                <ul className="flex flex-col gap-5 dark:text-black text-white">
                                    <li className="text-lg font-bold">
                                        <Link href={"/"}>Home</Link>
                                    </li>
                                    <li className="text-lg font-bold">
                                        <Link href={"/"}>Tags</Link>
                                    </li>
                                    <li className="text-lg font-bold">
                                        <Link href={"/"}>About</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-5">
                                <ToggleMode />
                            </div>
                        </main>
                        <LoginButton />
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}
