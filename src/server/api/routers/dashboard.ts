import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import z from "zod";

export const dashboardRouter = createTRPCRouter({
  getStats: publicProcedure.query(() => {
    return {
      totalUsers: 1234,
      totalTests: 56,
      testsCompleted: 789,
    };
  }),
  editStats: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        views: z.number().optional(),
        likes: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Input received:", input);

      return "Stats updated successfully";
    }),
});
