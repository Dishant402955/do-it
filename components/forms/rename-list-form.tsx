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
import { useRouter } from "next/navigation";
import { listAlreadyExists, UpdateListTitle } from "@/db/crud/list.crud";

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
});

type Props = {
	boardId: string;
	initialTitle: string;
	listId: string;
	onSuccess: () => void;
};

export function RenameListForm({
	boardId,
	initialTitle,
	listId,
	onSuccess,
}: Props) {
	// const [listTitle, setListTitle] = useState();

	const [isLoading, startTransition] = useTransition();
	const [error, setError] = useState<undefined | string>();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// title: listTitle,
			title: initialTitle,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			setError(undefined);

			if (values.title === initialTitle) {
				onSuccess();
				toast.success(`List renamed to "${values.title}"`);
				return;
			}

			const exists = await listAlreadyExists({ title: values.title, boardId });

			if (exists.error) {
				toast.error(exists.error);
				return;
			}
			if (exists.success && exists.data.exists) {
				setError("List title is already taken!");
				toast.error("List title is already taken");
				return;
			}

			const res = await UpdateListTitle({ title: values.title, id: listId });

			if (res.error) {
				toast.error(`Error Renaming List`);
				return;
			} else {
				onSuccess();
				router.refresh();
				toast.success(`List ${values.title} renamed.`);
			}
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="ml-1">List Title</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full my-1"
									// value={listTitle}
									// onChange={setListTitle}
								/>
							</FormControl>
							<FormMessage />
							{error ? <p className="bg-rose-400">{error}</p> : null}
						</FormItem>
					)}
					disabled={isLoading}
				/>
				<Button type="submit" size={"sm"} disabled={isLoading}>
					Rename
				</Button>
			</form>
		</Form>
	);
}
