import Navbar from "./_components/navbar";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function OrgLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-full w-full">
			<Navbar />
			<ViewTransition>
				<div className="w-full h-full">{children}</div>
			</ViewTransition>
		</main>
	);
}
