import { Injectable } from '@nestjs/common';
import { AdminUser } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface AdminDB extends AdminUser {
  id: string;
  submittedAt: Date;
}

export interface AdminUserData {
  requests: AdminDB[];
}

const adapter = new FileSync<AdminDB>('./db/admin.json')
const db = low(adapter)

db.defaults({ requests: [] }).write();

@Injectable()
export class AdminUserDao {

  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async insertNewRequest(adminUser: AdminUser) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...adminUser,
        submittedAt: new Date(),
      })
      .write()
    return id;
  }

  async getAdminUser(username: string): Promise<AdminDB> {
    return await this.collection.find({ username }).value();
  }
}
