import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

type RegisterServiceParams = {
  name: string
  password: string
  email: string
}

export async function registerService({
  email,
  name,
  password,
}: RegisterServiceParams) {
  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists.')
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: passwordHash,
    },
  })
}
