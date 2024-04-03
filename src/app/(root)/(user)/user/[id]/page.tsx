import ChangePasswordCard from '@/components/user/ChangePasswordCard'
import ChangeRoleCard from '@/components/user/ChangeRoleCard'
import ChangeUsernameCard from '@/components/user/ChangeUsernameCard'
import { GetUserById } from '@/lib/actions/user'
import { getUser } from '@/lib/auth'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const session = await getUser()

  const user = await GetUserById(id)
  if (!user) return notFound()

  return (
    <div className='container py-8 flex justify-center'>
      <div className='w-[50vw] space-y-5'>
        <ChangeUsernameCard userId={id} username={user?.username} />
        {session?.user?.isAdmin && (
          <ChangeRoleCard userId={id} isAdmin={user.isAdmin} />
        )}
        <ChangePasswordCard userId={id} />
      </div>
    </div>
  )
}
