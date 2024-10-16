import { createZodDto } from 'nestjs-zod';
import {z} from 'zod'

const clima = [
    'ARIDO',
    'ENSOLARADO',
    'NUBLADO',
    'CHUVOSO',
    'TROPICAL',
    'GELIDO',
    'TEMPERADO',
    'VENTOSO',
    'UMIDO',
    'ARTICO',
    'SECO',
    'VOLCANICO',
    'DESERTICO',
    'PANTANOSO',
    'TOXICO'
] as const

const terreno = [
    'DESERTO',
    'FLORESTA',
    'MONTANHOSO',
    'PLANICIE',
    'PANTANO',
    'VULCANICO',
    'ARIDO',
    'GELIDO',
    'OCEANICO',
    'CAVERNOSO',
    'SELVAGEM',
    'URBANO',
    'PEDREGOSO',
    'POLO_GELIDO'
] as const

export const CreatePlanetDto = z.object({
    nome: z.string().toLowerCase(),
    clima: z.enum(clima),
    terreno: z.enum(terreno),
    populacao: z.number().int().positive(),
    sistemaEstelarId: z.number().int()
})

export class CreatePlanetType extends createZodDto(CreatePlanetDto) {}
