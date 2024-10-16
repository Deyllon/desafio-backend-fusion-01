import { CreateUserDto } from './create-user.dto'
import { createZodDto } from 'nestjs-zod'


export const UpdateUserDto = CreateUserDto.partial()


export class UpdateUserType extends createZodDto(UpdateUserDto) {}
