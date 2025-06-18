-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "board" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text DEFAULT 'untitled' NOT NULL,
	"org_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);

*/