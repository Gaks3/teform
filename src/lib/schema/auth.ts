import { z } from 'zod'
import {
  containsNumber,
  containsSpecialChars,
  containsUppercase,
} from '@/lib/utils'
import { GetUserByEmail } from '../actions/user'

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email('Not a valid email')
      .refine(async (value) => {
        const exist = await GetUserByEmail(value)

        if (exist) return false

        return true
      }),
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters' }),
    password: z.string().superRefine((value, ctx) => {
      if (value.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Must be 8 or more characters long',
          fatal: true,
        })

        return z.NEVER
      }

      if (!containsUppercase(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least contains one uppercase letter',
          fatal: true,
        })

        return z.NEVER
      }

      if (!containsNumber(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least contains one number',
          fatal: true,
        })

        return z.NEVER
      }

      if (!containsSpecialChars(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least contains one special characters (@, #, $, etc.)',
          fatal: true,
        })

        return z.NEVER
      }
    }),
    confirm: z.string(),
  })
  .refine((values) => values.password === values.confirm, {
    message: "Password don't match",
    path: ['confirm'],
  })

export const signInSchema = z.object({
  email: z.string().email('Email is not valid'),
  password: z.string(),
})
