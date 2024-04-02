import { GetEmailsResponse } from '@/lib/actions/response'
import { Card, CardContent, CardHeader } from './ui/card'

export default async function ResultEmail({ formId }: { formId: string }) {
  const emails = await GetEmailsResponse(formId)

  return (
    <Card className='flex flex-col w-full h-fit'>
      <CardHeader className='flex flex-row gap-2 pb-2'>
        Email <span className='text-destructive'>*</span>
      </CardHeader>
      <CardContent className='max-h-[60vh]'>
        {emails.length == 0 ? (
          <p>Email not found</p>
        ) : (
          <>
            {emails.map(({ email }, index) => (
              <div
                key={index}
                className='w-full px-2 py-3 bg-secondary text-secondary-foreground'
              >
                {email}
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  )
}
