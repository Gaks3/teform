import { Ellipsis } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import FormDeleteUserActionTable from './FormDeleteUserActionTable'

export default function UserActionTable({
  userId,
  username,
}: {
  userId: string
  username: string
}) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <Link href={`/user/${userId}`}>
            <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <DialogTrigger className='text-red-500 w-full text-left'>
              Delete
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure to delete this user?
          </DialogDescription>
        </DialogHeader>
        <FormDeleteUserActionTable userId={userId} username={username} />
      </DialogContent>
    </Dialog>
  )
}
