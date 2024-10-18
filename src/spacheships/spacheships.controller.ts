import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpacheshipsService } from './spacheships.service';
import { CreateSpacheshipType } from './dto/create-spacheship.dto';
import { UpdateSpacheshipType } from './dto/update-spacheship.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('spaceships')
@Controller('spacheships')
export class SpacheshipsController {
  constructor(private readonly spacheshipsService: SpacheshipsService) {}

  @Post()
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
  create(@Body() createSpacheshipDto: CreateSpacheshipType) {
    return this.spacheshipsService.create(createSpacheshipDto);
  }

  @Get()
  findAll() {
    return this.spacheshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spacheshipsService.findOne(+id);
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
  update(@Param('id') id: string, @Body() updateSpacheshipDto: UpdateSpacheshipType) {
    return this.spacheshipsService.update(+id, updateSpacheshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spacheshipsService.remove(+id);
  }
}
