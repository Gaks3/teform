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
import { useState, useTransition } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function SignUp() {
  const [pending, startTransition] = useTransition()
  const [type, setType] = useState<'password' | 'text'>('password')

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirm: '',
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
              <div className='relative w-full'>
                <FormControl>
                  <Input placeholder='....' type={type} {...field} />
                </FormControl>
                <div
                  className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer'
                  onClick={handleType}
                >
                  {type === 'password' ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='....' type='password' {...field} />
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
