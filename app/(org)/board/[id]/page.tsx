// app/(board)/[id]/page.tsx
import { getBoardById } from "@/db/crud/board.crud";
import { clerkClient, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Navbar from "../_components/navbar";
import List from "../_components/list";
import CreateListButton from "@/components/wrappers/create-list-button";
import Squares from "@/components/boxes/squares";
import { getListsByBoardId } from "@/db/crud/list.crud";

type PageProps = {
	params: { id: string };
};

const Page = async ({ params }: PageProps) => {
	const { userId, orgId } = await auth();

	if (!userId) return redirect("/sign-in");
	if (!orgId) return redirect("/select-org");
	const { id } = await params;

	const boardResponse = await getBoardById({ id });
	if (!boardResponse.success || !boardResponse.data.board)
		return redirect(`/org/${orgId}`);

	const board = boardResponse.data.board;
	const listResponse = await getListsByBoardId({ boardId: board.id });
	const data = listResponse?.data?.lists ?? [];

	const memberships = await (
		await clerkClient()
	).users.getOrganizationMembershipList({
		userId,
	});
	const isAuthorized = memberships.data.some(
		(m) => m.organization.id === board.orgId
	);
	if (!isAuthorized) return redirect(`/org/${orgId}`);

	return (
		<Squares
			speed={0.5}
			squareSize={40}
			direction="diagonal"
			borderColor="#fff"
			hoverFillColor="#fff"
		>
			<div className="w-full h-full">
				<div className="h-full w-full pt-32 flex justify-start items-center">
					<Navbar
						boardId={board.id}
						boardTitle={board.title}
						orgId={board.orgId}
					/>
					<div className="h-full w-full bg-transparent px-10 grid grid-rows-2 grid-flow-col pt-5">
						<CreateListButton boardId={board.id}>
							<div className="h-24 w-64 rounded-lg bg-accent/50 flex justify-center items-center cursor-pointer">
								<p>+ Add List</p>
							</div>
						</CreateListButton>
						<List data={data} />
					</div>
				</div>
			</div>
		</Squares>
	);
};

export default Page;
