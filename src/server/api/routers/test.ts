import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

// ============================================
// MHT-CET EXAM ENGINE - NEW TEST ENGINE
// ============================================

// Helper function to calculate time remaining
function calculateTimeRemaining(
  startTime: Date,
  durationMinutes: number,
): number {
  const now = new Date();
  const elapsed = (now.getTime() - startTime.getTime()) / 1000 / 60; // minutes
  return Math.max(0, durationMinutes - elapsed);
}

// Helper to generate MHT-CET paper (80% Class 12, 20% Class 11)
async function generateMHTCETPaper(
  db: any,
  type: "PCM" | "PCB",
  userId: string,
) {
  // MHT-CET has 150 questions total (50 per subject)
  // 80% from Class 12, 20% from Class 11
  const questionsPerSubject = 50;
  const class12Count = Math.floor(questionsPerSubject * 0.8); // 40
  const class11Count = questionsPerSubject - class12Count; // 10

  // Use actual subject codes from database enum
  const subjectCodes =
    type === "PCM" ? ["PHYS", "CHEM", "MATHS_1"] : ["PHYS", "CHEM", "BIO"];

  const allQuestionIds: string[] = [];

  for (const code of subjectCodes) {
    const subject = await db.subject.findFirst({
      where: {
        code,
        isActive: true,
      },
    });

    if (!subject) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Subject with code '${code}' not found. Please run: npx prisma db seed`,
      });
    }

    // Get Class 12 questions
    const class12Questions = await db.question.findMany({
      where: {
        subjectId: subject.id,
        class: 12,
        isActive: true,
      },
      select: { id: true },
      take: class12Count * 2, // Get more to shuffle
    });

    // Get Class 11 questions
    const class11Questions = await db.question.findMany({
      where: {
        subjectId: subject.id,
        class: 11,
        isActive: true,
      },
      select: { id: true },
      take: class11Count * 2,
    });

    // Shuffle and select
    const shuffled12 = class12Questions
      .sort(() => 0.5 - Math.random())
      .slice(0, class12Count);
    const shuffled11 = class11Questions
      .sort(() => 0.5 - Math.random())
      .slice(0, class11Count);

    allQuestionIds.push(
      ...shuffled12.map((q: { id: string }) => q.id),
      ...shuffled11.map((q: { id: string }) => q.id),
    );
  }

  // Create test paper
  const totalQuestions = allQuestionIds.length;
  const test = await db.test.create({
    data: {
      title: `MHT-CET ${type} Mock Test`,
      description: `Full-length MHT-CET ${type} simulation with 150 questions`,
      duration: 180, // 3 hours (divided into 3 sections of 90 mins each)
      totalMarks: totalQuestions * 4,
      totalQuestions,
      createdBy: userId,
      isPublished: true,
      allowAIHints: false, // Strict exam mode
      shuffleQuestions: true,
      shuffleOptions: true,
      showResults: false, // Only after submission
      testQuestions: {
        create: allQuestionIds.map((qId, idx) => ({
          questionId: qId,
          order: idx + 1,
        })),
      },
    },
  });

  return test;
}

export const testRouter = createTRPCRouter({
  // ============================================
  // 1. SYLLABUS & CONTENT ENDPOINTS
  // ============================================

  // List Subjects - GET /subjects
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

  // List Chapters - GET /chapters
  getChapters: publicProcedure
    .input(
      z.object({
        subjectId: z.string(),
      }),
    )
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
          order: true,
          description: true,
        },
      });

      return {
        success: true,
        data: chapters,
      };
    }),

  // List Questions - GET /questions
  getQuestions: publicProcedure
    .input(
      z.object({
        chapterId: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
        difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const questions = await ctx.db.question.findMany({
        where: {
          chapterId: input.chapterId,
          difficulty: input.difficulty,
          isActive: true,
        },
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
        },
        take: input.limit,
        skip: input.offset,
      });

      // Transform to options array format
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
      }));

      return {
        success: true,
        data: formattedQuestions,
      };
    }),

  // ============================================
  // 2. TEST ENGINE (EXAM SIMULATION)
  // ============================================

  // Generate Test Paper - POST /tests/create
  createTest: publicProcedure
    .input(
      z.object({
        type: z.enum(["PCM", "PCB"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Use session user if available, otherwise create anonymous user
      const userId = ctx.session?.user?.id || "anonymous";

      const test = await generateMHTCETPaper(ctx.db, input.type, userId);

      return {
        success: true,
        data: {
          testId: test.id,
        },
      };
    }),

  // Start Test Attempt - POST /tests/start
  startTest: publicProcedure
    .input(
      z.object({
        testId: z.string(),
        userId: z.string().optional(), // For anonymous users
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const test = await ctx.db.test.findUnique({
        where: { id: input.testId },
      });

      if (!test) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Test not found",
        });
      }

      const userId = ctx.session?.user?.id || input.userId || "anonymous";

      const attempt = await ctx.db.testAttempt.create({
        data: {
          testId: input.testId,
          userId,
          totalQuestions: test.totalQuestions,
          status: "IN_PROGRESS",
          startedAt: new Date(),
        },
      });

      return {
        success: true,
        data: {
          attemptId: attempt.id,
        },
      };
    }),

  // Get Test State (Heartbeat) - GET /tests/state/:attemptId
  getTestState: publicProcedure
    .input(
      z.object({
        attemptId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const attempt = await ctx.db.testAttempt.findUnique({
        where: { id: input.attemptId },
        include: {
          test: {
            include: {
              testQuestions: {
                include: {
                  question: {
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
                      marks: true,
                    },
                  },
                },
                orderBy: { order: "asc" },
              },
            },
          },
          answers: true,
        },
      });

      if (!attempt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Test attempt not found",
        });
      }

      // Calculate server authoritative timer
      const serverTime = new Date();
      const timeLeft = calculateTimeRemaining(
        attempt.startedAt,
        attempt.test.duration,
      );

      // Auto-submit if time is up
      if (timeLeft <= 0 && attempt.status === "IN_PROGRESS") {
        await ctx.db.testAttempt.update({
          where: { id: attempt.id },
          data: {
            status: "SUBMITTED",
            submittedAt: serverTime,
          },
        });
      }

      // Format questions (without correct answers)
      const questions = attempt.test.testQuestions.map((tq) => ({
        id: tq.question.id,
        text: tq.question.questionText,
        image: tq.question.questionImage,
        options: [
          {
            id: "1",
            text: tq.question.option1,
            image: tq.question.option1Image,
            order: 1,
          },
          {
            id: "2",
            text: tq.question.option2,
            image: tq.question.option2Image,
            order: 2,
          },
          {
            id: "3",
            text: tq.question.option3,
            image: tq.question.option3Image,
            order: 3,
          },
          {
            id: "4",
            text: tq.question.option4,
            image: tq.question.option4Image,
            order: 4,
          },
        ],
        marks: tq.question.marks,
      }));

      // Format responses
      const responses: Record<string, number> = {};
      attempt.answers.forEach((ans) => {
        if (ans.selectedOption) {
          responses[ans.questionId] = ans.selectedOption;
        }
      });

      return {
        success: true,
        data: {
          status: attempt.status,
          sectionIndex: 0, // Can be extended for multi-section tests
          startTime: attempt.startedAt.toISOString(),
          serverTime: serverTime.toISOString(),
          timeLeft: timeLeft,
          questions,
          responses,
        },
      };
    }),

  // Submit Response (Single) - POST /tests/response
  submitResponse: publicProcedure
    .input(
      z.object({
        attemptId: z.string(),
        questionId: z.string(),
        optionOrder: z.number().min(1).max(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const attempt = await ctx.db.testAttempt.findUnique({
        where: { id: input.attemptId },
      });

      if (!attempt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Attempt not found",
        });
      }

      if (attempt.status !== "IN_PROGRESS") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot submit answer for completed test",
        });
      }

      // Get question to calculate marks
      const question = await ctx.db.question.findUnique({
        where: { id: input.questionId },
      });

      if (!question) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Question not found",
        });
      }

      const isCorrect = input.optionOrder === question.correctOption;
      const marksAwarded = isCorrect ? question.marks : -question.negativeMarks;

      await ctx.db.studentAnswer.upsert({
        where: {
          attemptId_questionId: {
            attemptId: input.attemptId,
            questionId: input.questionId,
          },
        },
        update: {
          selectedOption: input.optionOrder,
          isCorrect,
          marksAwarded,
          updatedAt: new Date(),
        },
        create: {
          attemptId: input.attemptId,
          questionId: input.questionId,
          userId: attempt.userId,
          selectedOption: input.optionOrder,
          isCorrect,
          marksAwarded,
        },
      });

      return {
        success: true,
      };
    }),

  // Bulk Sync (Reconnect) - POST /tests/sync
  syncResponses: publicProcedure
    .input(
      z.object({
        attemptId: z.string(),
        answers: z.record(z.number()), // { questionId: optionOrder }
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const attempt = await ctx.db.testAttempt.findUnique({
        where: { id: input.attemptId },
      });

      if (!attempt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Attempt not found",
        });
      }

      if (attempt.status !== "IN_PROGRESS") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot sync answers for completed test",
        });
      }

      // Process all answers
      for (const [questionId, optionOrder] of Object.entries(input.answers)) {
        const question = await ctx.db.question.findUnique({
          where: { id: questionId },
        });

        if (!question) continue;

        const isCorrect = optionOrder === question.correctOption;
        const marksAwarded = isCorrect
          ? question.marks
          : -question.negativeMarks;

        await ctx.db.studentAnswer.upsert({
          where: {
            attemptId_questionId: {
              attemptId: input.attemptId,
              questionId: questionId,
            },
          },
          update: {
            selectedOption: optionOrder,
            isCorrect,
            marksAwarded,
            updatedAt: new Date(),
          },
          create: {
            attemptId: input.attemptId,
            questionId: questionId,
            userId: attempt.userId,
            selectedOption: optionOrder,
            isCorrect,
            marksAwarded,
          },
        });
      }

      // Return fresh state
      const freshState = await ctx.db.testAttempt.findUnique({
        where: { id: input.attemptId },
        include: {
          test: {
            include: {
              testQuestions: {
                include: {
                  question: {
                    select: {
                      id: true,
                      questionText: true,
                      questionImage: true,
                      option1: true,
                      option2: true,
                      option3: true,
                      option4: true,
                      marks: true,
                    },
                  },
                },
              },
            },
          },
          answers: true,
        },
      });

      return {
        success: true,
        data: freshState,
      };
    }),

  // Submit Section / Finish Test - POST /tests/submit-section
  submitSection: publicProcedure
    .input(
      z.object({
        attemptId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const attempt = await ctx.db.testAttempt.findUnique({
        where: { id: input.attemptId },
        include: { answers: true },
      });

      if (!attempt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Attempt not found",
        });
      }

      // Calculate final score
      const attempted = attempt.answers.filter(
        (a) => a.selectedOption !== null,
      ).length;
      const correct = attempt.answers.filter((a) => a.isCorrect).length;
      const incorrect = attempted - correct;
      const unanswered = attempt.totalQuestions - attempted;
      const score = attempt.answers.reduce((acc, a) => acc + a.marksAwarded, 0);
      const percentage = (score / (attempt.totalQuestions * 4)) * 100;

      await ctx.db.testAttempt.update({
        where: { id: input.attemptId },
        data: {
          status: "SUBMITTED",
          submittedAt: new Date(),
          attempted,
          correct,
          incorrect,
          unanswered,
          score,
          percentage,
        },
      });

      return {
        success: true,
        message: "Test submitted successfully",
      };
    }),

  // ============================================
  // 3. LEGACY ENDPOINTS (Keep for backward compatibility)
  // ============================================

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
              question: {
                include: {
                  subject: true,
                },
              },
            },
          },
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

  // Create test from external API data
  createFromExternal: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        duration: z.number(),
        totalMarks: z.number(),
        questions: z.array(
          z.object({
            id: z.number().or(z.string()),
            subject: z.string(),
            chapter: z.string().optional(),
            question: z.string(),
            options: z.array(z.string()),
            correctAnswer: z.number(),
            hint: z.string().optional(),
            class: z.number().optional(),
            difficulty: z.string().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { questions, ...testData } = input;
      const totalQuestions = questions.length;

      // 1. Create Test
      const test = await ctx.db.test.create({
        data: {
          ...testData,
          createdBy: ctx.session.user.id,
          totalQuestions,
          isPublished: true,
        },
      });

      // 2. Process Questions
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q) continue;

        // Find or Create Subject
        let subject = await ctx.db.subject.findFirst({
          where: { name: q.subject },
        });

        if (!subject) {
          subject = await ctx.db.subject.create({
            data: {
              name: q.subject,
              code: q.subject.substring(0, 3).toUpperCase(),
            },
          });
        }

        // Find or Create Chapter
        const chapterName = q.chapter || "General";
        let chapter = await ctx.db.chapter.findFirst({
          where: { name: chapterName, subjectId: subject.id },
        });

        if (!chapter) {
          chapter = await ctx.db.chapter.create({
            data: {
              name: chapterName,
              code: `${subject.code}-${Math.floor(Math.random() * 1000)}`,
              subjectId: subject.id,
            },
          });
        }

        // Check for duplicate question
        let question = await ctx.db.question.findFirst({
          where: { questionText: q.question },
        });

        if (!question) {
          question = await ctx.db.question.create({
            data: {
              subjectId: subject.id,
              chapterId: chapter.id,
              questionText: q.question,
              option1: q.options[0] || "",
              option2: q.options[1] || "",
              option3: q.options[2] || "",
              option4: q.options[3] || "",
              correctOption: q.correctAnswer,
              explanation: q.hint,
              class: q.class || 12,
              difficulty: (q.difficulty?.toUpperCase() as any) || "MEDIUM",
            },
          });
        }

        // Link to Test
        await ctx.db.testQuestion.create({
          data: {
            testId: test.id,
            questionId: question.id,
            order: i + 1,
          },
        });
      }

      return test;
    }),

  // Get results for a completed attempt
  getAttemptResults: publicProcedure
    .input(z.object({ attemptId: z.string() }))
    .query(async ({ ctx, input }) => {
      const attempt = await ctx.db.testAttempt.findUnique({
        where: { id: input.attemptId },
        include: {
          test: true,
          answers: {
            include: {
              question: {
                select: {
                  id: true,
                  questionText: true,
                  option1: true,
                  option2: true,
                  option3: true,
                  option4: true,
                  correctOption: true,
                  explanation: true,
                  marks: true,
                  negativeMarks: true,
                },
              },
            },
          },
        },
      });

      if (!attempt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Attempt not found",
        });
      }

      if (attempt.status === "IN_PROGRESS") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Test not yet completed",
        });
      }

      return {
        success: true,
        data: {
          attempt,
          totalQuestions: attempt.totalQuestions,
          attempted: attempt.attempted,
          correct: attempt.correct,
          incorrect: attempt.incorrect,
          unanswered: attempt.unanswered,
          score: attempt.score,
          percentage: attempt.percentage,
          answers: attempt.answers,
        },
      };
    }),
});
