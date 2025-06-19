"use client";

import { Accordion, AccordionContent, AccordionTrigger } from "./ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import Title from "./title";

import {
	ActivityIcon,
	CircuitBoardIcon,
	CreditCard,
	Settings,
} from "lucide-react";
import { SidebarMenuItem, useSidebar } from "./ui/sidebar";
import Link from "next/link";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import OrgsSkeleton from "./orgs-skeleton";
import { unstable_ViewTransition as ViewTransition } from "react";
import { cn } from "@/lib/utils";
import { redirect, usePathname } from "next/navigation";

const Orgs = () => {
	const { userMemberships, isLoaded, setActive } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});
	const { organization } = useOrganization();
	const { open } = useSidebar();
	const pathname = usePathname();
	const current =
		pathname.split("/").length === 3 ? "boards" : pathname.split("/")[3];

	if (!isLoaded) {
		return <OrgsSkeleton />;
	}

	if (!organization) {
		return redirect("/select-org");
	}
	const items = [
		{
			title: "Boards",
			url: ``,
			icon: CircuitBoardIcon,
			slug: "boards",
		},
		{
			title: "Activity",
			url: `activity`,
			icon: ActivityIcon,
			slug: "activity",
		},
		{
			title: "Settings",
			url: `settings`,
			icon: Settings,
			slug: "settings",
		},
		{
			title: "Billings",
			url: `billings`,
			icon: CreditCard,
			slug: "billings",
		},
	];

	const { data } = userMemberships;
	if (!data) {
		return <p>No Orgs</p>;
	}
	return (
		<Suspense fallback={<OrgsSkeleton />}>
			<ViewTransition>
				<Accordion type="single" collapsible className="mt-4">
					{data.map(
						(
							org: {
								organization: { imageUrl: string; name: string; id: string };
							},
							index: number
						) => (
							<SidebarMenuItem key={index}>
								<AccordionItem value={`${index}`}>
									<AccordionTrigger
										className={cn(
											"flex w-full items-center my-1",
											org.organization.id === organization.id
												? open
													? "bg-neutral-950 border-[1px] border-white"
													: ""
												: "",
											open ? "p-3" : ""
										)}
									>
										<Suspense
											fallback={
												<Skeleton>
													<div className="flex w-full items-center">
														<div className="size-[34px]" />
														<Title title={""} />
													</div>
												</Skeleton>
											}
										>
											<Image
												src={org.organization.imageUrl}
												alt="org"
												height={40}
												width={40}
												className={cn(
													"flex size-[40px]",
													organization.id === org.organization.id &&
														!open &&
														" border-2 border-white p-[2px]"
												)}
											/>
											<Title title={org.organization.name} />
										</Suspense>
									</AccordionTrigger>
									<AccordionContent>
										<ol>
											{items.map((item, index) => (
												<li
													key={index}
													className={cn(
														`w-full flex justify-start items-center gap-4 p-2`
													)}
												>
													<Link
														href={`/org/${org.organization.id}/${item.url}`}
														onClick={() => {
															setActive({ organization: org.organization.id });
														}}
														className={cn(
															`flex gap-4 size-full hover:bg-accent rounded-lg`,
															open
																? "p-2 pl-3"
																: "p-1 py-2 justify-center items-center",
															org.organization.id === pathname.split("/")[2] &&
																current === item.slug &&
																"bg-neutral-300 text-black hover:bg-accent-foreground"
														)}
													>
														<item.icon
															className={`flex justify-center items-center h-6 w-6`}
														/>
														<p className={open ? "" : "hidden"}>{item.title}</p>
													</Link>
												</li>
											))}
										</ol>
									</AccordionContent>
								</AccordionItem>
							</SidebarMenuItem>
						)
					)}
				</Accordion>
			</ViewTransition>
		</Suspense>
	);
};

export default Orgs;
