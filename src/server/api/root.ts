import { createTRPCRouter } from "./trpc";
import { timesRouter } from "./routers/timesRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  times: timesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
