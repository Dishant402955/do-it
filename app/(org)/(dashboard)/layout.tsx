import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger className="mt-16" />
			<main className="bg-amber-400 mt-16 w-full">{children}</main>
		</SidebarProvider>
	);
}
