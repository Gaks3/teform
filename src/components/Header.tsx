import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlignJustify, BookText, UserRound } from 'lucide-react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import HeaderSignOut from './HeaderSignOut'

export default function Header({
  isAdmin,
  username,
  id,
}: {
  isAdmin: boolean
  username: string
  id: string
}) {
  return (
    <header className='flex items-center justify-between w-full px-4 py-4 border-b md:px-8 border-border'>
      <div className='flex gap-5'>
        <Sheet>
          <SheetTrigger className='flex items-center justify-center p-[2px] border rounded-md w-9 h-9 md:hidden border-input'>
            <AlignJustify size={18} />
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetHeader>
              <SheetTitle className='text-left'>Menu</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col gap-3 py-7'>
              <Button variant={'ghost'} asChild>
                <Link href={'/'} className='!justify-start'>
                  Home
                </Link>
              </Button>
              <Button variant={'ghost'} asChild>
                <Link href={'/'} className='!justify-start'>
                  Dashboard
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <Link href={'/'} className='flex items-center gap-3'>
          <BookText className='text-primary' size={30} />
          <h1 className='text-xl font-bold text-primary'>TeForm</h1>
        </Link>
      </div>
      <div className='flex items-center gap-5'>
        <nav className='hidden space-x-5 text-sm font-medium md:flex'>
          <Link href={'/'}>Home</Link>
          {isAdmin && <Link href={'/dashboard'}>Dashboard</Link>}
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger className='!outline-none !border-none !ring-none !ring-offset-0'>
            <div className='flex items-center justify-center w-10 h-10 p-2 border rounded-full border-border bg-border/40'>
              <UserRound size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='min-w-52'>
            <DropdownMenuLabel>{username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/user/${id}`} className='w-full'>
                Your Account
              </Link>
            </DropdownMenuItem>
            <HeaderSignOut />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
