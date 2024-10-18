import { createZodDto } from 'nestjs-zod';
import {z} from 'zod'

const afiliacao = [
    'JEDI',
    'SITH',
    'REBELDE',
    'IMPERIO',
    'NOVA_REPUBLICA',
    'PRIMEIRA_ORDEM',
    'RESISTENCIA',
    'CACADOR_DE_RECOMPENSAS',
    'COMERCIO',
    'ALDEAO'
] as const

export const CreateCharacterDto = z.object({
    nome: z.string().toLowerCase(),
    afiliacao: z.enum(afiliacao),
    raca: z.string(),
    planetaId: z.number().int()
})

export class CreateCharacterType extends createZodDto(CreateCharacterDto) {}
