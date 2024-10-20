import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { PrismaService } from '../prisma.service';
import { CreateCharacterType } from './dto/create-character.dto';
import { UpdateCharacterType } from './dto/update-character.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('CharactersService', () => {
  let service: CharactersService;
  let prisma: PrismaService;

  const savedCharacter : any  = {
    id: 1,
    nome: 'Luke Skywalker',
    raca: 'Humano',
    afiliacao: 'JEDI',
    planetaId: 1,
  };

  const createCharacterDto: CreateCharacterType = {
    nome: 'Luke Skywalker',
    raca: 'Humano',
    afiliacao: 'JEDI',
    planetaId: 1,
  };

  const updateCharacterDto: UpdateCharacterType = {
    nome: 'Leia Organa',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: PrismaService,
          useValue: {
            personagens: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a character', async () => {
      jest.spyOn(prisma.personagens, 'create').mockResolvedValue(savedCharacter);

      const result = await service.create(createCharacterDto);

      expect(prisma.personagens.create).toHaveBeenCalledWith({
        data: {
          nome: createCharacterDto.nome,
          raca: createCharacterDto.raca,
          afiliacao: createCharacterDto.afiliacao,
          planeta: {
            connect: { id: createCharacterDto.planetaId },
          },
        },
      });
      expect(result).toEqual(savedCharacter);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.personagens, 'create').mockRejectedValue(new InternalServerErrorException('Error creating character'));

      await expect(service.create(createCharacterDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return all characters', async () => {
      jest.spyOn(prisma.personagens, 'findMany').mockResolvedValue([savedCharacter]);

      const result = await service.findAll();

      expect(prisma.personagens.findMany).toHaveBeenCalled();
      expect(result).toEqual([savedCharacter]);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.personagens, 'findMany').mockRejectedValue(new InternalServerErrorException('Error finding characters'));

      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    it('should return a character by id', async () => {
      jest.spyOn(prisma.personagens, 'findUnique').mockResolvedValue(savedCharacter);

      const result = await service.findOne(savedCharacter.id);

      expect(prisma.personagens.findUnique).toHaveBeenCalledWith({
        select:{
          afiliacao: true,
          id: true,
          nome: true,
          planeta: {
            select:{
              id: true,
              nome: true
            }
          },
          planetaId: false,
          raca: true
        },
        where: { id: savedCharacter.id },
      });
      expect(result).toEqual(savedCharacter);
    });

    it('should throw a NotFoundException if character not found', async () => {
      jest.spyOn(prisma.personagens, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(savedCharacter.id)).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.personagens, 'findUnique').mockRejectedValue(new InternalServerErrorException('Error finding character'));

      await expect(service.findOne(savedCharacter.id)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('should update a character', async () => {
      jest.spyOn(prisma.personagens, 'update').mockResolvedValue({ ...savedCharacter, ...updateCharacterDto });

      const result = await service.update(savedCharacter.id, updateCharacterDto);

      expect(prisma.personagens.update).toHaveBeenCalledWith({
        where: { id: savedCharacter.id },
        data: updateCharacterDto,
      });
      expect(result.nome).toEqual(updateCharacterDto.nome);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.personagens, 'update').mockRejectedValue(new InternalServerErrorException('Error updating character'));

      await expect(service.update(savedCharacter.id, updateCharacterDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('should remove a character', async () => {
      jest.spyOn(prisma.personagens, 'delete').mockResolvedValue(savedCharacter);

      const result = await service.remove(savedCharacter.id);

      expect(prisma.personagens.delete).toHaveBeenCalledWith({
        where: { id: savedCharacter.id },
      });
      expect(result).toEqual(savedCharacter);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.personagens, 'delete').mockRejectedValue(new InternalServerErrorException('Error deleting character'));

      await expect(service.remove(savedCharacter.id)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
