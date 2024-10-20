import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarSystemsService } from './star-systems.service';
import { CreateStarSystemType } from './dto/create-star-system.dto'; 
import { UpdateStarSystemType } from './dto/update-star-system.dto'; 
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('star-systems')
@Controller('star-systems')
export class StarSystemsController {
  constructor(private readonly starSystemsService: StarSystemsService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string',
          example: "testeNome"
        },
        descricao: {
          type: 'string',
          example: "testeDescricao"
        },
      },
      required: [ 'nome', 'descricao' ],
    },
  })
  @ApiBearerAuth()
  create(@Body() createStarSystemDto: CreateStarSystemType) {
    return this.starSystemsService.create(createStarSystemDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.starSystemsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.starSystemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        descricao: {
          type: 'string',
          example: "novaDescricao"
        },
      }
    },
  })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateStarSystemDto: UpdateStarSystemType) {
    return this.starSystemsService.update(+id, updateStarSystemDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starSystemsService.remove(+id);
  }
}
