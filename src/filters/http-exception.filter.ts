
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const resBody = {
      statusCode: status,
      timestamp: `(${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()})`,
      path: request.url,
    };

    // tslint:disable-next-line: no-console
    console.log(`ERROR ${resBody.statusCode} - ${resBody.timestamp}`);

    response
      .status(status)
      .json(resBody);
  }
}
