"use client";

import { useSidebar } from "./ui/sidebar";

const Title = ({ title }: { title: string }) => {
	const { open } = useSidebar();

	return <p className={open ? "" : "hidden"}>{title}</p>;
};

export default Title;
