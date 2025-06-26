import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentService } from './equipment.service';
import { Equipment } from './equipment.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('EquipmentService', () => {
  let service: EquipmentService;

  const mockEquipment = {
    name: 'Laptop',
    type: 'laptop',
    serialNumber: 'SN1234567890',
    status: true,
    purchaseDate: new Date(),
  } as Equipment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentService],
    }).compile();

    service = module.get<EquipmentService>(EquipmentService);
  });

  afterEach(() => {
    service['equipments'] = [];
  });

  describe('getAllEquipments()', () => {
    it('should return an array of equipment if exists', () => {
      service['equipments'] = [mockEquipment];
      expect(service.getAllEquipments()).toEqual([mockEquipment]);
    });

    it('should return a message if no equipment exists', () => {
      expect(service.getAllEquipments()).toBe('No equipment found');
    });
  });

  describe('getAvailableEquipments()', () => {
    it('should return available equipment', () => {
      const availableEquipment = {
        ...mockEquipment,
        status: true,
      };
      const unavailableEquipment = {
        ...mockEquipment,
        id: 2,
        status: false,
      };

      service['equipments'] = [availableEquipment, unavailableEquipment];

      expect(service.getAvailableEquipments()).toEqual([availableEquipment]);
    });

    it('should return a message if no available equipment', () => {
      const unavailableEquipment = {
        ...mockEquipment,
        status: false,
      };

      service['equipments'] = [unavailableEquipment];

      expect(service.getAvailableEquipments()).toBe('No available equipment');
    });
  });

  describe('getEquipmentById()', () => {
    it('should return equipment by ID', () => {
      const equipmentWithId = { ...mockEquipment, id: 1 };
      service['equipments'] = [equipmentWithId];

      expect(service.getEquipmentById(1)).toEqual(equipmentWithId);
    });

    it('should throw an exception if equipment not found', () => {
      expect(() => service.getEquipmentById(999)).toThrow(
        new HttpException('Equipment not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('addEquipment()', () => {
    it('should add new equipment with correct ID', () => {
      const newEquipmentData = {
        name: 'Monitor',
        type: 'monitor',
        serialNumber: 'MON1234567890',
        status: true,
        purchaseDate: new Date(),
      };

      const addedEquipment = service.addEquipment(newEquipmentData);

      expect(addedEquipment).toMatchObject(newEquipmentData);
      expect(addedEquipment.id).toBe(1);
      expect(service['equipments']).toContain(addedEquipment);
    });

    it('should increment ID correctly when adding multiple items', () => {
      const equipment1 = service.addEquipment({
        name: 'Laptop',
        type: 'laptop',
        serialNumber: 'SN001',
        status: true,
        purchaseDate: new Date(),
      });

      const equipment2 = service.addEquipment({
        name: 'Mouse',
        type: 'mouse',
        serialNumber: 'SN002',
        status: true,
        purchaseDate: new Date(),
      });

      expect(equipment1.id).toBe(1);
      expect(equipment2.id).toBe(2);
    });
  });

  describe('deleteEquipmentById()', () => {
    it('should delete equipment by ID and return success message', () => {
      const equipmentToDelete = { ...mockEquipment, id: 1 };
      service['equipments'] = [equipmentToDelete];

      const result = service.deleteEquipmentById({ id: 1 });

      expect(result).toBe('Equipment with ID 1 has been deleted');
      expect(service['equipments']).not.toContain(equipmentToDelete);
    });

    it('should throw an exception if equipment does not exist', () => {
      expect(() => service.deleteEquipmentById({ id: 999 })).toThrow(
        new HttpException('Equipment not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
