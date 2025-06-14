import type { Metadata } from "next";
import "./globals.css";
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

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
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`antialiased`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<header className="fixed top-0 w-full flex justify-between items-center p-4 gap-4 h-16 border-b shadow-accent-foreground/10 shadow-lg dark:shadow-accent">
							<div>
								<ModeToggle />
							</div>
							<div>
								<SignedOut>
									<div className="space-x-8">
										<SignInButton>
											<Button variant={"ghost"}>Login</Button>
										</SignInButton>
										<SignUpButton>
											<Button>Do It for Free!</Button>
										</SignUpButton>
									</div>
								</SignedOut>
								<SignedIn>
									<UserButton />
								</SignedIn>
							</div>
						</header>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
