import { Injectable } from '@nestjs/common';
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error);
      }
    }
   
  }

  findAll() {
    try {
      return this.prisma.sistemasEstelares.findMany()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error);
      }
    }
    
  }

  findOne(id: number) {
    try {
      return this.prisma.sistemasEstelares.findUnique({where: {
        id
      }})
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error);
      }
    }
    
  }

  update(id: number, updateStarSystemDto: UpdateStarSystemType) {
    try {
      return this.prisma.sistemasEstelares.update({
        data: updateStarSystemDto,
        where: {
          id
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error);
      }
    }
    
  }

  remove(id: number) {
    try {
      return this.prisma.sistemasEstelares.delete({where:{
        id
      }})
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error);
      }
    }
    
  }
}
