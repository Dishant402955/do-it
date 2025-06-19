import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<Skeleton className="w-full h-full flex flex-col justify-center items-center space-y-2 py-10 px-5">
			<div>
				<div className="h-20 w-full flex justify-center items-center">
					<div>
						<p>{}</p>
						<p>{}</p>
					</div>
					<div>
						<p>{}</p>
					</div>
					<div>
						<p>{}</p>
						<p>{}</p>
					</div>
				</div>
				<div className="h-20 w-full flex justify-center items-center">
					<div>
						<p>{}</p>
						<p>{}</p>
					</div>
					<div>
						<p>{}</p>
					</div>
					<div>
						<p>{}</p>
						<p>{}</p>
					</div>
				</div>
				<div className="h-20 w-full flex justify-center items-center">
					<div>
						<p>{}</p>
						<p>{}</p>
					</div>
					<div>
						<p>{}</p>
					</div>
					<div>
						<p>{}</p>
						<p>{}</p>
					</div>
				</div>
			</div>
		</Skeleton>
	);
};

export default Loading;
