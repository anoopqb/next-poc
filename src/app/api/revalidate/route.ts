import { invalidateCloudFrontPath } from "@/lib/cloudfront";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // Get path from query parameter or request body
    const searchParams = request.nextUrl.searchParams;
    const pathFromQuery = searchParams.get('path');

    let path: string;

    if (pathFromQuery) {
        path = pathFromQuery;
    } else {
        const body = await request.json();
        path = body.path;
    }

    if (!path) {
        return NextResponse.json(
            { error: "Path is required" },
            { status: 400 }
        );
    }

    try {
        await invalidateCloudFrontPath(path);
        return NextResponse.json({
            message: "Invalidated",
            path: path
        });
    } catch (error) {
        console.error("CloudFront invalidation error:", error);
        return NextResponse.json(
            {
                error: "Failed to invalidate path",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}