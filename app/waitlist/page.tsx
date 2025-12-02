"use client";

import Link from "next/link";
import WaitlistForm from "@/components/waitlist/waitlist-form";

export default function WaitlistPage() {
	return (
		<main className="flex-1 flex flex-col items-center justify-center bg-linear-to-b from-[#EFF7F6] to-[#FFFFFF] p-6 min-h-screen">
			{/* Waitlist form */}
			<WaitlistForm />
			{/* Note for returning users */}
			<div className="max-w-md w-full mt-6 text-center text-sm text-gray-600">
				Already signed up?{" "}
				<Link
					href="/waitlist/status"
					className="text-[#0CA39A] font-medium underline hover:text-[#098b81]"
				>
					Check your waitlist status
				</Link>
			</div>
		</main>
	);
}
