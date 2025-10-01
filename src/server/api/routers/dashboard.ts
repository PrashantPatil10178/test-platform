
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getStats: publicProcedure.query(() => {
    return {
      totalUsers: 1234,
      totalTests: 56,
      testsCompleted: 789,
    };
  }),
});
