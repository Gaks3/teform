import FormBuilder from '@/components/FormBuilder'
import ResponseTab from '@/components/ResponseTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GetFormById } from '@/lib/actions/form'
import { GetQuestionsByFormId } from '@/lib/actions/question'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const form = await GetFormById(id)
  if (!form) return notFound()

  const elements = await GetQuestionsByFormId(form.id)

  return (
    <Tabs
      className='flex flex-col items-center justify-center gap-3 py-6 md:container'
      defaultValue='questions'
    >
      <TabsList className='max-w-[350px] w-[100%] grid grid-cols-2'>
        <TabsTrigger value='questions'>Questions</TabsTrigger>
        <TabsTrigger value='responses'>Responses</TabsTrigger>
      </TabsList>
      <TabsContent value='questions' className='w-full'>
        <FormBuilder form={form} element={elements} />
      </TabsContent>
      <TabsContent value='responses' className='w-full'>
        <ResponseTab id={form.id} isAnonymous={form.isAnonymous} />
      </TabsContent>
    </Tabs>
  )
}
