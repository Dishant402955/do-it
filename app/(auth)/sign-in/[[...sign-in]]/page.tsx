import Loader from "@/components/loader";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SignInPage = () => {
	return (
		<SignIn
			appearance={{
				baseTheme: dark,
			}}
			fallback={<Loader />}
			forceRedirectUrl={"/"}
		/>
	);
};

export default SignInPage;
