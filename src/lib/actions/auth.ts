'use server'

import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'
import { getUser, lucia } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import { z } from 'zod'
import { signInSchema, signUpSchema } from '@/lib/schema/auth'

interface ActionResult {
  error?: {
    email?: string
    username?: string
    password?: string
  }
}

export async function signUp(
  values: z.infer<typeof signUpSchema>
): Promise<ActionResult> {
  const exist = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  })

  if (exist) return { error: { email: 'Email already in use' } }

  const hashedPassword = await new Argon2id().hash(values.password)

  const user = await prisma.user.create({
    data: {
      email: values.email,
      username: values.username,
      hashed_password: hashedPassword,
      isAdmin: false,
    },
  })

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect(cookies().get('callback_url')?.value || '/')
}

export async function signIn(
  values: z.infer<typeof signInSchema>
): Promise<ActionResult> {
  const user = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  })
  if (!user)
    return {
      error: {
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      },
    }

  const validPassword = await new Argon2id().verify(
    user.hashed_password,
    values.password
  )
  if (!validPassword)
    return {
      error: {
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      },
    }

  await lucia.deleteExpiredSessions()

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  redirect(cookies().get('callback_url')?.value || '/')
}

export async function signOut() {
  const user = await getUser()
  if (!user?.session) {
    return redirect('/sign-in')
  }

  await lucia.invalidateSession(user.session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect('/sign-in')
}
