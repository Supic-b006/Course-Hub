import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json()
        
        //check email is already in use
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) return NextResponse.json({ error: "this email is already in use" })

        //hash the password before saving    
        const hashedPassword = await hash(password, 10);

        //create a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })
        
        return NextResponse.json({ message: "Registration successful", user: { id: newUser.id, email: newUser.email } })
    }
    catch (error) {
        return NextResponse.json({ error })
    }
}
