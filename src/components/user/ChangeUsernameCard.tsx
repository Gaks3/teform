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
import { useTransition } from 'react'

const schema = z.object({
  username: z.string({ required_error: 'Username required' }),
})

export default function ChangeUsernameCard({
  userId,
  username,
}: {
  userId: string
  username: string
}) {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      username,
    },
  })

  const applyChanges = async (values: z.infer<typeof schema>) => {
    try {
      await UpdateUserById(userId, { username: values.username })

      toast({
        title: 'Success',
        description: `Update username to "${values.username}"`,
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
        <CardTitle>Username</CardTitle>
        <CardDescription>Change your username</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-5'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CardFooter className='justify-end p-0'>
              <Button
                type='submit'
                disabled={pending}
                onClick={() => startTransition(form.handleSubmit(applyChanges))}
              >
                {pending ? 'Loading...' : 'Update Username'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
