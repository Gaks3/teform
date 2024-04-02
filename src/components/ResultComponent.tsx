'use client'

import { FormElementInstance, FormElements } from './FormElements'

export default function ResultComponent({
  elementInstance,
  values,
}: {
  elementInstance: FormElementInstance
  values: string[] | { id: string; value: number }[]
}) {
  const Component = FormElements[elementInstance.type].resultComponent

  return <Component elementInstance={elementInstance} values={values} />
}
