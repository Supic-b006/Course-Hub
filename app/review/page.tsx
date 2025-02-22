"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);

    useEffect(() => {
        try {
            const userData = localStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                router.push("/login");
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            router.push("/login");
        }
    }, []);
    

    return (
        <div style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
            <h2>🏠 หน้าหลัก</h2>
            {user ? (
                <>
                    <p>👤 ยินดีต้อนรับ, {user.name || "ผู้ใช้"}!</p>
                    <p>🆔 ID: {user.id}</p>
                </>
            ) : (
                <p>กำลังโหลด...</p>
            )}
        </div>
    );
}
