'use server'

import { getUser } from '@/lib/auth'
import prisma from '@/lib/db'
import { createFormSchemaType } from '@/lib/schema/form'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { CreateResponse } from './response'
import { CreateAnswers } from './answer'
import { getDates } from '../utils'
import { format } from 'date-fns'
import { GetUserById } from './user'
import { notFound } from 'next/navigation'

export async function GetAllFormStats() {
  const user = await getUser()
  if (!user || !user.user) throw new Error('Unauthorized')

  const aggregate = await prisma.form.findMany({
    where: {
      userId: user.user.id,
    },
    select: {
      _count: {
        select: {
          responses: true,
        },
      },
      visits: true,
    },
  })

  const visits = aggregate.reduce((prev, curr) => prev + curr.visits, 0)
  const submissions = aggregate.reduce(
    (prev, curr) => prev + curr._count.responses,
    0
  )
  let submissionsRate = 0
  if (visits > 0) submissionsRate = (submissions / visits) * 100

  return { visits, submissions, submissionsRate }
}

export async function GetFormStats(id: string) {
  const user = await getUser()
  if (!user || !user.user) throw new Error('Unauthorized')

  const aggregate = await prisma.form.findMany({
    where: {
      userId: user.user.id,
      id,
    },
    select: {
      _count: {
        select: {
          responses: {
            where: {
              formId: id,
            },
          },
        },
      },
      visits: true,
    },
  })

  const visits = aggregate.reduce((prev, curr) => prev + curr.visits, 0)
  const submissions = aggregate.reduce(
    (prev, curr) => prev + curr._count.responses,
    0
  )
  let submissionsRate = 0
  if (visits > 0) submissionsRate = (submissions / visits) * 100

  return { visits, submissions, submissionsRate }
}

export async function CreateForm(values: createFormSchemaType) {
  const user = await getUser()
  if (!user || !user.user) throw new Error('Unauthorized')

  const form = await prisma.form.create({
    data: {
      name: values.name,
      description: values.description,
      userId: user.user.id,
    },
  })
  if (!form) throw new Error('Internal server error')

  revalidatePath('/')

  return form
}

export async function GetAllForm() {
  const user = await getUser()
  if (!user || !user.user) throw new Error('Unauthorized')

  if (user.user.isAdmin) {
    return await prisma.form.findMany()
  }

  return await prisma.form.findMany({
    where: {
      userId: user.user.id,
    },
  })
}

export async function GetFormById(id: string) {
  const user = await getUser()
  if (!user) return notFound()

  const where: Prisma.FormWhereUniqueInput = { id }

  if (!user.user?.isAdmin) where['userId'] = user.user?.id

  return await prisma.form.findUnique({
    where,
  })
}

export async function UpdateForm(
  id: string,
  data: {
    name?: string
    description?: string
    anonymous?: boolean
  }
) {
  const user = await getUser()
  if (!user || !user.user) throw new Error('Unauthorized')

  const updateData: Prisma.FormUpdateInput = {}

  if (data.name) updateData.name = data.name
  if (data.description) updateData.description = data.description
  if (data.anonymous == false || data.anonymous == true)
    updateData.isAnonymous = data.anonymous

  await prisma.form.update({
    where: {
      id,
      userId: user.user.id,
    },
    data: updateData,
  })
}

export async function SubmitForm(
  id: string,
  content: { [key: string]: string | string[] }
) {
  const form = await prisma.form.findUnique({ where: { id } })
  if (!form) throw new Error('Form not found')

  const response = await CreateResponse(form.id, form.isAnonymous)

  const answers = Object.entries(content).map(([key, value]) => ({
    questionId: Number(key),
    value: JSON.stringify(value),
    responseId: response.id,
  }))

  await CreateAnswers(answers)
}

export async function AddVisits(id: string) {
  try {
    return await prisma.form.update({
      where: { id },
      data: {
        visits: {
          increment: 1,
        },
      },
    })
  } catch (error) {
    return null
  }
}

export async function GetTotalForm() {
  return await prisma.form.count()
}

export async function GetMostFormByUserAndDate(startDate: Date, endDate: Date) {
  const forms = await prisma.form.groupBy({
    by: ['createdAt', 'userId'],
    _count: true,
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const dateRange = getDates(startDate, endDate)

  const data = await Promise.all(
    dateRange.map(async (date: Date) => {
      const byDate = forms.filter(
        ({ createdAt }) => createdAt.getDate() === date.getDate()
      )

      if (byDate.length === 0)
        return {
          none: 0,
          date: format(date, 'dd-LL-yyyy'),
        }

      const most = byDate.reduce((prev, curr) =>
        prev._count > curr._count ? prev : curr
      )

      const user = await GetUserById(most.userId)
      if (!user)
        return {
          none: 0,
          date: format(date, 'dd-LL-yyyy'),
        }

      return {
        [user.email]: most._count,
        date: format(most.createdAt, 'dd-LL-yyyy'),
      }
    })
  )

  return data
}

export async function GetForms() {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) return []

  return await prisma.form.findMany()
}

export async function DeleteForm(formId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const where: Prisma.FormWhereUniqueInput = { id: formId }

  if (!user.user?.isAdmin) where['userId'] = user.user?.id

  await prisma.form.delete({ where })
}
