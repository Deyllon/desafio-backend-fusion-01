import { Module } from '@nestjs/common';
import { SpacheshipsService } from './spacheships.service';
import { SpacheshipsController } from './spacheships.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SpacheshipsController],
  providers: [SpacheshipsService, PrismaService],
})
export class SpacheshipsModule {}
