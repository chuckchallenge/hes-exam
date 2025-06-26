/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EquipmentModule } from './Equipment/equipment.module';

@Module({
  imports: [EquipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
