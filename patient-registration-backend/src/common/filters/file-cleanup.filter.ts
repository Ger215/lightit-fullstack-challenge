import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { unlinkSync } from 'fs';

@Catch(HttpException)
export class FileCleanupFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: any = ctx.getRequest();

    if (request.file?.path) {
      try {
        unlinkSync(request.file.path);
      } catch (err) {
        console.error('Error deleting file on validation failure:', err);
      }
    }

    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    response.status(status).json(errorResponse);
  }
}
