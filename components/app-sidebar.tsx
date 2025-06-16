import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Orgs from "./orgs";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" className="mt-16">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="flex w-full items-center justify-between text-lg my-4">
						<p>Workspaces</p>
						<Button size={"sm"} variant={"outline"}>
							+
						</Button>
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
