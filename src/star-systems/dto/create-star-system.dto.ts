import { createZodDto } from 'nestjs-zod'
import {z} from 'zod'

export const CreateStarSystemDto = z.object({
    nome: z.string().toLowerCase(),
    descricao: z.string()
})

export class CreateStarSystemType extends createZodDto(CreateStarSystemDto) {}
