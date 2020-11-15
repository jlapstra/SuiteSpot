import { Injectable } from '@nestjs/common';
import { AdminUser } from '@suiteportal/api-interfaces';
import { AdminUserDao, AdminDB } from './admin.dao';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminDao: AdminUserDao,
  ) {
    //
  }

  async createAdminUser(adminUser: AdminUser) {
    return await this.adminDao.insertNewRequest(adminUser);
  }

  async authAdminUser(username: string): Promise<AdminDB> {
    return await this.adminDao.getAdminUser(username);
  }

}
