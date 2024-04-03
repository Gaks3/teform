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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const schema = z.object({
  isAdmin: z.boolean({ required_error: 'Role required' }),
})

export default function ChangeRoleCard({
  userId,
  isAdmin,
}: {
  userId: string
  isAdmin: boolean
}) {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      isAdmin,
    },
  })

  const applyChanges = async (values: z.infer<typeof schema>) => {
    try {
      await UpdateUserById(userId, { isAdmin: values.isAdmin })

      toast({
        title: 'Success',
        description: `Update role to "${values.isAdmin ? 'Admin' : 'User'}"`,
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
        <CardTitle>Role</CardTitle>
        <CardDescription>Change Role</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-5'>
            <FormField
              control={form.control}
              name='isAdmin'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === 'true' ? true : false)
                      }
                      defaultValue={field.value ? 'true' : 'false'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a verified email to display' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'true'}>Admin</SelectItem>
                        <SelectItem value={'false'}>User</SelectItem>
                      </SelectContent>
                    </Select>
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
                {pending ? 'Loading...' : 'Update Role'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
