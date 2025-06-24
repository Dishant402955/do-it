import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Loader from "./loader";

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
			fallback={<Loader />}
		/>
	);
};

export default User;
