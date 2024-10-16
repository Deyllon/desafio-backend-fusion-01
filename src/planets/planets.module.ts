import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService, PrismaService]
})
export class PlanetsModule {}
