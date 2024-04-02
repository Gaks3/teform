import Header from '@/components/Header'
import { getUser } from '@/lib/auth'
import { notFound, redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (!user) return redirect('/sign-in')
  if (!user.user?.isAdmin) return notFound()

  return (
    <>
      <Header
        id={user.user.id}
        isAdmin={user.user.isAdmin}
        username={user.user.username}
      />
      {children}
    </>
  )
}
