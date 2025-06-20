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
import { getBoardById } from "@/db/crud/board.crud";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import {
	CopyIcon,
	FileTextIcon,
	MoreHorizontalIcon,
	Trash2Icon,
} from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const Navbar = () => {
	const [isLoading, startTransition] = useTransition();
	const params = useParams();
	const { isLoaded } = useOrganization();
	const { userMemberships, setActive } = useOrganizationList({
		userMemberships: { infinite: true },
	});
	const [openAlert, setOpenAlert] = useState(false);
	// const [currentBoard, setCurrentBoard] = useState<
	// 	| undefined
	// 	| {
	// 			id: string;
	// 			title: string;
	// 			createdAt: string;
	// 			updatedAt: string | null;
	// 			orgId: string;
	// 	  }
	// >();

	useEffect(() => {
		async function fetch() {
			if (!isLoaded || !setActive) {
				return <p>Loading ...</p>;
			}

			const board = await getBoardById({ id: `${params.id}` });
			const { data } = userMemberships;

			if (data?.length === 0) {
				return redirect("/create-org");
			}

			if (board?.success && board.data.board) {
				console.log(board.data.board);
				console.log(data);
				const match =
					data?.filter(
						(org) => org.organization.id === board.data.board.orgId
					) ?? [];

				if (!match || match?.length === 0) {
					return redirect("/");
				}

				if (!setActive) {
					return <p>loading...</p>;
				}
				setActive({ organization: match[0].organization });
			}
		}

		fetch();
	}, [params.id]);

	const handleDelete = () => {
		startTransition(async () => {
			toast.success("delete called");
			setOpenAlert(false);
		});
	};

	const handleCancle = () => {
		startTransition(() => {
			toast.info("Deletion Cancelled");

			setOpenAlert(false);
		});
	};

	return (
		<header className="fixed top-16 w-full flex justify-between items-center p-4 gap-4 h-16 border-b-[2px] bg-neutral-950">
			<div className="flex justify-center items-center h-full ml-2 gap-4">
				<RenameBoardButton />
			</div>
			<div className="flex justify-center items-center gap-x-4">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<MoreHorizontalIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onSelect={(e: Event) => {
								e.preventDefault();
							}}
						>
							<RenameBoardButton>
								<div className="w-full  flex justify-start items-center space-x-3">
									<FileTextIcon />
									<p>Rename</p>
								</div>
							</RenameBoardButton>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<div className="w-full  flex justify-start items-center space-x-3">
								<CopyIcon />
								<p>Copy</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="w-full"
							onSelect={() => {
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
							<Button onClick={handleDelete} disabled={isLoading}>
								Delete
							</Button>
						</AlertDialogAction>
						<AlertDialogCancel asChild>
							<Button
								onClick={handleCancle}
								variant={"secondary"}
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
