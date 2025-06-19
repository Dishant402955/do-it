import { Skeleton } from "@/components/ui/skeleton";
import { Building2Icon } from "lucide-react";
import React from "react";

const Loading = () => {
	return (
		<Skeleton className=" w-full h-full flex flex-col p-6">
			<hr className="mt-8" />

			<div className="flex gap-4 mt-6">
				<Building2Icon />
				<p className="font-bold text-xl">Your Boards</p>
			</div>

			<div className="grid grid-cols-5 space-y-4 my-8 w-[80%] ml-20">
				<div className="h-36 w-44 rounded-lg bg-accent/50 p-0">
					<div className="size-full p-2 flex justify-center items-center">
						<p className="font-bold text-2xl bg-accent-foreground dark:bg-accent h-16 w-36 rounded-lg flex justify-center items-center">
							{}
						</p>
					</div>
				</div>
				<div className="h-36 w-44 rounded-lg bg-accent/50 p-0">
					<div className="size-full p-2 flex justify-center items-center">
						<p className="font-bold text-2xl bg-accent-foreground dark:bg-accent h-16 w-36 rounded-lg flex justify-center items-center">
							{}
						</p>
					</div>
				</div>
				<div className="h-36 w-44 rounded-lg bg-accent/50 p-0">
					<div className="size-full p-2 flex justify-center items-center">
						<p className="font-bold text-2xl bg-accent-foreground dark:bg-accent h-16 w-36 rounded-lg flex justify-center items-center">
							{}
						</p>
					</div>
				</div>
			</div>
		</Skeleton>
	);
};

export default Loading;
