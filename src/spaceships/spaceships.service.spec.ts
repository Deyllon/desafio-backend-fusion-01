import { Test, TestingModule } from '@nestjs/testing';
import { SpaceshipsService } from './spaceships.service';
import { PrismaService } from '../prisma.service';
import { CreateSpaceshipType } from './dto/create-spaceship.dto';
import { UpdateSpaceshipType } from './dto/update-spaceship.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('SpaceshipsService', () => {
  let service: SpaceshipsService;
  let prisma: PrismaService;

  const savedSpacheship: any = {
    id: 1,
    nome: 'Millennium Falcon',
    capacidade: 100,
    fabricante: 'Corellian Engineering Corporation',
    modelo: 'YT-1300',
  };

  const createSpacheshipDto: CreateSpaceshipType = {
    nome: 'Millennium Falcon',
    capacidade: 100,
    fabricante: 'Corellian Engineering Corporation',
    modelo: 'YT-1300',
  };

  const updateSpacheshipDto: UpdateSpaceshipType = {
    nome: 'X-Wing',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpaceshipsService,
        {
          provide: PrismaService,
          useValue: {
            navesEspaciais: {
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

    service = module.get<SpaceshipsService>(SpaceshipsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a spaceship', async () => {
      jest.spyOn(prisma.navesEspaciais, 'create').mockResolvedValue(savedSpacheship);

      const result = await service.create(createSpacheshipDto);

      expect(prisma.navesEspaciais.create).toHaveBeenCalledWith({
        data: {
          nome: createSpacheshipDto.nome,
          capacidade: createSpacheshipDto.capacidade,
          fabricante: createSpacheshipDto.fabricante,
          modelo: createSpacheshipDto.modelo,
        },
      });
      expect(result).toEqual(savedSpacheship);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.navesEspaciais, 'create').mockRejectedValue(new InternalServerErrorException('Error creating spaceship'));

      await expect(service.create(createSpacheshipDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return all spaceships', async () => {
      jest.spyOn(prisma.navesEspaciais, 'findMany').mockResolvedValue([savedSpacheship]);

      const result = await service.findAll();

      expect(prisma.navesEspaciais.findMany).toHaveBeenCalled();
      expect(result).toEqual([savedSpacheship]);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.navesEspaciais, 'findMany').mockRejectedValue(new InternalServerErrorException('Error finding spaceships'));

      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    it('should return a spaceship by id', async () => {
      jest.spyOn(prisma.navesEspaciais, 'findUnique').mockResolvedValue(savedSpacheship);

      const result = await service.findOne(savedSpacheship.id);

      expect(prisma.navesEspaciais.findUnique).toHaveBeenCalledWith({
        where: { id: savedSpacheship.id },
      });
      expect(result).toEqual(savedSpacheship);
    });

    it('should throw a NotFoundException if spaceship not found', async () => {
      jest.spyOn(prisma.navesEspaciais, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(savedSpacheship.id)).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.navesEspaciais, 'findUnique').mockRejectedValue(new InternalServerErrorException('Error finding spaceship'));

      await expect(service.findOne(savedSpacheship.id)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('should update a spaceship', async () => {
      jest.spyOn(prisma.navesEspaciais, 'update').mockResolvedValue({ ...savedSpacheship, ...updateSpacheshipDto });

      const result = await service.update(savedSpacheship.id, updateSpacheshipDto);

      expect(prisma.navesEspaciais.update).toHaveBeenCalledWith({
        where: { id: savedSpacheship.id },
        data: updateSpacheshipDto,
      });
      expect(result.nome).toEqual(updateSpacheshipDto.nome);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.navesEspaciais, 'update').mockRejectedValue(new InternalServerErrorException('Error updating spaceship'));

      await expect(service.update(savedSpacheship.id, updateSpacheshipDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('should remove a spaceship', async () => {
      jest.spyOn(prisma.navesEspaciais, 'delete').mockResolvedValue(savedSpacheship);

      const result = await service.remove(savedSpacheship.id);

      expect(prisma.navesEspaciais.delete).toHaveBeenCalledWith({
        where: { id: savedSpacheship.id },
      });
      expect(result).toEqual(savedSpacheship);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.navesEspaciais, 'delete').mockRejectedValue(new InternalServerErrorException('Error deleting spaceship'));

      await expect(service.remove(savedSpacheship.id)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
