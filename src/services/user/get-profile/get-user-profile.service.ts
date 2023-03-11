import { UsersRepository } from '@/repositories/user/users-repository'

type GetUserProfileServiceParams = {
  id: string
}
type GetUserProfileServiceResponse = void

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserProfileServiceParams): Promise<GetUserProfileServiceResponse> {}
}
