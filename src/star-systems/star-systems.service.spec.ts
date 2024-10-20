import { Test, TestingModule } from '@nestjs/testing';
import { StarSystemsService } from './star-systems.service';
import { PrismaService } from '../prisma.service';
import { CreateStarSystemType } from './dto/create-star-system.dto';
import { UpdateStarSystemType } from './dto/update-star-system.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('StarSystemsService', () => {
  let service: StarSystemsService;
  let prisma: PrismaService;

  const savedStarSystem: any = {
    id: 1,
    nome: 'Sistema Solar',
    descricao: 'Sistema que contém a Terra',
  };

  const createStarSystemDto: CreateStarSystemType = {
    nome: 'Sistema Solar',
    descricao: 'Sistema que contém a Terra',
  };

  const updateStarSystemDto: UpdateStarSystemType = {
    nome: 'Sistema Alpha',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarSystemsService,
        {
          provide: PrismaService,
          useValue: {
            sistemasEstelares: {
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

    service = module.get<StarSystemsService>(StarSystemsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a star system', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'create').mockResolvedValue(savedStarSystem);

      const result = await service.create(createStarSystemDto);

      expect(prisma.sistemasEstelares.create).toHaveBeenCalledWith({
        data: {
          nome: createStarSystemDto.nome,
          descricao: createStarSystemDto.descricao,
        },
      });
      expect(result).toEqual(savedStarSystem);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'create').mockRejectedValue(new InternalServerErrorException('Error creating star system'));

      await expect(service.create(createStarSystemDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return all star systems', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'findMany').mockResolvedValue([savedStarSystem]);

      const result = await service.findAll();

      expect(prisma.sistemasEstelares.findMany).toHaveBeenCalled();
      expect(result).toEqual([savedStarSystem]);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'findMany').mockRejectedValue(new InternalServerErrorException('Error finding star systems'));

      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    it('should return a star system by id', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'findUnique').mockResolvedValue(savedStarSystem);

      const result = await service.findOne(savedStarSystem.id);

      expect(prisma.sistemasEstelares.findUnique).toHaveBeenCalledWith({
        where: { id: savedStarSystem.id },
      });
      expect(result).toEqual(savedStarSystem);
    });

    it('should throw a NotFoundException if star system not found', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(savedStarSystem.id)).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'findUnique').mockRejectedValue(new InternalServerErrorException('Error finding star system'));

      await expect(service.findOne(savedStarSystem.id)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('should update a star system', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'update').mockResolvedValue({ ...savedStarSystem, ...updateStarSystemDto });

      const result = await service.update(savedStarSystem.id, updateStarSystemDto);

      expect(prisma.sistemasEstelares.update).toHaveBeenCalledWith({
        where: { id: savedStarSystem.id },
        data: updateStarSystemDto,
      });
      expect(result.nome).toEqual(updateStarSystemDto.nome);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'update').mockRejectedValue(new InternalServerErrorException('Error updating star system'));

      await expect(service.update(savedStarSystem.id, updateStarSystemDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('should remove a star system', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'delete').mockResolvedValue(savedStarSystem);

      const result = await service.remove(savedStarSystem.id);

      expect(prisma.sistemasEstelares.delete).toHaveBeenCalledWith({
        where: { id: savedStarSystem.id },
      });
      expect(result).toEqual(savedStarSystem);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.sistemasEstelares, 'delete').mockRejectedValue(new InternalServerErrorException('Error deleting star system'));

      await expect(service.remove(savedStarSystem.id)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
