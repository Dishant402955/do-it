import Org from "@/components/org";
import Pricing from "@/components/pricing";

const BillingsPage = () => {
	return (
		<div className=" w-full h-full flex flex-col p-6 space-y-10">
			<Org />

			<hr />

			<Pricing />
		</div>
	);
};

export default BillingsPage;
