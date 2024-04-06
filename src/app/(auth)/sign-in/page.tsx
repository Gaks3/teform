import SignIn from '@/components/SignIn'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default async function Page() {
  return (
    <Card className='min-w-80 md:min-w-96'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignIn />
      </CardContent>
      <CardFooter>
        <span className='text-sm'>
          Don&apos;t have account?{' '}
          <Link href={'/sign-up'} className='underline'>
            Sign Up here
          </Link>
        </span>
      </CardFooter>
    </Card>
  )
}
