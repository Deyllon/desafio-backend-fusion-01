import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
  
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const field = exception.meta.target

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).send({
          statusCode: status,
          message: `ja existe esse ${field} na base de dados porfavor utilize um novo` ,
        });
        break;
      }
      default:
        
        super.catch(exception, host);
        break;
    }
  }
}