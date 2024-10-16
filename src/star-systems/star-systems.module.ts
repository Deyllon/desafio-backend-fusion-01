import { Module } from '@nestjs/common';
import { StarSystemsService } from './star-systems.service';
import { StarSystemsController } from './star-systems.controller';
import { PrismaService } from 'src/prisma.service';


@Module({
  controllers: [StarSystemsController],
  providers: [StarSystemsService, PrismaService]
})
export class StarSystemsModule {}
