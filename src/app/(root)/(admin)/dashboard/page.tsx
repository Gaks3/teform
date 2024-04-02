import DashboardStatsCards from '@/components/DashboardStatsCards'
import MostFormByDateChart from '@/components/MostFormByDateChart'
import { GetMostFormByUserAndDate } from '@/lib/actions/form'
import { subDays } from 'date-fns'

export default async function Page() {
  const initialData = await GetMostFormByUserAndDate(
    subDays(new Date(), 4),
    new Date()
  )

  return (
    <div className='container py-8 space-y-10'>
      <div className='w-full grid grid-cols-3 gap-5'>
        <DashboardStatsCards />
      </div>
      <div className='flex justify-center'>
        <div className='w-[70vw] h-[35vw] mb-20 flex flex-col items-center'>
          <h2 className='text-2xl font-semibold w-full'>Most Created Forms</h2>
          <MostFormByDateChart initialData={initialData} />
        </div>
      </div>
    </div>
  )
}
