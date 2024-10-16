import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetType } from './dto/create-planet.dto';
import { UpdatePlanetType } from './dto/update-planet.dto';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
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
  update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetType) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planetsService.remove(+id);
  }
}
