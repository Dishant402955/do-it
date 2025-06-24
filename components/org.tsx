"use client";

import { useAuth, useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

const Org = () => {
	const { organization, isLoaded } = useOrganization();
	const { has } = useAuth();

	if (!isLoaded) {
		return (
			<Skeleton className="w-[100px] flex gap-4 items-center">
				<>
					<div className="size-[50px]" />
					<div className="flex flex-col justify-between h-full">
						<p className="text-lg"></p>
						<p className="text-sm font-bold"></p>
					</div>
				</>
			</Skeleton>
		);
	}
	if (!organization) {
		return redirect("/select-org");
	}

	if (!has) {
		return;
	}

	const isFree = has({ plan: "free_org" });
	const isPro = has({ plan: "pro_tier" });
	const isUnlimited = has({ plan: "unlimited" });

	const plan = isFree ? "Free" : isPro ? "Pro" : isUnlimited ? "Unlimited" : "";

	return (
		<Suspense
			fallback={
				<Skeleton className="flex gap-4 items-center">
					<>
						<div className="size-[50px]" />
						<div className="flex flex-col justify-between h-full">
							<p className="text-lg"></p>
							<p className="text-sm font-bold"></p>
						</div>
					</>
				</Skeleton>
			}
		>
			<div className="w-full flex gap-4 items-center">
				<Image src={organization?.imageUrl} alt="org" height={50} width={50} />
				<div className="flex flex-col justify-between h-full">
					<p className="text-lg">{organization.name}</p>
					<p className="text-sm font-bold">{plan}</p>
				</div>
			</div>
		</Suspense>
	);
};

export default Org;
