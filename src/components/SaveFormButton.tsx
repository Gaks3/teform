'use client'

import { Save } from 'lucide-react'
import { Button } from './ui/button'
import useDesigner from '@/lib/hooks/useDesigner'
import { useTransition } from 'react'
import { toast } from './ui/use-toast'
import { UpdateContent } from '@/lib/actions/question'

export default function SaveFormButton({ id }: { id: string }) {
  const { elements } = useDesigner()
  const [loading, startTransition] = useTransition()

  const updateContent = async () => {
    if (elements.length <= 0)
      toast({
        title: 'Question required',
        variant: 'destructive',
        description: 'At least must be 1 question',
      })
    else {
      try {
        await UpdateContent(id, elements)

        toast({
          title: 'Success',
          description: 'Form has been saved',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Button
      className='flex gap-3 w-fit'
      disabled={loading}
      onClick={() => startTransition(updateContent)}
    >
      {!loading ? (
        <>
          <Save size={20} />
          Save
        </>
      ) : (
        <>Loading</>
      )}
    </Button>
  )
}
