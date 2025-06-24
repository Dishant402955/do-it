"use server";

import { db } from "@/db/index";
import { card } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export const createCard = async ({
	title,
	description,
	listId,
}: {
	title: string;
	description?: string;
	listId: string;
}) => {
	const newOrder = await db
		.select({ order: card.order })
		.from(card)
		.orderBy(desc(card.order))
		.limit(1);

	const date = new Date(Date.now()).toDateString();

	const item = {
		title,
		description,
		listId,
		createdAt: date,
		updatedAt: date,
		order: newOrder[0] ? newOrder[0].order : 1,
	};

	try {
		const res = await db.insert(card).values(item);

		return { success: "Card Created" };
	} catch (error) {
		return { error: "Error Creating Card" };
	}
};

export const deleteCard = async ({ id }: { id: string }) => {
	try {
		const res = await db.delete(card).where(eq(card.id, id));

		if (res.rowCount >= 0) {
			return { success: "Card Deleted" };
		}
	} catch (error) {
		return { error: "Error Deleting Card" };
	}
};

export const updateCard = async ({
	title,
	order = 1,
	description,
	listId,
	id,
}: {
	title: string;
	order: number;
	description?: string;
	listId: string;
	id: string;
}) => {
	try {
		const res = await db
			.update(card)
			.set({ title, order, description, listId })
			.where(eq(card.id, id));

		if (res.rowCount >= 0) {
			return { success: "Updated Card" };
		}
	} catch (error) {
		return { error: "Error Updating Card" };
	}
};

export const getCardById = async ({ id }: { id: string }) => {
	try {
		const res = await db.select().from(card).where(eq(card.id, id));

		if (res.length >= 0) {
			return { success: "Card Retrieved", data: { card: res[0] } };
		}
	} catch (error) {
		return { error: "Error Retrieving Card" };
	}
};

export const getCardsByListId = async ({ listId }: { listId: string }) => {
	try {
		const res = await db.select().from(card).where(eq(card.listId, listId));

		if (res.length >= 0) {
			return { success: "Cards Retrieved", data: { cards: res } };
		}
	} catch (error) {
		return { error: "Error retrieving Cards" };
	}
};

export const cardAlreadyExists = async ({
	title,
	listId,
}: {
	title: string;
	listId: string;
}) => {
	try {
		const res = await db
			.select()
			.from(card)
			.where(and(eq(card.title, title), eq(card.listId, listId)));

		if (res.length > 0) {
			return { success: "Done", data: { exists: true } };
		}
		if (res.length === 0) {
			return { success: "Done", data: { exists: false } };
		}

		return { error: "Something went Wrong!" };
	} catch (error) {
		return { error: "Something went wrong!" };
	}
};
