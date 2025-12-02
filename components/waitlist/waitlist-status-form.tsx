"use client";

import {
	AlertTriangle,
	BookOpen,
	Check,
	CheckCircle,
	Clock,
	Copy,
	Eye,
	Feather,
	RefreshCw,
	Star,
	User,
	XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type JSX, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusCard from "./status-card";

interface WaitlistStatusFormProps {
	initialCode?: string;
	autoFetch?: boolean;
}

export default function WaitlistStatusForm({
	initialCode = "",
	autoFetch = false,
}: WaitlistStatusFormProps) {
	const [code, setCode] = useState(initialCode);
	const [statusData, setStatusData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [copiedUsername, setCopiedUsername] = useState(false);
	const [copiedCode, setCopiedCode] = useState(false);

	const fetchStatus = useMemo(
		() => async (codeToFetch: string) => {
			setLoading(true);
			setError("");
			setStatusData(null);

			try {
				const res = await fetch(
					`/api/waitlist/status?code=${encodeURIComponent(codeToFetch)}`,
				);
				const response = await res.json();
				const { data } = response;

				if (!res.ok) {
					let friendlyError = "An unexpected error occurred. Please try again.";
					if (res.status === 400)
						friendlyError = "Please enter a valid magic code.";
					else if (res.status === 404)
						friendlyError = "Magic code not found. Double-check and try again.";
					else if (res.status === 500)
						friendlyError =
							"Something went wrong on our side. Please try again later.";
					else if (response?.error)
						friendlyError =
							typeof response.error === "string"
								? response.error
								: response.error?.message || friendlyError;

					setError(friendlyError);
					return;
				}

				setStatusData(data);
			} catch (err: any) {
				setError(
					err?.message || "An unexpected error occurred. Please try again.",
				);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	const handleCheckStatus = (e: React.FormEvent) => {
		e.preventDefault();
		fetchStatus(code);
	};

	const handleReset = () => {
		setCode("");
		setStatusData(null);
		setError("");
		setCopiedCode(false);
		setCopiedUsername(false);
	};

	useEffect(() => {
		if (autoFetch && code) fetchStatus(code);
	}, [autoFetch, fetchStatus, code]);

	const copyToClipboard = (text: string, setter: (v: boolean) => void) => {
		navigator.clipboard.writeText(text);
		setter(true);
		setTimeout(() => setter(false), 2000);
	};

	return (
		<div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 transition-colors animate-fade-in">
			{/* Logo */}
			<div className="flex justify-center mb-4">
				<Link href="/">
					<Image
						src={"/logo-universal.png"}
						alt="Nous Bird Logo"
						width={80}
						height={80}
						className="animate-bounce"
					/>
				</Link>
			</div>

			{/* Dynamic title */}
			<h2 className="text-2xl font-bold mb-6 text-center text-pink-600 animate-pulse">
				{statusData
					? `🎉 Welcome, ${statusData.username}!`
					: "Check Your Waitlist Status"}
			</h2>

			{/* Form */}
			{!statusData && (
				<form onSubmit={handleCheckStatus} className="space-y-4">
					<div className="space-y-1">
						<Label className="text-pink-400 font-semibold">Magic Code</Label>
						<Input
							placeholder="Enter your magic code"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							required
							className="text-center mt-2 font-medium border-pink-200 focus:border-pink-400 focus:ring-pink-200"
						/>
					</div>
					<Button
						type="submit"
						className="w-full bg-[#0CA39A] hover:bg-[#098b81] text-white font-bold shadow-md transform hover:scale-105 transition-all"
						disabled={loading}
					>
						{loading ? "Checking..." : "Check Status"}
					</Button>
				</form>
			)}

			{/* Status Card */}
			{statusData && (
				<StatusCard
					statusData={statusData}
					code={code}
					onReset={handleReset}
					copyToClipboard={copyToClipboard}
					copiedUsername={copiedUsername}
					copiedCode={copiedCode}
					setCopiedUsername={setCopiedUsername}
					setCopiedCode={setCopiedCode}
				/>
			)}

			{/* Error Card */}
			{error && (
				<div className="mt-4 flex items-start gap-2 p-4 bg-pink-50 border border-pink-300 text-pink-600 rounded-2xl shadow-sm animate-shake">
					<AlertTriangle className="w-5 h-5 shrink-0" />
					<p className="text-sm">{error}</p>
				</div>
			)}
		</div>
	);
}
