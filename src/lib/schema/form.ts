import { z } from 'zod'

export const createFormSchema = z.object({
  name: z
    .string({ required_error: 'Field name is required' })
    .min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().optional(),
})

export type createFormSchemaType = z.infer<typeof createFormSchema>
