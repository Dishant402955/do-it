// components/forms/rename-board-form.tsx
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "sonner";

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
import { boardAlreadyExists, updateBoardTitle } from "@/db/crud/board.crud";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
});

type Props = {
	boardId: string;
	initialTitle: string;
	orgId: string;
	onSuccess: () => void;
};

export function RenameBoardForm({
	boardId,
	initialTitle,
	orgId,
	onSuccess,
}: Props) {
	const [isLoading, startTransition] = useTransition();
	const [error, setError] = useState<undefined | string>();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: initialTitle,
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		startTransition(async () => {
			setError(undefined);

			if (values.title === initialTitle) {
				onSuccess();
				toast.success(`Board renamed to "${values.title}"`);
				return;
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

			const res = await updateBoardTitle({ title: values.title, id: boardId });

			if (res.error) {
				toast.error(`Error Renaming Board`);
				return;
			} else {
				onSuccess();
				router.refresh();
				toast.success(`Board ${values.title} renamed.`);
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Board Title</FormLabel>
							<FormControl>
								<Input {...field} disabled={isLoading} />
							</FormControl>
							<FormMessage />
							{error ? <p className="text-rose-400">{error}</p> : null}
						</FormItem>
					)}
				/>
				<Button type="submit" size="sm" disabled={isLoading}>
					Rename
				</Button>
			</form>
		</Form>
	);
}
