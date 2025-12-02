import Image from "next/image";
import Link from "next/link";
import LoadingOverlay from "@/components/ui/loading-overlay";

// app/page.tsx
export default function Home() {
	return (
		<main
			className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 
			bg-gradient-to-b from-[#E6F7F4] via-[#DFF2F0] to-[#FFFFFF]"
		>
			{/* Logo */}
			<div className="mb-10">
				<Image
					src="/logo.svg"
					alt="Nous Logo"
					width={200}
					height={200}
					className="h-32 w-32 mx-auto"
				/>
			</div>

			{/* Headline */}
			<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
				Decentralized News,
				<span className="text-accent"> Powered by People</span>
			</h1>

			<p className="text-lg md:text-xl max-w-3xl mb-8 text-muted-foreground">
				Nous is a nonprofit intelligence platform delivering raw, unfiltered,
				bias-mapped news from across the world &mdash; without corporate
				influence, without algorithmic control.
			</p>

			{/* CTA Buttons */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex flex-col gap-3 items-center">
					<Link
						href="/waitlist"
						className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-lg font-medium hover:bg-primary/90 transition"
					>
						Join the Waitlist
					</Link>
					<p className="mb-6 text-xs">
						Decentralized waitlist powered by IPFS.
					</p>
				</div>
			</div>
		</main>
	);
}
