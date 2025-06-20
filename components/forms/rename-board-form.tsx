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
import { useEffect, useTransition } from "react";
import { getBoardById } from "@/db/crud/board.crud";
import { useParams } from "next/navigation";

const formSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }).max(100),
});

export function RenameBoardForm() {
	// const [boardTitle, setBoardTitle] = useState("");
	const params = useParams();
	const [isLoading, startTransition] = useTransition();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	useEffect(() => {
		const fetchBoard = async () => {
			const res = await getBoardById({ id: `${params.id}` });
			if (res.success && res.data?.board?.title) {
				form.setValue("title", res.data.board.title);
			}
		};

		fetchBoard();
	}, [params.id, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(() => {
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
									// value={boardTitle}
									// onChange={setBoardTitle}
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
