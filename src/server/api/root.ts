import { dashboardRouter } from "@/server/api/routers/dashboard";
import { userRouter } from "@/server/api/routers/user";
import { subscriptionRouter } from "@/server/api/routers/subscription";
import { paymentRouter } from "@/server/api/routers/payment";
import { organizationRouter } from "@/server/api/routers/organization";
import { testRouter } from "@/server/api/routers/test";
import { questionRouter } from "@/server/api/routers/question";
import { analyticsRouter } from "@/server/api/routers/analytics";
import { contentRouter } from "@/server/api/routers/content";
import { examRouter } from "@/server/api/routers/exam";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  dashboard: dashboardRouter,
  user: userRouter,
  subscription: subscriptionRouter,
  payment: paymentRouter,
  organization: organizationRouter,
  test: testRouter,
  exam: examRouter,
  question: questionRouter,
  analytics: analyticsRouter,
  content: contentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
