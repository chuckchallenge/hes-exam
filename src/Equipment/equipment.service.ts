import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Equipment } from './equipment.dto';

@Injectable()
export class EquipmentService {
  private equipments: Equipment[] = [];

  getAllEquipments(): Equipment[] | string {
    return this.equipments.length ? this.equipments : 'No equipment found';
  }

  getAvailableEquipments(): Equipment[] | string {
    const array = this.equipments;
    const available = array.filter((e) => e.status === true);
    return available.length ? available : 'No available equipment';
  }

  getEquipmentById(id: number): Equipment {
    const equipment = this.equipments.find((item) => item.id === id);
    if (!equipment) {
      throw new HttpException('Equipment not found', HttpStatus.NOT_FOUND);
    }
    return equipment;
  }

  addEquipment(equipmentData: Omit<Equipment, 'id'>): Equipment {
    const newEquipment = {
      ...equipmentData,
      id: this.equipments.length + 1,
    };
    this.equipments.push(newEquipment);
    return newEquipment;
  }

  deleteEquipmentById({ id }: { id: number }): string {
    const index = this.equipments.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new HttpException('Equipment not found', HttpStatus.NOT_FOUND);
    }

    this.equipments.splice(index, 1);
    return `Equipment with ID ${id} has been deleted`;
  }
}
