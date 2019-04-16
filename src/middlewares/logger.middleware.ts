// export function logger(req, res, next) {
//   // tslint:disable-next-line: no-console
//   console.log(
//     `Request: ${req.method} - ${req.originalUrl} - ${req.get('Content-Length') || 0}b received`,
//   );
//   next();
// }

import { Logger } from '@nestjs/common';

export class MyLogger extends Logger {}
