'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [isRegistered, setIsRegistered] = useState(false); // ตรวจสอบว่าสมัครสำเร็จหรือไม่

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (result?.ok) {
                setIsRegistered(true); // ซ่อนฟอร์ม
                return;
            }
            setMessage("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        } catch (error) {
            console.log('error: ', error);
            setMessage("❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96 text-center">
                <h1 className="text-5xl font-bold text-orange-400">Course-hub</h1>

                {/* ถ้าสมัครเสร็จ ให้แสดงข้อความสำเร็จแทนฟอร์ม */}
                {isRegistered ? (
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-green-400 mt-4">✅ สมัครสมาชิกสำเร็จ!</h2>
                        <button 
                            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                            onClick={() => router.push("/signin")}
                        >
                            ↩️ กลับหน้า Login
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">สมัครสมาชิก</h2>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <input
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="email"
                                name="email"
                                placeholder="📧 อีเมล"
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                name="name"
                                placeholder="👤 ชื่อ"
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="password"
                                name="password"
                                placeholder="🔑 รหัสผ่าน"
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition duration-200"
                            >
                                ✅ สมัครสมาชิก
                            </button>
                        </form>
                        <button 
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition duration-200 mt-5"
                            onClick={() => router.push("/signin")}
                        >
                            ↩️ กลับ
                        </button>
                    </>
                )}
                
                {message && (
                    <p className={`mt-3 text-sm font-medium ${message.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
