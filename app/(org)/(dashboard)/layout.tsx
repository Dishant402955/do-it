import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SidebarProvider>
				<ViewTransition>
					<AppSidebar />
				</ViewTransition>
				<SidebarTrigger className="mt-16" />
				<main className=" mt-16 w-full">{children}</main>
			</SidebarProvider>
			{/* <OrgControl /> */}
		</>
	);
}
