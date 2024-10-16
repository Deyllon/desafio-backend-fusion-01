import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStarSystemType } from './dto/create-star-system.dto'; 
import { UpdateStarSystemType } from './dto/update-star-system.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class StarSystemsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createStarSystemDto: CreateStarSystemType) {
    try {
      return this.prisma.sistemasEstelares.create({
        data:{
          nome: createStarSystemDto.nome,
          descricao: createStarSystemDto.descricao
        }
      })
    } catch (error : unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
   
  }

  findAll() {
    return this.prisma.sistemasEstelares.findMany()
  }

  findOne(id: number) {
    return this.prisma.sistemasEstelares.findUnique({where: {
      id
    }})
  }

  update(id: number, updateStarSystemDto: UpdateStarSystemType) {
    return this.prisma.sistemasEstelares.update({
      data: updateStarSystemDto,
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return this.prisma.sistemasEstelares.delete({where:{
      id
    }})
  }
}
