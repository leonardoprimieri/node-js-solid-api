import { InMemoryUsersRepository } from '@/repositories/user/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUserService } from './register-user.service'

describe('Register Service', () => {
  const mockedUser = {
    email: 'jhon@doe.com',
    name: 'Jhon Doe',
    password: '123456',
  }

  const makeSut = () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserService = new RegisterUserService(inMemoryUsersRepository)

    return { registerUserService }
  }

  it('should be able to register', async () => {
    const { registerUserService } = makeSut()

    const { user } = await registerUserService.execute(mockedUser)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password', async () => {
    const { registerUserService } = makeSut()

    const { user } = await registerUserService.execute(mockedUser)

    const isPasswordCorrectlyHashed = await compare(
      mockedUser.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create an user that already exists', async () => {
    const { registerUserService } = makeSut()

    await registerUserService.execute(mockedUser)

    await expect(
      async () => await registerUserService.execute(mockedUser),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
