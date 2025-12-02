"use client";

import {
	finalizeEvent,
	generateSecretKey,
	getPublicKey,
	nip57,
	SimplePool,
} from "nostr-tools";

// Your private key (hex string)
const PRIVATE_KEY = process.env.NEXT_PUBLIC_NOSTR_PRIVATE_KEY || "";

if (!PRIVATE_KEY) {
	console.warn(
		"NEXT_PUBLIC_NOSTR_PRIVATE_KEY not set! Zaps will not be signed.",
	);
}

/**
 * Send a Nostr Zap to a user
 * @param pubkey Recipient's Nostr public key
 * @param sats Amount in satoshis
 */
export async function sendZap(pubkey: string, sats: number) {
	// Relays to publish to
	const relays = ["wss://nostr.rocks"];

	// 1️⃣ Make a NIP-57 zap request
	const zapEventTemplate = nip57.makeZapRequest({
		pubkey,
		amount: sats,
		comment: "Zap for joining Nous waitlist",
		relays,
	});

	// 2️⃣ Convert hex string key to Uint8Array safely
	let secretKey: Uint8Array;
	if (PRIVATE_KEY.length === 64) {
		const matches = PRIVATE_KEY.match(/.{1,2}/g);
		if (!matches) throw new Error("Invalid PRIVATE_KEY format");
		secretKey = Uint8Array.from(matches.map((byte) => parseInt(byte, 16)));
	} else {
		// fallback (not recommended for real zaps)
		secretKey = generateSecretKey();
	}

	// 3️⃣ Finalize/sign the event
	const signedEvent = finalizeEvent(zapEventTemplate, secretKey);

	// 4️⃣ Publish using SimplePool
	const pool = new SimplePool();
	pool.publish(relays, signedEvent);

	console.log("Zap sent:", signedEvent);
	return signedEvent;
}
