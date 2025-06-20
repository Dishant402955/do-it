"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	CopyIcon,
	FileTextIcon,
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
import { useState } from "react";
import CreateCardButton from "@/components/wrappers/create-card-button";
import RenameListButton from "@/components/wrappers/rename-list-button";
import RenameCardButton from "@/components/wrappers/rename-card-button";

const List = ({
	data,
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
}) => {
	const [openAlertListDelete, setOpenAlertListDelete] = useState(false);
	const [openAlertCardDelete, setOpenAlertCardDelete] = useState(false);

	const handleDeleteList = () => {
		toast.success("List Delete called");
		setOpenAlertListDelete(false);
	};
	const handleCancleDeleteList = () => {
		toast.info("List Deletion Cancelled");
		setOpenAlertListDelete(false);
	};

	const handleDeleteCard = () => {
		toast.success("Card Delete called");
		setOpenAlertCardDelete(false);
	};
	const handleCancleDeleteCard = () => {
		toast.info("Card Deletion Cancelled");
		setOpenAlertCardDelete(false);
	};

	return (
		<>
			{data.length > 0
				? data.map(({ title, cards }, index) => {
						return (
							<div
								className="w-64 h-fit max-h-[40%] flex flex-col justify-center items-center bg-neutral-800 py-4 px-2 space-y-2"
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
													<RenameListButton>
														<div className="w-full  flex justify-start items-center space-x-3">
															<FileTextIcon />
															<p>Rename</p>
														</div>
													</RenameListButton>
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
													<Button onClick={handleDeleteList}>Delete</Button>
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
									<div className="w-full space-y-2 flex flex-col justify-start items-center py-2 px-4 bg-neutral-900 rounded-lg">
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
													<div
														className="w-full flex justify-between items-center my-1	"
														key={index}
													>
														<p>{card.title}</p>
														<div className="flex justify-center items-center gap-x-4">
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
																		<RenameCardButton>
																			<div className="w-full  flex justify-start items-center space-x-3">
																				<FileTextIcon />
																				<p>Rename</p>
																			</div>
																		</RenameCardButton>
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
																		<Button onClick={handleDeleteCard}>
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
												);
											}
										)}
									</div>
								) : null}
								<div className="w-full flex">
									<CreateCardButton>
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
