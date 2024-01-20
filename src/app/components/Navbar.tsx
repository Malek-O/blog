import Link from "next/link";
import LoginButton from "./login-button";
import ToggleMode from "./light-dark-toggle";
import { Button } from "@/components/ui/button";
import NavDrawer from "./nav-drawer";

export default function Navbar() {
    return (
        <header>
            <nav className="px-10 py-5 md:flex items-center justify-between hidden ">
                <div className="flex items-center gap-28">
                    <div className="dark:bg-white px-8 py-6 relative bg-black">
                        <h1 className="dark:text-black text-white font-bold text-lg absolute left-10 top-3">nu<span className="dark:text-white text-black" >ntium.</span></h1>
                    </div>
                    <ul className="flex gap-5">
                        <li className="text-lg">
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li className="text-lg">
                            <Link href={"/"}>Tags</Link>
                        </li>
                        <li className="text-lg">
                            <Link href={"/"}>About</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-3">
                    <LoginButton />
                    <ToggleMode />
                </div>
            </nav>
            <nav className="flex items-center justify-between px-5 py-5 md:hidden">
                <div className="flex items-center gap-28">
                    <div className="dark:bg-white px-8 py-6 relative bg-black">
                        <h1 className="dark:text-black text-white font-bold text-lg absolute left-10 top-3">nu<span className="dark:text-white text-black" >ntium.</span></h1>
                    </div>
                </div>
                <NavDrawer />
            </nav>
        </header>
    )
}
