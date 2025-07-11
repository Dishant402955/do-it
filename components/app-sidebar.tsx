import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Orgs from "./orgs";
import Link from "next/link";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" className="mt-16">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="flex w-full items-center justify-between text-lg my-4">
						<p>Workspaces</p>
						<Link href={"/create-org"} className="p-0">
							<Button size={"sm"} variant={"outline"} className="size-full">
								+
							</Button>
						</Link>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<Orgs />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
