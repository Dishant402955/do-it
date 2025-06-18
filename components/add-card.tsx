"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

const AddCard = () => {
	const [openDialog, setOpenDialog] = useState(false);

	const handleSubmit = (formData: FormData) => {
		console.log(formData);
		toast.success("onSubmit Called");
		setOpenDialog(false);
	};
	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild className="w-full">
				<Button>+ Add Card</Button>
			</DialogTrigger>
			<DialogContent className="w-96 space-y-4">
				<DialogTitle>Enter Card Title</DialogTitle>
				<form action={handleSubmit} className="space-y-4">
					<input
						name="title"
						id="title"
						className="p-2 pl-4 w-full rounded-lg"
					/>
					<Button className="w-full">Create</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddCard;
