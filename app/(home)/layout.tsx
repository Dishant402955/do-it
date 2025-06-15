import "../globals.css";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
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
		</main>
	);
}
