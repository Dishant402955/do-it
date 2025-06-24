import { Skeleton } from "./ui/skeleton";
import CreateBoardButton from "./wrappers/create-board-button";

const CreateBoard = () => {
	return (
		<CreateBoardButton fallback="h-36 w-44 rounded-lg bg-accent/50 flex flex-col justify-center items-center">
			<div className="h-36 w-44 rounded-lg bg-accent/50 flex flex-col justify-center items-center">
				<p>Create +</p>
			</div>
		</CreateBoardButton>
	);
};

export default CreateBoard;
