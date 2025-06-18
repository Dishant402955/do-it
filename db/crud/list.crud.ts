"use server";

import { db } from "@/db/index";
import { desc, eq } from "drizzle-orm";
import { list } from "../schema";

export const createList = async ({
	title,
	boardId,
}: {
	title: string;
	boardId: string;
}) => {
	const date = new Date(Date.now()).toDateString();

	const newOrder = await db
		.select({ order: list.order })
		.from(list)
		.orderBy(desc(list.order))
		.limit(1);

	const item = {
		title,
		boardId,
		createdAt: date,
		updatedAt: date,
		order: newOrder[0] ? newOrder[0].order + 1 : 1,
	};

	try {
		const res = await db.insert(list).values(item);

		if (res.rowCount > 0) {
			return { success: "List Created" };
		}
	} catch (error) {
		return { error: "Error Creating List" };
	}
};

export const DeleteList = async ({ id }: { id: string }) => {
	try {
		const res = await db.delete(list).where(eq(list.id, id));

		if (res.rowCount >= 0) {
			return { success: "List Created" };
		}
	} catch (error) {
		return { error: "Error Deleting Document" };
	}
};

export const UpdateListTitle = async ({
	title,
	id,
}: {
	title: string;
	id: string;
}) => {
	try {
		const res = await db
			.update(list)
			.set({ title, updatedAt: new Date(Date.now()).toDateString() })
			.where(eq(list.id, id));

		if (res.rowCount >= 0) {
			return { success: "List Title Updated" };
		}
	} catch (error) {
		return { error: "Error Updating List Title" };
	}
};

export const UpdateListOrder = async ({
	order = 1,
	id,
}: {
	order: number;
	id: string;
}) => {
	try {
		const res = await db
			.update(list)
			.set({ order, updatedAt: new Date(Date.now()).toDateString() })
			.where(eq(list.id, id));

		if (res.rowCount >= 0) {
			return { success: "List Order Updated" };
		}
	} catch (error) {
		return { error: "Error Updating List Order" };
	}
};

export const getListById = async ({ id }: { id: string }) => {
	try {
		const res = await db.select().from(list).where(eq(list.id, id));

		if (res.length >= 0) {
			return { success: "List Retrieved", data: { list: res[0] } };
		}
	} catch (error) {
		return { error: "Error Retrieving List" };
	}
};

export const getListsByBoardId = async ({
	boardId,
	id,
}: {
	boardId: string;
	id: string;
}) => {
	try {
		console.log(id);
		const res = await db.select().from(list).where(eq(list.boardId, boardId));

		if (res.length >= 0) {
			return { success: "Lists Retrieved", data: { lists: res } };
		}
	} catch (error) {
		return { error: "Error Retrieving Lists" };
	}
};
