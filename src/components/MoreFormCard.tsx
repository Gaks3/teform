'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { toast } from './ui/use-toast'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { DeleteForm } from '@/lib/actions/form'

export default function MoreFormCard({ formId }: { formId: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.host}/submit/${formId}`)

    toast({
      title: 'Copied to clipboard',
    })
  }

  const handleDelete = async () => {
    try {
      const res = await DeleteForm(formId)

      toast({
        title: 'Success',
        description: `Delete form with id ${res.name}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
      })
    }
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger className='!outline-none'>
          <MoreVertical size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={copyToClipboard}
            className='cursor-pointer'
          >
            Share
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/form/${formId}/preview`} className='cursor-pointer'>
              Preview
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AlertDialogTrigger className='w-full cursor-pointer !text-destructive'>
              Delete
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this form?</AlertDialogTitle>
          <AlertDialogDescription>
            All result will be deleted to
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='!bg-destructive' onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
