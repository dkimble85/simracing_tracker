import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const trackTimes = pgTable("TrackTime", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  trackName: text("trackName").notNull(),
  time: text("time").notNull(),
  vehicle: text("vehicle").notNull(),
  game: text("game").notNull(),
  vehicleClass: text("vehicleClass"),
  createdAt: timestamp("createdAt", { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  userId: text("userId").notNull(),
});

export type TrackTime = typeof trackTimes.$inferSelect;
export type NewTrackTime = typeof trackTimes.$inferInsert;
