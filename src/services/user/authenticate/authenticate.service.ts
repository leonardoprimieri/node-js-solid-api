import { UsersRepository } from '@/repositories/user/users-repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

type AuthenticateServiceParams = {
  email: string
  password: string
}

type AuthenticateServiceRequest = {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceParams): Promise<AuthenticateServiceRequest> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
