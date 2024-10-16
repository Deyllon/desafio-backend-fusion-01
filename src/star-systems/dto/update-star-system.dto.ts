import { CreateStarSystemDto } from './create-star-system.dto'; 
import { createZodDto } from 'nestjs-zod';

export const UpdateStarSystemDto = CreateStarSystemDto.partial()

export class UpdateStarSystemType extends createZodDto(UpdateStarSystemDto) {}
