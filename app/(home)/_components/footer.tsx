import Logo from "@/components/logo";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="absolute bottom-0 w-full flex justify-between items-center p-4 gap-4 h-16 border-t-[1px] dark:shadow-accent pb-8">
			<div className="flex justify-center items-center h-full ml-2">
				<Logo />
			</div>
			<div className="flex justify-center items-center gap-x-16 pr-10">
				<Link href={"/privacy-policy"}>Privacy Policy</Link>
				<Link href={"/terms-of-service"}>Terms of Service</Link>
			</div>
		</footer>
	);
};

export default Footer;
