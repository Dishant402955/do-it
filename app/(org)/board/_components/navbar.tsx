"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenameBoardButton from "@/components/wrappers/rename-board-button";
import { useOrganization } from "@clerk/nextjs";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
	const params = useParams();
	const { organization, isLoaded } = useOrganization();

	const [openAlert, setOpenAlert] = useState(false);
	if (!isLoaded) {
		return <p>Loading ...</p>;
	}

	if (!organization) {
		return redirect("/select-org");
	}

	const handleSubmit = (formData: FormData) => {
		console.log(formData);
		toast.success(`Board  updated`);
	};

	const handleDelete = () => {
		toast.success("delete called");
		setOpenAlert(false);
	};

	const handleCancle = () => {
		toast.info("Deletion Cancelled");

		setOpenAlert(false);
	};

	return (
		<header className="fixed top-16 w-full flex justify-between items-center p-4 gap-4 h-16 shadow-accent-foreground/10 shadow dark:shadow-accent">
			<div className="flex justify-center items-center h-full ml-2 gap-4">
				<RenameBoardButton>
					<Button variant={"outline"} size={"lg"}>
						{params.id}
					</Button>
				</RenameBoardButton>
			</div>
			<div className="flex justify-center items-center gap-x-4">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<MoreHorizontalIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							className="w-full"
							onSelect={(e) => {
								requestAnimationFrame(() => setOpenAlert(true));
							}}
						>
							<div className="w-full  flex justify-start items-center space-x-3">
								<Trash2Icon />
								<p>Delete</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
					<AlertDialogContent className="w-96">
						<AlertDialogTitle></AlertDialogTitle>
						Do you Really Want to delete this?
						<AlertDialogAction asChild>
							<Button onClick={handleDelete}>Delete</Button>
						</AlertDialogAction>
						<AlertDialogCancel asChild>
							<Button onClick={handleCancle} variant={"secondary"}>
								Cancel
							</Button>
						</AlertDialogCancel>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</header>
	);
};

export default Navbar;
