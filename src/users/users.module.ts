import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, BcryptService],
})
export class UsersModule {}
