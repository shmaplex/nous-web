import { NextResponse } from "next/server";
import { pinata } from "@/lib/server/pinata";

/**
 * Shape of the waitlist status data returned to the client
 */
export type WaitlistStatusData = {
	username: string;
	role: string;
	joinedAt: string;
	joinedAtUnix?: number;
	status: string;
	meta?: Record<string, any>;
};

/**
 * Shape of the response returned by the API
 */
export interface WaitlistStatusResponse {
	data: WaitlistStatusData;
	url?: string;
}

// Simple in-memory rate limiting (per IP)
const rateLimits: Record<string, { count: number; lastReset: number }> = {};
const MAX_REQUESTS = 10; // max GET requests per time window
const WINDOW_MS = 60_000; // 1 minute

/**
 * GET /api/waitlist/status?code=MAGIC_CODE
 *
 * Retrieves the waitlist status for a given magic code.
 * Applies IP-based rate limiting to prevent abuse.
 *
 * @param req - The incoming request
 * @returns JSON response with waitlist status data or error
 */
export async function GET(req: Request) {
	try {
		const ip = req.headers.get("x-forwarded-for") || "unknown";

		// Initialize or reset rate limit counter
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

		const url = new URL(req.url);
		const code = url.searchParams.get("code");

		if (!code) {
			return NextResponse.json(
				{ error: "Magic code is required" },
				{ status: 400 },
			);
		}

		// Fetch raw waitlist data from Pinata
		const rawStatus: any = await pinata.gateways.public.get(code);

		if (!rawStatus?.data) {
			return NextResponse.json({ error: "Code not found" }, { status: 404 });
		}

		const { data } = rawStatus;

		// Map to typed WaitlistStatusData
		const status: WaitlistStatusData = {
			username: data.username || "unknown",
			role: data.role || "guest",
			joinedAt: data.joinedAt || new Date().toISOString(),
			status: data.status || "pending",
			meta: data.meta || {},
		};

		const link = await pinata.gateways.public.convert(code);

		return NextResponse.json<WaitlistStatusResponse>({
			data: status,
			url: link,
		});
	} catch (err: any) {
		return NextResponse.json(
			{ error: err?.message || "Unknown error" },
			{ status: 500 },
		);
	}
}
