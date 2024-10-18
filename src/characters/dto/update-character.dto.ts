import { CreateCharacterDto } from './create-character.dto'; 
import { createZodDto } from 'nestjs-zod';

export const UpdateCharacterDto = CreateCharacterDto.partial()


export class UpdateCharacterType extends createZodDto(UpdateCharacterDto) {}
