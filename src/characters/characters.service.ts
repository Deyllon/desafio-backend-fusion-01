import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterType } from './dto/create-character.dto';
import { UpdateCharacterType } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class CharactersService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  create(createCharacterDto: CreateCharacterType) {
    try {
      return this.prisma.personagens.create({
        data:{
          nome: createCharacterDto.nome,
          afiliacao: createCharacterDto.afiliacao,
          raca: createCharacterDto.raca,
          planeta:{
            connect: {id: createCharacterDto.planetaId}
          }
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
      return this.prisma.personagens.findMany({
        select:{
          id: true,
          nome: true,
          raca: true,
          afiliacao: true,
          planetaId: false,
          planeta:{
            select:{
              id: true,
              nome: true
            }
          }
        }
      })
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(error)
    }
  }

  async findOne(id: number) {
    try {
      const character = await this.prisma.personagens.findUnique({
        select:{
          id: true,
          nome: true,
          raca: true,
          afiliacao: true,
          planetaId: false,
          planeta:{
            select:{
              id: true,
              nome: true
            }
          }
        },
        where:{
          id
        }
      })

      if(!character){
        throw new NotFoundException("personagem não encontrado")
      }

      return character
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw error
      }
      throw new Error(error)
    }
  }

  update(id: number, updateCharacterDto: UpdateCharacterType) {
    try {
      return this.prisma.personagens.update({
        where:{
          id
        },
        data: updateCharacterDto
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
      return this.prisma.usuarios.delete({
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
