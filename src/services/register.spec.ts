import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterService } from './register.service'

describe('Register Service', () => {
  it('should hash user password', async () => {
    const registerService = new RegisterService({
      async findByEmail() {
        return null
      },

      async create(data) {
        return {
          id: 'user-id',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
