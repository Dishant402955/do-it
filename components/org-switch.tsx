"use client";

import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { auth } from "@clerk/nextjs/server";
import { Loader } from "lucide-react";

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
			fallback={<Loader className="animate-spin" />}
		/>
	);
};

export default OrgSwitch;
