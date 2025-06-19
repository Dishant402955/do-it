import Logo from "@/components/logo";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-full w-full flex justify-center items-center">
			<div className="absolute top-6 left-8">
				<Logo />
			</div>
			{children}
		</main>
	);
}
