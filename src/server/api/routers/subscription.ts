import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { SubscriptionPlan, SubscriptionStatus } from "@prisma/client";

export const subscriptionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.subscription.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.subscription.findUnique({
        where: { id: input.id },
      });
    }),

  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.subscription.findUnique({
        where: { userId: input.userId },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        plan: z.nativeEnum(SubscriptionPlan),
        status: z.nativeEnum(SubscriptionStatus).default("INACTIVE"),
        startDate: z.date(),
        endDate: z.date().optional(),
        amount: z.number(),
        currency: z.string().default("INR"),
        autoRenew: z.boolean().default(false),
        razorpaySubscriptionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.subscription.create({
        data: {
          userId: input.userId,
          plan: input.plan,
          status: input.status,
          startDate: input.startDate,
          endDate: input.endDate,
          amount: input.amount,
          currency: input.currency,
          autoRenew: input.autoRenew,
          razorpaySubscriptionId: input.razorpaySubscriptionId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        plan: z.nativeEnum(SubscriptionPlan).optional(),
        status: z.nativeEnum(SubscriptionStatus).optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        amount: z.number().optional(),
        currency: z.string().optional(),
        autoRenew: z.boolean().optional(),
        razorpaySubscriptionId: z.string().optional(),
        cancelledAt: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.subscription.update({
        where: { id },
        data,
      });
    }),

  cancel: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.subscription.update({
        where: { id: input.id },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.subscription.delete({
        where: { id: input.id },
      });
    }),
});
