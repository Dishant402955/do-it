"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	FileTextIcon,
	MinusIcon,
	MoreHorizontalIcon,
	Trash2Icon,
} from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import CreateCardButton from "@/components/wrappers/create-card-button";
import RenameListButton from "@/components/wrappers/rename-list-button";
import RenameCardButton from "@/components/wrappers/rename-card-button";
import { DeleteList } from "@/db/crud/list.crud";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

const List = ({
	data,
	boardId,
}: {
	data: {
		id: string;
		title: string;
		boardId: string;
		order: number;
		createdAt: string;
		updatedAt: string | null;

		cards: {
			id: string;
			title: string;
			order: number;
			description: string | null;
			createdAt: string;
			updatedAt: string | null;
			listId: string;
		}[];
	}[];
	boardId: string;
}) => {
	const [openAlertListDelete, setOpenAlertListDelete] = useState(false);
	const [openAlertCardDelete, setOpenAlertCardDelete] = useState(false);
	const [isLoadingList, startTransitionList] = useTransition();
	const router = useRouter();

	if (isLoadingList) {
		return <Loader />;
	}
	const handleDeleteList = (id: string) => {
		startTransitionList(async () => {
			const res = await DeleteList({ boardId, id });

			if (res.error) {
				toast.error("Error Deleting List");
				return;
			}
			toast.success(`List Deleted`);
			setOpenAlertListDelete(false);
			router.refresh();
		});
	};
	const handleCancleDeleteList = () => {
		toast.info("List Deletion Cancelled");
		setOpenAlertListDelete(false);
	};

	const handleDeleteCard = (id: string) => {
		startTransitionList(async () => {
			const res = await DeleteList({ boardId, id });

			if (res.error) {
				toast.error("Error Deleting Card");
				return;
			}
			toast.success("Card Deleted");
			setOpenAlertCardDelete(false);
			router.refresh();
		});
	};
	const handleCancleDeleteCard = () => {
		toast.info("Card Deletion Cancelled");
		setOpenAlertCardDelete(false);
	};

	return (
		<>
			{data.length > 0
				? data.map(({ title, id, cards }, index) => {
						return (
							<div
								className="w-64 h-fit flex flex-col justify-center items-center bg-neutral-800 py-4 px-2 space-y-2"
								key={index}
							>
								<div className="w-full flex justify-between items-center px-2 mt-1 mb-4">
									<p className="text-[1.2rem] font-bold">{title}</p>
									<div className="flex justify-center items-center gap-x-4 font-semibold">
										<DropdownMenu>
											<DropdownMenuTrigger>
												<MoreHorizontalIcon />
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem
													onSelect={(e) => {
														e.preventDefault();
													}}
												>
													<RenameListButton
														id={id}
														boardId={boardId}
														initialTitle={title}
													>
														<div className="w-full  flex justify-start items-center space-x-3">
															<FileTextIcon />
															<p>Rename</p>
														</div>
													</RenameListButton>
												</DropdownMenuItem>
												<DropdownMenuItem
													className="w-full"
													onSelect={() => {
														requestAnimationFrame(() =>
															setOpenAlertListDelete(true)
														);
													}}
												>
													<div className="w-full  flex justify-start items-center space-x-3">
														<Trash2Icon />
														<p>Delete</p>
													</div>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
										<AlertDialog
											open={openAlertListDelete}
											onOpenChange={setOpenAlertListDelete}
										>
											<AlertDialogContent className="w-96">
												<AlertDialogTitle></AlertDialogTitle>
												Do you Really Want to delete this?
												<AlertDialogAction asChild>
													<Button onClick={() => handleDeleteList(id)}>
														Delete
													</Button>
												</AlertDialogAction>
												<AlertDialogCancel asChild>
													<Button
														onClick={handleCancleDeleteList}
														variant={"secondary"}
													>
														Cancel
													</Button>
												</AlertDialogCancel>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</div>
								{cards.length > 0 ? (
									<div className="w-full flex flex-col justify-start items-center rounded-lg px-2">
										{cards.map(
											(
												card: {
													id: string;
													title: string;
													order: number;
													description: string | null;
													createdAt: string;
													updatedAt: string | null;
													listId: string;
												},
												index: number
											) => {
												return (
													<Dialog key={index}>
														<DialogTrigger asChild>
															<div
																className="w-full flex justify-between items-center my-1 bg-neutral-900 rounded-lg p-3 z-0"
																key={index}
															>
																<p>{card.title}</p>
																<div className="flex justify-center items-center gap-x-4 z-10">
																	<DropdownMenu>
																		<DropdownMenuTrigger>
																			<MoreHorizontalIcon />
																		</DropdownMenuTrigger>
																		<DropdownMenuContent>
																			<DialogTitle></DialogTitle>
																			<DropdownMenuItem
																				onSelect={(e) => {
																					e.preventDefault();
																				}}
																			>
																				<RenameCardButton
																					id={card.id}
																					initialTitle={card.title}
																					listId={card.listId}
																				>
																					<div className="w-full  flex justify-start items-center space-x-3">
																						<FileTextIcon />
																						<p>Rename</p>
																					</div>
																				</RenameCardButton>
																			</DropdownMenuItem>
																			<DropdownMenuItem
																				className="w-full"
																				onSelect={() => {
																					requestAnimationFrame(() =>
																						setOpenAlertCardDelete(true)
																					);
																				}}
																			>
																				<div className="w-full  flex justify-start items-center space-x-3">
																					<Trash2Icon />
																					<p>Delete</p>
																				</div>
																			</DropdownMenuItem>
																		</DropdownMenuContent>
																	</DropdownMenu>
																	<AlertDialog
																		open={openAlertCardDelete}
																		onOpenChange={setOpenAlertCardDelete}
																	>
																		<AlertDialogContent className="w-96">
																			<AlertDialogTitle></AlertDialogTitle>
																			Do you Really Want to delete this?
																			<AlertDialogAction asChild>
																				<Button
																					onClick={() => handleDeleteCard(id)}
																				>
																					Delete
																				</Button>
																			</AlertDialogAction>
																			<AlertDialogCancel asChild>
																				<Button
																					onClick={handleCancleDeleteCard}
																					variant={"secondary"}
																				>
																					Cancel
																				</Button>
																			</AlertDialogCancel>
																		</AlertDialogContent>
																	</AlertDialog>
																</div>
															</div>
														</DialogTrigger>
														<DialogContent className="w-96">
															<DialogTitle></DialogTitle>
															<div className="flex flex-col w-full gap-4">
																<div className="flex w-full items-center justify-center text-2xl">
																	<p>{card.title}</p>
																</div>
																<div className="flex items-center gap-2">
																	<MinusIcon className="size-5" />{" "}
																	<p>{card.description}</p>
																</div>
															</div>
														</DialogContent>
													</Dialog>
												);
											}
										)}
									</div>
								) : null}
								<div className="w-full flex mt-2 ml-4">
									<CreateCardButton listId={id}>
										<Button>+ Add Card</Button>
									</CreateCardButton>
								</div>
							</div>
						);
				  })
				: null}
		</>
	);
};

export default List;
