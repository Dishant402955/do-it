import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Loader } from "lucide-react";

const SignInPage = () => {
	return (
		<SignIn
			appearance={{
				baseTheme: dark,
			}}
		/>
	);
};

export default SignInPage;
