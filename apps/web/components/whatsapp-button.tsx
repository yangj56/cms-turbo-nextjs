"use client";

import { ChevronDown, MessageCircle } from "lucide-react";
import { useId, useState } from "react";

type WhatsappWidgetProps = {
	phone: string; // e.g. "6591234567" (no +)
	message?: string; // default prefilled message
	title?: string; // header title
	subtitle?: string; // small caption
	side?: "right" | "left"; // bubble position
	dark?: boolean; // simple dark theme
};

export default function WhatsappButton({
	phone,
	message = "Hi! I’d like to know more.",
	title = "Support",
	subtitle = "Typically replies within an hour",
	side = "right",
	dark = false,
}: WhatsappWidgetProps) {
	const [open, setOpen] = useState(false);
	const id = useId();

	const chatUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

	const sideClass = side === "left" ? "left-4" : "right-4";
	const headerClass = dark ? "bg-neutral-900 text-white" : "bg-green-600 text-white";
	const bodyClass = dark ? "bg-neutral-900 text-white" : "bg-white";
	const bubbleClass = dark ? "border-neutral-700 bg-neutral-800" : "border-neutral-200 bg-white";
	const ctaClass = dark
		? "bg-neutral-800 text-white hover:bg-neutral-700"
		: "bg-green-500 text-white hover:bg-green-600";

	return (
		<>
			{/* Floating bubble */}
			<button
				type="button"
				aria-label="Open WhatsApp chat"
				aria-expanded={open}
				aria-controls={id}
				onClick={() => setOpen(true)}
				className={`fixed bottom-4 ${sideClass} z-50 rounded-full p-4 shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${dark ? "bg-neutral-800 text-white focus:ring-neutral-700" : "bg-green-500 text-white focus:ring-green-400"}`}
			>
				<MessageCircle className="h-6 w-6" aria-hidden="true" />
			</button>

			{/* Panel */}
			<div
				id={id}
				className={`fixed bottom-24 ${sideClass} z-50 w-80 max-w-[90vw] ${open ? "block" : "hidden"}`}
				role="dialog"
				aria-modal="false"
				aria-label="WhatsApp chat panel"
			>
				<section className="overflow-hidden rounded-2xl shadow-2xl">
					{/* Header */}
					<header className={`flex items-center justify-between px-4 py-3 ${headerClass}`}>
						<div>
							<p className="font-semibold text-sm">{title}</p>
							{subtitle && <p className="text-xs opacity-90">{subtitle}</p>}
						</div>
						<button
							type="button"
							aria-label="Minimize chat"
							onClick={() => setOpen(false)}
							className="rounded p-1 hover:opacity-80"
						>
							<ChevronDown className="h-5 w-5" aria-hidden="true" />
						</button>
					</header>

					{/* Body */}
					<div className={bodyClass}>
						<div className="p-4">
							<div className={`max-w-[80%] rounded-2xl border p-3 text-sm ${bubbleClass}`}>
								Hi there! How can I help you?
							</div>

							<a
								href={chatUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={`mt-4 block w-full rounded-xl px-4 py-3 text-center font-medium ${ctaClass}`}
							>
								Start Chat
							</a>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
