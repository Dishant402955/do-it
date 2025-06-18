"use client";

import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";

const OrgSwitch = () => {
	const { theme } = useTheme();
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
					baseTheme: theme === "light" ? experimental__simple : dark,
				}}
				organizationProfileProps={{
					appearance: {
						baseTheme: theme === "light" ? experimental__simple : dark,
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
