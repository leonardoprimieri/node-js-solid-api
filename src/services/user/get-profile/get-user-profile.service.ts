import { UsersRepository } from '@/repositories/user/users-repository'
import { ResourseNotFoundError } from '@/services/errors/resource-not-found-error'
import { User } from '@prisma/client'

type GetUserProfileServiceParams = {
  id: string
}
type GetUserProfileServiceResponse = {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserProfileServiceParams): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourseNotFoundError()
    }

    return { user }
  }
}
