import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  let mockService: AdminService;

  let testData: any;

  beforeEach(async () => {
    mockService = {} as any;

    testData = {
       username: 'j', password: 'jpassword'
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        { provide: AdminService, useValue: mockService },
      ]
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call dao when authticating user with valid credentials', async () => {
    mockService.authAdminUser = jest.fn().mockResolvedValue(testData);

    const result = await controller.authAdminUser(testData);

    expect(mockService.authAdminUser).toHaveBeenCalled();
    expect(result).toEqual({ loggedIn: true, username: testData['username'] });
  });

  it('should call dao when authticating user with invalid credentials', async () => {
    mockService.authAdminUser = jest.fn().mockResolvedValue(undefined);

    await expect(controller.authAdminUser(testData)).rejects.toEqual(new UnauthorizedException());
    expect(mockService.authAdminUser).toHaveBeenCalled();
  });
});
