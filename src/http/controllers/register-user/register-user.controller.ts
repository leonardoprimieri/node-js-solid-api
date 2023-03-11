import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterUserService } from '@/services/factories/make-register-user-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const { registerUserService } = makeRegisterUserService()

    await registerUserService.execute({ email, name, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
