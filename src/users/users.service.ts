import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { createFakeUsers } from './user-seed.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/edit-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedUsers(count = 30): Promise<User[]> {
    const users = createFakeUsers(count);

    return this.userRepository.save(users);
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = this.userRepository.create(createUserDto);
  
    return this.userRepository.save(user);
  }

  async delete(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.userRepository.remove(user);
  }
  async edit(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    this.userRepository.merge(user, updateUserDto);
  
    return this.userRepository.save(user);
  }
}