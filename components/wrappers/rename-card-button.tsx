import { RenameCardForm } from "@/components/forms/rename-card-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React from "react";

const CreateCardButton = ({ children }: { children?: React.ReactNode }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<span>
					{children}
					{children ? null : <Button>Rename</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Rename Card</DialogTitle>
				<RenameCardForm />
			</DialogContent>
		</Dialog>
	);
};

export default CreateCardButton;
