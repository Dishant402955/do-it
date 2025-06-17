import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-full w-full flex justify-center items-center">
			<div className="absolute top-6 right-8">
				<ModeToggle />
			</div>
			<div className="absolute top-6 left-8">
				<Logo />
			</div>
			{children}
		</main>
	);
}
