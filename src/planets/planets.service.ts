import { Injectable } from '@nestjs/common';
import { CreatePlanetType } from './dto/create-planet.dto';

import { PrismaService } from 'src/prisma.service'; 
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
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
   
  }

  findAll() {
    try {
      return this.prisma.planetas.findMany()
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
   
  }

  findOne(id: number) {
    try {
      return this.prisma.planetas.findUnique({where: {
        id
      }})
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
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
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
   
  }

  remove(id: number) {
    try {
      return this.prisma.planetas.delete({where: {id}})
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
    
  }
} 
