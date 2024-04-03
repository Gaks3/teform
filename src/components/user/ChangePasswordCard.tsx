'use client'

import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserById } from '@/lib/actions/user'
import { toast } from '../ui/use-toast'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState, useTransition } from 'react'
import {
  containsNumber,
  containsSpecialChars,
  containsUppercase,
} from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

const schema = z.object({
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
})

export default function ChangePasswordCard({ userId }: { userId: string }) {
  const [type, setType] = useState<'password' | 'text'>('password')
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  const applyChanges = async (values: z.infer<typeof schema>) => {
    try {
      await UpdateUserById(userId, { password: values.password })

      toast({
        title: 'Success',
        description: `Update password`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-5'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <FormControl>
                      <Input placeholder='Password' {...field} type={type} />
                    </FormControl>
                    <div className='absolute z-10 right-3 top-[10px]'>
                      {type === 'password' ? (
                        <Eye onClick={() => setType('text')} />
                      ) : (
                        <EyeOff onClick={() => setType('password')} />
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <CardFooter className='justify-end p-0'>
              <Button
                type='submit'
                disabled={pending}
                onClick={() => startTransition(form.handleSubmit(applyChanges))}
              >
                {pending ? 'Loading...' : 'Update Password'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
