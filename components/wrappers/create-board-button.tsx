"use client";

import { CreateBoardForm } from "@/components/forms/create-board-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React, { useState } from "react";
// import { createBoard } from "@/db/crud/board.crud";
import { useAuth } from "@clerk/nextjs";
import Loader from "../loader";

const CreateBoardButton = ({ children }: { children?: React.ReactNode }) => {
	const { orgId, isLoaded } = useAuth();
	const [open, setOpen] = useState(false);

	if (!isLoaded) {
		return <Loader />;
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<span>
					{children}
					{children ? null : <Button>Create +</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Create new board</DialogTitle>
				<CreateBoardForm
					// createBoard={createBoard}
					orgId={orgId}
					onSuccess={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateBoardButton;
