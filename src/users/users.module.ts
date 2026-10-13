import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { User } from './entities/user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserHandler } from './commands/create-user.handler.js';
import { DeleteUserHandler } from './commands/delete-user.handler.js';
import { EditUserHandler } from './commands/edit-user-handler.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService,CreateUserHandler,DeleteUserHandler,EditUserHandler],
  controllers: [UsersController]
})
export class UsersModule {}
