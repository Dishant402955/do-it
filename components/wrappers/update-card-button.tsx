import { UpdateCardForm } from "@/components/forms/update-card-form";
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
	children?: React.ReactNode;
	initialDescription: string | null;
};

const UpdateCardButton = ({ children, id, initialDescription }: Props) => {
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
				<DialogTitle>Update Card</DialogTitle>
				<UpdateCardForm
					cardId={id}
					onSuccess={() => setOpen(false)}
					initialDescription={initialDescription}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateCardButton;
