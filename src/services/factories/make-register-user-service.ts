import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserService } from '../user/register/register-user.service'

export const makeRegisterUserService = () => {
  const usersRepository = new PrismaUsersRepository()
  const registerUserService = new RegisterUserService(usersRepository)

  return { registerUserService }
}
