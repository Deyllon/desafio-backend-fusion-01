import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserType } from './dto/create-user.dto';
import { UpdateUserType } from './dto/update-user.dto';
import { LoginType } from './dto/login.dto';
import { Public } from 'src/decorator/public.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';



@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        afiliacao: {
          type: 'string',
          example: "JEDI"
        },
        email: {
          type: 'string',
          format: 'email',
          example: "teste@gmail.com"
        },
        senha: {
          type: 'string',
          minLength: 8,
          example: "@Depoisdeamanha27"
        },
      },
      required: ['afiliacao', 'email', 'senha'],
    },
  })
  create(@Body() createUserDto: CreateUserType) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: "teste23@gmail.com"
        }
      }
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserType) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Public()
  @Post('/login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: "teste@gmail.com"
        },
        senha:{
          type: 'string',
          minLength: 8,
          example: "@Depoisdeamanha27"
        }
      },
      required: [ 'email', 'senha'],
    },
  })
  login(@Body() loginDto: LoginType){
    return this.usersService.login(loginDto)
  }
}
