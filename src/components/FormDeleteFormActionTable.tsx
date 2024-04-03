import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { DeleteUserById } from '@/lib/actions/user'
import { toast } from './ui/use-toast'
import { DialogClose, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { DeleteForm } from '@/lib/actions/form'

export default function FormDeleteFormActionTable({
  formId,
  name,
}: {
  formId: string
  name: string
}) {
  const schema = z.object({
    name: z.literal(name),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    try {
      await DeleteForm(formId)
    } catch (error) {
      toast({
        title: 'Error',
        description: error === 'Unauthorized' ? error : 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type &quot;{name}&quot;</FormLabel>
                <FormControl>
                  <Input placeholder='name' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter className='mt-5'>
            <Button>
              <DialogClose>Cancel</DialogClose>
            </Button>
            <Button variant={'ghost'} type='submit'>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
