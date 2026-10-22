import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { User } from './entities/user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserHandler } from './commands/create-user.handler.js';
import { DeleteUserHandler } from './commands/delete-user.handler.js';
import { EditUserHandler } from './commands/edit-user-handler.js';
import { CqrsModule } from '@nestjs/cqrs';
import { GetCustomerByIdHandler } from './commands/query-user-handler.js';



@Module({
  imports: [TypeOrmModule.forFeature([User])
  ,CqrsModule
],
  providers: [UsersService,CreateUserHandler,DeleteUserHandler,EditUserHandler,GetCustomerByIdHandler],
  controllers: [UsersController]
})
export class UsersModule {}
