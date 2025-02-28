"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
            router.push("/review");
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error);
            setMessage("❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
                <h1 className="text-5xl font-bold text-orange-400">Course-hub</h1>
                <h2 className="text-2xl font-semibold text-white mb-4">เข้าสู่ระบบ</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="อีเมล"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
                        required
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="รหัสผ่าน"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 "
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
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
