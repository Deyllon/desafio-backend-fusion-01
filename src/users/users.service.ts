import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserType } from './dto/create-user.dto';
import { UpdateUserType } from './dto/update-user.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UsersService {
  constructor(
    private readonly bcrypt : BcryptService,
    private readonly prisma: PrismaService
  ){}
  
  async create(createUserDto: CreateUserType) {
    try {
      const {senha} = createUserDto
      const hashedPassword = await this.bcrypt.hashPassword(senha)

      return this.prisma.usuarios.create({
        data:{
          
          email: createUserDto.email,
          afiliacao: createUserDto.afiliacao,
          senha: hashedPassword
        }
      })
    } catch (error) {
      if(error instanceof Error) {
        throw new InternalServerErrorException(error.message)
      }
      throw new Error(error)
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserType) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
