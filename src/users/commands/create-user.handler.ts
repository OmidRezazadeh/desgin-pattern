
import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command.js';
import { UsersService } from '../users.service.js';
import { User } from '../entities/user.entity.js';

@Injectable()
export class CreateUserHandler {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    return this.usersService.create(command.user);
  }
}
