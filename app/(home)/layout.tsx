import "../globals.css";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<Navbar />
			<div className="pt-25 w-full h-full pb-25">{children}</div>
			<Footer />
		</main>
	);
}
