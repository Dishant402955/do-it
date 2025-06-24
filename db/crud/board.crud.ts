"use server";

import { db } from "@/db/index";
import { board } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, count, eq, exists } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

	const { has } = await auth();

	const isFree = has({ plan: "free_org" });
	const isPro = has({ plan: "pro_tier" });
	const isUnlimited = has({ plan: "unlimited" });

	const boardCount = (
		await db.select().from(board).where(eq(board.orgId, orgId))
	).length;

	if (isFree) {
		if (boardCount + 1 > 5) {
			return { error: "limit reached", limitReached: true };
		}
	}

	if (isPro) {
		if (boardCount + 1 > 25) {
			return { error: "limit reached", limitReached: true };
		}
	}

	if (isUnlimited) {
		1;
	}

	const item = {
		orgId,
		title,
		createdAt: new Date(Date.now()).toDateString(),
		updatedAt: new Date(Date.now()).toDateString(),
	};

	try {
		const res = await db.insert(board).values(item);

		revalidatePath(`/org/${orgId}`);

		const newBoard = await getBoardByTitleAndOrgId({ title, orgId });

		return {
			success: "Board Created",
			data: { board: newBoard?.data?.board },
		};
	} catch (error) {
		return { error: "Error Creating Board" };
	}
};

export const deleteBoard = async ({
	id,
	orgId,
}: {
	id: string;
	orgId: string;
}) => {
	try {
		const res = await db.delete(board).where(eq(board.id, id));

		revalidatePath(`/org/${orgId}`);

		return { success: "Board Deleted" };
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

		revalidatePath(`/board/${id}`);
		return { success: "Updated Board Title" };
	} catch (error) {
		return { error: "Error Updating Board Title" };
	}
};

export const getBoardById = async ({ id }: { id: string }) => {
	try {
		const res = await db.select().from(board).where(eq(board.id, id));

		return { success: "Retrieved Board", data: { board: res[0] } };
	} catch (error) {
		return { error: "Error Retrieving Board" };
	}
};

export const getBoardByTitleAndOrgId = async ({
	title,
	orgId,
}: {
	title: string;
	orgId: string;
}) => {
	try {
		const res = await db
			.select()
			.from(board)
			.where(and(eq(board.orgId, orgId), eq(board.title, title)));

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

export const getTotalBoardsByOrgId = async ({ orgId }: { orgId: string }) => {
	try {
		const res = await db
			.select({ count: count() })
			.from(board)
			.where(eq(board.orgId, orgId));

		return { success: "Retrieved Boards", data: { boardCount: res[0].count } };
	} catch (error) {
		return { error: "Error Retrieving Boards" };
	}
};

export const boardAlreadyExists = async ({
	title,
	orgId,
}: {
	title: string;
	orgId: string;
}) => {
	try {
		const res = await db
			.select()
			.from(board)
			.where(and(eq(board.title, title), eq(board.orgId, orgId)));

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

export const getBoardsCount = async ({ orgId }: { orgId: string }) => {
	try {
		const res = await db.select().from(board).where(eq(board.orgId, orgId));

		return { success: "Retrieved Board", data: { count: res.length } };
	} catch (error) {
		return { error: "Error Retrieving Board" };
	}
};
