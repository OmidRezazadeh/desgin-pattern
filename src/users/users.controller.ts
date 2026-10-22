import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { CreateUserHandler } from './commands/create-user.handler.js';
import { CreateUserCommand } from './commands/create-user.command.js';
import { DeleteUserCommand } from './commands/delete-user.command.js';
import { DeleteUserHandler } from './commands/delete-user.handler.js';
import { EditUserHandler } from './commands/edit-user-handler.js';
import { EditUserCommand } from './commands/edit-user-command.js';
import { UpdateUserDto } from './dto/edit-user.dto.js';
import { UserSwagger } from './swagger/customer.swagger.js';
import { ApiEndpoint } from '../common/swagger/api-endpoint.decorator.js';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './commands/get-user-byId.query.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly deleteUserHandler: DeleteUserHandler,
    private readonly editUserHandler: EditUserHandler,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiEndpoint(UserSwagger.create)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }
  @Get(':userId')
  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'Customer ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Customer retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Customer not found',
  })
  async getCustomerById(@Param('userId', ParseIntPipe) userId: number) {
      return this.queryBus.execute(new GetUserByIdQuery(userId))
  }
  


  @Post('seed')
  @ApiOperation({
    summary: 'Create fake users',
    description: 'Generates and saves 10 fake users in the database.',
  })
  @ApiResponse({
    status: 201,
    description: 'Fake users created successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  seedUsers() {
    return this.usersService.seedUsers(10);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteUserHandler.execute(new DeleteUserCommand(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'User ID',
    example: 1,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.editUserHandler.execute(new EditUserCommand(id, editUserDto));
  }

}
