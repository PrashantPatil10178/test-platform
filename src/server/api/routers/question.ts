
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Difficulty } from "@prisma/client";

export const questionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.question.findMany();
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.db.question.findUnique({
      where: { id: input.id },
    });
  }),

  getBySubject: publicProcedure.input(z.object({ subjectId: z.string() })).query(({ctx, input}) => {
    return ctx.db.question.findMany({
        where: { subjectId: input.subjectId }
    })
  }),

  getByChapter: publicProcedure.input(z.object({ chapterId: z.string() })).query(({ctx, input}) => {
    return ctx.db.question.findMany({
        where: { chapterId: input.chapterId }
    })
  }),

  create: protectedProcedure
    .input(
      z.object({
        subjectId: z.string(),
        chapterId: z.string(),
        questionText: z.string(),
        questionImage: z.string().optional(),
        option1: z.string(),
        option1Image: z.string().optional(),
        option2: z.string(),
        option2Image: z.string().optional(),
        option3: z.string(),
        option3Image: z.string().optional(),
        option4: z.string(),
        option4Image: z.string().optional(),
        correctOption: z.number().min(1).max(4),
        explanation: z.string().optional(),
        explanationImage: z.string().optional(),
        difficulty: z.nativeEnum(Difficulty).default("MEDIUM"),
        marks: z.number().default(4),
        negativeMarks: z.number().default(1),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.create({
        data: {
          ...input,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        questionText: z.string().optional(),
        correctOption: z.number().min(1).max(4).optional(),
        explanation: z.string().optional(),
        difficulty: z.nativeEnum(Difficulty).optional(),
        isVerified: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.question.update({
        where: { id },
        data,
      });
    }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.db.question.delete({
            where: { id: input.id },
        });
    }),
});
