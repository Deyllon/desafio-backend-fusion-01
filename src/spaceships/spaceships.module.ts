import { Module } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { SpaceshipsController } from './spaceships.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SpaceshipsController],
  providers: [SpaceshipsService, PrismaService],
})
export class SpaceshipsModule {}
