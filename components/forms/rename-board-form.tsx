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

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
});

export function RenameBoardForm() {
	const [boardTitle, setBoardTitle] = useState("");
	const [isLoading, startTransition] = useTransition();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: boardTitle,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(() => {
			form.resetField("title");
			toast.success(`Board ${values.title} Renamed.`);
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
							<FormLabel className="ml-1">Board Title</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full my-1"
									value={boardTitle}
									onChange={setBoardTitle as any}
								/>
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
