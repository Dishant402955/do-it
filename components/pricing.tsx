import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { redirect } from "next/navigation";

import Loader from "./loader";
import { auth } from "@clerk/nextjs/server";
import { unstable_ViewTransition as ViewTransition } from "react";

const Pricing = async () => {
	const { orgId } = await auth();

	if (!orgId) {
		return redirect("/select-org");
	}

	return (
		<ViewTransition>
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
		</ViewTransition>
	);
};

export default Pricing;
