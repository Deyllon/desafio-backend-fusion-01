import { createZodDto } from "nestjs-zod";
import {z} from 'zod'

export const CreateSpacheshipDto = z.object({
    nome: z.string().toLowerCase(),
    modelo: z.string().toLowerCase(),
    fabricante: z.string().toLowerCase(),
    capacidade: z.number().int().positive()
})

export class CreateSpacheshipType extends createZodDto(CreateSpacheshipDto) {}