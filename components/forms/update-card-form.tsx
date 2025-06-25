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
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UpdateCardDescription } from "@/db/crud/card.crud";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
	description: z.optional(z.string()),
});

type Props = {
	cardId: string;
	onSuccess: () => void;
	initialDescription: string | null;
};

export function UpdateCardForm({
	cardId,
	onSuccess,
	initialDescription,
}: Props) {
	const [isLoading, startTransition] = useTransition();
	const [error, setError] = useState<undefined | string>();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: initialDescription ?? "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			setError(undefined);

			const res = await UpdateCardDescription({
				description: values.description,
				id: cardId,
			});

			if (res.error) {
				toast.error(`Error Updating Card`);
				return;
			} else {
				onSuccess();
				router.refresh();
				toast.success(`Card updated.`);
			}
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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
									aria-autocomplete="both"
									aria-atomic="true"
									aria-multiline
									spellCheck
									autoComplete="true"
									aria-colspan={30}
								/>
							</FormControl>
							<FormMessage />
							{error ? <p className="text-rose-400">{error}</p> : null}
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
