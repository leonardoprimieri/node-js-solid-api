import { UsersRepository } from '@/repositories/users-repository'

type AuthenticateServiceParams = {
  email: string
  password: string
}

type AuthenticateServiceRequest = void

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceParams): Promise<AuthenticateServiceRequest> {}
}
