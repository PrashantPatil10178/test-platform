
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
  getQuestionAnalytics: publicProcedure
    .input(z.object({ questionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.questionAnalytics.findUnique({
        where: { questionId: input.questionId },
      });
    }),

  getAiReport: protectedProcedure
    .input(z.object({ attemptId: z.string() }))
    .query(({ ctx, input }) => {
      // Note: Prisma client uses 'aIReport' for the 'AIReport' model
      return ctx.db.aIReport.findUnique({
        where: { attemptId: input.attemptId },
      });
    }),

  getAiHints: protectedProcedure
    .input(z.object({ attemptId: z.string() }))
    .query(({ ctx, input }) => {
      // Note: Prisma client uses 'aIHint' for the 'AIHint' model
      return ctx.db.aIHint.findMany({
        where: { attemptId: input.attemptId },
      });
    }),

  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    const [userCount, testCount, questionCount, organizationCount, subscriptionCount] = await Promise.all([
        ctx.db.user.count(),
        ctx.db.test.count(),
        ctx.db.question.count(),
        ctx.db.organization.count(),
        ctx.db.subscription.count({ where: { status: 'ACTIVE' } }),
    ]);

    return {
        userCount,
        testCount,
        questionCount,
        organizationCount,
        subscriptionCount,
    };
  })
});
