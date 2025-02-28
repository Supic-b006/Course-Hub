'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
                setMessage("✅ สมัครสมาชิกสำเร็จ!");
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
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-5xl font-bold text-orange-400 text-center">Course-hub</h1>
                <h2 className="text-2xl font-bold text-center mb-4">สมัครสมาชิก</h2>

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

                    {/* ปรับให้ปุ่ม Eye อยู่ใน input field */}
                    <div className="relative">
                        <input
                            className="w-full p-3 pr-10 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="🔑 รหัสผ่าน"
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>

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

                {message && (
                    <p className={`mt-3 text-sm font-medium ${message.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
