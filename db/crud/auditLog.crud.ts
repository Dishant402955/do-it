"use server";

import { db } from "@/db/index";
import { auditLog, action, entity } from "@/db/schema";
import { eq } from "drizzle-orm";

interface createAuditLogParameters {
	orgId: string;
	actionType:
		| (typeof action.enumValues)[0]
		| (typeof action.enumValues)[1]
		| (typeof action.enumValues)[2];
	entityId: string;
	entityTitle: string;
	entityType:
		| (typeof entity.enumValues)[0]
		| (typeof entity.enumValues)[1]
		| (typeof entity.enumValues)[2];
	userId: string;
	username: string;
}

export const createAuditLog = async ({
	orgId,
	actionType,
	entityId,
	entityTitle,
	entityType,
	userId,
	username,
}: createAuditLogParameters) => {
	const log = {
		orgId,
		actionType,
		entityId,
		entityTitle,
		entityType,
		userId,
		username,
	};

	try {
		const res = await db.insert(auditLog).values(log);

		if (res.rowCount > 0) {
			return { success: "auditLog Created " };
		}
	} catch (error) {
		return { error: "Error Creating auditLog" };
	}
};

export const getAuditLogById = async ({ id }: { id: string }) => {
	try {
		const res = await db.select().from(auditLog).where(eq(auditLog.id, id));

		if (res.length >= 0) {
			return { success: "Retrived auditLog", data: { log: res[0] } };
		}
	} catch (error) {
		return { error: "Error Reading auditLogs" };
	}
};

export const getAuditLogsByOrgId = async ({ orgId }: { orgId: string }) => {
	try {
		const res = await db
			.select()
			.from(auditLog)
			.where(eq(auditLog.orgId, orgId));

		if (res.length >= 0) {
			return { success: "Retrieved auditLogs", data: { logs: res } };
		}
	} catch (error) {
		return { error: "Error Retrieving auditLogs" };
	}
};

export const getAuditLogsByActionType = async ({
	actionType,
}: {
	actionType: "CREATE" | "UPDATE" | "DELETE";
}) => {
	try {
		const res = await db
			.select()
			.from(auditLog)
			.where(eq(auditLog.actionType, actionType));

		if (res.length > 0) {
			return { success: "Retrieved auditLogs", data: { logs: res } };
		}
	} catch (error) {
		return { error: "Error Retrieving auditLogs" };
	}
};

export const getAuditLogsByEntityType = async ({
	entityType,
}: {
	entityType: "CARD" | "BOARD" | "LIST";
}) => {
	try {
		const res = await db
			.select()
			.from(auditLog)
			.where(eq(auditLog.entityType, entityType));

		if (res.length >= 0) {
			return { success: "Retrieved auditLogs", data: { logs: res } };
		}
	} catch (error) {
		return { error: "Error Retrieving auditLogs" };
	}
};

export const getAuditLogsByEntityId = async ({
	entityId,
}: {
	entityId: string;
}) => {
	try {
		const res = await db
			.select()
			.from(auditLog)
			.where(eq(auditLog.entityId, entityId));

		if (res.length >= 0) {
			return { success: "Retrieved auditLogs", data: { logs: res } };
		}
	} catch (error) {
		return { error: "Error Retrieving auditLogs" };
	}
};

export const getAuditLogsByUserId = async ({ userId }: { userId: string }) => {
	try {
		const res = await db
			.select()
			.from(auditLog)
			.where(eq(auditLog.userId, userId));

		if (res.length >= 0) {
			return { success: "Retrieved", data: { logs: res } };
		}
	} catch (error) {
		return { error: "Error Retrieving auditLogs" };
	}
};
