import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET() {
    try {
        const res = await prisma.course.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        return NextResponse.json(res);
    }
    catch (error) {
        console.error("Error get course:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// export async function DELETE() {
//     try {
//         const res = await prisma.course.delete({
//             // where:{}
//         });
        
//         return NextResponse.json(res);
//     }
//     catch (error) {
//         console.error("Error get course:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }