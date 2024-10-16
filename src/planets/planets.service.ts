import { Injectable } from '@nestjs/common';
import { CreatePlanetType } from './dto/create-planet.dto';

import { PrismaService } from 'src/prisma.service'; 
import { UpdatePlanetType } from './dto/update-planet.dto';

@Injectable()
export class PlanetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPlanetDto: CreatePlanetType) {
    return this.prisma.planetas.create({data: {
      nome: createPlanetDto.nome,
      clima: createPlanetDto.clima,
      terreno: createPlanetDto.terreno,
      populacao: createPlanetDto.populacao,
      sistemaEstelar: {
        connect: {id: createPlanetDto.sistemaEstelarId}
      }
    }})
  }

  findAll() {
    return this.prisma.planetas.findMany()
  }

  findOne(id: number) {
    return this.prisma.planetas.findUnique({where: {
      id
    }})
  }

  update(id: number, updatePlanetDto: UpdatePlanetType) {
    return this.prisma.planetas.update({
      data: updatePlanetDto,
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return this.prisma.planetas.delete({where: {id}})
  }
} 
