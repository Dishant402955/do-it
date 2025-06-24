import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Loader from "./loader";
import { Skeleton } from "./ui/skeleton";

const OrgSwitch = async () => {
	const { orgId } = await auth();

	if (!orgId) {
		redirect(`/select-org`);
	}

	return (
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
			fallback={<Skeleton className="w-25 h-6 rounded-lg" />}
		/>
	);
};

export default OrgSwitch;
