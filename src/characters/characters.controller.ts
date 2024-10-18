import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterType } from './dto/create-character.dto';
import { UpdateCharacterType } from './dto/update-character.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        afiliacao: {
          type: 'string',
          example: "SITH"
        },
        nome: {
          type: 'string',
          example: "testeNome"
        },
        raca: {
          type: 'string',
          example: "testeRaca"
        },
        planetaId: {
          type: 'number',
          example: 1
        },
      },
      required: [ 'afiliacao', 'raca', 'nome', 'planetaId'],
    },
  })
  create(@Body() createCharacterDto: CreateCharacterType) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string',
          example: "novoNome"
        },
      }
    },
  })
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterType) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
