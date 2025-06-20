import { CreateCardForm } from "@/components/forms/create-card-form";
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
					{children ? null : <Button>Create +</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Create New Card</DialogTitle>
				<CreateCardForm />
			</DialogContent>
		</Dialog>
	);
};

export default CreateCardButton;
