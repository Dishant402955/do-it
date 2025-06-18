"use client";

import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { CreateOrganization, useAuth } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";

const SelectOrg = () => {
	const { orgId } = useAuth();
	const { theme } = useTheme();
	return (
		<div className="h-full w-full flex justify-center items-center">
			<div className="absolute top-8 left-8">
				<Logo />
			</div>
			<div className="absolute top-8 right-8">
				<ModeToggle />
			</div>
			<CreateOrganization
				afterCreateOrganizationUrl={`/org/${orgId}`}
				appearance={{
					baseTheme: theme === "light" ? experimental__simple : dark,
				}}
			/>
		</div>
	);
};

export default SelectOrg;
