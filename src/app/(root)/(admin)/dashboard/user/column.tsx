'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserActionTable from '@/components/UserActionTable'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowDownUp, ChevronDown } from 'lucide-react'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Email
        <ArrowDownUp size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Username
        <ArrowDownUp size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'isAdmin',
    header: ({ table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='!ring-transparent w-full justify-start'
          >
            Status
            <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => table.getColumn('isAdmin')?.setFilterValue('')}
          >
            None
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn('isAdmin')?.setFilterValue(false)}
          >
            User
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn('isAdmin')?.setFilterValue(true)}
          >
            Admin
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => (row.original.isAdmin ? 'Admin' : 'User'),
  },
  {
    id: 'action',
    cell: ({ row }) => (
      <UserActionTable
        userId={row.original.id}
        username={row.original.username}
      />
    ),
    enableHiding: false,
  },
]
