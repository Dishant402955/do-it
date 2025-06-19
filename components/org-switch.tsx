"use client";

import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";

const OrgSwitch = () => {
	const { isLoaded, organization } = useOrganization();

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	if (!organization) {
		redirect(`/select-org`);
	}

	return (
		<>
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
				afterSelectOrganizationUrl={`/org/${organization?.id}`}
				afterCreateOrganizationUrl={`/org/${organization?.id}`}
				afterLeaveOrganizationUrl="/select-org"
				createOrganizationMode="navigation"
				createOrganizationUrl="/create-org"
			/>
		</>
	);
};

export default OrgSwitch;
