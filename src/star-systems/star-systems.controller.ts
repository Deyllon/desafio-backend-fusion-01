import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarSystemsService } from './star-systems.service';
import { CreateStarSystemType } from './dto/create-star-system.dto'; 
import { UpdateStarSystemType } from './dto/update-star-system.dto'; 

@Controller('star-systems')
export class StarSystemsController {
  constructor(private readonly starSystemsService: StarSystemsService) {}

  @Post()
  create(@Body() createStarSystemDto: CreateStarSystemType) {
    return this.starSystemsService.create(createStarSystemDto);
  }

  @Get()
  findAll() {
    return this.starSystemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starSystemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStarSystemDto: UpdateStarSystemType) {
    return this.starSystemsService.update(+id, updateStarSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starSystemsService.remove(+id);
  }
}
