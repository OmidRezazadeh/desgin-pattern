import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UsersService } from '../users.service.js';
import { GetUserByIdQuery } from './get-user-byId.query.js';
import { User } from '../entities/user.entity.js';

@QueryHandler(GetUserByIdQuery)
export class GetCustomerByIdHandler

{
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User| null> {
    return this.usersService.findById(query.userId);
  }
}