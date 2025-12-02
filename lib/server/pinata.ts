// lib/server/pinata.ts
import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
	pinataJwt: process.env.PINATA_JWT_WRITE_KEY,
	pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL || ""}`,
});
