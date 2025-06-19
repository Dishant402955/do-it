import Logo from "@/components/logo";
import User from "@/components/user";
import OrgSwitch from "@/components/org-switch";
import CreateBoardButton from "@/components/wrappers/create-board-button";
import { Suspense } from "react";

const Navbar = () => {
	return (
		<header className="fixed top-0 w-full flex justify-between items-center p-4 gap-4 h-16 shadow-accent-foreground/10 shadow dark:shadow-accent">
			<div className="flex justify-center items-center h-full ml-2 gap-4">
				<Logo />
				<CreateBoardButton />
			</div>
			<div className="flex justify-center items-center gap-x-4">
				<Suspense fallback={<div className="h-10 w-40" />}>
				<OrgSwitch />
				</Suspense>
				<Suspense fallback={<div className="size-10 rounded-full" />}>
				<User />
				</Suspense>
			</div>
		</header>
	);
};

export default Navbar;
