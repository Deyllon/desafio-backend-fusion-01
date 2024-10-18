import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpacheshipsService } from './spacheships.service';
import { CreateSpacheshipType } from './dto/create-spacheship.dto';
import { UpdateSpacheshipType } from './dto/update-spacheship.dto';


@Controller('spacheships')
export class SpacheshipsController {
  constructor(private readonly spacheshipsService: SpacheshipsService) {}

  @Post()
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
  update(@Param('id') id: string, @Body() updateSpacheshipDto: UpdateSpacheshipType) {
    return this.spacheshipsService.update(+id, updateSpacheshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spacheshipsService.remove(+id);
  }
}
