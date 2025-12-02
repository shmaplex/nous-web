"use client";

import { Check, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function WaitlistForm() {
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("reader");
	const [cid, setCid] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [copiedCode, setCopiedCode] = useState(false);
	const [copiedLink, setCopiedLink] = useState(false);

	const usernameId = useId();
	const roleId = useId();
	const roles = ["reader", "analyzer", "journalist", "curator", "observer"];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setCopiedCode(false);
		setCopiedLink(false);

		try {
			const res = await fetch("/api/waitlist/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, role }),
			});

			const data = await res.json();

			if (!res.ok) {
				const message =
					typeof data.error === "string"
						? data.error
						: JSON.stringify(data.error) || "Something went wrong";
				setError(message);
				return;
			}

			setCid(data.data.cid || data.data.IpfsHash || "");
			setCode(data.code);
			setUsername("");
		} catch (err: any) {
			const message =
				typeof err === "string"
					? err
					: err?.message || "Something went wrong. Please try again.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboard = (text: string, type: "code" | "link") => {
		navigator.clipboard.writeText(text);
		if (type === "code") {
			setCopiedCode(true);
			setTimeout(() => setCopiedCode(false), 2000);
		} else {
			setCopiedLink(true);
			setTimeout(() => setCopiedLink(false), 2000);
		}
	};

	return (
		<div className="h-auto flex flex-col items-center justify-center px-6 transition-colors">
			{/* Logo */}
			<div className="mb-8">
				<Link href="/">
					<Image
						src="/logo.svg"
						alt="Nous Logo"
						width={150}
						height={150}
						className="mx-auto"
					/>
				</Link>
			</div>

			{/* Form Container */}
			<div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 transition-colors">
				<h2 className="text-2xl font-bold mb-2 text-center text-foreground transition-colors">
					Join the Waitlist
				</h2>
				<p className="text-sm text-muted-foreground mb-2 text-center">
					Pick a username and role. You&apos;ll receive a unique magic code
					(stored on IPFS) — no email required!
				</p>
				<p className="text-xs text-muted-foreground mb-6 text-center inline-flex gap-1">
					<span>Learn more about IPFS </span>
					<Link
						href="https://ipfs.tech/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-link underline hover:text-foreground transition-colors"
					>
						here
					</Link>
					.
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-1">
						<Label htmlFor={usernameId}>Username</Label>
						<Input
							id={usernameId}
							placeholder="Enter a username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="mt-1"
						/>
						<p className="text-xs text-muted-foreground mt-1">
							Choose a unique handle to be recognized in the app.
						</p>
					</div>

					<div className="space-y-1">
						<Label htmlFor={roleId}>Role</Label>
						<Select onValueChange={setRole} defaultValue={role}>
							<SelectTrigger id={roleId} className="mt-2 w-full">
								<SelectValue placeholder="Pick a role" />
							</SelectTrigger>
							<SelectContent>
								{roles.map((r) => (
									<SelectItem key={r} value={r}>
										{r.charAt(0).toUpperCase() + r.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<p className="text-xs text-muted-foreground mt-1">
							Your role defines your early app permissions and experience.
						</p>
					</div>

					<Button
						type="submit"
						className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors"
						disabled={loading}
					>
						{loading ? "Joining..." : "Join Waitlist"}
					</Button>
				</form>

				{/* Success Section */}
				{cid && !error && (
					<div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-2xl shadow-sm space-y-4">
						<div className="flex items-center gap-2 text-green-800 font-semibold text-lg">
							🎉 You're in!
						</div>

						{/* Magic Code Copy */}
						<div className="flex flex-col gap-2">
							<Label className="text-sm text-green-700">Your Magic Code:</Label>
							<div className="flex items-center gap-2 w-full">
								<Input
									value={cid}
									readOnly
									className="flex-1 cursor-pointer select-all text-green-900 font-medium w-full"
									onClick={() => copyToClipboard(cid, "code")}
								/>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => copyToClipboard(cid, "code")}
									className="hover:bg-green-100"
								>
									{copiedCode ? (
										<Check className="w-5 h-5 text-green-600" />
									) : (
										<Copy className="w-5 h-5 text-green-700" />
									)}
								</Button>
							</div>

							{/* Check Status Link */}
							<Link
								href={`/waitlist/status?code=${encodeURIComponent(cid)}`}
								className="text-sm text-green-700 underline hover:text-green-900"
							>
								Check your status
							</Link>
						</div>

						{/* IPFS Link Copy */}
						<div className="flex flex-col gap-2">
							<Label className="text-sm text-green-700">IPFS Link:</Label>
							<div className="flex items-center gap-2 w-full">
								<Input
									value={`https://gateway.pinata.cloud/ipfs/${cid}`}
									readOnly
									className="flex-1 cursor-pointer select-all text-green-900 font-medium w-full"
									onClick={() =>
										copyToClipboard(
											`https://gateway.pinata.cloud/ipfs/${cid}`,
											"link",
										)
									}
								/>
								<Button
									variant="ghost"
									size="sm"
									onClick={() =>
										copyToClipboard(
											`https://gateway.pinata.cloud/ipfs/${cid}`,
											"link",
										)
									}
									className="hover:bg-green-100"
								>
									{copiedLink ? (
										<Check className="w-5 h-5 text-green-600" />
									) : (
										<Copy className="w-5 h-5 text-green-700" />
									)}
								</Button>
							</div>
						</div>

						<p className="text-sm text-green-800">
							Keep your magic code safe! You can use it to access early features
							in the app.
						</p>
					</div>
				)}

				{error && (
					<p className="mt-4 text-destructive text-sm bg-destructive/10 p-2 rounded">
						⚠️ {error}
					</p>
				)}
			</div>
		</div>
	);
}
