import Logo from "@/components/logo";
import { OrganizationList } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const SelectOrg = async () => {
	const { orgId } = await auth();
	return (
		<div className="h-full w-full flex justify-center items-center">
			<div className="absolute top-8 left-8">
				<Logo />
			</div>
			<OrganizationList
				hidePersonal
				afterSelectOrganizationUrl={`org/${orgId}`}
				afterCreateOrganizationUrl={`org/${orgId}`}
			/>
		</div>
	);
};

export default SelectOrg;
