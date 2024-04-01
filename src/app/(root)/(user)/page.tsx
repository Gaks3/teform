import CreateFormButton from '@/components/CreateFormButton'
import FormCard from '@/components/FormCard'
import { Skeleton } from '@/components/ui/skeleton'
import { GetAllForm } from '@/lib/actions/form'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Suspense, lazy } from 'react'

const StatsCards = lazy(() => import('@/components/StatsCards'))

export default async function Home() {
  const user = await getUser()
  if (!user) return redirect('/sign-in')

  const forms = await GetAllForm()

  return (
    <main className='container py-8'>
      <h1 className='mb-3 text-3xl font-bold'>Stats</h1>
      <div className='grid grid-cols-1 gap-5 mb-10 md:grid-cols-2 lg:grid-cols-3'>
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className='min-h-[170px] last:md:col-span-2 last:lg:col-auto'
            />
          ))}
        >
          <StatsCards />
        </Suspense>
      </div>
      <h1 className='mb-3 text-3xl font-bold'>Forms</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <CreateFormButton />
        {forms.map((form, index) => (
          <FormCard key={index} form={form} />
        ))}
      </div>
    </main>
  )
}
