import Navbar from "./_components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function OrgLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />

				<SidebarTrigger className="mt-16" />

				<Navbar />

				{children}
			</SidebarProvider>
		</>
	);
}
