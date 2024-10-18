import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateSpacheshipType } from './dto/create-spacheship.dto';
import { UpdateSpacheshipType } from './dto/update-spacheship.dto';

@Injectable()
export class SpacheshipsService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  create(createSpacheshipDto: CreateSpacheshipType) {
    try {
      return this.prisma.navesEspaciais.create({
        data:{
          nome: createSpacheshipDto.nome,
          capacidade: createSpacheshipDto.capacidade,
          fabricante: createSpacheshipDto.fabricante,
          modelo: createSpacheshipDto.modelo
        }
      })
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
  }

  findAll() {
    try {
      return this.prisma.navesEspaciais.findMany()
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
  }

  async findOne(id: number) {
    try {
       const spaceShip = await this.prisma.navesEspaciais.findUnique({
        where:{
          id
        }
      })

      if(!spaceShip){
        throw new NotFoundException("Nave espacial não encontrada")
      }

      return spaceShip
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw error
      }
      throw new Error(error)
    }
  }

  update(id: number, updateSpacheshipDto: UpdateSpacheshipType) {
    try {
      return this.prisma.navesEspaciais.update({
        where:{
          id
        },
        data: updateSpacheshipDto
      })
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
  }

  remove(id: number) {
    try {
      return this.prisma.navesEspaciais.delete({
        where:{
          id
        }
      })
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
  }
}
