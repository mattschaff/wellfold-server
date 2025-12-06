import { Module } from '@nestjs/common';
import { LoyalizeController } from './loyalize.controller';
import { LoyalizeService } from './loyalize.service';

@Module({
  imports: [],
  controllers: [LoyalizeController],
  providers: [LoyalizeService],
})
export class LoyalizeModule {}
