'use client'

import FormActionTable from '@/components/FormActionTable'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowDownUp, ChevronDown } from 'lucide-react'

export const columns: ColumnDef<Form>[] = [
  {
    accessorKey: 'id',
    header: 'Form Id',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Name
        <ArrowDownUp size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'isAnonymous',
    header: ({ table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='!ring-transparent w-full justify-start'
          >
            IsAnonymous
            <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => table.getColumn('isAnonymous')?.setFilterValue('')}
          >
            None
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              table.getColumn('isAnonymous')?.setFilterValue(false)
            }
          >
            Anonymous
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn('isAnonymous')?.setFilterValue(true)}
          >
            Authenticated
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) =>
      row.original.isAnonymous ? 'Anonymous' : 'Authenticated',
  },
  {
    accessorKey: 'visits',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Visits
        <ArrowDownUp size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'userId',
    header: 'User Id',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Created At
        <ArrowDownUp size={16} />
      </Button>
    ),
    cell: ({ row }) => format(row.original.createdAt, 'dd-LL-yyyy'),
  },
  {
    id: 'action',
    cell: ({ row }) => (
      <FormActionTable formId={row.original.id} name={row.original.name} />
    ),
    enableHiding: false,
  },
]
