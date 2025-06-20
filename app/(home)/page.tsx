import PearlButton from "@/components/pearl-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";

const Home = async () => {
	const { orgId } = await auth();

	return (
		<div className="pt-24 pb-16 h-full w-full flex flex-col justify-start items-center gap-y-4">
			<div className="flex flex-col justify-center items-center">
				<Suspense fallback={<Skeleton className="size-[300px]" />}>
					<Image
						src="/images/image-DT4sJJnTChL2MZOpzyhzOr5UOm00Qh.png"
						height={300}
						width={300}
						alt="Welcome"
					/>
				</Suspense>
				<p className="text-2xl">Do it with Us Right Now!</p>
			</div>

			<ViewTransition>
				<SignedOut>
					{/* <Button asChild size={"lg"} className="p-0"> */}
					<Link href="/sign-up" className="">
						<PearlButton label="Do it for Free" />
					</Link>
					{/* </Button> */}
				</SignedOut>
				<SignedIn>
					{/* <Button asChild size={"lg"} className="p-0"> */}
					<Link href={orgId ? `org/${orgId}` : "/select-org"} className="">
						<PearlButton label="Go to Dashboard" />
					</Link>
					{/* </Button> */}
				</SignedIn>
			</ViewTransition>
		</div>
	);
};

export default Home;
