import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<Skeleton>
			<div className="w-full h-full flex justify-center items-center"></div>
		</Skeleton>
	);
};

export default Loading;
