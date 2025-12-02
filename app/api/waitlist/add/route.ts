import { type NextRequest, NextResponse } from "next/server";
import { pinata } from "@/lib/server/pinata";

const allowedRoles = [
	"reader",
	"analyzer",
	"journalist",
	"curator",
	"observer",
];

// Simple in-memory store: { ip: { count, lastReset } }
const rateLimits: Record<string, { count: number; lastReset: number }> = {};
const MAX_REQUESTS = 5; // max requests per time window
const WINDOW_MS = 60_000; // 1 minute

export async function POST(req: NextRequest) {
	try {
		const ip = req.headers.get("x-forwarded-for") || "unknown";

		// Initialize or reset counter
		const now = Date.now();
		if (!rateLimits[ip] || now - rateLimits[ip].lastReset > WINDOW_MS) {
			rateLimits[ip] = { count: 0, lastReset: now };
		}

		if (rateLimits[ip].count >= MAX_REQUESTS) {
			return NextResponse.json(
				{ error: "Too many requests. Please wait a bit and try again." },
				{ status: 429 },
			);
		}

		rateLimits[ip].count++;

		const { username, role } = await req.json();
		if (!username || !role) {
			return NextResponse.json(
				{ error: "Username and role are required." },
				{ status: 400 },
			);
		}

		const finalRole = allowedRoles.includes(role.toLowerCase())
			? role.toLowerCase()
			: "hacker";

		const code = crypto.randomUUID();
		const timestamp = new Date().toISOString();

		const data = await pinata.upload.public.json({
			name: `nous-waitlist-${username}-${Date.now()}`,
			code,
			username,
			role: finalRole,
			joinedAt: timestamp,
			joinedAtUnix: Date.now(),
			status: "pending",
			meta: { source: "website" },
		});

		return NextResponse.json({
			data,
			message: "Welcome to the waitlist! Keep your magic code safe.",
		});
	} catch (err: any) {
		return NextResponse.json(
			{ error: err?.message || "Something went wrong." },
			{ status: 500 },
		);
	}
}
