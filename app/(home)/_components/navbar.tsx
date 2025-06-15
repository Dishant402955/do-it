import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const Navbar = () => {
	return (
		<header className="fixed top-0 w-full flex justify-between items-center p-4 gap-4 h-16 shadow-accent-foreground/10 shadow dark:shadow-accent">
			<div className="flex justify-center items-center h-full ml-2">
				<Logo />
			</div>
			<div className="flex justify-center items-center gap-x-4">
				<ModeToggle />
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
	);
};

export default Navbar;
