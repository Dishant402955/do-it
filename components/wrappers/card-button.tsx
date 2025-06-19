"use client";

import { UpdateCardForm } from "@/components/forms/update-card-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

const RenameCardButton = ({ children }: { children?: React.ReactNode }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<span>
					{children}
					{children ? null : <Button>Rename</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle></DialogTitle>
				<div className="w-full flex justify-between items-center p-2">
					<UpdateCardForm />
					<Button>Copy</Button>
				</div>
				<div className="w-full flex justify-center items-center p-2">
					TODO : Activities
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RenameCardButton;
