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

const Orgs = () => {
	const { userMemberships, isLoaded, setActive } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});
	const { open } = useSidebar();

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	const items = [
		{
			title: "Boards",
			url: ``,
			icon: CircuitBoardIcon,
		},
		{
			title: "Activity",
			url: `activity`,
			icon: ActivityIcon,
		},
		{
			title: "Settings",
			url: `settings`,
			icon: Settings,
		},
		{
			title: "Billings",
			url: `billings`,
			icon: CreditCard,
		},
	];

	const { data } = userMemberships;
	if (!data) {
		return <p>No Orgs</p>;
	}
	return (
		<Accordion type="single" collapsible className="mt-4">
			{data.map(
				(
					org: { organization: { imageUrl: string; name: string; id: string } },
					index: number
				) => (
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
												href={`/org/${org.organization.id}/${item.url}`}
												onClick={() => {
													setActive({ organization: org.organization.id });
												}}
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
				)
			)}
		</Accordion>
	);
};

export default Orgs;
