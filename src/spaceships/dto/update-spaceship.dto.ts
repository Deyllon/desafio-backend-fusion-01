import { CreateSpaceshipDto } from './create-spaceship.dto'; 
import { createZodDto } from 'nestjs-zod';

export const UpdateSpaceshipDto = CreateSpaceshipDto.partial()


export class UpdateSpaceshipType extends createZodDto(UpdateSpaceshipDto) {}

