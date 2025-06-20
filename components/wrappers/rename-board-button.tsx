import { RenameBoardForm } from "@/components/forms/rename-board-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React from "react";
import { getBoardById } from "@/db/crud/board.crud";

const RenameBoardButton = ({ children }: { children?: React.ReactNode }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<span>
					{children}
					{children ? null : <Button>title</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Rename board</DialogTitle>
				<RenameBoardForm />
			</DialogContent>
		</Dialog>
	);
};

export default RenameBoardButton;
