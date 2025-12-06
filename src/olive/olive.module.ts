import { Module } from '@nestjs/common';
import { OliveService } from './olive.service';
import { OliveController } from './olive.controller';

@Module({
  imports: [],
  providers: [OliveService],
  controllers: [OliveController],
})
export class OliveModule {}
