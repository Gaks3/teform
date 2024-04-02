import { GetUsers } from '@/lib/actions/user'
import { DataTable } from './data-table'
import { columns } from './column'

export default async function Page() {
  let users = await GetUsers()
  if (!users) users = []

  return (
    <div className='container py-8 space-y-5'>
      <h1 className='text-3xl font-bold'>Users Table</h1>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
