import Logo from "@/components/logo";
import User from "@/components/user";
import OrgSwitch from "@/components/org-switch";
import CreateBoardButton from "@/components/wrappers/create-board-button";

const Navbar = () => {
	return (
		<header className="fixed top-0 w-full flex justify-between items-center p-4 gap-4 h-16 border-b-[2px] bg-neutral-950">
			<div className="flex justify-center items-center h-full ml-2 gap-4">
				<Logo />
				<CreateBoardButton />
			</div>
			<div className="flex justify-center items-center gap-x-4">
				<OrgSwitch />
				<User />
			</div>
		</header>
	);
};

export default Navbar;
