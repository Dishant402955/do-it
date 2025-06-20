import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Loader from "./loader";
import { unstable_ViewTransition as ViewTransition } from "react";

const OrgSwitch = async () => {
	const { orgId } = await auth();

	if (!orgId) {
		redirect(`/select-org`);
	}

	return (
		<ViewTransition>
			<OrganizationSwitcher
				appearance={{
					baseTheme: dark,
				}}
				organizationProfileProps={{
					appearance: {
						baseTheme: dark,
					},
				}}
				hidePersonal
				afterSelectOrganizationUrl={`/org/${orgId}`}
				afterCreateOrganizationUrl={`/org/${orgId}`}
				afterLeaveOrganizationUrl="/select-org"
				createOrganizationMode="navigation"
				createOrganizationUrl="/create-org"
				fallback={<Loader />}
			/>
		</ViewTransition>
	);
};

export default OrgSwitch;
