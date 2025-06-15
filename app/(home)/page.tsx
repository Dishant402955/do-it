import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Home = async () => {
	const { orgId } = await auth();

	return (
		<div className="h-full w-full flex flex-col justify-center items-center gap-y-8">
			<div className="flex flex-col justify-center items-center gap-1">
				<h1 className="font-bold text-3xl">DO IT.</h1>
				<p className="text-2xl">Start Your Journey with Us Right Now!</p>
			</div>

			<SignedOut>
				<Button asChild size={"lg"} className="p-0">
					<Link href="/sign-up" className="px-8 py-4 text-xl">
						Do it for Free!
					</Link>
				</Button>
			</SignedOut>
			<SignedIn>
				<Button asChild size={"lg"} className="p-0">
					<Link href={orgId ? `org/${orgId}` : "/select-org"}>
						Go to Dashboard!
					</Link>
				</Button>
			</SignedIn>
		</div>
	);
};

export default Home;
