"use client";

import { useOrganization, PricingTable } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";

const Pricing = () => {
	const { theme } = useTheme();
	const { isLoaded } = useOrganization();

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	return (
		<div className="w-full px-4 flex justify-center items-center">
			<PricingTable
				appearance={{
					baseTheme: theme === "light" ? experimental__simple : dark,
					elements: {
						pricingTableCard: {
							maxWidth: "400px",
						},
					},
				}}
				checkoutProps={{
					appearance: {
						baseTheme: theme === "light" ? experimental__simple : dark,
					},
				}}
				forOrganizations
			/>
		</div>
	);
};

export default Pricing;
