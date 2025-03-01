'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  console.log("🔍 Session Data:", session); // ✅ เช็คค่าที่ได้จาก useSession()
  {/*status === 'authenticated' &&*/}
  return (
    session?.user &&(
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: '#fffeed' }}>
        <div className="bg-white p-6 rounded-md shadow-md text-black">
          <p>
            Welcome, <b>{session.user.name}!</b>
          </p>
          <p>ID: {session.user.id}</p> {/* ✅ เช็ค id ว่ามีไหม */}
          <p>Email: {session.user.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: '/signin' })}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    )
  )
}
