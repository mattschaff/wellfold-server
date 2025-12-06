import { Controller, Get } from '@nestjs/common';
import { OliveService } from './olive.service';

@Controller(`olive`)
export class OliveController {
  constructor(private readonly oliveService: OliveService) {}

  @Get()
  getHello(): string {
    return this.oliveService.test();
  }
}
