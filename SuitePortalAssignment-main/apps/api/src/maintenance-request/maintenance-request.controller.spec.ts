/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestService } from './maintenance-request.service';

describe('MaintenanceRequestController', () => {
  let controller: MaintenanceRequestController;

  let mockService: MaintenanceRequestService;

  let testData: any;

  beforeEach(async () => {
    mockService = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRequestController],
      providers: [
        { provide: MaintenanceRequestService, useValue: mockService },
      ]
    }).compile();

    testData = [
      { id: '1', summary: 'testNum1' },
      { id: '2', summary: 'testNum2' },
      { id: '3', summary: 'testNum3' }
    ];

    controller = module.get<MaintenanceRequestController>(MaintenanceRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call dao when getting a maintenance request by id', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', summary: 'test' });

    const result = await controller.getMaintenanceRequest('1');

    expect(mockService.getMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual({ id: '1', summary: 'test'});
  });

  it('should call dao when getting all maintenance requests', async () => {
    mockService.getMaintenanceRequests = jest.fn().mockResolvedValue(testData);

    const result = await controller.getMaintenanceRequests();

    expect(mockService.getMaintenanceRequests).toHaveBeenCalled();
    expect(result).toEqual(testData);
  });

  it('should call dao when closing a maintenance request by id', async () => {
    mockService.closeMaintenanceRequest = jest.fn().mockResolvedValue(testData[1]);

    const result = await controller.closeMaintenanceRequest(testData[1]['id']);

    expect(mockService.closeMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual(testData[1]);
  });
});
