import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class MyLogger extends Logger {
  // use this block to override Logger's functions
}

export function logger(req: Request, res: Response, next: NextFunction) {
  // tslint:disable-next-line: no-console
  MyLogger.log(
    `${req.method.toUpperCase()} - ${req.get('Content-Length') || 0}b received`,
    req.originalUrl,
  );

  next();
}
