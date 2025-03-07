import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { course_id: string } }) {
    try {
        const course_id = parseInt(params.course_id);
        const res = await prisma.course.delete({
            where: {
                id: course_id,
            }
        });
        return NextResponse.json(res);
    } catch (error) {
        console.error("Error deleting course:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
