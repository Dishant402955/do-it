"use client";

import { SignIn } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";

const SignInPage = () => {
	const { theme } = useTheme();

	return (
		<SignIn
			appearance={{
				baseTheme: theme === "light" ? experimental__simple : dark,
			}}
		/>
	);
};

export default SignInPage;
