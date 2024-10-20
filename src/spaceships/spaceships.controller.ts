import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { CreateSpaceshipType } from './dto/create-spaceship.dto';
import { UpdateSpaceshipType } from './dto/update-spaceship.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('spaceships')
@Controller('spaceships')
export class SpaceshipsController {
  constructor(private readonly spaceshipsService: SpaceshipsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        modelo: {
          type: 'string',
          example: "testeModelo"
        },
        nome: {
          type: 'string',
          example: "testeNome"
        },
        fabricante: {
          type: 'string',
          example: "testeFabricante"
        },
        capacidade: {
          type: 'number',
          example: 5
        },
      },
      required: [ 'modelo', 'fabricante', 'nome', 'capacidade'],
    },
  })
  create(@Body() createSpaceshipDto: CreateSpaceshipType) {
    return this.spaceshipsService.create(createSpaceshipDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.spaceshipsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.spaceshipsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        capacidade: {
          type: 'number',
          example: 8
        },
      }
    },
  })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateSpaceshipDto: UpdateSpaceshipType) {
    return this.spaceshipsService.update(+id, updateSpaceshipDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.spaceshipsService.remove(+id);
  }
}
