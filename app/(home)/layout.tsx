import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-full w-full">
			<Navbar />
			<div className="w-full h-full">{children}</div>
			<Footer />
		</main>
	);
}
