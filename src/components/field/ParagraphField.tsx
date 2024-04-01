'use client'

import { z } from 'zod'
import {
  ElementsType,
  ElementsTypeList,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '../FormElements'
import useDesigner from '@/lib/hooks/useDesigner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const type: ElementsType = 'Paragraph'

const extraAttributes = {
  label: 'Paragraph Field',
  required: false,
}

const schema = z.object({
  label: z.string().min(1).default('Paragraph Field'),
  required: z.boolean().default(false),
})

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

export const DesignerComponent = ({
  elementInstance,
  selected,
}: {
  elementInstance: FormElementInstance
  selected: boolean
}) => {
  const { updateElement, updateTypeElement, removeElement } = useDesigner()

  const element = elementInstance as CustomInstance

  const { label, required } = element.extraAttributes

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      label,
      required,
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: z.infer<typeof schema>) => {
    const { label, required } = values

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        required,
      },
    })
  }

  const changeElementType = (type: ElementsType) => {
    updateTypeElement(element.id, type)
  }

  return (
    <>
      {selected ? (
        <Form {...form}>
          <form
            onSubmit={(event) => event.preventDefault()}
            onBlur={form.handleSubmit(applyChanges)}
          >
            <CardHeader className='flex flex-row justify-between gap-5'>
              <FormField
                control={form.control}
                name='label'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <div className='w-full border-b border-border'>
                        <Input
                          className='!outline-none !ring-offset-0 !ring-0 !p-0 text-base !border-none'
                          placeholder='Short Answer'
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Select
                onValueChange={changeElementType}
                defaultValue={element.type}
              >
                <SelectTrigger className='w-52'>
                  <SelectValue placeholder='Element Type' />
                </SelectTrigger>
                <SelectContent>
                  {ElementsTypeList.map((value, index) => (
                    <SelectItem key={index} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Textarea className='w-1/2' placeholder='Your Answer' />
            </CardContent>
            <CardFooter className='flex justify-end gap-5 p-4 border-t border-t-border'>
              <FormField
                control={form.control}
                name='required'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2 space-y-0'>
                    <FormLabel>Required</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Trash2
                className='cursor-pointer text-destructive'
                size={18}
                onClick={(event) => {
                  event.stopPropagation()
                  removeElement(element.id)
                }}
              />
            </CardFooter>
          </form>
        </Form>
      ) : (
        <>
          <CardHeader className='flex flex-row gap-2 pb-2'>
            {label} {required && <span className='text-destructive'>*</span>}
          </CardHeader>
          <CardContent>
            <Textarea placeholder='Your Answer' className='w-1/2' />
          </CardContent>
        </>
      )}
    </>
  )
}

export const FormComponent = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
  id,
}: {
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
  isInvalid?: boolean
  defaultValue?: string | string[]
  id: number
}) => {
  const element = elementInstance as CustomInstance

  const [value, setValue] = useState(defaultValue || '')
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  const { label, required } = element.extraAttributes

  return (
    <Card className='flex flex-col w-full h-fit'>
      <CardHeader
        className={cn(
          'flex flex-row gap-2 pb-2',
          error ? 'text-destructive' : ''
        )}
      >
        {label} {required && <span className='text-destructive'>*</span>}
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder='Your Answer'
          className='w-full md:w-[65%] text-base'
          onChange={(event) => setValue(event.currentTarget.value)}
          onBlur={(e) => {
            if (!submitValue) return

            const valid = ParagraphFieldFormElement.validate(
              element,
              e.target.value
            )
            setError(!valid)

            if (!valid) return

            submitValue(id.toString(), e.target.value)
          }}
          value={value}
        />
      </CardContent>
    </Card>
  )
}

export const ResultComponent = ({
  elementInstance,
  values,
}: {
  elementInstance: FormElementInstance
  values: string[]
}) => {
  const element = elementInstance as CustomInstance

  const { label, required } = element.extraAttributes

  return (
    <Card className='flex flex-col w-full h-fit'>
      <CardHeader className='flex flex-row gap-2 pb-2'>
        {label} {required && <span className='text-destructive'>*</span>}
      </CardHeader>
      <CardContent className='max-h-[60vh]'>
        {values.map((value, index) => (
          <div
            key={index}
            className='w-full px-2 py-3 bg-secondary text-secondary-foreground'
          >
            {value}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  resultComponent: ResultComponent,
  validate: (formElement, currentValue): boolean => {
    const element = formElement as CustomInstance

    if (element.extraAttributes.required) return currentValue.length > 0

    return true
  },
}
