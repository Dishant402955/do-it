import Loader from "@/components/loader";
import Logo from "@/components/logo";
import { CreateOrganization } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { unstable_ViewTransition as ViewTransition } from "react";

const SelectOrg = async () => {
	const { orgId } = await auth();
	return (
		<div className="h-full w-full flex justify-center items-center">
			<div className="absolute top-8 left-8">
				<Logo />
			</div>
			<ViewTransition>
				<CreateOrganization
					afterCreateOrganizationUrl={`/org/${orgId}`}
					appearance={{
						baseTheme: dark,
					}}
					fallback={<Loader />}
				/>
			</ViewTransition>
		</div>
	);
};

export default SelectOrg;
