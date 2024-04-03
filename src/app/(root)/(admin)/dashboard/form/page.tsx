import { GetForms } from '@/lib/actions/form'
import { DataTable } from './data-table'
import { columns } from './column'

export default async function Page() {
  const forms = await GetForms()

  return (
    <div>
      <div className='container py-8 space-y-5'>
        <h1 className='text-3xl font-bold'>Forms Table</h1>
        <DataTable columns={columns} data={forms} />
      </div>
    </div>
  )
}
