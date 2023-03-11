CREATE TABLE "tasks" (
	"id" serial primary key,
	"description" varchar(120) not null,
	"complete" boolean not null DEFAULT FALSE
	);
	
INSERT INTO "tasks" ("description")
VALUES ('mow the lawn'), ('laundry'), ('grocery shopping');

SELECT * FROM "tasks" ORDER by "id";