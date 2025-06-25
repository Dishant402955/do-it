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
import { cardAlreadyExists, UpdateCardTitle } from "@/db/crud/card.crud";

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
	description: z.optional(z.string()),
});

type Props = {
	listId: string;
	initialTitle: string;
	cardId: string;
	onSuccess: () => void;
};

export function RenameCardForm({
	cardId,
	initialTitle,
	listId,
	onSuccess,
}: Props) {
	// const [cardTitle, setCardTitle] = useState("");

	const [isLoading, startTransition] = useTransition();
	const [error, setError] = useState<undefined | string>();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// title: cardTitle,
			title: initialTitle,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			setError(undefined);

			if (values.title === initialTitle) {
				onSuccess();
				toast.success(`Card renamed to "${values.title}"`);
				return;
			}

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

			const res = await UpdateCardTitle({ title: values.title, id: cardId });

			if (res.error) {
				toast.error(`Error Renaming Card`);
				return;
			} else {
				onSuccess();
				router.refresh();
				toast.success(`Card ${values.title} renamed.`);
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
									{...field}
									className="w-full my-1"
									// value={cardTitle}
									// onChange={setCardTitle}
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
