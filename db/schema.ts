import { relations } from "drizzle-orm";
import {
	pgTable,
	unique,
	uuid,
	text,
	timestamp,
	foreignKey,
	integer,
	pgEnum,
} from "drizzle-orm/pg-core";

export const action = pgEnum("action", ["CREATE", "UPDATE", "DELETE"]);
export const entity = pgEnum("entity", ["CARD", "LIST", "BOARD"]);

export const board = pgTable(
	"board",
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		title: text().default("untitled").notNull(),
		orgId: text("org_id").notNull(),
		createdAt: timestamp("created_at", { mode: "string" })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { mode: "string" }),
	},
	(table) => [unique("constraint_1").on(table.title, table.orgId)]
);

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
		}).onDelete("cascade"),
	]
);

export const listRelations = relations(list, ({ one, many }) => ({
	board: one(board, {
		fields: [list.boardId],
		references: [board.id],
	}),
	cards: many(card),
}));

export const boardRelations = relations(board, ({ many }) => ({
	lists: many(list),
}));

export const cardRelations = relations(card, ({ one }) => ({
	list: one(list, {
		fields: [card.listId],
		references: [list.id],
	}),
}));
