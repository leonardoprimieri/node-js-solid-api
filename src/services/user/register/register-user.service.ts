import { UsersRepository } from '@/repositories/user/users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

type RegisterUserServiceParams = {
  name: string
  password: string
  email: string
}

type RegisterUserServiceResponse = {
  user: User
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserServiceParams): Promise<RegisterUserServiceResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    })

    return { user }
  }
}
