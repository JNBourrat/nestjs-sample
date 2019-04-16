import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class MyLogger extends Logger {}

// export function logger(req, res, next) {
//   // tslint:disable-next-line: no-console
//   console.log(
//     `Request: ${req.method} - ${req.originalUrl} - ${req.get('Content-Length') || 0}b received`,
//   );
//   next();
// }
