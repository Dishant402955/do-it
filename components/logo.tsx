import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
	return (
		<Link href={"/"}>
			<div className="flex gap-2 hover:bg-accent-foreground/10 p-2 rounded-lg">
				<Image src={"./logo.svg"} alt="logo" height={26} width={26} />
				<p>Do It</p>
			</div>
		</Link>
	);
};

export default Logo;
