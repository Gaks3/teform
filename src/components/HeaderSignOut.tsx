'use client'

import { signOut } from '@/lib/actions/auth'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function HeaderSignOut() {
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <DropdownMenuItem
      className='!text-destructive cursor-pointer'
      onClick={handleSignOut}
    >
      Sign Out
    </DropdownMenuItem>
  )
}
