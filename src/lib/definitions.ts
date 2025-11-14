import { z } from 'zod';

export const roles = ['Admin', 'Employee', 'College', 'Industry'] as const;
export type Role = (typeof roles)[number];

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(roles),
  last_login: z.string().datetime().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const SessionPayloadSchema = z.object({
    userId: z.string(),
    role: z.enum(roles),
    email: z.string().email(),
});

export type SessionPayload = z.infer<typeof SessionPayloadSchema>;
