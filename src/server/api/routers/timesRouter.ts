import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { trackTimes } from "../../db/schema";

const timeFields = z.object({
  trackName: z.string().min(1).max(255),
  time: z.string().regex(new RegExp("[0-9]{2}:[0-9]{2}:[0-9]{3}")),
  vehicle: z.string().min(1).max(255),
  vehicleClass: z.string().min(1).max(255),
  game: z.string().min(1).max(255),
});

export const timesRouter = createTRPCRouter({
  /* Procedures:
    - Add newTime
    - Get Times
    - Delete time
    - Update time
  */
  addTime: protectedProcedure
    .input(timeFields)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      const [trackTime] = await ctx.db
        .insert(trackTimes)
        .values({ ...input, userId, updatedAt: new Date() })
        .returning();

      return trackTime;
    }),
  getAllTimes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    const times = await ctx.db
      .select()
      .from(trackTimes)
      .where(eq(trackTimes.userId, userId));
    return times;
  }),
  getTime: protectedProcedure
    .input(
      z.object({
        timeId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.auth.userId;
      const [time] = await ctx.db
        .select()
        .from(trackTimes)
        .where(
          and(eq(trackTimes.id, input.timeId), eq(trackTimes.userId, userId)),
        )
        .limit(1);
      if (!time) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return time;
    }),
  editTime: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: timeFields.extend({ updatedAt: z.date().optional() }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const userId = ctx.auth.userId;
      const [time] = await ctx.db
        .update(trackTimes)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(trackTimes.id, id), eq(trackTimes.userId, userId)))
        .returning();
      if (!time) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return time;
    }),
  deleteTime: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      const userId = ctx.auth.userId;
      const [deleted] = await ctx.db
        .delete(trackTimes)
        .where(and(eq(trackTimes.id, id), eq(trackTimes.userId, userId)))
        .returning({ id: trackTimes.id });
      if (!deleted) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return id;
    }),
});
