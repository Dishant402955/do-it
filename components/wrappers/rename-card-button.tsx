import { RenameCardForm } from "@/components/forms/rename-card-form";
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
	listId: string;
};

const RenameCardButton = ({ children, id, initialTitle, listId }: Props) => {
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
				<DialogTitle>Rename Card</DialogTitle>
				<RenameCardForm
					initialTitle={initialTitle}
					cardId={id}
					listId={listId}
					onSuccess={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default RenameCardButton;
