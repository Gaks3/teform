'use client'

import { signUp } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTransition } from 'react'

export default function SignUp() {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const res = await signUp(values)

    if (typeof res?.error === 'object') {
      for (const key in res.error) {
        form.setError(key as 'email' | 'username' | 'password', {
          message: res.error[key as 'email' | 'username' | 'password'],
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          startTransition(form.handleSubmit(onSubmit))
        }}
        className='space-y-3'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='john' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='....' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={pending}>
          {pending ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
