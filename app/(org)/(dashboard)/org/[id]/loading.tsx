import { Skeleton } from "@/components/ui/skeleton";
import { Building2Icon } from "lucide-react";
import React from "react";

const Loading = () => {
	return (
		<div className=" w-full h-full flex flex-col p-6">
			<Skeleton className="w-[100px] flex gap-4 items-center">
				<>
					<div className="size-[50px]" />
					<div className="flex flex-col justify-between h-full">
						<p className="text-lg"></p>
						<p className="text-sm font-bold"></p>
					</div>
				</>
			</Skeleton>
			<hr className="mt-8" />

			<div className="flex gap-4 mt-6 w-fit">
				<Building2Icon />
				<p className="font-bold text-xl">Your Boards</p>
			</div>

			<div className="flex justify-start items-start flex-wrap h-full w-full pt-8 gap-y-4  gap-x-2 max-[620px]:justify-center max-[620px]:items-center">
				<Skeleton className="h-36 w-44 rounded-lg bg-accent/50 p-0">
					<div className="size-full p-2 flex justify-center items-center">
						<p className="font-bold text-2xl bg-accent-foreground dark:bg-accent h-16 w-36 rounded-lg flex justify-center items-center">
							{}
						</p>
					</div>
				</Skeleton>
				<Skeleton className="h-36 w-44 rounded-lg bg-accent/50 p-0">
					<div className="size-full p-2 flex justify-center items-center">
						<p className="font-bold text-2xl bg-accent-foreground dark:bg-accent h-16 w-36 rounded-lg flex justify-center items-center">
							{}
						</p>
					</div>
				</Skeleton>
				<Skeleton className="h-36 w-44 rounded-lg bg-accent/50 p-0">
					<div className="size-full p-2 flex justify-center items-center">
						<p className="font-bold text-2xl bg-accent-foreground dark:bg-accent h-16 w-36 rounded-lg flex justify-center items-center">
							{}
						</p>
					</div>
				</Skeleton>
			</div>
		</div>
	);
};

export default Loading;
