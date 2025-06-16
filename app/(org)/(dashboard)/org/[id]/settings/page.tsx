"use client";

import { OrganizationProfile, useOrganization } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

const SettingsPage = () => {
	const { theme } = useTheme();
	const { isLoaded } = useOrganization();

	if (!isLoaded) {
		return <p>Loading...</p>;
	}
	return (
		<div className="w-full h-full flex justify-center items-center">
			<OrganizationProfile
				appearance={{
					baseTheme: theme === "light" ? experimental__simple : dark,
				}}
			/>
		</div>
	);
};

export default SettingsPage;
