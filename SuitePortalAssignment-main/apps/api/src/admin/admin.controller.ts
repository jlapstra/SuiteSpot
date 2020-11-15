import {
  BadRequestException, Body, Controller, Post, Get, Param, Res, UnauthorizedException
} from '@nestjs/common';
import { AdminService } from './admin.service';

import { AdminUser } from '@suiteportal/api-interfaces';

@Controller('admin')
export class AdminController {

  constructor(
    private readonly adminService: AdminService,
  ) {
    //
  }

  @Post('create/')
  public async createAdminUser(
    @Body() adminUser: AdminUser,
  ) {
    console.log(adminUser);
    return await this.adminService.createAdminUser(adminUser);
  }

  @Post('/')
  public async authAdminUser(
    @Body() adminUser: AdminUser,
  ) {
    let res = await this.adminService.authAdminUser(adminUser.username);
    if (res == undefined) {
      throw new UnauthorizedException();
    }
    if (res.password == adminUser.password) {
      //AUTHENTICATED
      console.log('success');
      return {
        loggedIn: true,
        username: res.username
      };
    }
    return new BadRequestException('Incorrect Credentials');
  }

}
