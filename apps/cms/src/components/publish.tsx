"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PublishButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handlePublish = async () => {
		try {
			setIsLoading(true);
			console.log("revalidate token", `${process.env.NEXT_PUBLIC_WEB_URL}/api/revalidate`);
			const response = await fetch(`/api/revalidate`, {
				method: "POST",
			});
			if (!response.ok) {
				throw new Error(`Failed to revalidate: ${response.statusText}`);
			}
			router.refresh();
		} catch (error) {
			console.error("Error publishing:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex w-full flex-row items-end justify-end">
			<button
				type="button"
				onClick={handlePublish}
				className="w-[200px] rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
				disabled={isLoading}
			>
				{isLoading ? "Publishing..." : "Publish"}
			</button>
			{isLoading && (
				<div className="ml-2 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
			)}
		</div>
	);
}
