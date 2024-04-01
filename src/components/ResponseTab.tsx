import { Captions, MousePointerClick, View } from 'lucide-react'
import StatsCard from './StatsCard'
import { GetFormStats } from '@/lib/actions/form'
import ResponseFormChart from './ResponseFormChart'
import { GetResponsesByDate } from '@/lib/actions/response'
import { subDays } from 'date-fns'
import { GetQuestionsByFormId } from '@/lib/actions/question'
import ResultWrapper from './ResultWrapper'
import ResultEmail from './ResultEmail'

export default async function ResponseTab({
  id,
  isAnonymous,
}: {
  id: string
  isAnonymous: boolean
}) {
  const { visits, submissions, submissionsRate } = await GetFormStats(id)

  const date = new Date('2024-03-25')
  const responses = await GetResponsesByDate(id, subDays(date, 4), date)

  const questions = await GetQuestionsByFormId(id)

  return (
    <div className='px-4 md:container flex flex-col items-center w-full py-4 space-y-16'>
      <div className='grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        <StatsCard
          title='Total visits'
          icon={<View className='mt-0' />}
          helperText={'All time form visits'}
          value={visits.toLocaleString() || '0'}
          loading={false}
        />
        <StatsCard
          title='Total submissions'
          icon={<Captions />}
          helperText={'All time form submissions'}
          value={submissions.toLocaleString() || '0'}
          loading={false}
        />
        <StatsCard
          title='Submissions rate'
          icon={<MousePointerClick />}
          helperText={'Visits with submissions'}
          value={submissionsRate.toLocaleString() + ' %' || '0'}
          loading={false}
          className='md:col-span-2 lg:col-auto'
        />
      </div>
      <div className='w-full lg:w-[70vw] h-[50vh] lg:h-[35vw] flex items-center gap-5 flex-col mb-10'>
        <h2 className='text-3xl font-bold'>Stats Response</h2>
        <ResponseFormChart initialData={[responses]} id={id} />
      </div>
      <div className='flex flex-col items-center w-full lg:w-[60vw] space-y-5'>
        <h2 className='text-3xl font-bold'>Responses</h2>
        {!isAnonymous && <ResultEmail formId={id} />}
        {questions.map((element, index) => (
          <ResultWrapper key={index} element={element} />
        ))}
      </div>
    </div>
  )
}
