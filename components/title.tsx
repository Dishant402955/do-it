"use client";

import { useSidebar } from "./ui/sidebar";

const Title = ({ title }: any) => {
	const { open } = useSidebar();

	return <p className={open ? "" : "hidden"}>{title}</p>;
};

export default Title;
