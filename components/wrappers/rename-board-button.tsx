// components/wrappers/rename-board-button.tsx
"use client";

import { RenameBoardForm } from "@/components/forms/rename-board-form";
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
	orgId: string;
};

const RenameBoardButton = ({ id, initialTitle, children, orgId }: Props) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<span>
					{children ?? <Button variant="ghost">{initialTitle}</Button>}
				</span>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Rename board</DialogTitle>
				<RenameBoardForm
					boardId={id}
					initialTitle={initialTitle}
					orgId={orgId}
					onSuccess={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default RenameBoardButton;
