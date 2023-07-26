import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const timesRouter = createTRPCRouter({
  /* Procedures:
    - Add newTime
    - Get Times
    - Delete time
    - Update time
  */
  addTime: protectedProcedure
    .input(
      z.object({
        trackName: z.string(),
        time: z.string().regex(new RegExp("[0-9]{2}:[0-9]{2}:[0-9]{3}")),
        vehicle: z.string(),
        vehicleClass: z.string(),
        game: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const TrackTime = await ctx.prisma.trackTime.create({
        data: input,
      });

      return TrackTime;
    }),
  getAllTimes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth?.userId;
    const times = await ctx.prisma.trackTime.findMany({
      where: {
        userId: userId,
      },
    });
    return times;
  }),
  getTime: protectedProcedure
    .input(
      z.object({
        timeId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const time = await ctx.prisma.trackTime.findUnique({
        where: {
          id: input.timeId,
        },
      });
      return time;
    }),
  editTime: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          updatedAt: z.date().optional(),
          trackName: z.string(),
          time: z.string().regex(new RegExp("[0-9]{2}:[0-9]{2}:[0-9]{3}")),
          vehicle: z.string(),
          game: z.string(),
          vehicleClass: z.string(),
          userId: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const time = await ctx.prisma.trackTime.update({
        where: { id },
        data,
      });

      return time;
    }),
  deletTime: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      await ctx.prisma.trackTime.delete({ where: { id } });
      return id;
    }),
});
