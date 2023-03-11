import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserService } from '../register-user-service/register-user.service'

export const makeRegisterUserService = () => {
  const usersRepository = new PrismaUsersRepository()
  const registerUserService = new RegisterUserService(usersRepository)

  return { registerUserService }
}
