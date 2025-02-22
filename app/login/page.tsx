"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {

        setMessage("");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        
        if (res.ok) {
            setMessage("✅ เข้าสู่ระบบสำเร็จ!");
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/home");
        } else {
            setMessage("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
    };

    const handleRegister = async () => {
        router.push("/register");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 dark:from-gray-900 dark:to-black p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">เข้าสู่ระบบ</h2>
                
                <input
                    type="email"
                    placeholder="อีเมล"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                
                <input
                    type="password"
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                
                <button
                    onClick={handleLogin}
                    className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-blue-500 dark:hover:bg-green-600 transition duration-300"
                >
                    Login
                </button>
                <hr className = "mt-5"/>
                <button
                onClick = {handleRegister}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-300 mt-5"
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
