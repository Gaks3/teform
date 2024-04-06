import Link from 'next/link'

export default function UnauthorizedUser() {
  return (
    <main className='w-full h-dvh flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h1 className='font-bold text-7xl text-primary'>401</h1>
        <p>You must be login to access this page</p>
        <Link href={'/sign-in'} className='underline'>
          Sign in here
        </Link>
      </div>
    </main>
  )
}
