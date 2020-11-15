import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';
import { AdminModule } from '../admin/admin.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MaintenanceRequestModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
