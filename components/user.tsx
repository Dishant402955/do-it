"use client";

import { UserButton } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";

const User = () => {
	const { theme } = useTheme();

	return (
		<>
			<UserButton
				appearance={{
					baseTheme: theme === "light" ? experimental__simple : dark,
				}}
				userProfileProps={{
					appearance: {
						baseTheme: theme === "light" ? experimental__simple : dark,
					},
				}}
			/>
		</>
	);
};

export default User;
