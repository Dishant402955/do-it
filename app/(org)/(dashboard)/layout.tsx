export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<main className=" mt-16 w-full">{children}</main>
		</>
	);
}
