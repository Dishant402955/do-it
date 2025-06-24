"use client";

import { RenameListForm } from "@/components/forms/rename-list-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React, { useState } from "react";

type Props = {
	id: string;
	initialTitle: string;
	children?: React.ReactNode;
	boardId: string;
};

const RenameListButton = ({ children, id, initialTitle, boardId }: Props) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<span>
					{children}
					{children ? null : <Button>Rename</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Rename List</DialogTitle>
				<RenameListForm
					initialTitle={initialTitle}
					boardId={boardId}
					listId={id}
					onSuccess={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default RenameListButton;
