import Navbar from "../_components/navbar";
import List from "../_components/list";
import CreateListButton from "@/components/wrappers/create-list-button";

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
		<div className="h-full w-full pt-32 flex justify-start items-center">
			<Navbar />
			<div className="h-full w-full bg-neutral-200 dark:bg-neutral-900 px-10 grid grid-flow-col-dense space-x-2 pt-5 ">
				<CreateListButton>
					<div className="h-24 w-64 rounded-lg bg-accent/50 flex justify-center items-center cursor-pointer">
						<p>+ Add List</p>
					</div>
				</CreateListButton>

				{lists.map((list, index) => {
					return <List list={list} key={index} />;
				})}
			</div>
		</div>
	);
};

export default Page;

//
