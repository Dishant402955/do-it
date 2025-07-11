import Org from "@/components/org";

import { Building2Icon } from "lucide-react";
import Link from "next/link";
import CreateBoard from "@/components/create-board";
import { getBoardsByOrgId } from "@/db/crud/board.crud";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
	const { orgId } = await auth();

	if (!orgId) return redirect("/select-org");

	const res = await getBoardsByOrgId({ orgId });

	if (res?.error) {
		return <p>Something Went Wrong Please try again.</p>;
	}

	const boards = res?.data?.boards;
	return (
		<div className=" w-full h-full flex flex-col p-6">
			<Org />

			<hr className="mt-8" />

			<div className="flex gap-4 mt-6">
				<Building2Icon />
				<p className="font-bold text-xl">Your Boards</p>
			</div>

			<div className="flex justify-start items-start flex-wrap h-full w-full pt-8 gap-y-4  gap-x-2 max-[620px]:justify-center max-[620px]:items-center">
				<CreateBoard />
				{boards ? (
					boards.map(
						({ title, id }: { title: string; id: string }, index: number) => {
							return (
								<div
									className="h-36 w-44 rounded-lg bg-accent/50 p-0"
									key={index}
								>
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
						}
					)
				) : (
					<p>NO Boards</p>
				)}
			</div>
		</div>
	);
};

export default Page;
