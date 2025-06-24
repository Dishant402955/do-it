import Navbar from "./_components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function OrgLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />

			<SidebarTrigger className="mt-16" />
			<main className="h-full w-full">
				<Navbar />

				<div className="w-full h-full">
					<ViewTransition>{children}</ViewTransition>
				</div>
			</main>
		</SidebarProvider>
	);
}
