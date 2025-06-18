import {
	pgTable,
	uuid,
	text,
	timestamp,
	foreignKey,
	integer,
	pgEnum,
} from "drizzle-orm/pg-core";

export const action = pgEnum("action", ["CREATE", "UPDATE", "DELETE"]);
export const entity = pgEnum("entity", ["CARD", "LIST", "BOARD"]);

export const board = pgTable("board", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().default("untitled").notNull(),
	orgId: text("org_id").notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const auditLog = pgTable("auditLog", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
	orgId: uuid("org_id").notNull(),
	actionType: action("action_type").default("CREATE").notNull(),
	entityId: uuid("entity_id").notNull(),
	userId: uuid("user_id").notNull(),
	username: text().default("unknown"),
	entityTitle: text("entity_title").default("unknown").notNull(),
	entityType: entity("entity_type").default("BOARD").notNull(),
});

export const list = pgTable(
	"list",
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		title: text().default("untitled").notNull(),
		order: integer().default(1).notNull(),
		createdAt: timestamp("created_at", { mode: "string" })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
		boardId: uuid("board_id").notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.boardId],
			foreignColumns: [board.id],
			name: "fkey",
		}).onDelete("cascade"),
	]
);

export const card = pgTable(
	"card",
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		title: text().default("untitled card").notNull(),
		order: integer().default(1).notNull(),
		description: text(),
		listId: uuid("list_id").notNull(),
		createdAt: timestamp("created_at", { mode: "string" })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.listId],
			foreignColumns: [list.id],
			name: "fkey",
		}),
	]
);
