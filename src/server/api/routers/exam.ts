import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const BASE_URL = "https://api.mhtcet.app";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: errorData.message || res.statusText,
      cause: errorData,
    });
  }
  return res.json();
};

export const examRouter = createTRPCRouter({
  // ============================================
  // 1. Syllabus & Content
  // ============================================

  /**
   * List Subjects
   * Get all subjects, properly ordered and grouped by standard (11th/12th).
   */
  listSubjects: publicProcedure
    .input(
      z
        .object({
          standard: z.enum(["STD_11", "STD_12"]).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const url = new URL(`${BASE_URL}/subjects`);
      if (input?.standard) {
        url.searchParams.append("standard", input.standard);
      }

      const res = await fetch(url.toString());
      return handleResponse(res);
    }),

  /**
   * List Chapters
   * Get detailed chapter list for a specific subject.
   */
  listChapters: publicProcedure
    .input(
      z.object({
        subjectId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const url = new URL(`${BASE_URL}/chapters`);
      url.searchParams.append("subjectId", input.subjectId);

      const res = await fetch(url.toString());
      return handleResponse(res);
    }),

  /**
   * List Questions
   * Fetch questions with filtering.
   */
  listQuestions: publicProcedure
    .input(
      z.object({
        chapterId: z.string().optional(),
        limit: z.number().optional().default(20),
        offset: z.number().optional().default(0),
        difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
      }),
    )
    .query(async ({ input }) => {
      const url = new URL(`${BASE_URL}/questions`);
      if (input.chapterId)
        url.searchParams.append("chapterId", input.chapterId);
      if (input.limit) url.searchParams.append("limit", input.limit.toString());
      if (input.offset)
        url.searchParams.append("offset", input.offset.toString());
      if (input.difficulty)
        url.searchParams.append("difficulty", input.difficulty);

      const res = await fetch(url.toString());
      return handleResponse(res);
    }),

  // ============================================
  // 2. Test Engine (Exam Simulation)
  // ============================================

  tests: createTRPCRouter({
    /**
     * Generate Test Paper
     * Creates a new unique question paper based on MHT-CET weightage rules.
     */
    create: protectedProcedure
      .input(
        z.object({
          type: z.enum(["PCM", "PCB"]),
        }),
      )
      .mutation(async ({ input }) => {
        const res = await fetch(`${BASE_URL}/tests/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        return handleResponse(res);
      }),

    /**
     * Generate Subject-Wise Test
     */
    createSubjectTest: protectedProcedure
      .input(
        z.object({
          subjectId: z.string().uuid(),
          count: z.number().optional().default(20),
          time: z.number().optional().default(1800),
        }),
      )
      .mutation(async ({ input }) => {
        const res = await fetch(`${BASE_URL}/tests/create/subject`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        return handleResponse(res);
      }),

    /**
     * Generate Chapter-Wise Test
     */
    createChapterTest: protectedProcedure
      .input(
        z.object({
          chapterId: z.string().uuid(),
          count: z.number().optional().default(10),
          time: z.number().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        const res = await fetch(`${BASE_URL}/tests/create/chapter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        return handleResponse(res);
      }),

    /**
     * Start Test Attempt
     */
    start: protectedProcedure
      .input(
        z.object({
          testId: z.string().uuid(),
          userId: z.string().optional(), // Can pass explicit userId or use DB's
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const res = await fetch(`${BASE_URL}/tests/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            testId: input.testId,
            userId: input.userId || ctx.session.user.id,
          }),
        });
        return handleResponse(res);
      }),

    /**
     * Get Test State (Heartbeat)
     */
    getState: protectedProcedure
      .input(
        z.object({
          attemptId: z.string().uuid(),
        }),
      )
      .query(async ({ input }) => {
        const res = await fetch(`${BASE_URL}/tests/state/${input.attemptId}`, {
          cache: "no-store",
        });
        return handleResponse(res);
      }),

    /**
     * Submit Response (Single)
     */
    submitResponse: protectedProcedure
      .input(
        z.object({
          attemptId: z.string().uuid(),
          questionId: z.string().uuid(),
          optionOrder: z.number().min(1).max(4),
        }),
      )
      .mutation(async ({ input }) => {
        const res = await fetch(`${BASE_URL}/tests/response`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        return handleResponse(res);
      }),

    /**
     * Bulk Sync
     */
    sync: protectedProcedure
      .input(
        z.object({
          attemptId: z.string().uuid(),
          answers: z.record(z.string(), z.number()),
        }),
      )
      .mutation(async ({ input }) => {
        const res = await fetch(`${BASE_URL}/tests/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        return handleResponse(res);
      }),

    /**
     * Submit Section / Finish Test
     */
    submitSection: protectedProcedure
      .input(
        z.object({
          attemptId: z.string().uuid(),
        }),
      )
      .mutation(async ({ input }) => {
        const res = await fetch(`${BASE_URL}/tests/submit-section`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        return handleResponse(res);
      }),
  }),
});
