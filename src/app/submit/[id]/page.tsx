import FormSubmit from '@/components/FormSubmit'
import { AddVisits } from '@/lib/actions/form'
import { GetQuestionsByFormId } from '@/lib/actions/question'
import { getUser } from '@/lib/auth'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const form = await AddVisits(id)
  if (!form) return notFound()

  if (!form.isAnonymous) {
    const user = await getUser()

    if (!user) return notFound()
  }

  const questions = await GetQuestionsByFormId(form.id)

  return (
    <FormSubmit
      id={form.id}
      name={form.name}
      description={form.description || ''}
      content={questions}
    />
  )
}
