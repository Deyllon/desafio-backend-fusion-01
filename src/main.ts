import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
 
  const config = new DocumentBuilder()
    .setTitle('Star Wars Api')
    .setDescription('Star Wars api for frontend fusion')
    .setVersion('1.0')
    .addTag('planets')
    .addTag('characters')
    .addTag('spaceships')
    .addTag('star-systems')
    .addTag('users')
    .addBearerAuth()
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
