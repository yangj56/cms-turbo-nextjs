import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const cors = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "x-revalidate-token, content-type",
	"Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
	return new NextResponse(null, { status: 204, headers: cors });
}

export async function POST(request: NextRequest) {
	try {
		const secret = request.headers.get("x-revalidate-token");
		if (secret !== process.env.REVALIDATE_TOKEN) {
			console.log("web unauthorized");
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		revalidatePath("/", "layout");
		revalidatePath("/collection-products", "page");
		revalidatePath("/product/[id]", "page");
		revalidatePath("/blog-posts/[slug]", "page");

		console.log("web revalidated successfully");

		return NextResponse.json({ revalidated: true, message: "Revalidation triggered successfully" }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Error revalidating",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
