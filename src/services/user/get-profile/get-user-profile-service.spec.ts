import { InMemoryUsersRepository } from '@/repositories/user/in-memory-users-repository'
import { ResourseNotFoundError } from '@/services/errors/resource-not-found-error'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { GetUserProfileService } from './get-user-profile.service'

describe('Get User Profile Service', () => {
  const makeSut = () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserProfileService = new GetUserProfileService(usersRepository)

    return { getUserProfileService, usersRepository }
  }

  it('should retrieve user profile informations', async () => {
    const { getUserProfileService, usersRepository } = makeSut()

    const createdUser = await usersRepository.create({
      email: 'any_email@gmail.com',
      name: 'any_name',
      password_hash: await hash('123456', 6),
      id: 'any_id',
    })

    const user = await getUserProfileService.execute({ id: createdUser.id })

    expect(user).toEqual(
      expect.objectContaining({
        user: {
          created_at: expect.any(Date),
          email: expect.any(String),
          id: expect.any(String),
          name: expect.any(String),
          password_hash: expect.any(String),
        },
      }),
    )
  })

  it('should not retrieve user profile informations with not existing id', async () => {
    const { getUserProfileService } = makeSut()

    await expect(() =>
      getUserProfileService.execute({ id: 'wrong_id' }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError)
  })
})
