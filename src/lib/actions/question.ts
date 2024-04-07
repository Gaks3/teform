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

  const questionInDatabase = await prisma.question.findMany({
    where: {
      formId: id,
      idElement: {
        in: ids,
      },
    },
  })

  const existUpdate: { data: Prisma.QuestionUpdateInput; id: number }[] =
    updateElement
      .filter(({ idElement }) => {
        const data = questionInDatabase.find(
          ({ idElement: id }) => idElement === id
        )

        return idElement === data?.idElement
      })
      .map((data) => {
        const question = questionInDatabase.find(
          ({ idElement }) => idElement === data.idElement
        )

        return { data: { ...data }, id: question!.id }
      })

  const notExitstUpdate = updateElement.filter(({ idElement }) => {
    const data = questionInDatabase.find(
      ({ idElement: id }) => idElement === id
    )

    return idElement !== data?.idElement
  })

  if (existUpdate.length > 0)
    await Promise.all(
      existUpdate.map(async (data) => {
        await prisma.question.update({
          data: data.data,
          where: {
            id: data.id,
          },
        })
      })
    )

  if (notExitstUpdate.length > 0)
    await prisma.question.createMany({
      data: notExitstUpdate,
      skipDuplicates: true,
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

export async function UpdateQuestionById(
  formId: string,
  data: FormElementInstance
) {
  const formatData: Prisma.QuestionUpdateInput = {
    label: data.extraAttributes!.label,
    required: data.extraAttributes!.required,
    type: data.type,
    idElement: data.id,
    ...(data.extraAttributes?.option && {
      option: data.extraAttributes.option,
    }),
  }

  await prisma.question.update({
    where: {
      formId_idElement: {
        formId,
        idElement: data.id,
      },
    },
    data: formatData,
  })
}

export async function RemoveQuestion(formId: string, idElement: string) {
  await prisma.question.delete({
    where: {
      formId_idElement: {
        formId,
        idElement,
      },
    },
  })
}

export async function CreateQuestion(
  formId: string,
  data: FormElementInstance
) {
  const formatData: Prisma.QuestionCreateInput = {
    label: data.extraAttributes!.label,
    required: data.extraAttributes!.required,
    type: data.type,
    idElement: data.id,
    formId,
    ...(data.extraAttributes?.option && {
      option: data.extraAttributes.option,
    }),
  }

  await prisma.question.create({
    data: formatData,
  })
}

export async function UpdateTypeQuestion(
  formId: string,
  prevId: string,
  data: FormElementInstance
) {
  const formatData: Prisma.QuestionCreateInput = {
    label: data.extraAttributes!.label,
    required: data.extraAttributes!.required,
    type: data.type,
    idElement: data.id,
    ...(data.extraAttributes?.option && {
      option: data.extraAttributes.option,
    }),
  }

  await prisma.question.update({
    data: formatData,
    where: {
      formId_idElement: {
        formId,
        idElement: prevId,
      },
    },
  })
}
