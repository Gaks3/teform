import StatsCard from '@/components/StatsCard'
import { Captions, MousePointerClick, View } from 'lucide-react'
import { GetAllFormStats } from '@/lib/actions/form'

export default async function StatsCards() {
  const { submissions, visits, submissionsRate } = await GetAllFormStats()

  return (
    <>
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
    </>
  )
}
