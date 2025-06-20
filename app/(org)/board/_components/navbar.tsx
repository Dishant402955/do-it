// app/(board)/_components/navbar.tsx
"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenameBoardButton from "@/components/wrappers/rename-board-button";
import { deleteBoard } from "@/db/crud/board.crud";
import {
	CopyIcon,
	FileTextIcon,
	MoreHorizontalIcon,
	Trash2Icon,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type NavbarProps = {
	boardId: string;
	boardTitle: string;
	orgId: string;
};

const Navbar = ({ boardId, boardTitle, orgId }: NavbarProps) => {
	const [isLoading, startTransition] = useTransition();
	const [openAlert, setOpenAlert] = useState(false);

	const handleDelete = () => {
		startTransition(async () => {
			const res = await deleteBoard({ orgId, id: boardId });

			if (res.error) {
				toast.error(res.error);
			} else {
				toast.success(`Board ${boardTitle} Deleted`);
				setOpenAlert(false);
				redirect(`/org/${orgId}`);
			}
		});
	};

	const handleCancel = () => {
		toast.info("Deletion cancelled.");
		setOpenAlert(false);
	};

	return (
		<header className="fixed top-16 w-full flex justify-between items-center p-4 gap-4 h-16 border-b-[2px] bg-neutral-950">
			<div className="flex items-center gap-4 ml-2">
				<RenameBoardButton
					id={boardId}
					initialTitle={boardTitle}
					orgId={orgId}
				/>
			</div>

			<div className="flex items-center gap-x-4">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<MoreHorizontalIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<RenameBoardButton
								id={boardId}
								initialTitle={boardTitle}
								orgId={orgId}
							>
								<div className="flex items-center space-x-3">
									<FileTextIcon />
									<p>Rename</p>
								</div>
							</RenameBoardButton>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<div className="flex items-center space-x-3">
								<CopyIcon />
								<p>Copy</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							onSelect={() => requestAnimationFrame(() => setOpenAlert(true))}
						>
							<div className="flex items-center space-x-3">
								<Trash2Icon />
								<p>Delete</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
					<AlertDialogContent className="w-96">
						<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
						Do you really want to delete this board?
						<AlertDialogAction asChild>
							<Button onClick={handleDelete} disabled={isLoading}>
								Delete
							</Button>
						</AlertDialogAction>
						<AlertDialogCancel asChild>
							<Button
								onClick={handleCancel}
								variant="secondary"
								disabled={isLoading}
							>
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
