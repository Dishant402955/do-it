import Loader from "@/components/loader";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SignUpPage = () => {
	return (
		<>
			<SignUp
				appearance={{
					baseTheme: dark,
				}}
				fallback={<Loader />}
				forceRedirectUrl={"/"}
			/>
		</>
	);
};

export default SignUpPage;
