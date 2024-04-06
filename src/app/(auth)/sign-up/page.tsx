import SignUp from '@/components/SignUp'
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
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUp />
      </CardContent>
      <CardFooter>
        <span className='text-sm'>
          Already have account?{' '}
          <Link href={'/sign-in'} className='underline'>
            Sign In here
          </Link>
        </span>
      </CardFooter>
    </Card>
  )
}
