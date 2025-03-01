import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

export async function GET(req: NextRequest, context: { params: { name: string } }) {
    const { name } = context.params;

    try {
        const reviews = await prisma.review.findMany({
            where: {
                course: {
                    name: name
                }
            },
            include:{
                course: true
            }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}