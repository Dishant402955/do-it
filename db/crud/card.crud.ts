"use server";

import { db } from "@/db/index";
import { card } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

export const deleteCard = async ({
	id,
	boardId,
}: {
	id: string;
	boardId: string;
}) => {
	try {
		const res = await db.delete(card).where(eq(card.id, id));

		revalidatePath(`/board/${boardId}`);
		return { success: "Card Deleted" };
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

export const UpdateCardTitle = async ({
	title,
	id,
}: {
	title: string;
	id: string;
}) => {
	try {
		const res = await db
			.update(card)
			.set({ title, updatedAt: new Date(Date.now()).toDateString() })
			.where(eq(card.id, id));

		return { success: "Card Title Updated" };
	} catch (error) {
		return { error: "Error Updating Card Title" };
	}
};

export const updateCardListId = async ({
	id,
	listId,
	boardId,
}: {
	listId: string;
	id: string;
	boardId: string;
}) => {
	try {
		const res = await db
			.update(card)
			.set({ listId, updatedAt: new Date(Date.now()).toDateString() })
			.where(eq(card.id, id));

		revalidatePath(`/board/${boardId}`);
		return { success: "Card's listId Updated" };
	} catch (error) {
		return { error: "Error Updating Card" };
	}
};

export const UpdateCardDescription = async ({
	description = "",
	id,
}: {
	description: string | undefined;
	id: string;
}) => {
	try {
		const res = await db
			.update(card)
			.set({ description, updatedAt: new Date(Date.now()).toDateString() })
			.where(eq(card.id, id));

		return { success: "Card  Updated" };
	} catch (error) {
		return { error: "Error Updating Card " };
	}
};
