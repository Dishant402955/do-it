"use client";

import { useOrganization, PricingTable } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";

const Pricing = () => {
	const { theme } = useTheme();
	const { isLoaded, organization } = useOrganization();

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	if (!organization) {
		return redirect("/select-org");
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
				newSubscriptionRedirectUrl={`/org/${organization.id}`}
			/>
		</div>
	);
};

export default Pricing;
