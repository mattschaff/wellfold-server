import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  test(): string {
    return `Hello World!`;
  }
}
