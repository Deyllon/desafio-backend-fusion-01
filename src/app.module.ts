import { Module } from '@nestjs/common';
import { PlanetsModule } from './planets/planets.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { StarSystemsModule } from './star-systems/star-systems.module';
import { UsersModule } from './users/users.module';
import { BcryptService } from './bcrypt/bcrypt.service';

@Module({
  imports: [PlanetsModule, StarSystemsModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    },
    BcryptService
  ],
})
export class AppModule {}
