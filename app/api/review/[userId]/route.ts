import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    try {
        const user_id = parseInt(params.userId);

        if (isNaN(user_id)) {
            return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
        }

        const reviews = await prisma.review.findMany({
            where: { userId: user_id },
            include: { course: true },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { userId: string } }) {
    try {
        const user_id = parseInt(params.userId);


        const { course_name, rating, content } = await request.json();
        // console.log(user_id,course_name, rating, content);

        if (!user_id || !course_name || !rating || !content)
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

        const normalizedCourseName = course_name.trim().toLowerCase();

        let course = await prisma.course.findUnique({
            where: { name: normalizedCourseName },
        });

        if (!course) {
            course = await prisma.course.create({
                data: { name: normalizedCourseName }
            });
        }

        const review = await prisma.review.create({
            data: {
                userId: user_id,
                courseId: course.id,
                comment: content,
                rating: rating
            }
        });

        return NextResponse.json(review, { status: 201 });

    } catch (error) {
        console.error("Error adding review:", error);
        return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { userId: string } }) {
    try {
        const user_id = parseInt(params.userId);
        const { courseId, rating, comment } = await request.json();

        if (!user_id || !courseId || !rating || !comment) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedReview = await prisma.review.updateMany({
            where: { userId: user_id, courseId: courseId },
            data: { rating, comment },
        });

        if (updatedReview.count === 0) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Review updated successfully" });
    } catch (error) {
        console.error("Error updating review:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


