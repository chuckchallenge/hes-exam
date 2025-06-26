import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { Equipment } from './equipment.dto';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  getAllEquipments() {
    return this.equipmentService.getAllEquipments();
  }

  @Get('available')
  getAvailableEquipments() {
    return this.equipmentService.getAvailableEquipments();
  }

  @Get(':id')
  getEquipmentById(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.getEquipmentById(id);
  }

  @Post()
  addEquipment(
    @Body()
    equipment: {
      name: string;
      type: string;
      serialNumber: string;
      status: boolean;
      purchaseDate: Date;
    },
  ) {
    return this.equipmentService.addEquipment(equipment);
  }

  @Delete(':id')
  deleteEquipment(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.deleteEquipmentById({ id });
  }
}
