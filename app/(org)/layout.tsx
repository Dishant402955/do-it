import Squares from "@/components/boxes/squares";
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
				<div className="w-full h-full">
					<Squares
						speed={0.5}
						squareSize={40}
						direction="diagonal"
						borderColor="#fff"
						hoverFillColor="#fff"
					>
						<div className="w-full h-full">{children}</div>
					</Squares>
				</div>
			</ViewTransition>
		</main>
	);
}
