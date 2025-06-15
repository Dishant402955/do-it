import OrgControl from "@/components/org-control";
import "../globals.css";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-full w-full">
			<OrgControl />
			<Navbar />
			<div className="pt-25 w-full h-full">
				<Sidebar />
				<div className="w-full h-full">{children}</div>
			</div>
		</main>
	);
}
