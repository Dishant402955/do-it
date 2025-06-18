import { relations } from "drizzle-orm/relations";
import { board, list, card } from "./schema";

export const listRelations = relations(list, ({one, many}) => ({
	board: one(board, {
		fields: [list.boardId],
		references: [board.id]
	}),
	cards: many(card),
}));

export const boardRelations = relations(board, ({many}) => ({
	lists: many(list),
}));

export const cardRelations = relations(card, ({one}) => ({
	list: one(list, {
		fields: [card.listId],
		references: [list.id]
	}),
}));