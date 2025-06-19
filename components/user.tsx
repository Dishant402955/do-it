"use client";

import { UserButton } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";

import { Skeleton } from "./ui/skeleton";

const User = () => {
	return (
		<UserButton
			appearance={{
				baseTheme: dark,
			}}
			userProfileProps={{
				appearance: {
					baseTheme: dark,
				},
			}}
			fallback={<Skeleton className="size-8 rounded-full" />}
		/>
	);
};

export default User;
