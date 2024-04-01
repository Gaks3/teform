import type { Form } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import { Button } from './ui/button'

export default async function FormCard({ form }: { form: Form }) {
  return (
    <Link
      href={`/form/${form.id}`}
      className='transition-all duration-300 hover:shadow-2xl hover:shadow-input/50 h-full'
    >
      <Card className='h-full'>
        <div className='flex flex-col w-full h-full'>
          <CardHeader className='max-w-full z-10'>
            <CardTitle className='flex items-center justify-between relative'>
              <p className='break-words text-wrap line-clamp-1 max-w-[60%]'>
                {form.name}
              </p>
            </CardTitle>
            <CardDescription>
              {formatDistance(form.createdAt, new Date(), {
                addSuffix: true,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className='text-sm truncate row-span-2 z-10'>
            {form.description}
          </CardContent>
          <CardFooter>
            <Button className='w-full'>View</Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}
