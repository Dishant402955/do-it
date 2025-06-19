import { SignUp } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { Loader } from "lucide-react";

const SignUpPage = () => {
	return (
		<>
			<SignUp
				appearance={{
					baseTheme: dark,
				}}
				fallback={<Loader className="animate-spin" />}
				forceRedirectUrl={"/"}
			/>
		</>
	);
};

export default SignUpPage;
