import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '@/services/authenticate-service/authenticate.service'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(userRepository)

    await authenticateService.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(200).send()
}
