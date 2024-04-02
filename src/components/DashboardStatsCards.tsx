import { GetTotalForm } from '@/lib/actions/form'
import { GetTotalResponse } from '@/lib/actions/response'
import { GetTotalUser } from '@/lib/actions/user'
import StatsCard from './StatsCard'
import { BookType, MousePointerClick, UsersRound } from 'lucide-react'

export default async function DashboardStatsCards() {
  const totalUser = await GetTotalUser()
  const totalForm = await GetTotalForm()
  const totalResponse = await GetTotalResponse()

  return (
    <>
      <StatsCard
        title='Total User'
        icon={<UsersRound className='mt-0' />}
        helperText={'Users Table'}
        value={totalUser.toLocaleString() || '0'}
        loading={false}
        isButton
        link='/dashboard/user'
      />
      <StatsCard
        title='Total Form'
        icon={<BookType className='mt-0' />}
        helperText={'Forms Table'}
        value={totalForm.toLocaleString() || '0'}
        loading={false}
        isButton
        link='/dashboard/form'
      />
      <StatsCard
        title='Total Response'
        icon={<MousePointerClick className='mt-0' />}
        helperText={'All time form visits'}
        value={totalResponse.toLocaleString() || '0'}
        loading={false}
      />
    </>
  )
}
