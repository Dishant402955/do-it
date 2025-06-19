import Org from "@/components/org";
import { unstable_ViewTransition as ViewTransition } from "react";

const ActivityPage = () => {
	const Logs = [
		{
			orgName: "one",
			actionType: "CREATE",
			entityType: "BOARD",
			entityTitle: "oneone",
			username: "me",
		},
		{
			orgName: "one",
			actionType: "CREATE",
			entityType: "BOARD",
			entityTitle: "oneone",
			username: "me",
		},
		{
			orgName: "one",
			actionType: "CREATE",
			entityType: "BOARD",
			entityTitle: "oneone",
			username: "me",
		},
		{
			orgName: "one",
			actionType: "CREATE",
			entityType: "BOARD",
			entityTitle: "oneone",
			username: "me",
		},
	];

	return (
		<div className="w-full h-full flex flex-col justify-start items-center space-y-2 py-10 px-5">
			<Org />

			<ViewTransition>
				{Logs.map((log, index) => {
					return (
						<div
							className="h-20 w-full flex justify-center items-center"
							key={index}
						>
							<div>
								<p>{log.orgName}</p>
								<p>{log.username}</p>
							</div>
							<div>
								<p>{log.actionType}</p>
							</div>
							<div>
								<p>{log.entityType}</p>
								<p>{log.entityTitle}</p>
							</div>
						</div>
					);
				})}
			</ViewTransition>
		</div>
	);
};

export default ActivityPage;
