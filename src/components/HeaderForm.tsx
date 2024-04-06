'use client'

import { useForm } from 'react-hook-form'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { UpdateForm } from '@/lib/actions/form'
import { toast } from './ui/use-toast'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import { ScanEye, Share } from 'lucide-react'
import Link from 'next/link'

export const schema = z.object({
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

      toast({
        title: 'Success',
        description: 'Form has been saved',
      })
    } catch (error) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.host}/submit/${id}`)

    toast({
      title: 'Copied to clipboard',
    })
  }

  return (
    <>
      <Card className='w-full h-fit'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(applyChanges)}
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
                      <FormMessage />
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
                      <FormMessage />
                    </CardDescription>
                  </FormItem>
                )}
              />
            </CardHeader>
          </form>
        </Form>
        <CardFooter className='justify-between'>
          <Form {...form}>
            <form onChange={form.handleSubmit(applyChanges)}>
              <FormField
                control={form.control}
                name='anonymous'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2 space-y-0'>
                    <FormLabel>Anonymous</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          form.handleSubmit(applyChanges)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className='flex gap-3'>
            <Button
              className='gap-2'
              variant={'ghost'}
              onClick={copyToClipboard}
              type='button'
            >
              <Share size={18} />
              Share
            </Button>
            <Button className='gap-2' variant={'ghost'} asChild>
              <Link href={`/form/${id}/preview`}>
                <ScanEye size={18} />
                Preview
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
