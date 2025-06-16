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
import { useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

const items = [
	{
		title: "Boards",
		url: "/org/boards",
		icon: CircuitBoardIcon,
	},
	{
		title: "Activity",
		url: "/org/activity",
		icon: ActivityIcon,
	},
	{
		title: "Settings",
		url: "/org/settings",
		icon: Settings,
	},
	{
		title: "Billings",
		url: "/org/billings",
		icon: CreditCard,
	},
];

const Orgs = () => {
	const { open } = useSidebar();
	const { userMemberships, isLoaded } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});

	if (!isLoaded) {
		return <p>Loading...</p>;
	}
	const { data } = userMemberships;

	if (!data) {
		return <p>No Orgs</p>;
	}

	return (
		<Accordion type="single" collapsible className="mt-4">
			{data.map((org: any, index: number) => (
				<SidebarMenuItem key={index}>
					<AccordionItem value={`${index}`}>
						<AccordionTrigger className="flex w-full items-center">
							<Image
								src={org.organization.imageUrl}
								alt="org"
								height={34}
								width={34}
							/>
							<Title title={org.organization.name} />
						</AccordionTrigger>
						<AccordionContent>
							<ol>
								{items.map((item, index) => (
									<li
										key={index}
										className={`w-full flex justify-start items-center gap-4 hover:bg-accent`}
									>
										<Link
											href={item.url}
											className={`flex gap-4 size-full  ${
												open
													? "p-2 pl-3"
													: "p-1 py-2 justify-center items-center"
											}`}
										>
											<item.icon
												className={`flex justify-center items-center h-5 w-5`}
											/>
											<p className={open ? "" : "hidden"}>{item.title}</p>
										</Link>
									</li>
								))}
							</ol>
						</AccordionContent>
					</AccordionItem>
				</SidebarMenuItem>
			))}
		</Accordion>
	);
};

export default Orgs;
