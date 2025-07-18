import Loader from "@/components/loader";
import { OrganizationProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SettingsPage = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<OrganizationProfile
				appearance={{
					baseTheme: dark,
				}}
				fallback={<Loader />}
			/>
		</div>
	);
};

export default SettingsPage;
