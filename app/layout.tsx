import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { unstable_ViewTransition as ViewTransition } from "react";

export const metadata: Metadata = {
	title: "Do it",
	description: "The only Kanban app for you to spend your day",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`antialiased h-full w-full`}>
					<Toaster />
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						forcedTheme="dark"
						disableTransitionOnChange
					>
						<ViewTransition>{children}</ViewTransition>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
