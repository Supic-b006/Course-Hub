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
            setTimeout(() => {
                router.replace("/review");
            }, 500);
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error);
            setMessage("❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-[]">
            <h1 className="text-[80px] font-bold text-orange-400 mb-8 font-Agbalumo">Course-hub</h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-[450px] text-center">

                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">เข้าสู่ระบบ</h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="อีเมล"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="รหัสผ่าน"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>

                <div className="my-4 text-gray-500">
                    <hr />
                </div>

                <button
                    onClick={() => router.push("/signup")}
                    className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-500 transition duration-300"
                >
                    สมัครสมาชิก
                </button>

                {message && (
                    <p className={`mt-4 text-sm font-medium ${message.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>

    );
}
