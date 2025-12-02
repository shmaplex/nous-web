"use client";

import {
	Check,
	CheckCircle,
	Clock,
	Copy,
	RefreshCw,
	User,
	XCircle,
} from "lucide-react";
import type { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Role icons
const roleIcons: Record<string, JSX.Element> = {
	reader: (
		<span className="text-pink-500">
			<User className="w-5 h-5" />
		</span>
	), // replace with actual icons
	analyzer: (
		<span className="text-orange-400">
			<User className="w-5 h-5" />
		</span>
	),
	journalist: (
		<span className="text-pink-600">
			<User className="w-5 h-5" />
		</span>
	),
	curator: (
		<span className="text-yellow-400">
			<User className="w-5 h-5" />
		</span>
	),
	observer: (
		<span className="text-pink-400">
			<User className="w-5 h-5" />
		</span>
	),
};

// Status icons/colors
const statusIcons: Record<string, { icon: JSX.Element; color: string }> = {
	pending: {
		icon: <Clock className="w-6 h-6 animate-spin" />,
		color: "text-orange-400",
	},
	approved: {
		icon: <CheckCircle className="w-6 h-6" />,
		color: "text-green-500",
	},
	rejected: { icon: <XCircle className="w-6 h-6" />, color: "text-red-500" },
};

interface StatusCardProps {
	statusData: any;
	code: string;
	onReset: () => void;
	copyToClipboard: (text: string, setter: (v: boolean) => void) => void;
	copiedUsername: boolean;
	copiedCode: boolean;
	setCopiedUsername: (v: boolean) => void;
	setCopiedCode: (v: boolean) => void;
}

export default function StatusCard({
	statusData,
	code,
	onReset,
	copyToClipboard,
	copiedUsername,
	copiedCode,
	setCopiedUsername,
	setCopiedCode,
}: StatusCardProps) {
	return (
		<div className="p-6 bg-white border-2 border-pink-200 rounded-3xl shadow-xl space-y-4 animate-fade-in-up">
			{/* Top bar: Status + Reset */}
			<div className="flex items-center justify-between">
				<div
					className={`flex items-center gap-2 text-lg font-bold ${
						statusIcons[statusData.status.toLowerCase()]?.color ||
						"text-pink-600"
					}`}
				>
					{statusIcons[statusData.status.toLowerCase()]?.icon || (
						<User className="w-5 h-5 text-orange-400" />
					)}
					<span>Status: {statusData.status}</span>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={onReset}
					className="flex items-center gap-1 text-orange-400 hover:bg-orange-50"
				>
					<RefreshCw className="w-4 h-4" /> Reset
				</Button>
			</div>

			{/* Username */}
			<div className="flex flex-col gap-2">
				<Label className="text-sm text-pink-500 font-semibold">Username:</Label>
				<div className="flex items-center gap-2">
					<Input
						value={statusData.username}
						readOnly
						className="flex-1 cursor-pointer select-all font-medium text-pink-700 hover:bg-pink-50"
						onClick={() =>
							copyToClipboard(statusData.username, setCopiedUsername)
						}
					/>
					<Button
						variant="ghost"
						size="sm"
						onClick={() =>
							copyToClipboard(statusData.username, setCopiedUsername)
						}
						className="hover:bg-pink-100 rounded-md"
					>
						{copiedUsername ? (
							<Check className="w-5 h-5 text-pink-600" />
						) : (
							<Copy className="w-5 h-5 text-pink-500" />
						)}
					</Button>
				</div>
			</div>

			{/* Magic Code */}
			<div className="flex flex-col gap-2">
				<Label className="text-sm text-pink-500 font-semibold">
					Magic Code:
				</Label>
				<div className="flex items-center gap-2">
					<Input
						value={code}
						readOnly
						className="flex-1 cursor-pointer select-all font-medium text-pink-700 hover:bg-pink-50"
						onClick={() => copyToClipboard(code, setCopiedCode)}
					/>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => copyToClipboard(code, setCopiedCode)}
						className="hover:bg-pink-100 rounded-md"
					>
						{copiedCode ? (
							<Check className="w-5 h-5 text-pink-600" />
						) : (
							<Copy className="w-5 h-5 text-pink-500" />
						)}
					</Button>
				</div>
			</div>

			{/* Role */}
			<div className="flex items-center gap-2 mt-2 text-lg font-semibold text-orange-500">
				{roleIcons[statusData.role.toLowerCase()] || (
					<User className="w-5 h-5 text-orange-400" />
				)}
				<span>Role: {statusData.role}</span>
			</div>
		</div>
	);
}
