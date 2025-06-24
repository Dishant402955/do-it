import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { redirect } from "next/navigation";

import Loader from "./loader";
import { auth } from "@clerk/nextjs/server";

const Pricing = async () => {
	const { orgId } = await auth();

	if (!orgId) {
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
				newSubscriptionRedirectUrl={`/org/${orgId}`}
				fallback={<Loader />}
			/>
		</div>
	);
};

export default Pricing;
