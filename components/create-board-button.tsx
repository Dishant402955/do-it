import { CreateBoardForm } from "@/components/forms/create-board-form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { hello } from "@/db/crud/board.crud";

const CreateBoardButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create +</Button>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-center items-center w-72 space-y-4">
				<DialogTitle>Create new board</DialogTitle>
				<CreateBoardForm hello={hello} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateBoardButton;
