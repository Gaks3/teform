import { CheckBoxFieldFormElement } from './field/CheckBoxField'
import { MultipleChoiceFieldFormElement } from './field/MultipleChoiceField'
import { ParagraphFieldFormElement } from './field/ParagraphField'
import { SelectFieldFormElement } from './field/SelectField'
import { TextFieldFormElement } from './field/TextField'

export type ElementsType =
  | 'Text'
  | 'Paragraph'
  | 'Select'
  | 'Checkbox'
  | 'MultipleChoice'

export const ElementsTypeList: ElementsType[] = [
  'Text',
  'Paragraph',
  'Select',
  'Checkbox',
  'MultipleChoice',
]

export type SubmitFunction = (key: string, value: string | string[]) => void

export type FormElementInstance = {
  id: string
  type: ElementsType
  extraAttributes?: Record<string, any>
}

export type FormElement = {
  type: ElementsType
  construct: (id: string) => FormElementInstance
  designerComponent: React.FC<{
    elementInstance: FormElementInstance
    selected: boolean
  }>
  formComponent: React.FC<{
    elementInstance: FormElementInstance
    submitValue?: SubmitFunction
    isInvalid?: boolean
    defaultValue?: string | string[]
    id: number
  }>
  resultComponent: React.FC<{
    elementInstance: FormElementInstance
    values: string[] | { id: string; value: number }[]
  }>
  validate: (
    formElement: FormElementInstance,
    currentValue: string | string[]
  ) => boolean
}

type FormElementsType = {
  [key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
  Text: TextFieldFormElement,
  MultipleChoice: MultipleChoiceFieldFormElement,
  Paragraph: ParagraphFieldFormElement,
  Checkbox: CheckBoxFieldFormElement,
  Select: SelectFieldFormElement,
}
