'use client'

import { useCallback, useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './FormElements'
import { toast } from './ui/use-toast'
import { SubmitForm } from '@/lib/actions/form'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

export default function FormSubmit({
  id,
  name,
  description,
  content,
}: {
  id: string
  name: string
  description: string
  content: (FormElementInstance & {
    questionId: number
  })[]
}) {
  const formValues = useRef<{ [key: string]: string | string[] }>({})
  const formErrors = useRef<{ [key: string]: boolean }>({})

  const [renderKey, setRenderKey] = useState(new Date().getTime())
  const [submitted, setSubmitted] = useState(false)

  const [pending, startTransition] = useTransition()

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.questionId] || ''
      const valid = FormElements[field.type].validate(field, actualValue)

      if (!valid) formErrors.current[field.questionId] = true
    }

    if (Object.keys(formErrors.current).length > 0) return false

    return true
  }, [content])

  const submitValue = useCallback((key: string, value: string | string[]) => {
    formValues.current[key] = value
  }, [])

  const submitForm = async () => {
    formErrors.current = {}

    const validForm = validateForm()

    if (!validForm) {
      setRenderKey(new Date().getTime())

      toast({
        title: 'Error',
        description: 'Please check the form for errors',
        variant: 'destructive',
      })

      return
    }

    try {
      await SubmitForm(id, formValues.current)

      setSubmitted(true)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  if (submitted)
    return (
      <div className='flex justify-center w-full h-full p-8'>
        <div className='w-[95vw] md:w-[80vw] lg:w-[60vw] border rounded-md border-border'>
          <div className='w-full h-3 bg-primary rounded-t-md' />
          <div className='p-8 space-y-3'>
            <h1 className='text-3xl font-bold'>Thankyou for submitting!</h1>
          </div>
        </div>
      </div>
    )

  return (
    <div className='flex justify-center w-full h-full p-8 bg-primary/10'>
      <div
        key={renderKey}
        className='max-w-[620px] flex flex-col gap-4 flex-grow w-full overflow-y-auto'
      >
        <Card className='border-t-8 border-t-primary'>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent

          return (
            <FormElement
              key={element.id}
              id={element.questionId}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.questionId.toString()]}
              defaultValue={formValues.current[element.questionId.toString()]}
            />
          )
        })}
        <Button
          className='mt-8 disabled:cursor-not-allowed'
          onClick={() => {
            startTransition(submitForm)
          }}
          disabled={pending}
        >
          {!pending ? <>Submit</> : <>Loading...</>}
        </Button>
      </div>
    </div>
  )
}
