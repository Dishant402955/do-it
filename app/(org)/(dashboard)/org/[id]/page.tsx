"use client";

import Org from "@/components/org";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Building2Icon, User2Icon } from "lucide-react";
import Link from "next/link";

const Page = () => {
	const boards = [
		{ title: "First", id: "1" },
		{ title: "Second", id: "2" },
		{ title: "Third", id: "3" },
		{ title: "Fourth", id: "4" },
		{ title: "Fifth", id: "5" },
		{ title: "Sixth", id: "6" },
	];
	return (
		<div className=" w-full h-full flex flex-col p-6">
			<Org />

			<hr className="mt-8" />

			<div className="flex gap-4 mt-6">
				<Building2Icon />
				<p className="font-bold text-xl">Your Boards</p>
			</div>

			<div className="grid grid-cols-3 space-y-4 my-8 w-[80%] ml-20">
				<Dialog>
					<DialogTrigger>
						<div className="h-56 w-64 rounded-lg bg-accent/50 flex justify-center items-center">
							<p>Create +</p>
						</div>
					</DialogTrigger>

					<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
						<DialogTitle>Create new board</DialogTitle>
						<p>TODO : Create form for new board</p>
					</DialogContent>
				</Dialog>
				{boards.map(({ title, id }, index) => {
					return (
						<div className="h-56 w-64 rounded-lg bg-accent/50 p-0" key={index}>
							<Link
								href={`/board/${id}`}
								className="size-full p-2 flex justify-center items-center"
							>
								<p className="font-bold text-2xl bg-accent-foreground dark:bg-accent h-16 w-36 rounded-lg flex justify-center items-center">
									{title}
								</p>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Page;
