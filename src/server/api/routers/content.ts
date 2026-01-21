import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// ============================================
// CONTENT ROUTER - Syllabus & Content Management
// Aligns with MHT-CET Exam Engine API
// ============================================

export const contentRouter = createTRPCRouter({
  // List all subjects with optional filtering by standard
  getSubjects: publicProcedure
    .input(
      z
        .object({
          standard: z.enum(["STD_11", "STD_12"]).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const subjects = await ctx.db.subject.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      });

      return {
        success: true,
        data: subjects,
      };
    }),

  // Get chapters for a specific subject
  getChaptersBySubject: publicProcedure
    .input(z.object({ subjectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const chapters = await ctx.db.chapter.findMany({
        where: {
          subjectId: input.subjectId,
          isActive: true,
        },
        orderBy: { order: "asc" },
        select: {
          id: true,
          name: true,
          code: true,
          description: true,
          order: true,
        },
      });

      return {
        success: true,
        data: chapters,
      };
    }),

  // Get questions with filtering options
  getQuestions: publicProcedure
    .input(
      z.object({
        chapterId: z.string().optional(),
        subjectId: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
        difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
        class: z.number().optional(), // 11 or 12
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {
        isActive: true,
      };

      if (input.chapterId) where.chapterId = input.chapterId;
      if (input.subjectId) where.subjectId = input.subjectId;
      if (input.difficulty) where.difficulty = input.difficulty;
      if (input.class) where.class = input.class;

      const questions = await ctx.db.question.findMany({
        where,
        select: {
          id: true,
          questionText: true,
          questionImage: true,
          option1: true,
          option1Image: true,
          option2: true,
          option2Image: true,
          option3: true,
          option3Image: true,
          option4: true,
          option4Image: true,
          // Hide correct answer for students
          difficulty: true,
          marks: true,
          class: true,
        },
        take: input.limit,
        skip: input.offset,
      });

      // Transform to match API spec format
      const formattedQuestions = questions.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        questionImage: q.questionImage,
        options: [
          { id: "1", optionText: q.option1, image: q.option1Image, order: 1 },
          { id: "2", optionText: q.option2, image: q.option2Image, order: 2 },
          { id: "3", optionText: q.option3, image: q.option3Image, order: 3 },
          { id: "4", optionText: q.option4, image: q.option4Image, order: 4 },
        ],
        difficulty: q.difficulty,
        marks: q.marks,
        class: q.class,
      }));

      return {
        success: true,
        data: formattedQuestions,
      };
    }),

  // Get question count by filters (useful for pagination)
  getQuestionCount: publicProcedure
    .input(
      z.object({
        chapterId: z.string().optional(),
        subjectId: z.string().optional(),
        difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
        class: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {
        isActive: true,
      };

      if (input.chapterId) where.chapterId = input.chapterId;
      if (input.subjectId) where.subjectId = input.subjectId;
      if (input.difficulty) where.difficulty = input.difficulty;
      if (input.class) where.class = input.class;

      const count = await ctx.db.question.count({ where });

      return {
        success: true,
        data: { count },
      };
    }),
});
