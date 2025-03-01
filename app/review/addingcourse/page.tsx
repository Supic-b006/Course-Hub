'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import axios from "axios";

interface Review {
    id: string;
    comment: string;
    course: {
        name: string;
    };
    user: {
        name: string;
    };
    rating: number;
    createdAt: string;
}

export default function Page() {
    const { data: session, status } = useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
    const router = useRouter();

    const fetchReview = async () => {
        try {
            const response = await axios.get<Review[]>(`/api/review/${session?.user.id}`);
            console.log("Fetched reviews:", response.data);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
        } else if (status === "authenticated") {
            fetchReview();
        }
    }, [status, session]);

    return (
        status === 'authenticated' &&
        session?.user && (
            <div className="bg-white p-8 max-w-3xl mx-auto">
                <div className="max-w-2xl mx-auto mt-10 p-6 bg-blue-900 shadow-lg rounded-lg text-white">
                    <h1 className="text-3xl font-bold text-center mb-6">✍️ เขียนรีวิวของฉัน</h1>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-lg font-semibold mb-1">📚 ชื่อคอร์ส</label>
                            <input
                                className="w-full p-3 border border-blue-700 rounded bg-white text-black"
                                type="text"
                                placeholder="กรอกชื่อคอร์ส"
                            // value={course}
                            // onChange={(e) => setCourse(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-1">📝 คอมเมนต์</label>
                            <textarea
                                className="w-full p-3 border border-blue-700 rounded bg-white text-black h-40"
                                placeholder="เขียนรีวิวของคุณที่นี่..."
                            // value={comment}
                            // onChange={(e) => setComment(e.target.value)}
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
                            // value={rating}
                            // onChange={(e) => setRating(Number(e.target.value))}
                            />
                        </div>
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-xl font-bold p-3 text-center w-full text-white rounded transition duration-200"
                        >
                            ➕ เพิ่มรีวิว
                        </button>
                    </form>
                </div>

                <h2 className="mt-5 text-3xl font-bold text-gray-800 mb-4">รีวิวของฉัน</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4 mb-4 shadow-md">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {review.course?.name
                                        ? review.course.name.charAt(0).toUpperCase() + review.course.name.slice(1)
                                        : 'คอร์สที่ไม่รู้จัก'}
                                </span>
                                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    ⭐ {review.rating}/5
                                </span>
                            </div>

                            <p className="text-gray-700 text-base mb-2">{review.comment}</p>

                            <p className="text-sm text-gray-500">
                                รีวิวเมื่อ {new Date(review.createdAt).toLocaleDateString('th-TH', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                โดย {review.user?.name || 'ผู้ใช้ที่ไม่รู้จัก'}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">ยังไม่มีรีวิว</p>
                )}
            </div>
        )
    );
}
