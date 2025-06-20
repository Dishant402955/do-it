"use client";

import React from "react";
import clsx from "clsx";
import { ArrowBigRight, ArrowRight, ChevronRight } from "lucide-react";

export default function PearlButton({
	label = "Pearl Button",
}: {
	label?: string;
}) {
	return (
		<button
			className={clsx(
				"relative rounded-[100px] border-0 cursor-pointer outline-none transition-all duration-200",
				"bg-[#080808]",
				"shadow-[inset_0_0.3rem_0.9rem_rgba(255,255,255,0.3),inset_0_-0.1rem_0.3rem_rgba(0,0,0,0.7),inset_0_-0.4rem_0.9rem_rgba(255,255,255,0.5),0_3rem_3rem_rgba(0,0,0,0.3),0_1rem_1rem_-0.6rem_rgba(0,0,0,0.8)]",
				"hover:shadow-[inset_0_0.3rem_0.5rem_rgba(255,255,255,0.4),inset_0_-0.1rem_0.3rem_rgba(0,0,0,0.7),inset_0_-0.4rem_0.9rem_rgba(255,255,255,0.7),0_3rem_3rem_rgba(0,0,0,0.3),0_1rem_1rem_-0.6rem_rgba(0,0,0,0.8)]",
				"active:translate-y-[4px]",
				"active:shadow-[inset_0_0.3rem_0.5rem_rgba(255,255,255,0.5),inset_0_-0.1rem_0.3rem_rgba(0,0,0,0.8),inset_0_-0.4rem_0.9rem_rgba(255,255,255,0.4),0_3rem_3rem_rgba(0,0,0,0.3),0_1rem_1rem_-0.6rem_rgba(0,0,0,0.8)]"
			)}
		>
			<div className="relative overflow-hidden rounded-[100px] px-[30px] py-[16px] text-xl font-medium text-white/70">
				<p className="flex items-center m-0 transition-all duration-200 translate-y-[2%] mask-gradient group-hover:-translate-y-[4%] justify-center gap-x-2 h-full">
					{label}
					<ChevronRight />
				</p>

				{/* Overlay before */}
				<div className="absolute left-[-15%] right-[-15%] top-[-100%] bottom-[25%] rounded-full bg-white/10 transition-all duration-300 group-hover:translate-y-[-5%]" />

				{/* Overlay after */}
				<div className="absolute left-[6%] right-[6%] top-[12%] bottom-[40%] rounded-t-[22px] transition-all duration-300 group-hover:translate-y-[5%] group-hover:opacity-40 shadow-[inset_0_10px_8px_-10px_rgba(255,255,255,0.8)] bg-gradient-to-b from-white/30 via-transparent to-transparent" />
			</div>
		</button>
	);
}
