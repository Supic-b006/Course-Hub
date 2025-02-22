'use client'

import { useState } from "react"

export default function ReviewPage() {

    const [rating, setRating] = useState();
    const [course, setCourse] = useState("");
    const [comment, setComment] = useState("");

    return (
        <div className="max-w-2xl mx-auto p-6 bg-blue-900 shadow-lg rounded-lg mt-10 p-5">
            <form className="mb-4">
                <h1 className="text-4xl font-bold">✍️ เขียนรีวิวของฉัน</h1>
                <input className="text-black w-full p-2 border rounded mb-2"
                    type="text"
                    placeholder="📚 ชื่อคอร์ส">
                </input>
                <textarea className="text-black w-full p-2 h-40 border rounded mb-2"
                    placeholder="📝 คอมเมนต์">
                </textarea>
                <input className="text-black w-full p-2 border rounded mb-2"
                    type="number"
                    placeholder="rating">
                </input>
                <button className="bg-blue-700 text-2xl p-3 text-center w-full text-white rounded">➕ เพิ่มรีวิว</button>
            </form>
        </div>
    )
}