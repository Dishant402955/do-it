import { CreateBoardForm } from "@/components/forms/create-board-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React from "react";
import { createBoard } from "@/db/crud/board.crud";
import { auth } from "@clerk/nextjs/server";

const CreateBoardButton = async ({
	children,
}: {
	children?: React.ReactNode;
}) => {
	const { orgId } = await auth();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<span>
					{children}
					{children ? null : <Button>Create +</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Create new board</DialogTitle>
				<CreateBoardForm createBoard={createBoard} orgId={orgId} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateBoardButton;
