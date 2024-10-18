import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserType } from './dto/create-user.dto';
import { UpdateUserType } from './dto/update-user.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { PrismaService } from 'src/prisma.service';
import { LoginType } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(
    private readonly bcrypt : BcryptService,
    private readonly prisma: PrismaService,
    private readonly jwtService : JwtService
  ){}
  
  async create(createUserDto: CreateUserType) {
    try {
      const {senha} = createUserDto
      const hashedPassword = await this.bcrypt.hashPassword(senha)

      return this.prisma.usuarios.create({
        data:{
          
          email: createUserDto.email,
          afiliacao: createUserDto.afiliacao,
          senha: hashedPassword
        }
      })
    } catch (error) {
      if(error instanceof Error) {
        throw new InternalServerErrorException(error.message)
      }
      throw new Error(error)
    }
  }

  findAll() {
    try {
      return this.prisma.usuarios.findMany({
        select:{
          id: true,
          afiliacao: true,
          email: true,
          senha: false
        }
      })
    } catch (error) {
      if(error instanceof Error) {
        throw new InternalServerErrorException(error.message)
      }
      throw new Error(error)
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.usuarios.findUnique({
        where:{
          id
        },
        select:{
          id: true,
          afiliacao: true,
          email: true,
          senha: false
        }
      })
      if(!user){
        throw new NotFoundException("usuario não encontrado")
      }

      return user
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw error
      }
      throw new Error(error)
    }
  }

  async update(id: number, updateUserDto: UpdateUserType) {
    try {
      const {senha, ...rest} = updateUserDto
      
      if(senha){
        const hashedPassword = await this.bcrypt.hashPassword(senha)
        return this.prisma.usuarios.update({
          where:{
            id
          },
          data: {
            senha: hashedPassword,
            ...rest
          }
        })
      }
      return this.prisma.usuarios.update({
        where:{
          id
        },
        data: updateUserDto
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

  async login(loginDto: LoginType){
    try {
      const user = await this.prisma.usuarios.findUnique(
        {
          where:{
            email: loginDto.email
          }
        })
      
      if(!user){
        throw new UnauthorizedException("email incorreto")
      }
      const passwordIsCorrect =  await this.bcrypt.comparePassword(loginDto.senha, user.senha)
  
      if(!passwordIsCorrect){
        throw new UnauthorizedException("senha incorreta")
      }

      const payload = { sub: user.id, username: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro inesperado no login');
    }
    
    
  }
}
