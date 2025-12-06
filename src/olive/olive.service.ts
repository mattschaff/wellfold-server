import { Injectable } from '@nestjs/common';

@Injectable()
export class OliveService {
  test(): string {
    return 'Hello World!';
  }
}
