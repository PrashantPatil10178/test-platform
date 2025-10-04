import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { AttemptStatus } from "@prisma/client";

export const testRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.test.findMany({
      where: { isPublic: true, isPublished: true },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.test.findUnique({
        where: { id: input.id },
        include: {
          testQuestions: {
            include: {
              question: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        instructions: z.string().optional(),
        organizationId: z.string().optional(),
        duration: z.number(),
        totalMarks: z.number(),
        passingMarks: z.number().optional(),
        isPublic: z.boolean().default(false),
        isPaid: z.boolean().default(false),
        requiresSubscription: z.boolean().default(false),
        allowAIHints: z.boolean().default(true),
        maxAIHints: z.number().default(3),
        shuffleQuestions: z.boolean().default(false),
        shuffleOptions: z.boolean().default(false),
        showResults: z.boolean().default(true),
        showAnswers: z.boolean().default(true),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        isPublished: z.boolean().default(false),
        questionIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { questionIds, ...testData } = input;
      const totalQuestions = questionIds.length;

      return ctx.db.test.create({
        data: {
          ...testData,
          createdBy: ctx.session.user.id,
          totalQuestions,
          testQuestions: {
            create: questionIds.map((questionId, index) => ({
              questionId: questionId,
              order: index + 1,
            })),
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        instructions: z.string().optional(),
        duration: z.number().optional(),
        totalMarks: z.number().optional(),
        passingMarks: z.number().optional(),
        isPublic: z.boolean().optional(),
        isPublished: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.test.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.test.delete({
        where: { id: input.id },
      });
    }),

  startAttempt: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const test = await ctx.db.test.findUnique({
        where: { id: input.testId },
      });
      if (!test) {
        throw new Error("Test not found");
      }
      return ctx.db.testAttempt.create({
        data: {
          testId: input.testId,
          userId: ctx.session.user.id,
          totalQuestions: test.totalQuestions,
          status: "IN_PROGRESS",
        },
      });
    }),

  submitAnswer: protectedProcedure
    .input(
      z.object({
        attemptId: z.string(),
        questionId: z.string(),
        selectedOption: z.number().min(1).max(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.db.question.findUnique({
        where: { id: input.questionId },
      });
      if (!question) throw new Error("Question not found");

      const isCorrect = input.selectedOption === question.correctOption;
      const marksAwarded = isCorrect ? question.marks : -question.negativeMarks;

      return ctx.db.studentAnswer.upsert({
        where: {
          attemptId_questionId: {
            attemptId: input.attemptId,
            questionId: input.questionId,
          },
        },
        update: {
          selectedOption: input.selectedOption,
          isCorrect,
          marksAwarded,
        },
        create: {
          attemptId: input.attemptId,
          questionId: input.questionId,
          userId: ctx.session.user.id,
          selectedOption: input.selectedOption,
          isCorrect,
          marksAwarded,
        },
      });
    }),

  submitAttempt: protectedProcedure
    .input(z.object({ attemptId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const attempt = await ctx.db.testAttempt.findUnique({
        where: { id: input.attemptId },
        include: { answers: true },
      });
      if (!attempt) throw new Error("Attempt not found");

      const attempted = attempt.answers.length;
      const correct = attempt.answers.filter((a) => a.isCorrect).length;
      const incorrect = attempted - correct;
      const score = attempt.answers.reduce((acc, a) => acc + a.marksAwarded, 0);

      return ctx.db.testAttempt.update({
        where: { id: input.attemptId },
        data: {
          status: "SUBMITTED",
          submittedAt: new Date(),
          attempted,
          correct,
          incorrect,
          score,
          // you might want to calculate percentage and rank here or in a background job
        },
      });
    }),

  getAttemptsByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.testAttempt.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        test: true,
      },
      orderBy: {
        startedAt: "desc",
      },
    });
  }),

  getByOrganization: protectedProcedure
    .input(z.object({ organizationId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.test.findMany({
        where: { organizationId: input.organizationId },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
});
