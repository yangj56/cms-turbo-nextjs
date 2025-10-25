/** biome-ignore-all lint/style/noNonNullAssertion: needed for environment variables */
import { NextResponse } from "next/server";

const CMS_BASE = process.env.NEXT_PUBLIC_CMS_URL!;

export async function GET(_req: Request, { params }: { params: { path: string[] } }) {
	const url = `${CMS_BASE}/api/media/${params.path.join("/")}`;

	const res = await fetch(url, {
		headers: { "x-vercel-protection-bypass": "mmMdkTtHgOvtQdBp4UaZYtJtwMb8cyws" },
	});

	const headers = new Headers(res.headers);
	headers.set("Cache-Control", "public, max-age=31536000, immutable");

	return new NextResponse(res.body, { status: res.status, headers });
}
