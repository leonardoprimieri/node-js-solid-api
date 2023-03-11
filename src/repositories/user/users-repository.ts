import { CreateUserDto } from '@/dtos/create-user.dto'
import { User } from '@prisma/client'

export interface UsersRepository {
  create(data: CreateUserDto): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
