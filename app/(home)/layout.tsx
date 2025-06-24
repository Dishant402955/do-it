import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-full w-full">
			<Navbar />
			<div className="w-full h-full">
				<ViewTransition>{children}</ViewTransition>
			</div>
			<Footer />
		</main>
	);
}
