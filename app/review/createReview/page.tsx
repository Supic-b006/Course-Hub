'use client'

import { useState } from "react"

export default function ReviewPage() {

    const [rating, setRating] = useState<number | undefined>();
    const [course, setCourse] = useState("");
    const [comment, setComment] = useState("");

    
    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-blue-900 shadow-lg rounded-lg text-white">
            <h1 className="text-3xl font-bold text-center mb-6">✍️ เขียนรีวิวของฉัน</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold mb-1">📚 ชื่อคอร์ส</label>
                    <input
                        className="w-full p-3 border border-blue-700 rounded bg-white text-black"
                        type="text"
                        placeholder="กรอกชื่อคอร์ส"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">📝 คอมเมนต์</label>
                    <textarea
                        className="w-full p-3 border border-blue-700 rounded bg-white text-black h-40"
                        placeholder="เขียนรีวิวของคุณที่นี่..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">⭐ ให้คะแนน</label>
                    <input
                        className="w-full p-3 border border-blue-700 rounded bg-white text-black"
                        type="number"
                        min="1"
                        max="5"
                        placeholder="ให้คะแนน (1-5)"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-xl font-bold p-3 text-center w-full text-white rounded transition duration-200"
                >
                    ➕ เพิ่มรีวิว
                </button>
            </form>
        </div>
    )
}
