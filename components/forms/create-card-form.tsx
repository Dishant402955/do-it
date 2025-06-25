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
import { Textarea } from "../ui/textarea";
import { cardAlreadyExists, createCard } from "@/db/crud/card.crud";

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
	description: z.optional(z.string()),
});

export function CreateCardForm({
	onSuccess,
	listId,
}: {
	onSuccess: () => void;
	listId: string;
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
			const exists = await cardAlreadyExists({ title: values.title, listId });

			if (exists.error) {
				toast.error(exists.error);
				return;
			}
			if (exists.success && exists.data.exists) {
				setError("Card title is already taken!");
				toast.error("Card title is already taken");
				return;
			}

			const res = await createCard({
				listId,
				title: values.title,
				description: values.description,
			});

			if (res.error) {
				toast.error(`Error Creating Card`);
				return;
			} else {
				onSuccess();
				form.resetField("title");
				toast.success(`Card ${values.title} created.`);
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
							<FormLabel className="ml-1">Card Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter Card Title"
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
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="ml-1">Card Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter  Card Description"
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
