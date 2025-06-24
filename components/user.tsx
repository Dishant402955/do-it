import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Loader from "./loader";
import { Skeleton } from "./ui/skeleton";

const User = () => {
	return (
		<UserButton
			appearance={{
				baseTheme: dark,
			}}
			userProfileProps={{
				appearance: {
					baseTheme: dark,
				},
			}}
			fallback={<Skeleton className="size-8 rounded-full" />}
		/>
	);
};

export default User;
