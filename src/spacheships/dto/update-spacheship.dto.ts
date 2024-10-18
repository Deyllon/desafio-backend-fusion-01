import { CreateSpacheshipDto } from './create-spacheship.dto'; 
import { createZodDto } from 'nestjs-zod';

export const UpdateSpacheshipDto = CreateSpacheshipDto.partial()


export class UpdateSpacheshipType extends createZodDto(UpdateSpacheshipDto) {}

