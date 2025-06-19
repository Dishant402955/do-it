import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Loader from "./loader";
import { unstable_ViewTransition as ViewTransition } from "react";

const User = () => {
	return (
		<ViewTransition>
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
		</ViewTransition>
	);
};

export default User;
