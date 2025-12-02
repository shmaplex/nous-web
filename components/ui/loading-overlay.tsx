"use client";

import Image from "next/image";

interface LoadingOverlayProps {
	text?: string;

	/** Optional: control visibility from parent */
	show?: boolean;
}

export default function LoadingOverlay({
	text = "Fetching decentralized news...",
	show = true,
}: LoadingOverlayProps) {
	if (!show) return null;

	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
			{/* Logo spinning */}
			<div className="spin-slow mb-6">
				<Image
					src="/logo-universal.png"
					alt="Nous Logo"
					width={100}
					height={100}
					className="w-24 h-24"
				/>
			</div>

			{/* Loading text */}
			<p className="text-white text-lg font-semibold text-center max-w-xs animate-pulse">
				{text}
			</p>
		</div>
	);
}
