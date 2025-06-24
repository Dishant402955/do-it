"use client";

import { CreateCardForm } from "@/components/forms/create-card-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React, { useState } from "react";

const CreateCardButton = ({
	children,
	listId,
}: {
	children?: React.ReactNode;
	listId: string;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<span>
					{children}
					{children ? null : <Button>Create +</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Create New Card</DialogTitle>
				<CreateCardForm onSuccess={() => setOpen(false)} listId={listId} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateCardButton;
