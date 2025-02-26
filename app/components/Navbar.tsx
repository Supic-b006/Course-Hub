"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    if (pathname === "/signin" || pathname === "/signup") {
        return null;
    }

    return (
        status === "authenticated" &&
        session.user && (
            <nav className="bg-blue-900 text-white px-8 py-4 flex items-center justify-between shadow-md">
                {/* logo */}
                <Link href="/review" className="text-4xl font-bold tracking-wide">
                    CourseHub
                </Link>

                {/* User Info */}
                <p className="text-lg font-medium">👤 ID: {session.user.id}</p>
                <p className="text-lg font-medium">👤 ชื่อ: {session.user.name}</p>

                {/* Logout Button */}
                <button
                    className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-md text-lg font-medium"
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                >
                    🚪 Log Out
                </button>
            </nav>
        )
    );
}
