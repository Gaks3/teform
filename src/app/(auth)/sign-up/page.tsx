import SignUp from '@/components/SignUp'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()
  if (user) return redirect('/')

  return (
    <Card className='min-w-96'>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUp />
      </CardContent>
    </Card>
  )
}
