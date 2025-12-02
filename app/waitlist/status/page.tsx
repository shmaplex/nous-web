"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoadingOverlay from "@/components/ui/loading-overlay";
import WaitlistStatusForm from "@/components/waitlist/waitlist-status-form";

function PageContent() {
	const searchParams = useSearchParams();
	const codeParam = searchParams.get("code") || "";

	return (
		<main
			className="flex-1 flex flex-col items-center justify-center min-h-screen p-6
			bg-linear-to-b from-[#F0FDF9] via-[#E0FAF3] to-[#FFFFFF]"
		>
			{/* Status Form */}
			<WaitlistStatusForm initialCode={codeParam} autoFetch={!!codeParam} />

			{/* Note for users without a code */}
			<div className="max-w-md w-full mt-6 text-center text-sm text-gray-600">
				Don&apos;t have a code yet? Lost your code?{" "}
				<Link
					href="/waitlist"
					className="text-[#0CA39A] font-medium underline hover:text-[#098b81]"
				>
					Join the waitlist
				</Link>
			</div>
		</main>
	);
}

export default function WaitlistStatusPage() {
	return (
		<Suspense fallback={<LoadingOverlay />}>
			<PageContent />
		</Suspense>
	);
}
