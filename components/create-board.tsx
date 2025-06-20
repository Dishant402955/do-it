import CreateBoardButton from "./wrappers/create-board-button";
import { unstable_ViewTransition as ViewTransition } from "react";

const CreateBoard = () => {
	return (
		// <ViewTransition>
		<CreateBoardButton>
			<div className="h-36 w-44 rounded-lg bg-accent/50 flex flex-col justify-center items-center">
				<p>Create +</p>
			</div>
		</CreateBoardButton>
		// </ViewTransition>
	);
};

export default CreateBoard;
