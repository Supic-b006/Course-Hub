"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setMessage("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
                return;
            }

            setMessage("✅ เข้าสู่ระบบสำเร็จ!");
            router.push("/review"); // นำทางไปที่หน้า review
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error);
            setMessage("❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 dark:from-gray-900 dark:to-black p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
                <h1 className = 'text-5xl blod text-orange-400'>Course-hub</h1>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">เข้าสู่ระบบ</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="อีเมล"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />

                    <input
                        type="password"
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-blue-500 dark:hover:bg-green-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <hr className="my-5" />

                <button
                    onClick={() => router.push("/signup")}
                    className="w-full bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
                >
                    Register
                </button>

                {message && (
                    <p className={`mt-3 text-sm font-medium ${message.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
