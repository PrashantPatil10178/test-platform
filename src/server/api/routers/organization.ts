import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.organization.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.organization.findUnique({
        where: { id: input.id },
      });
    }),

  getBySubdomain: publicProcedure
    .input(z.object({ subdomain: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.organization.findUnique({
        where: { subdomain: input.subdomain },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        subdomain: z.string(),
        logo: z.string().optional(),
        tagline: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        website: z.string().optional(),
        primaryColor: z.string().optional(),
        secondaryColor: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.organization.create({
        data: {
          ...input,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        subdomain: z.string().optional(),
        logo: z.string().optional(),
        tagline: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        website: z.string().optional(),
        isActive: z.boolean().optional(),
        isVerified: z.boolean().optional(),
        primaryColor: z.string().optional(),
        secondaryColor: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.organization.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.organization.delete({
        where: { id: input.id },
      });
    }),

  addStudent: protectedProcedure
    .input(z.object({ organizationId: z.string(), studentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.organizationStudent.create({
        data: {
          organizationId: input.organizationId,
          studentId: input.studentId,
        },
      });
    }),

  removeStudent: protectedProcedure
    .input(z.object({ organizationId: z.string(), studentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.organizationStudent.delete({
        where: {
          organizationId_studentId: {
            organizationId: input.organizationId,
            studentId: input.studentId,
          },
        },
      });
    }),

    getStudents: protectedProcedure
        .input(z.object({ organizationId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.organizationStudent.findMany({
                where: { organizationId: input.organizationId },
                include: {
                    student: true,
                },
            });
        }),
});
