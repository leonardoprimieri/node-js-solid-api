import { FastifyInstance } from 'fastify'
import { authenticateController } from './controllers/authenticate/authenticate.controller'
import { registerUserController } from './controllers/register-user/register-user.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions ', authenticateController)
}
