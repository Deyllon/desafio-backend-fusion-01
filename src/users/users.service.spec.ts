import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { CreateUserType } from './dto/create-user.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let jwtServiceMock: JwtService;
  let prisma: PrismaService
  let bcrypt : BcryptService

  const savedUser: any = {
    id: 1,
    email: 'cardoso@gmail.com',
    afiliacao: 'JEDI',
    senha: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue :{
            usuarios: {
              create : jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
              update: jest.fn()
            }
          }
        },
        {
          provide: BcryptService,
          useValue : {
            hashPassword: jest.fn(),
            comparePassword: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jwtServiceMock = module.get(JwtService);
    prisma = module.get<PrismaService>(PrismaService)
    bcrypt = module.get<BcryptService>(BcryptService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createUser = {
      email: 'cardoso@gmail.com',
      afiliacao: 'JEDI', 
      senha: 'senha',
    } as CreateUserType;

    it('should create user', async () => {
      const hashedPassword = 'hashedPassword';

      jest
        .spyOn(bcrypt, 'hashPassword')
        .mockResolvedValue(hashedPassword)
      jest
        .spyOn(prisma.usuarios, 'create')
        .mockResolvedValue(savedUser)

      const result = await service.create(createUser);

      expect(bcrypt.hashPassword).toHaveBeenCalledWith(createUser.senha);

      expect(prisma.usuarios.create).toHaveBeenCalledWith({
        data: {
          email: createUser.email,
          afiliacao: createUser.afiliacao,
          senha: hashedPassword,
        },
      });

      expect(result).toEqual(savedUser);
    })

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.usuarios, 'create').mockRejectedValue(new InternalServerErrorException('Error creating user'));
      await expect(service.create(createUser)).rejects.toThrow(InternalServerErrorException);
    });
  })

  describe('update', () => {
    const updateUser = {
      ...savedUser,
      email: 'novoemail@gmail.com',
    };
    const newUser = {
      email: 'novoemail@gmail.com',
    };
    it('should update user', async () => {
      jest.spyOn(prisma.usuarios, 'update').mockResolvedValue(updateUser);
      const result = await service.update(savedUser.id, newUser);

      expect(prisma.usuarios.update).toHaveBeenCalledWith(
        {
          where: { id: savedUser.id },
          data: newUser,
        }
      );

      expect(result.email).toEqual(newUser.email);
    });

    it('should throw internal error', async () => {
      jest
        .spyOn(prisma.usuarios, 'update')
        .mockRejectedValue(new InternalServerErrorException('Update failed'));
      await expect(service.update(savedUser.id, updateUser)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
  
  describe('findAll',  () => {
    it('should findAll user', async () => {
      jest.spyOn(prisma.usuarios, 'findMany').mockResolvedValue([savedUser]);
      const result = await service.findAll();

      expect(prisma.usuarios.findMany).toHaveBeenCalled()

      expect(result).toEqual([savedUser]);
    });

    it('should throw internal error', async () => {
      jest
        .spyOn(prisma.usuarios, 'findMany')
        .mockRejectedValue(new InternalServerErrorException('Find all failed'));
      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  })

  describe('findOne',  () => {
    it('should findOne user', async () => {
      jest.spyOn(prisma.usuarios, 'findUnique').mockResolvedValue(savedUser);
      const result = await service.findOne(savedUser.id);

      expect(prisma.usuarios.findUnique).toHaveBeenCalled()

      expect(result).toEqual(savedUser);
    });

    it('should throw internal error', async () => {
      jest
        .spyOn(prisma.usuarios, 'findUnique')
        .mockRejectedValue(new InternalServerErrorException('Find one failed'));
      await expect(service.findOne(savedUser.id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  })

  describe('remove',  () => {
    it('should remove user', async () => {
      jest.spyOn(prisma.usuarios, 'delete').mockResolvedValue(savedUser);
      const result = await service.remove(savedUser.id);

      expect(prisma.usuarios.delete).toHaveBeenCalledWith({
        where: { id: savedUser.id }
      })

      expect(result).toEqual(savedUser);
    });

    it('should throw internal error', async () => {
      jest
        .spyOn(prisma.usuarios, 'delete')
        .mockRejectedValue(new InternalServerErrorException('Delete failed'));
      await expect(service.remove(savedUser.id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  })


  describe('login',  () => {
    const token = 'mockToken';
    it('should login user', async () => {
      
      jest.spyOn(prisma.usuarios, 'findUnique').mockResolvedValue(savedUser);
      

      jest.spyOn(bcrypt, 'comparePassword').mockReturnValue(Promise.resolve(true))

      jest.spyOn(jwtServiceMock, 'signAsync').mockReturnValue(Promise.resolve(token))

      const result = await service.login({email: savedUser.email, senha: savedUser.senha });

      expect(prisma.usuarios.findUnique).toHaveBeenCalledWith({
        where: { email: savedUser.email }
      })

      expect(bcrypt.comparePassword).toHaveBeenCalledWith(savedUser.senha, savedUser.senha)

      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({sub: savedUser.id, username: savedUser.email})

      expect(result).toEqual({ access_token: token });
    });

    it('should throw internal error', async () => {
      jest
        .spyOn(prisma.usuarios, 'findUnique')
        .mockRejectedValue(new InternalServerErrorException('Find unique failed'));
      await expect(service.login({email: savedUser.email, senha: savedUser.senha })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
    
  })
});


