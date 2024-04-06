import FormBuilder from '@/components/FormBuilder'
import ResponseTab from '@/components/ResponseTab'
import { GetFormById } from '@/lib/actions/form'
import { GetQuestionsByFormId } from '@/lib/actions/question'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { id },
  searchParams,
}: {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const form = await GetFormById(id)
  if (!form) return notFound()

  const elements = await GetQuestionsByFormId(form.id)

  const header = headers()
  const url = header.get('x-url')

  const activeTab = searchParams?.tab
    ? searchParams.tab === 'questions'
      ? 'questions'
      : 'responses'
    : 'questions'

  return (
    <main className='flex flex-col items-center py-8'>
      <div className='max-w-[350px] w-[100%] grid grid-cols-2 h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'>
        <Link
          href={`${url}?tab=questions`}
          className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
          data-state={activeTab === 'questions' ? 'active' : 'inactive'}
        >
          Questions
        </Link>
        <Link
          href={`${url}?tab=responses`}
          className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
          data-state={activeTab === 'responses' ? 'active' : 'inactive'}
        >
          Responses
        </Link>
      </div>
      <div className='w-full mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
        {activeTab === 'questions' ? (
          <FormBuilder element={elements} form={form} />
        ) : (
          <ResponseTab id={form.id} isAnonymous={form.isAnonymous} />
        )}
      </div>
    </main>
  )
}
