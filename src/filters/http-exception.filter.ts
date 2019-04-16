import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from '../middlewares/logger.middleware';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new MyLogger(this.errorContext, true);

  constructor(private errorContext: string) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const resBody = {
      statusCode: status,
      error: message,
      timestamp: `(${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()})`,
      path: request.url,
    };

    // tslint:disable-next-line: no-console
    this.logger.error(`(ERROR ${resBody.statusCode}) ${resBody.error} - ${resBody.timestamp}`);

    response.status(status).json(resBody);
  }
}
