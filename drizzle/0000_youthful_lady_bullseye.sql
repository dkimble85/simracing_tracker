CREATE TABLE IF NOT EXISTS "TrackTime" (
	"id" text PRIMARY KEY NOT NULL,
	"trackName" text NOT NULL,
	"time" text NOT NULL,
	"vehicle" text NOT NULL,
	"game" text NOT NULL,
	"vehicleClass" text,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL,
	"userId" text NOT NULL
);
