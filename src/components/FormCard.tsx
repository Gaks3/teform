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
import MoreFormCard from './MoreFormCard'

export default async function FormCard({ form }: { form: Form }) {
  return (
    <Card className='h-full transition-all duration-300 hover:shadow-2xl hover:shadow-input/50'>
      <div className='flex flex-col w-full h-full'>
        <CardHeader className='max-w-full z-10'>
          <CardTitle className='flex items-center justify-between gap-5'>
            <p className='break-words text-wrap line-clamp-1 flex-1'>
              {form.name}
            </p>
            <MoreFormCard formId={form.id} />
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
          <Button className='w-full' asChild>
            <Link href={`/form/${form.id}`}>Edit</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
