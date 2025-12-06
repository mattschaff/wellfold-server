import { Controller, Get } from '@nestjs/common';
import { LoyalizeService } from './loyalize.service';

@Controller(`loyalize`)
export class LoyalizeController {
  constructor(private readonly loyalizeService: LoyalizeService) {}

  @Get()
  getHello(): string {
    return this.loyalizeService.test();
  }
}
