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
	keywords: [
		"decentralized intelligence",
		"Nous",
		"P2P network",
		"collaborative analysis",
		"IPFS",
		"OrbitDB",
	],
	authors: [{ name: "Nous Team", url: "https://nous.shmaplex.com" }],
	metadataBase: new URL("https://nous.shmaplex.com"),

	openGraph: {
		title: "Nous — Decentralized Intelligence Platform",
		description:
			"Join Nous, a decentralized platform for collaborative intelligence.",
		url: "https://nous.shmaplex.com",
		siteName: "Nous",
		images: [
			{
				url: "https://nous.shmaplex.com/share.png",
				width: 1200,
				height: 630,
				alt: "Nous — Decentralized Intelligence Platform",
			},
		],
		locale: "en_US",
		type: "website",
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
