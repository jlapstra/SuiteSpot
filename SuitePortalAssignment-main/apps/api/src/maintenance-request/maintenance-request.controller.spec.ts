/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestService } from './maintenance-request.service';

describe('MaintenanceRequestController', () => {
  let controller: MaintenanceRequestController;

  let mockService: MaintenanceRequestService;

  beforeEach(async () => {
    mockService = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRequestController],
      providers: [
        { provide: MaintenanceRequestService, useValue: mockService },
      ]
    }).compile();

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
});
