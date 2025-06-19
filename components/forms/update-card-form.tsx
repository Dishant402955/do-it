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
import { useTransition } from "react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
	description: z.optional(z.string()),
});

export function UpdateCardForm() {
	// const [cardTitle, setCardTitle] = useState("");

	const [isLoading, startTransition] = useTransition();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// title: cardTitle,
			title: "",
			description: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(() => {
			toast.success(`Card ${values.title} Renamed.`);
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
						</FormItem>
					)}
					disabled={isLoading}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="ml-1">Card Title</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					disabled={isLoading}
				/>
				<Button type="submit" size={"sm"}>
					Rename
				</Button>
			</form>
		</Form>
	);
}
