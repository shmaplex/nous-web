import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Nous — Decentralized Intelligence Platform",
	description:
		"Join Nous, a decentralized platform for collaborative intelligence.",
	metadataBase: new URL("https://nous.shmaplex.com"), // ✅ Add this

	openGraph: {
		title: "Nous — Decentralized Intelligence Platform",
		description:
			"Join Nous, a decentralized platform for collaborative intelligence.",
		url: "https://nous.shmaplex.com",
		siteName: "Nous",
		images: [
			{
				url: "/logo.svg",
				width: 512,
				height: 512,
				alt: "Nous Logo",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Nous — Decentralized Intelligence Platform",
		description:
			"Join Nous, a decentralized platform for collaborative intelligence.",
		images: ["https://nous.shmaplex.com/share.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="min-h-screen flex flex-col bg-white">
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
