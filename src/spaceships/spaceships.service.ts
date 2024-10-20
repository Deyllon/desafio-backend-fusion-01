import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateSpaceshipType } from './dto/create-spaceship.dto';
import { UpdateSpaceshipType } from './dto/update-spaceship.dto';

@Injectable()
export class SpaceshipsService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  create(createSpacheshipDto: CreateSpaceshipType) {
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
      if(error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message)
      }
      throw new Error(error)
    }
  }

  findAll() {
    try {
      return this.prisma.navesEspaciais.findMany()
    } catch (error) {
      if(error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message)
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
      throw new InternalServerErrorException(error)
    }
  }

  update(id: number, updateSpacheshipDto: UpdateSpaceshipType) {
    try {
      return this.prisma.navesEspaciais.update({
        where:{
          id
        },
        data: updateSpacheshipDto
      })
    } catch (error) {
      if(error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message)
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
      if(error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message)
      }
      throw new Error(error)
    }
  }
}
