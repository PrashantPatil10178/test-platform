import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { PaymentStatus } from "@prisma/client";

export const paymentRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.payment.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.payment.findUnique({
        where: { id: input.id },
      });
    }),

  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.payment.findMany({
        where: { userId: input.userId },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        orderId: z.string(),
        subscriptionId: z.string().optional(),
        razorpayPaymentId: z.string().optional(),
        razorpayOrderId: z.string(),
        razorpaySignature: z.string().optional(),
        amount: z.number(),
        currency: z.string().default("INR"),
        status: z.nativeEnum(PaymentStatus).default("PENDING"),
        method: z.string().optional(),
        cardId: z.string().optional(),
        bank: z.string().optional(),
        wallet: z.string().optional(),
        vpa: z.string().optional(),
        email: z.string().email().optional(),
        contact: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.payment.create({
        data: {
          ...input,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(PaymentStatus).optional(),
        razorpaySignature: z.string().optional(),
        capturedAt: z.date().optional(),
        errorCode: z.string().optional(),
        errorDescription: z.string().optional(),
        errorSource: z.string().optional(),
        errorReason: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.payment.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.payment.delete({
        where: { id: input.id },
      });
    }),
});
