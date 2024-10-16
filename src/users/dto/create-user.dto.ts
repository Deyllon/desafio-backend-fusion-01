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


export const CreateUserDto = z.object({
    afiliacao: z.enum(afiliacao),
    email: z.string().email(),
    senha: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
        .regex(/[A-Z]/, { message: "Senha deve ter pelo menos uma letra maiúscula" })
        .regex(/[a-z]/, { message: "Senha deve ter pelo menos uma letra minúscula" })
        .regex(/\d/, { message: "Senha deve ter pelo menos um número" })
        .regex(/[\W_]/, { message: "Senha deve ter pelo menos um caractere especial" })
})

export class CreateUserType extends createZodDto(CreateUserDto) {}
