import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OrgControl from "@/components/org-control";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<SidebarTrigger className="mt-16" />
				<main className=" mt-16 w-full">{children}</main>
			</SidebarProvider>
			{/* <OrgControl /> */}
		</>
	);
}
