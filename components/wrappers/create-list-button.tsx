"use client";

import { CreateListForm } from "@/components/forms/create-list-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React, { useState } from "react";

const CreateListButton = ({
	children,
	boardId,
}: {
	children?: React.ReactNode;
	boardId: string;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<span className="h-fit">
					{children}
					{children ? null : <Button>Create +</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Create New List</DialogTitle>
				<CreateListForm boardId={boardId} onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateListButton;
