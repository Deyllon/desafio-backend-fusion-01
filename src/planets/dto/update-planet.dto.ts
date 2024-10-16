import { CreatePlanetDto } from './create-planet.dto'
import { createZodDto } from 'nestjs-zod';

export const UpdatePlanetDto = CreatePlanetDto.partial()


export class UpdatePlanetType extends createZodDto(UpdatePlanetDto) {}
