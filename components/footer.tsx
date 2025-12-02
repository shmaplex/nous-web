"use client";

import { BookOpen, Heart } from "lucide-react";
import Link from "next/link";
import { siGithub } from "simple-icons";
import { Button } from "./ui/button";

// React component to render GitHub SVG from simple-icons
function GithubIcon({ className = "w-4 h-4" }) {
	return (
		<span
			className={className}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: siGithub.svg }}
		/>
	);
}

export default function Footer() {
	return (
		<footer className="py-6 text-center text-gray-500 text-sm space-y-2">
			<div>
				&copy; {new Date().getFullYear()} Nous Foundation — Building open,
				decentralized intelligence.
			</div>

			{/* GitHub links with icons */}
			<div className="flex justify-center gap-6">
				<a
					href="https://github.com/shmaplex/csl"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1 hover:text-gray-700 transition"
				>
					<BookOpen className="w-4 h-4" />
					<span>CSL</span>
				</a>
				<a
					href="https://github.com/shmaplex/nous"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1 hover:text-gray-700 transition"
				>
					<GithubIcon />
					<span>Nous</span>
				</a>
				<a
					href="https://github.com/shmaplex/nous/blob/main/LICENSE"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1 hover:text-gray-700 transition"
				>
					<BookOpen className="w-4 h-4" />
					<span>License</span>
				</a>
			</div>

			{/* Contribute/Donate button */}
			<div className="flex justify-center items-center gap-1 mt-2">
				<Link href="https://github.com/shmaplex/nous" target="_blank">
					<Button
						variant="ghost"
						className="text-[#bf3989] hover:text-pink-500 hover:bg-transparent flex items-center gap-1"
					>
						<Heart className="w-4 h-4 stroke-current" />
						<span>
							You can <strong>contribute</strong> or <strong>donate</strong> via
							GitHub
						</span>
					</Button>
				</Link>
			</div>
		</footer>
	);
}
