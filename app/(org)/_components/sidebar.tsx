import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
	return (
		<div className="w-40 h-full flex flex-col">
			<div className="w-full flex justify-between items-center">
				<p>Workspaces</p>
				<Button size={"icon"} variant={"outline"}>
					+
				</Button>
			</div>
			<div></div>
		</div>
	);
};

export default Sidebar;
