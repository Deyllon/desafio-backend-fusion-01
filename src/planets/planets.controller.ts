import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetType } from './dto/create-planet.dto';
import { UpdatePlanetType } from './dto/update-planet.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        clima: {
          type: 'string',
          example: "ARIDO"
        },
        terreno: {
          type: 'string',
          example: "DESERTO"
        },
        nome: {
          type: 'string',
          example: "teste"
        },
        populacao: {
          type: 'number',
          example: 100
        },
        sistemaEstelarId:{
          type: 'number',
          example: 1
        }
      },
      required: [ 'clima', 'terreno', 'nome', 'populacao', 'sistemaEstelarId'],
    },
  })
  create(@Body() createPlanetDto: CreatePlanetType) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  findAll() {
    return this.planetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        clima: {
          type: 'string',
          example: "TEMPERADO"
        },
        terreno: {
          type: 'string',
          example: "PLANICIE"
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetType) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planetsService.remove(+id);
  }
}
