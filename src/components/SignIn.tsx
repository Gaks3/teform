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
import { useState, useTransition } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function SignIn() {
  const [pending, startTransition] = useTransition()
  const [type, setType] = useState<'password' | 'text'>('password')

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const res = await signIn(values)

    if (res?.error?.root) {
      form.setError('root', { message: res.error.root })
    }
  }

  const handleType = () =>
    setType((prev) => (prev === 'password' ? 'text' : 'password'))

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
              <div className='w-full relative'>
                <FormControl>
                  <Input type={type} {...field} />
                </FormControl>
                <div
                  className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer'
                  onClick={handleType}
                >
                  {type === 'password' ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </div>
              </div>
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button type='submit' disabled={pending}>
          {pending ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
