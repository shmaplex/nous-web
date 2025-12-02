"use client";

import { json } from "@helia/json";
import { createHelia } from "helia";

let heliaInstance: any;
let jsonStore: any;

export async function initHelia() {
	if (!heliaInstance) {
		heliaInstance = await createHelia();
		jsonStore = json(heliaInstance);
		console.log("Helia node ready!");
	}
	return { heliaInstance, jsonStore };
}

export async function addWaitlistEntry(entry: any) {
	const { jsonStore } = await initHelia();
	const cid = await jsonStore.add(entry);
	console.log("Saved entry on IPFS:", cid.toString());
	return cid.toString();
}

export async function getWaitlistEntry(cid: string) {
	const { jsonStore } = await initHelia();
	const entry = await jsonStore.get(cid);
	return entry;
}
