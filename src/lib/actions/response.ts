'use server'

import { Prisma } from '@prisma/client'
import { getUser } from '../auth'
import prisma from '../db'
import { getDates } from '../utils'
import { format } from 'date-fns'

type CreateResponse =
  | (Prisma.Without<
      Prisma.ResponseCreateInput,
      Prisma.ResponseUncheckedCreateInput
    > &
      Prisma.ResponseUncheckedCreateInput)
  | (Prisma.Without<
      Prisma.ResponseUncheckedCreateInput,
      Prisma.ResponseCreateInput
    > &
      Prisma.ResponseCreateInput)

export async function CreateResponse(formId: string, isAnonymous: boolean) {
  const data: CreateResponse = {
    formId,
  }

  if (!isAnonymous) {
    const user = await getUser()

    if (!user?.user) throw new Error('Unauthorized')

    data.userId = user.user.id
  }

  data.formId = formId

  return await prisma.response.create({
    data,
  })
}

export async function GetResponsesByDate(
  formId: string,
  startDate: Date,
  endDate: Date
) {
  const user = await getUser()
  if (!user || !user.user) throw new Error('Unauthorized')

  const responses = await prisma.response.findMany({
    where: {
      formId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      date: true,
    },
    orderBy: {
      date: 'asc',
    },
  })

  const dateRange = getDates(startDate, endDate)

  const data = dateRange.map((item) => {
    const exist: { date: Date | string }[] = responses.filter(
      ({ date }) => date.getDate() === item.getDate()
    )

    if (exist.length == 0) return { y: 0, x: format(item, 'dd-LL-yyyy') }

    return { y: exist.length, x: format(exist[0].date, 'dd-LL-yyyy') }
  })

  return { id: 'responses', data }
}

export async function GetEmailsResponse(formId: string) {
  const users = await prisma.response.findMany({
    where: {
      formId,
    },
    select: {
      userId: true,
    },
  })

  const usersId = users.flatMap(({ userId }) => (userId ? userId : []))

  return await prisma.user.findMany({
    where: {
      id: {
        in: usersId,
      },
    },
    select: {
      email: true,
    },
  })
}

export async function GetTotalResponse() {
  return await prisma.response.count()
}
