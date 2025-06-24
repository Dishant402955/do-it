"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import {
	boardAlreadyExists,
	createBoard,
	getBoardsCount,
} from "@/db/crud/board.crud";
import { redirect } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
});

export function CreateBoardForm({ orgId, onSuccess, onRedirect }: any) {
	const [isLoading, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [openUpgrade, setOpenUpgrade] = useState(false);
	const { has } = useAuth();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	if (!has) {
		return;
	}

	const isFree = has({ plan: "free_org" });
	const isPro = has({ plan: "pro_tier" });
	const isUnlimited = has({ plan: "unlimited" });

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			setError(undefined);
			const resCount = await getBoardsCount({ orgId });

			if (resCount.error) {
				toast.error("Something went wrong!");
				return;
			}

			if (isFree) {
				if (resCount.success && resCount.data.count + 1 > 5) {
					setOpenUpgrade(true);
					return;
				}
			}

			if (isPro) {
				if (resCount.success && resCount.data.count + 1 > 25) {
					setOpenUpgrade(true);
					return;
				}
			}

			if (isUnlimited) {
				1;
			}
			const exists = await boardAlreadyExists({ title: values.title, orgId });

			if (exists.error) {
				toast.error(exists.error);
				return;
			}
			if (exists.success && exists.data.exists) {
				setError("Board title is already taken!");
				toast.error("Board title is already taken");
				return;
			}

			const res = await createBoard({ orgId, title: values.title });

			if (res.error) {
				toast.error(`Error Creating Board`);
				return;
			} else {
				onSuccess();
				form.resetField("title");
				toast.success(`Board ${values.title} created.`);
				return redirect(`/board/${res.data?.board?.id}`);
			}
		});
	}

	const handleUpgradeClick = () => {
		setOpenUpgrade(false);
		onRedirect();
		return redirect(`/org/${orgId}/billings`);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="ml-1">Board Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter Board Title"
									{...field}
									className="w-full my-1"
								/>
							</FormControl>
							<FormMessage />
							{error ? <p className="text-rose-400">{error}</p> : null}
						</FormItem>
					)}
					disabled={isLoading}
				/>
				<Button type="submit" size={"sm"} disabled={isLoading}>
					Submit
				</Button>
				<Dialog open={openUpgrade} onOpenChange={setOpenUpgrade}>
					<DialogContent className="w-[40%]  h-fit">
						<DialogTitle></DialogTitle>
						<div className="flex flex-col justify-center items-center my-4 mx-1 space-y-1">
							<p className="text-2xl">You have reached your Boards limit.</p>
							<p className="text-xl mt-5 mb-1">
								Upgrade your plan to continue.
							</p>
							{/* <Link href={`/org/${orgId}/billings`} className="p-0 mt-1"> */}
							<Button size={"lg"} onClick={handleUpgradeClick}>
								Upgrade
							</Button>
							{/* </Link> */}
						</div>
					</DialogContent>
				</Dialog>
			</form>
		</Form>
	);
}
