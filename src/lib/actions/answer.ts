'use server'

import { ElementsType } from '@/components/FormElements'
import prisma from '../db'

export async function CreateAnswers(
  data: {
    questionId: number
    value: string
    responseId: number
  }[]
) {
  return await prisma.answer.createMany({
    data,
  })
}

export async function GetAnswersByQuestionId(
  questionId: number,
  type: ElementsType
) {
  const data = await prisma.answer.findMany({
    where: {
      questionId,
    },
    select: {
      value: true,
    },
  })

  if (type == 'Checkbox' || type == 'MultipleChoice' || type == 'Select') {
    const values = data.map(({ value }) => JSON.parse(value))

    const result = values.flat().reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1
      return acc
    }, {})

    return Object.keys(result).map((key) => ({
      id: key,
      label: key,
      value: result[key],
    }))
  }

  return data.map(({ value }) => value) as string[]
}
