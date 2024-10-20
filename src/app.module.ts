import { Module } from '@nestjs/common';
import { PlanetsModule } from './planets/planets.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { StarSystemsModule } from './star-systems/star-systems.module';
import { UsersModule } from './users/users.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { CharactersModule } from './characters/characters.module';
import { SpaceshipsModule } from './spaceships/spaceships.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [PlanetsModule, StarSystemsModule, UsersModule, CharactersModule, SpaceshipsModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    BcryptService
  ],
})
export class AppModule {}
