'use server'

import { FormElementInstance } from '@/components/FormElements'
import { Prisma } from '@prisma/client'
import prisma from '../db'

export async function UpdateContent(
  id: string,
  elements: FormElementInstance[]
) {
  const updateElement: Prisma.QuestionCreateManyInput[] = elements.map(
    (value) => {
      return {
        idElement: value.id,
        type: value.type,
        formId: id,
        label: value.extraAttributes!.label,
        required: value.extraAttributes!.required,
        ...(value.extraAttributes?.option && {
          option: value.extraAttributes.option,
        }),
      }
    }
  )
  const ids = updateElement.map(({ idElement }) => idElement)

  await prisma.question.deleteMany({
    where: {
      idElement: {
        in: ids,
      },
      formId: id,
    },
  })

  await prisma.question.createMany({
    data: updateElement,
  })
}

export async function GetQuestionsByFormId(id: string) {
  const data = await prisma.question.findMany({
    where: {
      formId: id,
    },
  })

  if (!data || data.length <= 0) return []

  return data.map(({ idElement, type, label, required, option, id }) => {
    return {
      id: idElement,
      type,
      extraAttributes: {
        label,
        required,
        ...(option && { option }),
      },
      questionId: id,
    } as FormElementInstance & { questionId: number }
  })
}
