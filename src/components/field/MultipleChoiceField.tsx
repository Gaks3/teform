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
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Trash2, X } from 'lucide-react'
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'
import PieChart, { Data } from '../PieChart'

const type: ElementsType = 'MultipleChoice'

const extraAttributes = {
  label: 'Multiple Choice Field',
  required: false,
  option: ['Option 1'],
}

const schema = z.object({
  label: z.string().min(2).default('Multiple Choice Field'),
  required: z.boolean().default(false),
  option: z.string().trim().min(1).array().min(1).default(['Option 1']),
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

  const { label, required, option } = element.extraAttributes

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      label,
      required,
      option,
    },
    mode: 'onBlur',
  })
  const arrayForm = useFieldArray({
    control: form.control,
    name: 'option' as never,
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: z.infer<typeof schema>) => {
    const { label, required, option } = values

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        required,
        option,
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
            <CardHeader className='flex md:gap-5 flex-col md:flex-row md:justify-between'>
              <FormField
                control={form.control}
                name='label'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <div className='w-full border-b border-border'>
                        <Input
                          className='!outline-none !ring-offset-0 !ring-0 !p-0 text-base !border-none'
                          placeholder='Select One'
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
              <RadioGroup className='flex flex-col space-y-1'>
                {arrayForm.fields.map((field, index) => (
                  <div key={field.id}>
                    <FormField
                      control={form.control}
                      name={`option.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className='flex items-center space-x-3 space-y-0 '>
                              <RadioGroupItem disabled value={field.value} />
                              <Input
                                className='w-1/2'
                                {...field}
                                placeholder='Option'
                              />
                              <X
                                className='text-border cursor-pointer'
                                onClick={() => arrayForm.remove(index)}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <div className='flex items-center space-x-3 space-y-0 '>
                  <RadioGroupItem disabled value='appendadd' />
                  <Input
                    className='w-1/2'
                    onBlur={(event) => {
                      if (event.currentTarget.value.trim() !== '') {
                        arrayForm.append(event.currentTarget.value)
                        event.currentTarget.value = ''
                      }
                    }}
                    placeholder='Add Option'
                  />
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className='p-4 border-t border-t-border flex gap-5 justify-end'>
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
                className='text-destructive cursor-pointer'
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
          <CardHeader className='flex flex-row gap-2'>
            {label} {required && <span className='text-destructive'>*</span>}
          </CardHeader>
          <CardContent>
            <RadioGroup>
              {option.map((value, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-3 space-y-0 '
                >
                  <RadioGroupItem id={index.toString()} value={value} />
                  <Label htmlFor={index.toString()} className='font-normal'>
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
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

  const [value, setValue] = useState<string>((defaultValue as string) || '')
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  const { label, required, option } = element.extraAttributes

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
        <RadioGroup
          className='flex flex-col space-y-1'
          value={value}
          onValueChange={(value) => {
            setValue(value)

            if (!submitValue) return

            const valid = MultipleChoiceFieldFormElement.validate(
              element,
              value
            )

            setError(!valid)

            submitValue(id.toString(), value)
          }}
        >
          {option.map((value, index) => (
            <div key={index} className='flex items-center space-x-3 space-y-0'>
              <RadioGroupItem id={index.toString()} value={value} />
              <Label htmlFor={index.toString()} className='font-normal'>
                {value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

export const ResultComponent = ({
  elementInstance,
  values,
}: {
  elementInstance: FormElementInstance
  values: string[] | { id: string; value: number }[]
}) => {
  const element = elementInstance as CustomInstance

  const { label, required } = element.extraAttributes

  return (
    <Card className='flex flex-col w-full h-fit'>
      <CardHeader className='flex flex-row gap-2 pb-2'>
        {label} {required && <span className='text-destructive'>*</span>}
      </CardHeader>
      <CardContent className='h-[40vh] w-full'>
        <PieChart data={values as Data} />
      </CardContent>
    </Card>
  )
}

export const MultipleChoiceFieldFormElement: FormElement = {
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
