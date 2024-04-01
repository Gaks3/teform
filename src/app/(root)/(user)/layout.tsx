import Header from '@/components/Header'
import DesignerContextProvider from '@/components/context/DesignerContext'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (!user || !user.user) return redirect('/sign-in')

  return (
    <>
      <DesignerContextProvider>
        <Header
          username={user.user.username}
          isAdmin={user.user.isAdmin}
          id={user.user.id}
        />
        {children}
      </DesignerContextProvider>
    </>
  )
}
