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
import { createList } from "@/db/crud/list.crud";
import { useRouter } from "next/navigation";
import { listAlreadyExists } from "@/db/crud/list.crud";

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
});

export function CreateListForm({
	boardId,
	onSuccess,
}: {
	boardId: string;
	onSuccess: () => void;
}) {
	const [isLoading, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
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

			const res = await createList({ boardId, title: values.title });

			if (res.error) {
				toast.error(`Error Creating List`);
				return;
			} else {
				onSuccess();
				form.resetField("title");
				toast.success(`List ${values.title} created.`);
				router.refresh();
				return;
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
									placeholder="Enter List Title"
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
			</form>
		</Form>
	);
}
