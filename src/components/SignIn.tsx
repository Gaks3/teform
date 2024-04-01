'use client'

import { signIn } from '@/lib/actions/auth'
import { signInSchema } from '@/lib/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useTransition } from 'react'

export default function SignIn() {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const res = await signIn(values)

    if (typeof res?.error === 'object') {
      for (const key in res.error) {
        form.setError(key as 'email' | 'password', {
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors && <FormMessage />}
        <Button type='submit' disabled={pending}>
          {pending ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
