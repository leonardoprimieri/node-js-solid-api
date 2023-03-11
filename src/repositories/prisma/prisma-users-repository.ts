import { CreateUserDto } from '@/dtos/create-user.dto'
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { UsersRepository } from '../user/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserDto): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
}
