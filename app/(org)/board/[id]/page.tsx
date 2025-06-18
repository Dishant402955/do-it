import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "../_components/navbar";
import List from "../_components/list";

const Page = () => {
	const lists = [
		{
			title: "one",
			cards: [{ title: "oneone" }],
		},
		{
			title: "two",
			cards: [{ title: "twotwo" }],
		},
	];

	return (
		<div className="h-full w-full pt-32">
			<Navbar />
			<div className="h-full w-full bg-neutral-200 dark:bg-neutral-900 px-10 grid grid-cols-4">
				<Dialog>
					<DialogTrigger>
						<div className="h-24 w-64 rounded-lg bg-accent/50 flex justify-center items-center cursor-pointer">
							<p>+ Add List</p>
						</div>
					</DialogTrigger>

					<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
						<DialogTitle>Create new List</DialogTitle>
						<p>TODO : Create form List</p>
					</DialogContent>
				</Dialog>
				{lists.map((list, index) => {
					return <List list={list} key={index} />;
				})}
			</div>
		</div>
	);
};

export default Page;

//
