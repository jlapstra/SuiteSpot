import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { AdminUserDao } from './admin.dao'

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminUserDao,
  ]
})
export class AdminModule {}
