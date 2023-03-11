import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateService } from './authenticate.service'

describe('Authenticate Service', () => {
  const makeSut = () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticationService = new AuthenticateService(usersRepository)

    return {
      authenticationService,
      usersRepository,
    }
  }

  it('should be able to authenticate', async () => {
    const { authenticationService, usersRepository } = makeSut()

    await usersRepository.create({
      email: 'any_email@gmail.com',
      name: 'any_name',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticationService.execute({
      email: 'any_email@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const { authenticationService } = makeSut()

    await expect(() =>
      authenticationService.execute({
        email: 'any_email2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const { authenticationService, usersRepository } = makeSut()

    await usersRepository.create({
      email: 'any_email@gmail.com',
      name: 'any_name',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticationService.execute({
        email: 'any_email@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
