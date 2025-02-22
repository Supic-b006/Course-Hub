import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        
        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        
        // Check password
        const passwordMatching = await compare(password, user.password); // ✅ แก้ลำดับ parameter
        if (!passwordMatching) {
            return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
        }

        return NextResponse.json({
            message: "Login successful", 
            user: { id: user.id, email: user.email, name: user.name }  // ✅ ส่ง name กลับไปด้วย
        });

    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();  // ✅ ปิด Prisma Client
    }
}
