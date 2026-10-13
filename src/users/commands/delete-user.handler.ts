
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command.js';
import { UsersService } from '../users.service.js';

@Injectable()
export class DeleteUserHandler {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.usersService.delete(command.userId);
  }
}
