import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Do it",
	description: "The only note-taking app for you to spend your day",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
