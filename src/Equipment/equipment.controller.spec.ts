import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { Equipment } from './equipment.dto';
import { HttpException } from '@nestjs/common';

describe('EquipmentController', () => {
  let controller: EquipmentController;
  let service: EquipmentService;

  const mockEquipment = {
    id: 1,
    name: 'Laptop',
    type: 'laptop',
    serialNumber: 'SN1234567890',
    status: true,
    purchaseDate: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentController],
      providers: [EquipmentService],
    }).compile();

    controller = module.get<EquipmentController>(EquipmentController);
    service = module.get<EquipmentService>(EquipmentService);
  });

  describe('GET /equipment', () => {
    it('should return array of equipment if exists', () => {
      jest.spyOn(service, 'getAllEquipments').mockReturnValue([mockEquipment]);
      expect(controller.getAllEquipments()).toEqual([mockEquipment]);
    });

    it('should return message when no equipment exists', () => {
      jest
        .spyOn(service, 'getAllEquipments')
        .mockReturnValue('No equipment found');
      expect(controller.getAllEquipments()).toBe('No equipment found');
    });
  });

  describe('GET /equipment/available', () => {
    it('should return available equipment', () => {
      jest
        .spyOn(service, 'getAvailableEquipments')
        .mockReturnValue([mockEquipment]);
      expect(controller.getAvailableEquipments()).toEqual([mockEquipment]);
    });

    it('should return message if no available equipment', () => {
      jest
        .spyOn(service, 'getAvailableEquipments')
        .mockReturnValue('No available equipment');
      expect(controller.getAvailableEquipments()).toBe(
        'No available equipment',
      );
    });
  });

  describe('GET /equipment/:id', () => {
    it('should return equipment by ID', () => {
      jest.spyOn(service, 'getEquipmentById').mockReturnValue(mockEquipment);
      expect(controller.getEquipmentById(1)).toEqual(mockEquipment);
    });

    it('should throw error if equipment not found', () => {
      jest.spyOn(service, 'getEquipmentById').mockImplementationOnce(() => {
        throw new HttpException('Equipment not found', HttpStatus.NOT_FOUND);
      });

      expect(() => controller.getEquipmentById(999)).toThrow(
        new HttpException('Equipment not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('POST /equipment', () => {
    it('should add new equipment with valid data', () => {
      const newEquipment = {
        name: 'Monitor',
        type: 'monitor',
        serialNumber: 'MON-12345',
        status: true,
        purchaseDate: new Date(),
      };
      const result = {
        ...newEquipment,
        id: 2,
      };

      jest.spyOn(service, 'addEquipment').mockReturnValue(result as Equipment);

      expect(controller.addEquipment(newEquipment)).toEqual(result);
    });

    it('should throw error if required fields are missing', () => {
      const invalidData = {
        // Нет обязательных полей
        name: '',
        serialNumber: '',
        purchaseDate: null,
      };

      jest.spyOn(service, 'addEquipment').mockImplementationOnce(() => {
        throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
      });

      expect(() => controller.addEquipment(invalidData as any)).toThrow(
        new HttpException('Validation failed', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('DELETE /equipment/:id', () => {
    it('should delete equipment by ID', () => {
      const result = 'Equipment with ID 1 has been decommissioned';
      jest.spyOn(service, 'deleteEquipmentById').mockReturnValue(result);

      expect(controller.deleteEquipment(1)).toBe(result);
    });

    it('should throw error if equipment does not exist', () => {
      jest.spyOn(service, 'deleteEquipmentById').mockImplementationOnce(() => {
        throw new HttpException('Equipment not found', HttpStatus.NOT_FOUND);
      });

      expect(() => controller.deleteEquipment(999)).toThrow(
        new HttpException('Equipment not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
