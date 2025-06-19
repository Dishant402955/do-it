"use client";

import Logo from "@/components/logo";
import { CreateOrganization, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Loader } from "lucide-react";

const SelectOrg = () => {
	const { orgId } = useAuth();
	return (
		<div className="h-full w-full flex justify-center items-center">
			<div className="absolute top-8 left-8">
				<Logo />
			</div>
			<CreateOrganization
				afterCreateOrganizationUrl={`/org/${orgId}`}
				appearance={{
					baseTheme: dark,
				}}
				fallback={<Loader className="animate-spin" />}
			/>
		</div>
	);
};

export default SelectOrg;
