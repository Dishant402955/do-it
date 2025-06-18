"use server";

import { db } from "@/db/index";
import { board } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createBoard = async ({
	orgId,
	title,
}: {
	orgId: string;
	title: string;
}) => {
	if (!orgId || !title) {
		return { success: false, message: "Invalid Data" };
	}
	const item = {
		orgId,
		title,
		createdAt: new Date(Date.now()).toDateString(),
		updatedAt: new Date(Date.now()).toDateString(),
	};

	try {
		const res = await db.insert(board).values(item);

		if (res.rowCount > 0) {
			return { success: "Board Created" };
		}
	} catch (error) {
		return { error: "Error Creating Board" };
	}
};

export const deleteBoard = async ({ id }: { id: string }) => {
	try {
		const res = await db.delete(board).where(eq(board.id, id));

		if (res.rowCount > 0) {
			return { success: "Board Deleted" };
		} else {
			return { success: "No Board Exists to Delete it" };
		}
	} catch (error) {
		return { error: "Error Deleting Board" };
	}
};

export const updateBoardTitle = async ({
	title,
	id,
}: {
	title: string;
	id: string;
}) => {
	try {
		const res = await db
			.update(board)
			.set({ title, updatedAt: new Date(Date.now()).toDateString() })
			.where(eq(board.id, id));

		if (res.rowCount) {
			return { success: "Updated Board Title" };
		}
	} catch (error) {
		return { error: "Error Updating Board Title" };
	}
};

export const getBoardById = async ({ id }: { id: string }) => {
	try {
		const res = await db.select().from(board).where(eq(board.id, id));

		if (res.length >= 0) {
			return { success: "Retrieved Board", data: { board: res[0] } };
		}
	} catch (error) {
		return { error: "Error Retrieving Board" };
	}
};

export const getBoardsByOrgId = async ({ orgId }: { orgId: string }) => {
	try {
		const res = await db.select().from(board).where(eq(board.orgId, orgId));

		if (res.length >= 0) {
			return { success: "Retrieved Boards", data: { boards: res } };
		}
	} catch (error) {
		return { error: "Error Retrieving Boards" };
	}
};

export const hello = () => {
	console.log("hello");
};
