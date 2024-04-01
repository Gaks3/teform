'use client'

import { useForm } from 'react-hook-form'
import SaveFormButton from './SaveFormButton'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { UpdateForm } from '@/lib/actions/form'
import { toast } from './ui/use-toast'
import { Switch } from './ui/switch'

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  anonymous: z.boolean().default(false),
})

export default function HeaderForm({
  id,
  name,
  description,
  anonymous,
}: {
  id: string
  name: string
  description: string
  anonymous: boolean
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
      description,
      anonymous,
    },
    mode: 'onBlur',
  })

  const applyChanges = async (values: z.infer<typeof schema>) => {
    try {
      await UpdateForm(id, {
        name: values.name,
        description: values.description,
        anonymous: values.anonymous,
      })
    } catch (error) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <Card className='w-full h-fit'>
        <Form {...form}>
          <form
            onSubmit={(event) => event.preventDefault()}
            onBlur={form.handleSubmit(applyChanges)}
          >
            <CardHeader className='border-t-4 rounded-md border-primary'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <CardTitle className='border-b border-border'>
                      <FormControl>
                        <Input
                          className='!outline-none !ring-offset-0 !ring-0 !p-0 text-2xl !border-none'
                          {...field}
                          placeholder='Form Title'
                        />
                      </FormControl>
                    </CardTitle>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <CardDescription className='border-b border-border'>
                      <FormControl>
                        <Input
                          className='!outline-none !ring-offset-0 !ring-0 !p-0 text-sm !border-none'
                          {...field}
                          placeholder='Description'
                        />
                      </FormControl>
                    </CardDescription>
                  </FormItem>
                )}
              />
            </CardHeader>
            <CardFooter className='justify-between'>
              <FormField
                control={form.control}
                name='anonymous'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2 space-y-0'>
                    <FormLabel>Anonymous</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <SaveFormButton id={id} />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  )
}
