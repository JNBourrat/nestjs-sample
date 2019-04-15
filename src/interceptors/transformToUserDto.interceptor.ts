import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { plainToClass } from 'class-transformer';

type ClassType<T> = new () => T;

@Injectable()
export class TransformToUserDtoInterceptor<T> implements NestInterceptor {
  constructor(private readonly classType: ClassType<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(data => of(plainToClass(this.classType, data)));
  }
}
