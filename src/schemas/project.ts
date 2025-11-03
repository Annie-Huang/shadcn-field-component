import z from 'zod';

export const PROJECT_STATUSES = ['draft', 'active', 'finished'] as const;

export const projectSchema = z.object({
  name: z.string().min(1),
  status: z.enum(PROJECT_STATUSES),
  description: z
    .string()
    .transform((v) => v || undefined)
    .optional(), // Add optional otherwise the page.tsx will not pass typescript as here only state the value can be string only.
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
});
