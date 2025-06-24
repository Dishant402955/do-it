import Navbar from "./_components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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

				<div className="w-full h-full">{children}</div>
			</main>
		</SidebarProvider>
	);
}
