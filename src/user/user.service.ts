import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { User } from 'src/models/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly users: User[]) { }
}
