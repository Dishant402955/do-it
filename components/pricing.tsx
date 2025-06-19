"use client";

import { useOrganization, PricingTable } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";

import { redirect } from "next/navigation";

const Pricing = () => {
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
						baseTheme: dark,
					elements: {
						pricingTableCard: {
							maxWidth: "400px",
						},
					},
				}}
				checkoutProps={{
					appearance: {
							baseTheme: dark,
					},
				}}
				forOrganizations
				newSubscriptionRedirectUrl={`/org/${organization.id}`}
			/>
		</div>
	);
};

export default Pricing;
