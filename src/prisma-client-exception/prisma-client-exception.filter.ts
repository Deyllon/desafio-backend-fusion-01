import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
  
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const field = exception.meta.target

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).send({
          statusCode: status,
          message: `Ja existe esse ${field} na base de dados porfavor utilize um novo` ,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).send({
          statusCode: status,
          message: `Id não encontrado` ,
        });
        break;
      }
      default:
        
        super.catch(exception, host);
        break;
    }
  }
}