'use server'

import { getUser } from '../auth'
import prisma from '../db'

export type UserUpdate = {
  username?: string
  email?: string
  password?: string
  isAdmin?: boolean
}

export async function GetTotalUser() {
  return await prisma.user.count()
}

export async function GetUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export async function GetUsers() {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) return null

  return await prisma.user.findMany()
}

export async function DeleteUserById(id: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  if (user.user?.id === id || user.user?.isAdmin)
    return await prisma.user.delete({
      where: {
        id,
      },
    })
}

export async function UpdateUserById(id: string, data: UserUpdate) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  if (user.user?.id === id || user.user?.isAdmin)
    return await prisma.user.update({
      data,
      where: {
        id,
      },
    })
}
