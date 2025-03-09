'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Review() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reviews, setReviews] = useState([]) // สถานะเก็บข้อมูลรีวิว
  const [isLoading, setIsLoading] = useState(true) // สถานะสำหรับการโหลด
  const [error, setError] = useState<string | null>(null) // สถานะสำหรับข้อผิดพลาด

  // ฟังก์ชันดึงข้อมูลรีวิวทั้งหมด
  const fetchAllReviews = async () => {
    setIsLoading(true) // เริ่มการโหลด
    setError(null) // ล้างข้อผิดพลาดก่อน
    try {
      const response = await fetch('/api/review') // เรียกข้อมูลจาก API
      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }
      const data = await response.json()
      setReviews(data) // เก็บข้อมูลรีวิวที่ได้
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setError('ไม่สามารถดึงข้อมูลรีวิวได้ กรุณาลองใหม่อีกครั้ง') // ข้อความแสดงข้อผิดพลาด
    } finally {
      setIsLoading(false) // หยุดการโหลด
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/') // ถ้าไม่ล็อกอินให้ไปที่หน้าแรก
    } else if (status === 'authenticated') {
      fetchAllReviews() // ดึงข้อมูลรีวิวเมื่อผู้ใช้ล็อกอิน
    }
  }, [status, router])
  
  return (
    status === 'authenticated' &&
    session?.user && (
      <div className=" min-h-screen bg-[#FFFDED] flex flex-col">
        
          <div className="mt-20 text-black w-full max-w-4xl mx-auto">
            {/* แสดงข้อผิดพลาด */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* แสดงข้อมูลรีวิว */}
            <div className="mt-4">
              <h2 className="text-5xl font-bold mb-4">รีวิวทั้งหมด</h2>
              {isLoading ? (
                <p>กำลังโหลด...</p>
              ) : reviews.length > 0 ? (
                <ul>
                  {reviews.map((review: any) => (
                    <li key={review.id} className="mb-8 py-6 px-4 border-4 border-gray-900 rounded-lg shadow-none bg-white">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {/* แสดงชื่อวิชาในกรอบ */}
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {review.course?.name
                            ? review.course.name.charAt(0).toUpperCase() + review.course.name.slice(1)
                            : 'คอร์สที่ไม่รู้จัก'}
                          </span>
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                ⭐ {review.rating}/5
                            </span>
                        </div>

                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                      <p className="mt-4 text-sm text-gray-500">
                        รีวิวเมื่อ {new Date(review.createdAt).toLocaleString()}
                      </p>

                      <div className="mt-2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        โดย {review.user?.name || 'ผู้ใช้ที่ไม่รู้จัก'}
                      </span>
                      </div>
                    </li>
                  ))}
                </ul> 
              ) : (
                <p>ไม่พบรีวิว</p>
              )}
            </div>
          </div>
      </div>
    )
  )
}
