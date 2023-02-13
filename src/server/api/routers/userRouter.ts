import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  updateName: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;
      const user = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: input.name,
        },
      });
      return user;
    }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user?.id;
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }),
});
