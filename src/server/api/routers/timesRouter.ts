import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

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
        id: z.string().uuid().optional(),
        trackName: z.string(),
        time: z.string(),
        vehicle: z.string(),
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
});
