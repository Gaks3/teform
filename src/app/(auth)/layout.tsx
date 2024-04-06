import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (user?.user) return redirect('/')

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen gap-5'>
      {children}
    </div>
  )
}
