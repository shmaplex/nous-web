"use client";

import { nip57, SimplePool } from "nostr-tools";
import React from "react";
import { Button } from "@/components/ui/button";

interface ZapButtonProps {
	pubkey: string;
	sats?: number;
}

export default function ZapButton({ pubkey, sats = 100 }: ZapButtonProps) {
	const handleZap = async () => {
		// Initialize a pool
		const pool = new SimplePool();

		// Relay you want to send the zap request to
		const relays = ["wss://nostr.rocks"];

		// Make the zap request using the updated API
		const zapRequest = nip57.makeZapRequest({
			pubkey,
			amount: sats,
			comment: "Zap for joining Nous waitlist",
			relays,
		});

		console.log("Zap request generated:", zapRequest);
		alert(`Zap request generated! Check console.`);

		// Optionally, you can publish using the pool:
		// pool.publish(relays[0], zapRequest);
	};

	return (
		<Button variant="default" onClick={handleZap}>
			Send {sats} sats Zap
		</Button>
	);
}
