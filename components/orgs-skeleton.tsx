import React from "react";
import { Skeleton } from "./ui/skeleton";
import Title from "./title";

const OrgsSkeleton = () => {
	return (
		<Skeleton className="mt-4">
			<div className="flex w-full items-center">
				<Skeleton>
					<div className="flex w-full items-center">
						<div className="size-[34px]" />
						<Title title={""} />
					</div>
				</Skeleton>
			</div>
		</Skeleton>
	);
};

export default OrgsSkeleton;
