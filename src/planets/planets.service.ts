import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlanetType } from './dto/create-planet.dto';

import { PrismaService } from '../prisma.service'; 
import { UpdatePlanetType } from './dto/update-planet.dto';

@Injectable()
export class PlanetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPlanetDto: CreatePlanetType) {
    try {
      return this.prisma.planetas.create({data: {
        nome: createPlanetDto.nome,
        clima: createPlanetDto.clima,
        terreno: createPlanetDto.terreno,
        populacao: createPlanetDto.populacao,
        sistemaEstelar: {
          connect: {id: createPlanetDto.sistemaEstelarId}
        }
      }})
    } catch (error) {
      if(error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message)
      }
      throw new Error(error)
    }
   
  }

  findAll() {
    try {
      return this.prisma.planetas.findMany({
        select:{
          id: true,
          nome: true,
          sistemaEstelarId: false,
          sistemaEstelar: {
            select:{
              id: true,
              nome: true
            }
          },
          clima: true,
          terreno: true,
          populacao: true
        }
      })
    } catch (error) {
      if(error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message)
      }
      throw new Error(error)
    }
   
  }

  async findOne(id: number) {
    try {
      const planets = await this.prisma.planetas.findUnique({
        select:{
          id: true,
          nome: true,
          sistemaEstelarId: false,
          sistemaEstelar: {
            select:{
              id: true,
              nome: true
            }
          },
          clima: true,
          terreno: true,
          populacao: true
        },
        where: {
          id
        }
      })

      if(!planets){
        throw new NotFoundException("planeta não encontrado")
      }

      return planets
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException(error)
    }
    
  }

  update(id: number, updatePlanetDto: UpdatePlanetType) {
    try {
      return this.prisma.planetas.update({
        data: updatePlanetDto,
        where: {
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

  remove(id: number) {
    try {
      return this.prisma.planetas.delete({where: {id}})
    } catch (error) {
      if(error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message)
      }
      throw new Error(error)
    }
    
  }
} 
