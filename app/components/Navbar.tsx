"use client"

import { usePathname } from "next/navigation"
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar(){
    const Pathname = usePathname();

    if(Pathname === '/signin' || Pathname === '/signup'){
        return;
    }

    return (
        <nav className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
            <Link href="/reivew" className="text-4xl font-bold">
                CourseHub
            </Link>
            <div className="space-x-4">
                <button className="bg-red-500 p-2 rounded"
                onClick={()=> signOut({callbackUrl: '/signin'})}>LogOut</button>
            </div>
        </nav>
    )
}