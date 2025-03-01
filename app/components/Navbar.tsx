"use client";
import { useState } from "react"; // เพิ่มบรรทัดนี้
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiMenu } from "react-icons/fi";
import { useSidebar } from "./SidebarContext";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const { toggleSidebar } = useSidebar();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    if (pathname === "/signin" || pathname === "/signup") {
        return null;
    }

    return (
        status === "authenticated" &&
        session?.user && (
            <nav className="bg-black text-white px-8 py-4 flex items-center justify-between shadow-lg h-16 fixed top-0 left-0 w-full z-50">
                {/* Hamburger Menu และ Logo */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleSidebar}
                        className="text-2xl text-white hover:text-gray-400 focus:outline-none"
                    >
                        <FiMenu />
                    </button>
                    <Link href="/review" className="text-4xl font-bold tracking-wide">
                        CourseHub
                    </Link>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 mx-8">
                    <div className="relative max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button 
                            type="submit" 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            <FiSearch />
                        </button>
                    </div>
                </form>
            </nav>
        )
    );
}