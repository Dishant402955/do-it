import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(process.env.DATABASE_URL!);

// async function main() {
// 	const user: board.$inferInsert = {
// 		name: "John",
// 		age: 30,
// 		email: "john@example.com",
// 	};

// 	await db.insert(board).values(user);
// 	console.log("New user created!");

// 	const users = await db.select().from(board);
// 	console.log("Getting all users from the database: ", board);
// 	/*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */

// 	await db
// 		.update(board)
// 		.set({
// 			age: 31,
// 		})
// 		.where(eq(usersTable.email, user.email));
// 	console.log("User info updated!");

// 	await db.delete(usersTable).where(eq(usersTable.email, user.email));
// 	console.log("User deleted!");
// }

// main();
