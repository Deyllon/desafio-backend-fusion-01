import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { PrismaService } from '../prisma.service';
import { CreatePlanetType } from './dto/create-planet.dto';
import { UpdatePlanetType } from './dto/update-planet.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let prisma: PrismaService;

  const savedPlanet: any = {
    id: 1,
    nome: 'Tatooine',
    clima: 'Arido',
    terreno: 'Deserto',
    populacao: 200000,
    sistemaEstelarId: 1,
  };

  const createPlanetDto: CreatePlanetType = {
    nome: 'Tatooine',
    clima: 'ARIDO',
    terreno: 'DESERTO',
    populacao: 200000,
    sistemaEstelarId: 1,
  };

  const updatePlanetDto: UpdatePlanetType = {
    nome: 'Alderaan',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: PrismaService,
          useValue: {
            planetas: {
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

    service = module.get<PlanetsService>(PlanetsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a planet', async () => {
      jest.spyOn(prisma.planetas, 'create').mockResolvedValue(savedPlanet);

      const result = await service.create(createPlanetDto);

      expect(prisma.planetas.create).toHaveBeenCalledWith({
        data: {
          nome: createPlanetDto.nome,
          clima: createPlanetDto.clima,
          terreno: createPlanetDto.terreno,
          populacao: createPlanetDto.populacao,
          sistemaEstelar: {
            connect: { id: createPlanetDto.sistemaEstelarId },
          },
        },
      });
      expect(result).toEqual(savedPlanet);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.planetas, 'create').mockRejectedValue(new InternalServerErrorException('Error creating planet'));

      await expect(service.create(createPlanetDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return all planets', async () => {
      jest.spyOn(prisma.planetas, 'findMany').mockResolvedValue([savedPlanet]);

      const result = await service.findAll();

      expect(prisma.planetas.findMany).toHaveBeenCalled();
      expect(result).toEqual([savedPlanet]);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.planetas, 'findMany').mockRejectedValue(new InternalServerErrorException('Error finding planets'));

      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    it('should return a planet by id', async () => {
      jest.spyOn(prisma.planetas, 'findUnique').mockResolvedValue(savedPlanet);

      const result = await service.findOne(savedPlanet.id);

      expect(prisma.planetas.findUnique).toHaveBeenCalledWith({
        select: {
          clima: true,
          id: true,
          nome: true,
          sistemaEstelarId: false,
          sistemaEstelar: {
            select: {
              id: true,
              nome: true,
            },
          },
          terreno: true,
          populacao: true,
        },
        where: { id: savedPlanet.id },
      });
      expect(result).toEqual(savedPlanet);
    });

    it('should throw a NotFoundException if planet not found', async () => {
      jest.spyOn(prisma.planetas, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(savedPlanet.id)).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.planetas, 'findUnique').mockRejectedValue(new InternalServerErrorException('Error finding planet'));

      await expect(service.findOne(savedPlanet.id)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('should update a planet', async () => {
      jest.spyOn(prisma.planetas, 'update').mockResolvedValue({ ...savedPlanet, ...updatePlanetDto });

      const result = await service.update(savedPlanet.id, updatePlanetDto);

      expect(prisma.planetas.update).toHaveBeenCalledWith({
        where: { id: savedPlanet.id },
        data: updatePlanetDto,
      });
      expect(result.nome).toEqual(updatePlanetDto.nome);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.planetas, 'update').mockRejectedValue(new InternalServerErrorException('Error updating planet'));

      await expect(service.update(savedPlanet.id, updatePlanetDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('should remove a planet', async () => {
      jest.spyOn(prisma.planetas, 'delete').mockResolvedValue(savedPlanet);

      const result = await service.remove(savedPlanet.id);

      expect(prisma.planetas.delete).toHaveBeenCalledWith({
        where: { id: savedPlanet.id },
      });
      expect(result).toEqual(savedPlanet);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.planetas, 'delete').mockRejectedValue(new InternalServerErrorException('Error deleting planet'));

      await expect(service.remove(savedPlanet.id)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
